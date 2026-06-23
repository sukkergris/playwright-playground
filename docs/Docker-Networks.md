# Docker Networking

## Key concepts

### `localhost` inside a container

`localhost` (127.0.0.1) inside a container refers to the container itself — not the host machine. A service running on port 11434 on your Mac/Windows host is not reachable via `localhost:11434` from inside the container.

### `host.docker.internal`

A DNS name that Docker resolves to the host machine's IP from inside a container. Lets containers reach services running on the host (e.g. Ollama, a local API server).

On Linux, Docker does **not** inject this name automatically — you must declare it explicitly:

```yaml
# docker-compose.yml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

`host-gateway` is a Docker special value that resolves to the host's gateway IP at runtime. On Mac and Windows, `host.docker.internal` is injected automatically by Docker Desktop, so the `extra_hosts` entry is harmless but good practice for cross-platform consistency.

### Port mapping (`ports`)

Exposes a container port to the host:

```yaml
ports:
  - "6080:6080"          # host:container
  - "${VAR:-default}:80" # with env var fallback
```

Traffic arriving on the host at port 6080 is forwarded into the container. This is the reverse direction of `host.docker.internal` — it goes host → container rather than container → host.

### Named networks (`networks`)

Isolates containers and enables DNS-based service discovery between them. Containers on the same named network can reach each other by service name:

```yaml
services:
  app:
    networks: [internal]
  db:
    networks: [internal]   # app can reach db at http://db:5432

networks:
  internal:
    driver: bridge
```

The `bridge` driver is the default and suitable for single-host setups.

---

## This devcontainer

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"   # reach host services (Ollama, etc.)

ports:
  - "${HOST_NOVNC_PORT:-6080}:6080"       # noVNC browser UI

networks:
  - internal                              # isolated bridge network
```

### Why `extra_hosts` matters here

AI tools that connect to a local Ollama instance:

| Tool | How it finds Ollama |
|------|-------------------|
| Continue | Reads `OLLAMA_HOST` env var (set in `devcontainer.json`) |
| Cline | Hardcodes `localhost:11434`; needs **Use custom base URL** → `http://host.docker.internal:11434` |

See [Cline-Devcontainer.md](Cline-Devcontainer.md) for the full Cline setup.
