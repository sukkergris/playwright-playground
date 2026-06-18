# Claude Login Permissions Fix

## The Problem

Claude login was failing because the `.claude` directory was owned by `root:root` but the VS Code container runs as `container-user`. When Claude tried to write authentication tokens to `/home/container-user/.claude/claude.json`, it was denied due to insufficient permissions.

```bash
$ ls -la /home/container-user/.claude
total 12
drwxr-xr-x 2 root           root           4096 Jun 18 13:27 .
```

Notice: `root root` ownership → `container-user` cannot write here.

## Why This Happened

In `devcontainer.json`, we mount Docker volumes for persistent authentication state:

```json
"mounts": [
  "source=claude-${localWorkspaceFolderBasename},target=/home/container-user/.claude,type=volume"
]
```

**The Issue:**
- Docker creates the mount point directory
- Docker runs with `root` privileges during this initial creation
- The directory ends up owned by `root:root`
- When VS Code's remoteUser switches to `container-user`, it can't write to this root-owned directory

## The Solution

We added **two layers of permission fixes**:

### 1. Dockerfile (Build-Time Fix)

After installing npm packages as `container-user`, we temporarily switch back to `root` to fix permissions:

```dockerfile
USER container-user

RUN npm install -g @anthropic-ai/claude-code && \
    npm install -g @playwright/mcp@latest

# Fix permissions for mounted volumes (created as root by Docker)
USER root
RUN chown -R container-user:container-user /home/container-user/.claude \
                                            /home/container-user/.codex \
                                            /home/container-user/.gemini \
                                            /home/container-user/.continue 2>/dev/null || true

USER container-user
```

**What this does:**
- Recursively changes ownership (`chown -R`) of all AI-related config directories
- `2>/dev/null || true` suppresses errors if directories don't exist yet (they won't at build time)
- Happens once at build time, baked into the image

### 2. Post-Container Creation Hook (Runtime Fix)

In `.devcontainer/post-container-creation.sh`, we add a fix that runs every time the container starts:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Fix permissions on mounted volumes
sudo chown -R container-user:container-user /home/container-user/.claude \
                                             /home/container-user/.codex \
                                             /home/container-user/.gemini \
                                             /home/container-user/.continue 2>/dev/null || true
```

**Why this is needed:**
- Volumes are created fresh when the container starts
- Even if the Dockerfile fixed them, rebuilding the container resets the volumes
- This ensures permissions are correct on every container startup
- Uses `sudo` because the script runs as `container-user` but needs root to change ownership

## Key Concepts

### User/Group Ownership in Linux
```
-rw-r--r--  user  group  file.txt
owner:group:others permissions
```

- **owner** (user) — can do anything to the file
- **group** — permissions apply to this group
- **others** — permissions apply to everyone else

In our case: `drwxr-xr-x 2 root root` means:
- Owner (root) can read, write, execute
- Group (root) can read, execute only
- Others can read, execute only
- `container-user` is "others" → no write permission

### Docker Volume Mounting
- Volumes are persistent storage managed by Docker
- When first created, the mount point directory is owned by whatever user Docker runs as (typically root)
- This persists across container rebuilds and even after deletion
- Permissions must be explicitly set afterward

### Why Two Fixes?
- **Build-time (Dockerfile):** Ensures the image is correct as a baseline
- **Runtime (.devcontainer/post-container-creation.sh):** Handles the case where volumes are remounted or permissions drift

This redundancy is intentional and good practice—it ensures the system works even if one fix fails or is skipped.

## Verification

After rebuild, verify permissions are correct:

```bash
ls -la /home/container-user/.claude
```

Should show:
```
drwxr-xr-x 2 container-user container-user 4096 Jun 18 14:50 .
```

`container-user container-user` ✓ → Now Claude can write to this directory.

## Related Volumes

The same fix applies to all mounted volumes:
- `.claude` — Anthropic Claude authentication
- `.codex` — GitHub Copilot state (if used)
- `.gemini` — Google Gemini state (if used)
- `.continue` — Continue.dev state (if used)

Each volume needs write permission for the respective AI extension to store authentication tokens and configuration.

---

**Key Takeaway:** When Docker volumes are mounted into containers running as a specific user, permissions must be explicitly transferred to that user. This is a common gotcha with devcontainers.
