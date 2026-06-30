using Microsoft.Playwright;
using System.Text.Json;

namespace PlaywrightTests;

public class HabibiSearchFormTestCLI : IAsyncLifetime
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

    [Fact]
    public async Task CLI_FillAndSubmitSearchForm_EN()
    {
        await using var context = await _browser.NewContextAsync();
        var page = await context.NewPageAsync();

        string? requestBody = null;
        await page.RouteAsync("**/api/transfer-request", async route =>
        {
            requestBody = route.Request.PostData;
            await route.FulfillAsync(new() { Status = 202, ContentType = "application/json", Body = "{\"ok\":true}" });
        });

        await page.GotoAsync("http://localhost:5173/");

        var arrivalInput = page.GetByLabel("Arrival Airport");
        await arrivalInput.FillAsync("Cai");
        await page.GetByRole(AriaRole.Option, new() { Name = "Cairo" }).First.ClickAsync();

        var destinationInput = page.GetByLabel("Destination");
        await destinationInput.FillAsync("Steigenberger");
        await page.GetByRole(AriaRole.Option, new() { Name = "Steigenberger ALDAU Beach Hotel" }).First.ClickAsync();

        var roundTripButton = page.GetByRole(AriaRole.Button, new() { Name = "Round Trip" });
        await roundTripButton.ClickAsync();

        var oneWayButton = page.GetByRole(AriaRole.Button, new() { Name = "One Way" });
        await oneWayButton.ClickAsync();

        var adultsSelect = page.GetByRole(AriaRole.Combobox, new() { Name = "Number of adults" });
        await adultsSelect.SelectOptionAsync(new[] { "3" });

        Assert.Contains("CAI", await arrivalInput.InputValueAsync());
        Assert.Contains("Steigenberger ALDAU Beach Hotel", await destinationInput.InputValueAsync());
        Assert.Equal("3", await adultsSelect.InputValueAsync());

        var requestTask = page.WaitForRequestAsync(r => r.Method == "POST" && r.Url.Contains("/api/transfer-request"));
        await page.GetByRole(AriaRole.Button, new() { Name = "Search" }).ClickAsync();
        await requestTask;
        await page.WaitForURLAsync("**/#submitted");

        Assert.Contains("#submitted", page.Url);
        await Assertions.Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Request sent successfully" })).ToBeVisibleAsync();
        Assert.False(string.IsNullOrWhiteSpace(requestBody));

        using var payload = JsonDocument.Parse(requestBody!);
        var root = payload.RootElement;
        Assert.Equal("Cairo – CAI", root.GetProperty("arrival").GetString());
        Assert.Contains("Steigenberger ALDAU Beach Hotel", root.GetProperty("destination").GetString());
        Assert.False(root.GetProperty("roundTrip").GetBoolean());
        Assert.Equal(3, root.GetProperty("adults").GetInt32());
        Assert.Equal("en", root.GetProperty("language").GetString());
    }

    [Fact]
    public async Task CLI_FillAndSubmitSearchForm_AR()
    {
        await using var context = await _browser.NewContextAsync();
        var page = await context.NewPageAsync();

        string? requestBody = null;
        await page.RouteAsync("**/api/transfer-request", async route =>
        {
            requestBody = route.Request.PostData;
            await route.FulfillAsync(new() { Status = 202, ContentType = "application/json", Body = "{\"ok\":true}" });
        });

        await page.GotoAsync("http://localhost:5173/");

        await page.GetByRole(AriaRole.Button, new() { Name = "AR", Exact = true }).ClickAsync();

        var pageDirection = await page.GetAttributeAsync("html", "dir");
        Assert.Equal("rtl", pageDirection);

        var arrivalInput = page.GetByLabel("مطار الوصول");
        await arrivalInput.FillAsync("Cai");
        await page.GetByRole(AriaRole.Option, new() { Name = "Cairo" }).First.ClickAsync();

        var destinationInput = page.GetByLabel("الوجهة");
        await destinationInput.FillAsync("Steigenberger");
        await page.GetByRole(AriaRole.Option, new() { Name = "Steigenberger ALDAU Beach Hotel" }).First.ClickAsync();

        var roundTripButton = page.GetByRole(AriaRole.Button, new() { Name = "ذهاب وإياب" });
        await roundTripButton.ClickAsync();

        var oneWayButton = page.GetByRole(AriaRole.Button, new() { Name = "ذهاب فقط" });
        await oneWayButton.ClickAsync();

        var adultsSelect = page.GetByRole(AriaRole.Combobox, new() { Name = "عدد البالغين" });
        await adultsSelect.SelectOptionAsync(new[] { "4" });

        Assert.Contains("CAI", await arrivalInput.InputValueAsync());
        Assert.Contains("Steigenberger ALDAU Beach Hotel", await destinationInput.InputValueAsync());
        Assert.Equal("4", await adultsSelect.InputValueAsync());

        var requestTask = page.WaitForRequestAsync(r => r.Method == "POST" && r.Url.Contains("/api/transfer-request"));
        await page.GetByRole(AriaRole.Button, new() { Name = "بحث" }).ClickAsync();
        await requestTask;
        await page.WaitForURLAsync("**/#submitted");

        Assert.Contains("#submitted", page.Url);
        await Assertions.Expect(page.GetByRole(AriaRole.Heading, new() { Name = "تم إرسال الطلب بنجاح" })).ToBeVisibleAsync();
        Assert.False(string.IsNullOrWhiteSpace(requestBody));

        using var payload = JsonDocument.Parse(requestBody!);
        var root = payload.RootElement;
        Assert.Equal("Cairo – CAI", root.GetProperty("arrival").GetString());
        Assert.Contains("Steigenberger ALDAU Beach Hotel", root.GetProperty("destination").GetString());
        Assert.False(root.GetProperty("roundTrip").GetBoolean());
        Assert.Equal(4, root.GetProperty("adults").GetInt32());
        Assert.Equal("ar", root.GetProperty("language").GetString());
    }
}
