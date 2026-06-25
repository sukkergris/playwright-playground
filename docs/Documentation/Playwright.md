# Playwright

## Run in headed mode with step-through (Playwright Inspector)

Set `PWDEBUG=1` before running a test. Playwright will launch a visible browser and open the Inspector, which pauses before each action and lets you step through one action at a time.

**View the browser** — open noVNC in a host browser before running the test:

```
http://localhost:6080/vnc.html
```

**Run a single test with the Inspector:**

```sh
cd /xyz/backend && PWDEBUG=1 dotnet test --filter "FullyQualifiedName~KnowitAgentic"
```

The Playwright Inspector window appears inside noVNC. Use the **Step over** button (or keyboard shortcut F10) to advance one action at a time.

> `PWDEBUG=1` also sets `Headless=false` automatically, so no code changes are needed.

## CLI

playwright screenshot https://dr.dk/ screenshot.png

## Devcontainer: Port Already Allocated (6080)

If the devcontainer fails with an error like:

Bind for 0.0.0.0:6080 failed: port is already allocated

the host port 6080 is already in use.

### What we changed

In .devcontainer/debian/docker-compose.yml, change:

ports:
	- "6080:6080"

to:

ports:
	- "6081:6080"

This keeps the container service on port 6080 internally, but exposes it on host port 6081.

### How to verify the conflict

Run this on the host:

lsof -nP -iTCP:6080 -sTCP:LISTEN

If you see a listener, 6080 is occupied.

### Validate compose after editing

From .devcontainer/debian:

Docker compose -f docker-compose.yml config

If it prints resolved config without errors, syntax is good.

### Restart steps

1. In VS Code, run: Dev Containers: Rebuild and Reopen in Container
2. Use noVNC on host via http://localhost:6081/vnc.html

### Optional consistency update

If you also use the dotnet devcontainer variant, apply the same port mapping change in:

.devcontainer/dotnet/docker-compose.yml