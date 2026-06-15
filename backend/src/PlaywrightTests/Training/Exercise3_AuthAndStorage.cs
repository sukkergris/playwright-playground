namespace PlaywrightTests.Training;

using Microsoft.Playwright.Xunit;

// EXERCISE 3: Advanced codegen — save/load auth state + multi-step flow
//
// GOAL: Learn to use --save-storage to persist cookies/localStorage between sessions.
//       This is the foundation for testing authenticated flows efficiently.
//
// BACKGROUND:
//   Running codegen with --save-storage records auth state to a JSON file.
//   Subsequent codegen runs (or tests) can load it with --load-storage,
//   skipping the login form entirely.
//
// PART A — Record and save state
// --------------------------------
// STEP 1 — We'll use GitHub as the target (no real login needed — we just save the
//           unauthenticated browsing state to learn the pattern):
//   playwright codegen --target csharp --save-storage=auth.json https://github.com
//
// STEP 2 — Navigate to https://github.com/microsoft/playwright in the browser.
//           Star the repo if you like (requires login — observe how codegen handles it).
//           Close the browser.
//
// STEP 3 — Open auth.json. Notice it contains cookies and localStorage entries.
//
// PART B — Load state in a new session
// --------------------------------------
// STEP 4 — Start a new codegen session that loads the saved state:
//   playwright codegen --target csharp --load-storage=auth.json https://github.com
//
// STEP 5 — Observe that cookies from the previous session are already present.
//
// PART C — Use state in a test
// --------------------------------------
// STEP 6 — Implement LoadStorageExample below. It uses BrowserContext.AddCookiesAsync
//           to inject saved cookies before navigating, simulating a logged-in user.
//
// WHAT TO NOTICE:
//   - --save-storage / --load-storage is the codegen equivalent of storageState in tests.
//   - In real projects, you run a one-time "setup" project that logs in and saves state.
//     See: https://playwright.dev/dotnet/docs/auth
//   - Codegen + storage is most valuable for recording flows that require auth.

public class Exercise3_AuthAndStorage : PageTest
{
    // STEP 6 implementation skeleton:
    [Fact(Skip = "Complete after finishing Parts A-B in the terminal")]
    public async Task LoadStorageExample()
    {
        // Load cookies saved by --save-storage
        // (In xUnit/Playwright the context is available via Context property)
        await Context.AddCookiesAsync(
            System.Text.Json.JsonSerializer.Deserialize<IEnumerable<Microsoft.Playwright.Cookie>>(
                await System.IO.File.ReadAllTextAsync("auth.json")
                    .ContinueWith(t =>
                        System.Text.Json.JsonDocument.Parse(t.Result)
                            .RootElement.GetProperty("cookies").GetRawText()))!);

        await Page.GotoAsync("https://github.com/microsoft/playwright");

        // TODO: Add an assertion that proves the page loaded correctly.
        // Hint: await Expect(Page).ToHaveTitleAsync(new Regex("playwright"));
    }

    // CHALLENGE: Use the storageState pattern (the idiomatic .NET Playwright approach)
    // instead of manually injecting cookies. Research Iplaywright.BrowserType.LaunchAsync
    // and BrowserNewContextOptions.StorageStatePath.
    [Fact(Skip = "Challenge — research storageState pattern first")]
    public async Task StorageStatePattern()
    {
        // This requires a custom IPlaywright/IBrowser setup outside PageTest base class.
        // Hint: override CreateBrowserContextOptions() in a base class, or use a fixture.
        await Task.CompletedTask;
    }
}
