using Microsoft.Playwright;

namespace PlaywrightTests;

// Contact pages verified via Playwright MCP (2026-06-23):
//   All four offices (København, Aarhus, Aalborg, Viby) expose a mailto:contact@knowit.dk link.
public class KnowitAgentic : IAsyncLifetime
{
    private IPlaywright _playwright = null!;
    private IBrowser _browser = null!;

    public async Task InitializeAsync()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(new() { Headless = true });
    }

    public async Task DisposeAsync()
    {
        await _browser.DisposeAsync();
        _playwright.Dispose();
    }

    [Theory]
    [InlineData("København", "https://www.knowit.dk/kontakt/kobenhavn/")]
    [InlineData("Aarhus",    "https://www.knowit.dk/kontakt/aarhus/")]
    [InlineData("Aalborg",   "https://www.knowit.dk/kontakt/aalborg/")]
    [InlineData("Viby",      "https://www.knowit.dk/kontakt/viby/")]
    public async Task ContactPage_HasCorrectEmailLink(string office, string url)
    {
        await using var context = await _browser.NewContextAsync();
        var page = await context.NewPageAsync();

        await page.GotoAsync(url);

        var emailLink = page.GetByRole(AriaRole.Link, new() { Name = "contact@knowit.dk" });

        await Assertions.Expect(emailLink).ToBeVisibleAsync();

        var href = await emailLink.GetAttributeAsync("href");
        Assert.True(href == "mailto:contact@knowit.dk",
            $"{office}: expected mailto:contact@knowit.dk but got '{href}'");
    }
}
