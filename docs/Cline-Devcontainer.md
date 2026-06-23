# Cline in Dev Container

## Problem

Cline defaults to `http://localhost:11434` for Ollama. Inside a Docker container, `localhost` refers to the container itself — not the host machine running Ollama. This causes `ECONNREFUSED` errors.

## Fix

Two steps, done once per workspace:

### 1. `docker-compose.yml` — expose the host gateway

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

This makes `host.docker.internal` resolve to the host machine from inside the container. Already configured in `.devcontainer/debian/docker-compose.yml`.

### 2. Cline settings — set a custom base URL

In the Cline sidebar → **Settings** → **API Configuration**:

- Check **Use custom base URL**
- Enter `http://host.docker.internal:11434`

Cline stores this in VS Code's global state (persists across container restarts as long as the container is not rebuilt).

## Why Continue works without this

Continue reads the `OLLAMA_HOST` environment variable, which is pre-configured in `devcontainer.json`:

```json
"containerEnv": {
  "OLLAMA_HOST": "http://host.docker.internal:11434"
}
```

Cline does not read `OLLAMA_HOST` — it must be configured manually via the UI.
