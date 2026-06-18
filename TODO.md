# TODO

## Next

### Devcontainer Hardening Plan

- [ ] 1) Make builds reproducible and safer
	- Pin base image by digest in `.devcontainer/debian/Dockerfile.debian`.
	- Replace `curl | sh` Task install with a verified download (version pin + checksum).
	- Add `--no-install-recommends` and apt cache cleanup.
	- Definition of done: container rebuild succeeds twice with identical tool versions.

- [ ] 2) Unify post-create and validation flow
	- Keep one canonical post-create script path (remove duplicate drift).
	- Keep one canonical validation script path.
	- Ensure `devcontainer.json` points to the canonical script only.
	- Definition of done: both scripts run from a fresh rebuild without path confusion.

- [ ] 3) Fix validation to be meaningful (fail-fast)
	- Remove/replace `dotnet tool list --global` as primary Playwright signal.
	- Validate `command -v playwright` and `playwright --version`.
	- Fail when Chromium is missing, unless intentionally configured as optional.
	- Definition of done: broken setup exits non-zero with actionable error text.

- [ ] 4) Align user/home assumptions across docs and configs
	- Standardize Debian pathing to `container-user` home locations.
	- Update docs that still reference `/root/.claude` for Debian flow.
	- If dotnet variant remains, document it explicitly as separate behavior.
	- Definition of done: docs and mounted paths match runtime (`whoami`, `$HOME`).

- [ ] 5) Reduce privilege surface where possible
	- Reconfirm whether `SYS_ADMIN` is strictly required for your Playwright mode.
	- If required, document exact reason and acceptable alternatives.
	- Definition of done: least-privilege rationale captured in repo docs.

- [ ] 6) Validate end-to-end from clean state
	- Rebuild container with no cache.
	- Run post-create setup.
	- Run `dotnet build` and `dotnet test`.
	- Run Playwright smoke command and verify Chromium cache location.
	- Definition of done: one command sequence in docs reproduces a green setup.

### Suggested Execution Order

- [ ] Phase A: Reproducibility + installer hardening (items 1 and 3)
- [ ] Phase B: Script consolidation (item 2)
- [ ] Phase C: Docs/path alignment (item 4)
- [ ] Phase D: Privilege review + clean rebuild verification (items 5 and 6)

## Done