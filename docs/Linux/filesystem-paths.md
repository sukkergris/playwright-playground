# Linux Filesystem Paths

## Directory Tree

```
/
├── bin/
│   ├── ls
│   ├── bash
│   └── sh
├── home/
│   └── container-user/
│       └── .dotnet/
│           └── tools/
│               └── playwright          ← dotnet tool install --global (as container-user)
└── usr/
    ├── bin/
    │   ├── dotnet
    │   └── git
    └── local/
        └── bin/
            ├── playwright              ← dotnet tool install --tool-path /usr/local/bin
            └── task                   ← taskfile install

/root/
└── .dotnet/
    └── tools/
        └── playwright                  ← dotnet tool install --global (as root)
```

## Path Reference

| Path | Full example | Purpose |
|---|---|---|
| `/bin` | `/bin/ls`, `/bin/bash` | Core OS binaries |
| `/usr` | `/usr/` | User System Resources — programs and data for the OS |
| `/usr/bin` | `/usr/bin/dotnet`, `/usr/bin/git` | Standard installed programs (managed by `apt` etc.) |
| `/usr/local` | `/usr/local/` | Subtree for manually installed software, outside `apt`'s control |
| `/usr/local/bin` | `/usr/local/bin/playwright`, `/usr/local/bin/task` | Executables in the local subtree — available to all users |
| `/root/.dotnet/tools` | `/root/.dotnet/tools/playwright` | .NET global tools for the `root` user only |
| `/home/user/.dotnet/tools` | `/home/container-user/.dotnet/tools/playwright` | .NET global tools for a specific non-root user |

## Permissions

| Path | `root` can read/execute | `container-user` can read/execute | Who can write |
|---|---|---|---|
| `/usr/bin/` | Yes | Yes | `root` only |
| `/usr/local/bin/` | Yes | Yes | `root` only |
| `/root/.dotnet/tools/` | Yes | **No** | `root` only |
| `/home/container-user/.dotnet/tools/` | Yes (as root) | Yes | `container-user` only |

## Key Rules

- `/usr/*` is readable and executable by all users, but only `root` can write there.
- `/root/` is private to `root`. Other users cannot read or execute anything inside it.
- `$HOME` (e.g. `/home/container-user/`) is private to that user.
- `/usr/local/bin` is the correct place to install shared CLI tools during a Docker image build — `root` installs, everyone runs.

## Relevance to Devcontainers

`dotnet tool install --global` installs into `$HOME/.dotnet/tools` for whichever user runs the command.

- Run as `root` → lands in `/root/.dotnet/tools` → `container-user` **cannot** run it
- Run as `container-user` → lands in `/home/container-user/.dotnet/tools` → works, but only if that path is on `PATH`

`dotnet tool install --tool-path /usr/local/bin` bypasses home directories entirely and places the binary directly in a shared system path. This is the most reliable option in a devcontainer where the build user (`root`) differs from the runtime user (`container-user`).
