# Playwright MCP — Installation & Setup

`@playwright/mcp` is a Model Context Protocol server that lets AI assistants (Claude, etc.) drive a real browser via Playwright. This document covers the full setup as it exists in this devcontainer.

---

## How it fits together

```
Claude Code (AI assistant)
    │
    │  reads
    ▼
.mcp.json  ──────────────────────────────────────────────────────────┐
                                                                      │ spawns
                                                                      ▼
                                                    node @playwright/mcp/cli.js
                                                         (MCP server process)
                                                              │
                                                              │ controls
                                                              ▼
                                                         Chromium browser
```

Claude Code reads `.mcp.json` at startup, spawns the MCP server as a subprocess, and communicates with it over stdin/stdout using the MCP protocol. No separate server process needs to be started manually.

---

## What is installed — and where

### 1. `@playwright/mcp` (npm global)

Installed in the Dockerfile:

```dockerfile
# .devcontainer/debian/Dockerfile.debian
RUN npm install -g @playwright/mcp@latest
```

Installed version: **0.0.76**

The CLI entry point ends up at:
```
/home/container-user/.nvm/versions/node/v24.11.1/lib/node_modules/@playwright/mcp/cli.js
```

### 2. Playwright CLI (.NET tool)

Also installed in the Dockerfile for running xUnit tests and installing browsers:

```dockerfile
RUN dotnet tool install --tool-path /usr/local/bin Microsoft.Playwright.CLI
```

Available on `$PATH` as `playwright`.

### 3. Chromium browser

**Not baked into the image** — must be installed after the container starts:

```bash
playwright install --with-deps chromium
```

This downloads Chromium to `~/.cache/ms-playwright/`. The `--with-deps` flag installs OS-level dependencies (fonts, libs) needed for headless mode.

Verify it is present:
```bash
ls ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome
```

---

## Configuration files

### `.mcp.json` (project root)

Tells Claude Code which MCP servers to launch and how. There are two equivalent ways to write the entry:

**Option A — via the `playwright-mcp` bin symlink (cleaner):**

```json
{
  "mcpServers": {
    "playwright": {
      "command": "/home/container-user/.nvm/versions/node/v24.11.1/bin/playwright-mcp",
      "args": ["--browser", "chromium"]
    }
  }
}
```

`playwright-mcp` is a symlink created by npm when it installs the package globally:
```
/home/container-user/.nvm/versions/node/v24.11.1/bin/playwright-mcp
  -> ../lib/node_modules/@playwright/mcp/cli.js
```

**Option B — via `node` + explicit path to `cli.js` (more explicit):**

```json
{
  "mcpServers": {
    "playwright": {
      "command": "node",
      "args": ["/home/container-user/.nvm/versions/node/v24.11.1/lib/node_modules/@playwright/mcp/cli.js", "--browser", "chromium"]
    }
  }
}
```

Both resolve to the same file. Option A is shorter and is the idiomatic npm global binary form. Option B is useful if the symlink is missing or you need to control which `node` binary is used.

> **Why `--browser chromium`?**
> The MCP server defaults to `chrome` (Google Chrome), which is not installed in this devcontainer. Only the Playwright-managed Chromium build (`~/.cache/ms-playwright/chromium-*/`) is present, so `--browser chromium` is required.

> **Why absolute paths and not `npx @playwright/mcp`?**
> Absolute paths are more reliable inside a devcontainer where `npx` resolution can differ by shell. They also start faster (no package lookup).

### `.claude/settings.json` (project root)

Opts this project into the `playwright` MCP server defined above:

```json
{
  "enabledMcpjsonServers": ["playwright"]
}
```

Without this entry Claude Code would not activate the server even if `.mcp.json` exists.

---

## Docker Compose requirements

Playwright's headless Chromium requires the Linux `SYS_ADMIN` capability (needed for sandboxing). The compose file grants it:

```yaml
# .devcontainer/debian/docker-compose.yml
services:
  dev:
    cap_add:
      - SYS_ADMIN
```

Without `SYS_ADMIN`, Chromium either crashes or refuses to start.

---

## First-time setup (new container)

```bash
# 1. Install Chromium + OS dependencies
playwright install --with-deps chromium

# 2. Validate the full stack
./validate-installation.sh

# 3. Open Claude Code — it will auto-start the MCP server
claude
```

