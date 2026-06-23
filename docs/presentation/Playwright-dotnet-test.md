---
marp: true
theme: default
paginate: true
style: |
  section {
    font-family: system-ui, -apple-system, sans-serif;
    background: #F9FAFB;
    color: #111827;
    padding: 3.5rem 4rem;
  }
  h1, h2, h3 {
    font-family: ui-monospace, Menlo, monospace;
    letter-spacing: -0.02em;
    color: #111827;
  }
  h1 { font-size: 2.8rem; line-height: 1.1; }
  h2 { font-size: 2rem; line-height: 1.15; }
  .eyebrow {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2563EB;
    margin-bottom: 0.5rem;
  }
  .rule {
    width: 2.5rem;
    height: 2px;
    background: #2563EB;
    border: none;
    margin: 1.2rem 0;
  }
  table {
    border-collapse: collapse;
    font-size: 0.9rem;
    width: 100%;
  }
  th {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 2px solid #E5E7EB;
    padding: 0.5rem 0.75rem;
    text-align: left;
    color: #6B7280;
  }
  td {
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid #E5E7EB;
    color: #374151;
  }
  code {
    font-family: ui-monospace, monospace;
    font-size: 0.78rem;
    background: #F3F4F6;
    border-left: 3px solid #2563EB;
    display: block;
    padding: 0.875rem 1rem;
    border-radius: 0 3px 3px 0;
    white-space: pre-wrap;
    color: #374151;
    line-height: 1.65;
  }
  .tag-cli {
    background: #D1FAE5;
    color: #065F46;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
  }
  .tag-mcp {
    background: #DBEAFE;
    color: #1E40AF;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
  }
  section::after {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: #D1D5DB;
  }
---

<div class="eyebrow">Playwright · .NET · Claude Code</div>

# Write the prompt.<br>Get the test.

<hr class="rule">

How we use AI to write and run browser tests —
and how to keep the cost predictable.

---

<div class="eyebrow">What this is</div>

## One prompt.<br>A complete test file.

<hr class="rule">

We delete a test file, describe the outcome we want, and Claude recreates it — mocked API, form submission, redirect assertions, in both English and Arabic.

No manual test writing. No browser inspector. Just a prompt.

---

<div class="eyebrow">CLI approach</div>

## <span class="tag-cli">CLI</span> Code only

<hr class="rule">

Claude reads the codebase and writes the test. No browser opened.

```
Create HabibiSearchFormTestCLI.cs with EN + AR tests.
Mock /api/transfer-request, fill the form,
assert redirect to #submitted. Run when done.
```

---

<div class="eyebrow">MCP approach</div>

## <span class="tag-mcp">MCP</span> Browser + code

<hr class="rule">

Claude opens the live app, inspects the UI, then writes the test based on what it sees.

```
Use Playwright MCP to inspect the form at localhost:5173,
then create HabibiSearchFormTestMCP.cs with EN + AR tests.
Mock /api/transfer-request, assert redirect and
success heading. Run when done.
```

---

<div class="eyebrow">Why Arabic?</div>

## A missing translation<br>is obvious in Arabic.<br>Invisible in English.

<hr class="rule">

| UI language | Missing translation shows as | Visible? |
|---|---|---|
| Arabic | English text in an Arabic layout | ✓ yes |
| English | English text in an English layout | ✗ no |

When a translation key is broken, the app falls back to English. In an Arabic UI that stands out immediately. In an English UI it looks exactly right — and the bug ships.

---

<div class="eyebrow">Cost to run</div>

## Token consumption

<hr class="rule">

| | <span class="tag-cli">CLI</span> | <span class="tag-mcp">MCP</span> |
|---|---|---|
| Input tokens | | |
| Output tokens | | |
| **Total** | | |
| Time | | |

*Numbers recorded live during demo.*

---

<div class="eyebrow">The rule</div>

## Start with CLI.<br>Add MCP only when<br>you need to see the UI.

<hr class="rule">

**Use CLI when** the codebase already has the structure you need.

**Add MCP when** the UI is new, undocumented, or locators change between builds.

---

<div class="eyebrow">Outcome</div>

## What you get either way

<hr class="rule">

| | |
|---|---|
| Test file created | ✓ |
| English + Arabic coverage | ✓ |
| API mock + payload assertions | ✓ |
| Redirect assertion verified | ✓ |
| Tests run automatically | ✓ |

The only difference is how Claude gets there — and what it costs to ask.
