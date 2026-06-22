# Dotfiles In This Container

## Why your dotfiles are not "working"

Your dotfiles are present in this container and your shell rc files are stowed correctly.

This container starts as `container-user` with home at `/home/container-user`, but the devcontainer only mounts a few specific home subdirectories:

- `.claude`
- `.codex`
- `.gemini`
- `.config`
- `.continue`

The important detail is that one of those mounts is `~/.config`, and that can mask stowed content that your shell startup files expect to load.

## What I verified

The Debian devcontainer is configured to run as `container-user`:

- `.devcontainer/debian/devcontainer.json` sets `remoteUser` to `container-user`

The mounted home folders are limited to a small allowlist:

- `.devcontainer/debian/devcontainer.json` mounts `.claude`, `.codex`, `.gemini`, `.config`, and `.continue`

Your shell rc files are symlinked from the dotfiles repo:

- `~/.bashrc -> ~/dotfiles/bash/.bashrc`
- `~/.zshrc -> ~/dotfiles/zsh/.zshrc`

The dotfiles repo is present at `~/dotfiles` and contains a `shell-common` package.

The mounted `~/.config` directory is currently effectively empty and does not contain `shell-common`.

That matters because both rc files try to source files from:

- `~/.config/shell-common`

The shell behavior also differs by shell mode:

- Interactive `bash` has alias `la='ls -A'`
- Interactive `zsh` has alias `la='ls -lAh'`
- Non-interactive `bash` does not load that alias

That last part matters because `~/.bashrc` begins with this guard:

```bash
[ -z "$PS1" ] && return
```

So non-interactive bash exits early before alias definitions are loaded.

## Why this feels broken

There are really two separate issues:

1. Your stowed rc files are present, but some of the content they expect under `~/.config` is being masked by the mounted `.config` volume.
2. Even when rc files are loaded, aliases only appear in interactive shell sessions, not in non-interactive shell execution.

So a command can work in one terminal session and fail in another, depending on how that shell was launched.

## Practical implications

- If you expect aliases/functions loaded from `shell-common`: the mounted `~/.config` directory has to contain that content.
- If you expect aliases in scripts or non-interactive commands: aliases are the wrong mechanism.
- If you want stable shell behavior across rebuilds: set it up in the Dockerfile, post-create script, or mounted volumes.

## Recommended fixes

### Option 1: Stop masking the stowed `~/.config` content

Right now the devcontainer mounts:

- `/home/container-user/.config`

If your dotfiles setup expects stow to manage `~/.config/shell-common`, this mount can hide it.

Possible fixes:

- remove the `.config` volume mount if you do not need it
- change the dotfiles layout so shared shell files are not placed under `~/.config`
- populate the mounted `.config` volume with the expected `shell-common` content

This is the most likely root cause for the behavior you are seeing.

### Option 2: Mount your dotfiles deliberately

Add named or bind mounts for the specific files or folders you actually want, for example:

- `/home/container-user/.bashrc`
- `/home/container-user/.zshrc`
- `/home/container-user/.bash_aliases`
- `/home/container-user/.oh-my-zsh`
- `/home/container-user/.config/shell-common`
- `/home/container-user/.nvm`

This is best for personal convenience, but it is less reproducible.

### Option 3: Bake shared shell setup into the container

If the shell behavior should be consistent for anyone opening the repo, put it in:

- `.devcontainer/debian/Dockerfile.debian`
- `.devcontainer/post-container-creation.sh`
- repo-managed shell config under the workspace

This is better for team reproducibility.

### Option 4: Stop depending on aliases for automation

For scripts, tasks, and tooling:

- use full commands
- use shell scripts committed to the repo
- use `package.json` scripts, `Taskfile.yml`, or checked-in helper scripts

That avoids shell-mode surprises.

## Bottom line

Your dotfiles are mostly there.

The more likely breakage is that a mounted `~/.config` volume is hiding stowed `shell-common` content, and on top of that alias-based shell behavior still differs between interactive and non-interactive shells.
