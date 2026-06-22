# Playwright token usage
* playwright-cli
* CLI vs MCP
- Demo
- Token efficiency
- Capabilities
- Summary
* How to chose


# Token usage

## Prepare

Update Claude.md

```Claude.md
This is a **.NET project**. The primary language is C#. Prefer .NET tooling (`dotnet`, the `playwright` .NET CLI) over Node.js alternatives unless explicitly instructed otherwise.

```



## CLI
```claude
/mcp
```
```claude
open playwright.dev, search for locators and check that the doc is available for each language. Take screenshots of each of the language docs, using the .NET playwright CLI.
```
View token usage
```claude
/context
```
Disable playwright


## MCP
```claude
open playwright.dev, search for locators and check that the doc is available for each language. Take screenshots of each of the language docs, use the Playwright MCP to screenshot.
```
View token usage
```claude
/conte

## Optimize by being specific

The biggest token costs come from tool calls Claude needs to discover things it could have been told upfront. Here are tight prompts for each mode:

1. CLI (no MCP)

Take a screenshot of the Playwright locators doc for each language using the .NET playwright CLI. The four URLs are:
- https://playwright.dev/docs/locators (nodejs)
- https://playwright.dev/python/docs/locators (python)
- https://playwright.dev/java/docs/locators (java)
- https://playwright.dev/dotnet/docs/locators (dotnet)

Save to docs/presentation/screenshots/locators-{language}.png. Run all four commands in parallel.
Why it's cheap: No WebFetch to discover URLs, no exploration, parallel Bash calls = 4 tool calls total.

2. MCP

Use the Playwright MCP to screenshot the locators doc for each language on playwright.dev. Navigate directly to these URLs — do not search:
- https://playwright.dev/docs/locators → docs/presentation/screenshots/locators-nodejs.png
- https://playwright.dev/python/docs/locators → docs/presentation/screenshots/locators-python.png
- https://playwright.dev/java/docs/locators → docs/presentation/screenshots/locators-java.png
- https://playwright.dev/dotnet/docs/locators → docs/presentation/screenshots/locators-dotnet.png
Why it's cheap: Pre-supplied URLs skip any goto + search interaction. One navigate + one screenshot per language = 8 MCP tool calls total.

Key principle
Both prompts pre-supply the URLs. The expensive part of your original prompt was the implicit instruction to search for locators — that triggered a WebFetch to discover the language URLs before any screenshots could happen.