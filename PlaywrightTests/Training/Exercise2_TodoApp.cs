namespace PlaywrightTests.Training;

using Microsoft.Playwright.Xunit;

// EXERCISE 2: Record a full user flow — TodoMVC app
//
// GOAL: Record creating, completing, and deleting a todo item.
//       Then refine the generated selectors and add assertions.
//
// STEP 1 — Start the recorder:
//   playwright codegen --target csharp https://demo.playwright.dev/todomvc
//
// STEP 2 — In the browser, perform this exact flow:
//   a) Type "Buy milk" in the input field and press Enter.
//   b) Type "Write tests" and press Enter.
//   c) Click the checkbox next to "Buy milk" to complete it.
//   d) Click the "Completed" filter link at the bottom.
//   e) Hover over "Buy milk" and click the × button to delete it.
//
// STEP 3 — Paste the generated code into RecordedTodoFlow below.
//
// STEP 4 — Add these three assertions after the generated code:
//   a) The item count shows "1 item left"
//      await Expect(Page.GetByText("1 item left")).ToBeVisibleAsync();
//   b) "Write tests" is still in the Active list
//   c) "Buy milk" no longer appears
//
// STEP 5 — Run:
//   dotnet test --filter "FullyQualifiedName=PlaywrightTests.Training.Exercise2_TodoApp.RecordedTodoFlow"
//
// WHAT TO NOTICE:
//   - Codegen captures keyboard events (e.g. Key.Enter) as PressAsync calls.
//   - Hover-triggered elements (the × button) are captured automatically.
//   - Generated selectors sometimes use nth() — learn when to replace with GetByText.

public class Exercise2_TodoApp : PageTest
{
    [Fact]
    public async Task RecordedTodoFlow()
    {
        // TODO: Paste codegen output here, then add assertions below it.

        await Task.CompletedTask;
    }

    // BONUS: Write this test WITHOUT codegen — use only the Playwright docs.
    // Same flow, but use Page.Locator(".todo-list li").Filter(new() { HasText = "Buy milk" })
    // to target the specific item rather than the nth index codegen likely used.
    [Fact(Skip = "Bonus exercise — remove Skip when you attempt it")]
    public async Task RefactoredTodoFlow()
    {
        await Page.GotoAsync("https://demo.playwright.dev/todomvc");

        // TODO: Re-implement the same flow using semantic locators (no nth(), no CSS).
        // Hint: Page.GetByPlaceholder, Page.GetByLabel, Locator.Filter, GetByRole

        await Task.CompletedTask;
    }
}
