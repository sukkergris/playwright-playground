# Prompt: How We Got Playwright Working in Our Devcontainer

Use this prompt to brief Claude (or another LLM) on the exact setup so it understands the context without reading every file.

---

## Prompt

We have a .NET 10 / Playwright playground running in a VS Code Dev Container. Here is exactly how it is wired up.

### Two devcontainer variants

The repo has two devcontainers under `.devcontainer/`:

- **`dotnet/`** — based on `mcr.microsoft.com/dotnet/sdk:10.0` (Microsoft's official image)
- **`debian/`** — based on a private internal Debian base image (`devcontainer.debian.iknowagentic:0.0.1`)

Both use Docker Compose and share the same overall architecture. The `debian` variant is the active one (port `6081:6080` to avoid conflicts with the `dotnet` variant on `6080`).

### The core problem: Chromium in Docker

Playwright's headless Chromium requires either a real kernel sandbox or the Linux `SYS_ADMIN` capability so it can use its own user-namespace sandbox. Without this, Chromium refuses to start.

**Fix:** both `docker-compose.yml` files include:

```yaml
cap_add:
  - SYS_ADMIN
```

### What the Dockerfile installs

`Dockerfile.devmachine` (dotnet variant) installs these packages on top of the SDK image:

```dockerfile
apt-get install -y xvfb x11vnc novnc websockify
```

- **`xvfb`** — virtual X11 framebuffer (no physical display needed)
- **`x11vnc`** — VNC server that shares the Xvfb display
- **`novnc` + `websockify`** — converts the VNC stream to WebSockets so a browser can view it on port 6080

It also installs the Playwright CLI as a global dotnet tool:

```dockerfile
RUN dotnet tool install --global Microsoft.Playwright.CLI
ENV PATH="${PATH}:/root/.dotnet/tools"
```

The `debian` variant installs the CLI to `/usr/local/bin` directly (non-root toolpath):

```dockerfile
RUN dotnet tool install --tool-path /usr/local/bin Microsoft.Playwright.CLI
```

### Chromium is NOT baked into the image

Chromium is intentionally excluded from the `docker build` step. It is installed at **container creation time** via the `postCreateCommand` in `devcontainer.json`:

```json
"postCreateCommand": "bash .devcontainer/post-container-creation.sh"
```

`post-container-creation.sh` runs:

```sh
playwright -p /xyz/backend/src/PlaywrightTests/PlaywrightTests.csproj install --with-deps chromium
```

This downloads Chromium and all its system dependencies into `~/.cache/ms-playwright/` the first time the container starts. Subsequent rebuilds reuse the named Docker volume (or re-download if the volume is gone).

### Validating the setup

`validate-installation.sh` checks:
1. `dotnet tool list --global` — confirms Playwright CLI is installed
2. `command -v playwright` — confirms it is on PATH
3. `/etc/os-release` — shows which base OS is running
4. `~/.cache/ms-playwright/chromium-*/chrome-linux/chrome` — confirms Chromium binary exists

### Codegen via noVNC (the tricky part)

`playwright codegen` opens a real browser window. Inside a headless container there is no display, so we use a virtual X11 stack to stream the browser to a browser tab on the Mac.

**Stack:**

```
Container: Chromium → Xvfb (virtual screen :99) → x11vnc → websockify/noVNC → port 6080
Mac:       Browser  → http://localhost:6080/vnc.html  (live view of Chromium)
```

`pw-codegen.sh` automates this:

```sh
# Starts Xvfb on display :99 (1920x1080)
Xvfb :99 -screen 0 1920x1080x24 &

# Starts x11vnc sharing :99 on localhost:5900
x11vnc -display :99 -nopw -listen localhost -xkb -forever -quiet &

# Starts websockify bridging VNC → WebSocket, serving noVNC HTML on port 6080
websockify --web /usr/share/novnc 6080 localhost:5900 &

# Runs playwright codegen with DISPLAY pointed at the virtual screen
DISPLAY=:99 playwright -p /xyz/backend codegen --target=csharp "$@"
```

Usage:

```sh
./pw-codegen.sh http://localhost:5173
# Then open http://localhost:6080/vnc.html in your Mac browser and click Connect.
```

### Named volumes for AI tools and secrets

`devcontainer.json` mounts several named Docker volumes so state survives container rebuilds:

```json
"mounts": [
  "source=claude-${localWorkspaceFolderBasename},target=/root/.claude,type=volume",
  "source=codex-${localWorkspaceFolderBasename},target=/root/.codex,type=volume",
  "source=gemini-${localWorkspaceFolderBasename},target=/root/.gemini,type=volume",
  "source=vscode-secrets-${localWorkspaceFolderBasename},target=/root/.vscode-server/data/Machine,type=volume",
  "source=config-${localWorkspaceFolderBasename},target=/root/.config,type=volume",
  "source=continue-${localWorkspaceFolderBasename},target=/root/.continue,type=volume"
]
```

This means Claude Code, Codex, and Gemini logins persist across rebuilds without binding host paths into the container.

### Port conflict resolution

If the host already has something on port 6080 (e.g. the `dotnet` devcontainer), the `debian` variant maps to `6081` instead:

```yaml
ports:
  - "6081:6080"   # host:container
```

noVNC is then accessed at `http://localhost:6081/vnc.html`.

### Key files

| File | Purpose |
|------|---------|
| `.devcontainer/dotnet/Dockerfile.devmachine` | Builds the ms-dotnet image with xvfb/x11vnc/novnc + Playwright CLI |
| `.devcontainer/debian/Dockerfile.debian` | Adds Playwright CLI on top of internal Debian base image |
| `.devcontainer/dotnet/docker-compose.yml` | Wires up `SYS_ADMIN`, port 6080, workspace mount |
| `.devcontainer/debian/docker-compose.yml` | Same but port 6081 |
| `.devcontainer/dotnet/devcontainer.json` | VS Code config, `postCreateCommand`, named volume mounts |
| `.devcontainer/debian/devcontainer.json` | Same for `container-user` (non-root) |
| `.devcontainer/post-container-creation.sh` | Installs Chromium via `playwright install --with-deps chromium` |
| `.devcontainer/validate-installation.sh` | Smoke-tests the full setup |
| `pw-codegen.sh` | Starts Xvfb+x11vnc+noVNC and launches `playwright codegen` |
