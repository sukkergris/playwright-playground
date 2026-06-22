---
marp: true
theme: default
paginate: true
---

# Playwright & Claude Code
## CLI vs MCP — Token Usage

---

## Agenda

- What is Playwright MCP?
- Demo: CLI vs MCP
- Token efficiency
- Optimize with specific prompts
- How to choose

---

## Setup — CLAUDE.md

Tell Claude what kind of project this is:

```
This is a .NET project. The primary language is C#.
Prefer .NET tooling (dotnet, the playwright .NET CLI)
over Node.js alternatives unless explicitly instructed otherwise.
```

> Without this, Claude may reach for Node.js tooling even in a .NET project.

---

## Measuring Token Usage

Use `/context` to inspect usage mid-session:

| Category | Tokens | % |
|---|---|---|
| System prompt | 6.7k | 3.4% |
| System tools | 15.2k | 7.6% |
| Memory files | 0.8k | 0.4% |
| Skills | 1.3k | 0.7% |
| **Messages** | **~8** | **<0.1%** |
| Autocompact buffer | 33.0k | 16.5% |

> Use `/clear` before each demo to reset messages and the autocompact buffer.
> This drops context from ~12% to ~2–3%, giving a clean baseline.

---

## Demo — CLI (no MCP)

Disable the Playwright MCP, then run:

```
/mcp
```

```
Open playwright.dev, search for locators and check that the doc
is available for each language. Take screenshots of each of the
language docs, using the .NET playwright CLI.
Save to /xyz/docs/presentation/screenshots/cli/.
```

Check token usage:
```
/context
```

---

## Demo — MCP

Enable the Playwright MCP, then run:

```
Open playwright.dev, search for locators and check that the doc
is available for each language. Take screenshots of each of the
language docs, use the Playwright MCP to screenshot.
Save to /xyz/docs/presentation/screenshots/mcp/.
```

Check token usage:
```
/context
```

---

## CLI vs MCP — What Changes?

`/context` before and after the CLI demo:

| Category | CLI | MCP | Δ |
|---|---|---|---|
| System prompt | 6.7k | 6.7k | — |
| System tools | 15.2k | 15.2k | — |
| Memory files | 821 | 821 | — |
| Skills | 1.3k | 1.3k | — |
| **Messages** | **3.9K** | **13.3k** | **+9.4k** |
| Autocompact buffer | 33.0k | 33.0k | — |

> Everything except **Messages** is fixed overhead — loaded before you type anything.
> The ~3.8k increase is the conversation itself: your prompt + tool call inputs and outputs.

---

## Results

| | CLI | MCP |
|---|---|---|
| Screenshots | ✅ | ✅ |
| Tool calls | fewer | more |
| Token cost | lower | higher |
| Capabilities | limited | rich |

---

## Optimize — Be Specific

The biggest token cost comes from **discovery**.

If Claude has to find URLs, it calls WebFetch first.
Hand them over upfront and skip that entirely.

---

## Optimized CLI Prompt

```
Take a screenshot of the Playwright locators doc for each language
using the .NET playwright CLI from /xyz/backend:

- https://playwright.dev/docs/locators          → /xyz/docs/presentation/screenshots/cli/optimized/locators-nodejs.png
- https://playwright.dev/python/docs/locators   → /xyz/docs/presentation/screenshots/cli/optimized/locators-python.png
- https://playwright.dev/java/docs/locators     → /xyz/docs/presentation/screenshots/cli/optimized/locators-java.png
- https://playwright.dev/dotnet/docs/locators   → /xyz/docs/presentation/screenshots/cli/optimized/locators-dotnet.png

Run all four in parallel.
```

**~1 tool call** — one parallel Bash invocation, no discovery needed.

---

## Optimized MCP Prompt

```
Use the Playwright MCP to screenshot the locators doc for each
language. Navigate directly — do not search:

- https://playwright.dev/docs/locators          → /xyz/docs/presentation/screenshots/mcp/optimized/locators-nodejs.png
- https://playwright.dev/python/docs/locators   → /xyz/docs/presentation/screenshots/mcp/optimized/locators-python.png
- https://playwright.dev/java/docs/locators     → /xyz/docs/presentation/screenshots/mcp/optimized/locators-java.png
- https://playwright.dev/dotnet/docs/locators   → /xyz/docs/presentation/screenshots/mcp/optimized/locators-dotnet.png
```

**~8 MCP tool calls** — navigate + screenshot × 4, no search step.

---

## Key Principle

> Pre-supply what Claude would otherwise have to discover.

Every tool call costs tokens. The vaguer the prompt,
the more Claude explores before it acts.

---

## How to Choose

| | CLI | MCP |
|---|---|---|
| Simple screenshots | ✅ | ✅ |
| Click / interact | ❌ | ✅ |
| Fill forms | ❌ | ✅ |
| Token cost | lower | higher |
| .NET native | ✅ | — |

**Default to CLI. Reach for MCP when you need interactivity.**
