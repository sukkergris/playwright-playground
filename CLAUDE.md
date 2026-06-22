# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A .NET 10 playground for exploring Microsoft Playwright. The solution contains two projects:

- **PlaywrightTests** — xUnit test project using `Microsoft.Playwright.Xunit` for browser automation tests
- **PlaywrightPrerender** — Console app scaffolded for Playwright-driven prerendering experiments

This is a **.NET project**. The primary language is C#. Prefer .NET tooling (`dotnet`, the `playwright` .NET CLI) over Node.js alternatives unless explicitly instructed otherwise.

## Dev Environment

The project runs inside a Dev Container (Docker Compose). The container is based on `mcr.microsoft.com/dotnet/sdk:10.0` and requires `SYS_ADMIN` capability for Playwright's headless Chromium to work. The workspace is mounted at `/xyz`.

Chromium is **not** installed in the image by default — it must be installed after the container starts:

```sh
playwright install --with-deps chromium
```

To validate the full setup:

```sh
./validate-installation.sh
```

## Claude In Dev Container

- Claude state is stored in a named Docker volume mounted at `/root/.claude`.
- This avoids host-path mismatches from binding host-level `.claude.json` into the container.
- Result: you usually log in once per workspace volume, and the login persists across container rebuilds.

## Commands

Build the solution:
```sh
dotnet build
```

Run all tests:
```sh
dotnet test
```

Run a single test:
```sh
dotnet test --filter "FullyQualifiedName=PlaywrightTests.UnitTest1.Test1"
```

Take a screenshot via the Playwright CLI (useful for quick browser checks):
```sh
cd /xyz/backend && playwright screenshot https://example.com screenshot.png
```

The `.NET` `playwright` CLI must be run from `/xyz/backend` (where `first-try.sln` lives) — it won't find the project from `/xyz`.

## Playwright MCP

The Playwright MCP (`@playwright/mcp`) is installed and configured, but **disabled by default** so token consumption can be measured without it.

**Without MCP** — use the .NET `playwright` CLI for browser tasks:
```sh
cd /xyz/backend && playwright screenshot https://example.com screenshot.png
```

**With MCP** — enable it in `.claude/settings.json` before the session, then instruct Claude:
> "Use the Playwright MCP to open ... and take a screenshot."

Do **not** attempt to use MCP tools if they are not available (ToolSearch returns no results for Playwright tools). Fall back to the CLI immediately.

## Architecture Notes

- Tests in `PlaywrightTests` inherit from Playwright's xUnit base classes (via `Microsoft.Playwright.Xunit`), which handles browser lifecycle automatically.
- Playwright's global CLI tool (`Microsoft.Playwright.CLI`) is installed in the container and available as `playwright` on the PATH (`/usr/local/bin`).
- Playwright MCP (`@playwright/mcp`) is installed globally with npm, allowing AI assistants to control Playwright through the Model Context Protocol.
- The Dev Container's `docker-compose.yml` mounts the parent directory (`../`) as `/xyz`, so all sibling projects under `playwright/` are accessible inside the container.