Claude Code reads `.mcp.json` on launch. The Playwright MCP server starts automatically as a subprocess — no manual `node cli.js` needed.

---

## Verifying the MCP server is active

Inside a Claude Code session, the Playwright tools appear as deferred tools in the context. Check by asking Claude to load the schema:

```
ToolSearch: select:mcp__playwright__browser_navigate
```

Or take a quick screenshot to confirm end-to-end:

```
Navigate to https://example.com and take a screenshot
```

---

## CLI reference (manual use)

The MCP server can also be launched manually for testing or piping to another client:

```bash
node /home/container-user/.nvm/versions/node/v24.11.1/lib/node_modules/@playwright/mcp/cli.js --help
```

Key options:

| Flag | Description |
|------|-------------|
| `--browser <name>` | `chrome`, `firefox`, `webkit`, `msedge` (default: chromium) |
| `--caps <list>` | Extra capabilities: `vision`, `pdf`, `devtools` |
| `--device <name>` | Emulate a device, e.g. `"iPhone 15"` |
| `--executable-path <path>` | Path to a custom browser binary |
| `--cdp-endpoint <url>` | Connect to an already-running browser via CDP |
| `--headless` | Force headless mode |
| `--no-sandbox` | Disable sandbox (use only if `SYS_ADMIN` is unavailable) |
| `--port <n>` | Expose MCP over HTTP instead of stdin/stdout |
| `--config <path>` | Load options from a JSON config file |
| `--codegen <lang>` | Emit generated code (`typescript` or `none`) |

Example — launch with vision capability and Firefox:

```bash
node .../cli.js --browser firefox --caps vision
```

---

## Available MCP tools (in Claude Code)

Once active, Claude has access to these tools (prefixed `mcp__playwright__`):

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Go to a URL |
| `browser_snapshot` | Capture accessibility tree (use for interactions) |
| `browser_take_screenshot` | Visual screenshot |
| `browser_click` | Click an element |
| `browser_type` | Type text at cursor position |
| `browser_fill_form` | Fill multiple form fields at once |
| `browser_select_option` | Select a `<select>` option |
| `browser_press_key` | Send a key press |
| `browser_hover` | Hover over an element |
| `browser_drag` / `browser_drop` | Drag-and-drop |
| `browser_evaluate` | Run JavaScript in the page context |
| `browser_console_messages` | Read browser console output |
| `browser_network_requests` | Inspect all network traffic |
| `browser_network_request` | Inspect a specific request |
| `browser_file_upload` | Upload a file via `<input type="file">` |
| `browser_handle_dialog` | Accept or dismiss alert/confirm/prompt dialogs |
| `browser_wait_for` | Wait for a condition (selector, navigation, etc.) |
| `browser_navigate_back` | Go back in history |
| `browser_resize` | Resize the browser viewport |
| `browser_tabs` | List open tabs |
| `browser_close` | Close the browser |
| `browser_run_code_unsafe` | Run arbitrary code in an isolated context |

> Prefer `browser_snapshot` over `browser_take_screenshot` when you need to interact with the page — it returns the accessibility tree which Claude can act on directly. Use screenshots for visual verification only.

---

## Troubleshooting

### Chromium crashes immediately
- Ensure `SYS_ADMIN` capability is set in `docker-compose.yml`.
- Run `playwright install --with-deps chromium` to ensure all OS deps are installed.

### MCP tools not visible in Claude Code
- Check that `enabledMcpjsonServers` in `.claude/settings.json` contains `"playwright"`.
- Check that the path in `.mcp.json` points to the correct `cli.js` (node version may differ).
  ```bash
  npm list -g @playwright/mcp
  # shows the install location
  ```

### Wrong node version in path
If nvm installs a new Node version, the path in `.mcp.json` becomes stale. Update it:
```bash
# Find the current path
npm root -g
# Example output: /home/container-user/.nvm/versions/node/v24.11.1/lib/node_modules
```
Then update the `args` path in `.mcp.json` accordingly.

### Port conflicts (HTTP mode)
If using `--port` to expose MCP over HTTP:
```bash
# Find what's using the port
lsof -i :<port>
# Kill it
kill $(lsof -t -i:<port>)
```

---

## Links

- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [Model Context Protocol spec](https://modelcontextprotocol.io/)
- [Playwright docs](https://playwright.dev/)
- [MCP server list](https://github.com/modelcontextprotocol/servers)
