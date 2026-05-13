# Claude Code i Dev Container (Volume-baseret)

Guide til at sætte Claude Code op i et devcontainer-projekt med persistent login via Docker volume.

## Hvad der skal gøres

### 1. Tilføj Claude volume mount i devcontainer.json

Tilføj et Docker volume mount under `"mounts"` i `devcontainer.json`:

```json
"mounts": [
  "source=claude-${localWorkspaceFolderBasename},target=/root/.claude,type=volume"
]
```

Hvis containeren køres som anden bruger end `root`, erstat `/root` med containerbrugerens home, fx `/home/container-user`.

**Hvorfor volume:**
- Login overlever container rebuilds.
- Ingen host-path mismatch fra bind mounts.
- Hver workspace/container får sin egen isoleret Claude-state.

### 2. Log ind én gang

Efter container-oprettelse:

```bash
claude login
```

Denne login gemmes i volumen og overlever rebuild.

### 3. Verificer

Efter login skal følgende virke uden ny auth-prompt:

```bash
claude --version
claude --print "hvad er 2+2?"
```

## Vigtige noter

- Volumen bliver skabt automatisk af Docker på første container-start.
- Volumen-navn er baseret på workspace-navn: `claude-${localWorkspaceFolderBasename}`.
- Hvis du arbejder på flere devcontainer-projekter, får hver sin egen Claude-session.
- Bind mounts af `.claude` fra hosten frarådes — de skaber host-path problemer i containeren.

## Hvis login skal genstartes

Slet volumen (sletter lokal Claude-state for det projekt):

```bash
docker volume rm claude-<workspace-navn>
```

Dernæst `claude login` igen i containeren.
