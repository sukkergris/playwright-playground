namespace PlaywrightTests;

using Microsoft.Playwright.Xunit;

public class UnitTest1 : PageTest
{
    [Fact]
    public async Task Test1()
    {
        await Page.GotoAsync("https://korttilkort.dk");

        var title = await Page.TitleAsync();
        Assert.False(string.IsNullOrWhiteSpace(title));
        Assert.Contains("korttilkort.dk", Page.Url);
        
    }
}
