# C# Playwright Playground

A cozy little .NET 10 playground for learning and experimenting with Microsoft Playwright.

This repository is intentionally simple: quick to open, quick to run, and easy to tweak when you want to try browser automation ideas.

## Why This Repo Exists

- Learn Playwright with focused C# exercises.
- Keep experiments close to real test workflows.
- Run everything in a reproducible Dev Container.

## Project Layout

- `PlaywrightTests`: xUnit tests using `Microsoft.Playwright.Xunit`
- `PlaywrightPrerender`: console app scaffold for prerendering experiments
- `Documentation`: notes and Playwright reference material

## Quick Start (Recommended: Dev Container)

1. Open the repo in VS Code.
2. Reopen in container.
3. Install Chromium inside the container:

```sh
playwright install --with-deps chromium
```

4. Build and run tests:

```sh
dotnet build
dotnet test
```

## Claude In The Dev Container

This repository is configured so Claude state is stored in a Docker volume at `/root/.claude`.

What this gives you:

- You do not need to log in again on every rebuild.
- Container-specific paths stay container-specific.
- You avoid host path issues from mounting host `.claude.json` directly.

In practice: log in once in the container, then rebuild freely.

## Useful Commands

Build solution:

```sh
dotnet build
```

Run all tests:

```sh
dotnet test
```

Run one test:

```sh
dotnet test --filter "FullyQualifiedName=PlaywrightTests.UnitTest1.Test1"
```

## Recommended Browser Extension

If you use Chrome for quick Playwright workflows, this extension is recommended:

- Playwright CRX: https://chromewebstore.google.com/detail/playwright-crx/jambeljnbnfbkcpnoiaedcabbgmnnlcd

Take a quick screenshot with Playwright CLI:

```sh
playwright screenshot https://example.com screenshot.png
```

## Tips

- If browser tests fail early, Chromium is usually not installed yet in the container.
- If authentication feels reset, verify the devcontainer is using the Claude volume mount.

## Contributing

Small improvements are welcome: clearer exercises, better notes, and practical test examples.

If you open a PR, include:

- What changed
- Why it helps
- How you verified it (`dotnet test`, command output, or screenshots)

## License

This project is released under The Unlicense. See [LICENSE](LICENSE).
