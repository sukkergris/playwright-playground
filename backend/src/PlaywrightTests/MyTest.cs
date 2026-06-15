using Microsoft.Playwright;
using Microsoft.Playwright.Xunit;

namespace PlaywrightTests;

public class MyTest : PageTest
{
    [Fact]
    public async Task HomeLinkNavigates()
    {
        await Page.GotoAsync("http://localhost:5173/");
        await Page.GetByRole(AriaRole.Link, new() { Name = "Home" }).ClickAsync();
    }
}
