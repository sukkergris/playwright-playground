namespace PlaywrightTests.Training;

using Microsoft.Playwright.Xunit;

// EXERCISE 1: Basic codegen — record navigation and assert
//
// GOAL: Use codegen to record a visit to example.com, then paste the output here.
//
// STEP 1 — Start the recorder (generates C#):
//   playwright codegen --target csharp https://example.com
//
// STEP 2 — In the browser that opens, click the "More information..." link.
//
// STEP 3 — Copy the generated code from the Inspector window into the test below.
//
// STEP 4 — Run the test:
//   dotnet test --filter "FullyQualifiedName=PlaywrightTests.Training.Exercise1_BasicNavigation.RecordedNavigation"
//
// WHAT TO NOTICE:
//   - Codegen uses Page.GetByRole / Page.GetByText — prefer these over CSS selectors.
//   - The first line of generated code is always a GotoAsync. Compare with UnitTest1.cs.
//   - Codegen does NOT add assertions — you have to add those yourself (see step below).
//
// STEP 5 — After pasting, add one assertion:
//   Assert.Equal("https://www.iana.org/domains/reserved", Page.Url);

public class Exercise1_BasicNavigation : PageTest
{
    [Fact]
    public async Task RecordedNavigation()
    {
        // TODO: Paste codegen output here.
        // It should look something like:
        //
        //   await Page.GotoAsync("https://example.com/");
        //   await Page.GetByRole(AriaRole.Link, new() { Name = "More information..." }).ClickAsync();
        //
        // Then add your own assertion below.

        await Task.CompletedTask; // Remove this line once you paste real code.
    }
}
