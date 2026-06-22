---
marp: true
theme: default
paginate: true
---

# Playwright .NET Test Prompt
## CLI vs MCP — Recreate a Test File

---

## Agenda

- When to use CLI prompts
- When to use MCP prompts
- Average developer wording
- Optimized versions

---

## Goal

Regenerate `backend/src/PlaywrightTests/HabibiSearchFormTest.cs` after deleting it.

The recreated file should include two tests (English and Arabic) that:
- mock `POST /api/transfer-request`
- submit the form on `http://localhost:5173/`
- assert payload fields
- verify redirect to `#submitted`

---

## Prompt — CLI Style

Use this when you want code-first, no browser tools.

```text
Create backend/src/PlaywrightTests/HabibiSearchFormTestCLI.cs with tests for the transfer form submit.
I need English and Arabic tests that mock /api/transfer-request, fill the form, submit, verify #submitted redirect and the success heading.
Run the tests when done.
```

---

## Prompt — MCP Style

Use this when you want to inspect the live form first.

```text
Create backend/src/PlaywrightTests/HabibiSearchFormTestMCP.cs. Test the transfer form submit with English and Arabic tests that mock /api/transfer-request,
 fill the form, submit, verify #submitted redirect and the success heading.
Run the tests when done.
```

---

## Optimized CLI Prompt

```text
Using dotnet and repo code patterns only, create backend/src/PlaywrightTests/HabibiSearchFormTestOptimizedCLI.cs
 with two PageTest tests (EN + AR) for the transfer form. Mock /api/transfer-request, assert payload values,
 assert redirect to #submitted, assert localized success heading, run filtered dotnet test and report results.
```

---

## Optimized MCP Prompt

```text
Use Playwright MCP to inspect the form at http://localhost:5173/ if needed, then create backend/src/PlaywrightTests/HabibiSearchFormTestOptimizedMCP.cs
 with two PageTest tests (EN + AR) for the transfer form. Mock /api/transfer-request,
  assert payload values, assert redirect to #submitted, assert localized success heading, run filtered dotnet test and report results.
```

> **Note:** Both prompts deliver identical outcomes, but they steer **different tool choices**:
> - **CLI prompt**: Forces code-only approach (no browser). Claude infers from codebase.
> - **MCP prompt**: Explicitly permits browser inspection. Claude will open the app if needed.
> 
> **Why it matters:** Without explicit constraints, Claude defaults to MCP (higher token cost). Use CLI prompts to control costs; use MCP when you actually need live UI discovery.

---

## Key Principle

Be explicit about outcome, not implementation details.

Good prompts say what must be true when done:
- file created
- tests cover EN/AR flow
- mock + payload assertions
- redirect assertion
- test command executed

---

## How to Choose

| | CLI Prompt | MCP Prompt |
|---|---|---|
| Code generation | ✅ | ✅ |
| Needs browser discovery | limited | ✅ |
| Token cost | lower | higher |
| Best for this task | ✅ | optional |

**Default to CLI prompt. Use MCP prompt when locator discovery or UI verification is needed.**
