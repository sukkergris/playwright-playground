using Microsoft.Playwright;
using Microsoft.Playwright.Xunit;
using System.Text.Json;

namespace PlaywrightTests;

public class HabibiSearchFormTest : PageTest
{
    [Fact]
    public async Task FillAndSubmitSearchForm()
    {
        string? requestBody = null;
        await Page.RouteAsync("**/api/transfer-request", async route =>
        {
            requestBody = route.Request.PostData;
            await route.FulfillAsync(new() { Status = 202, ContentType = "application/json", Body = "{\"ok\":true}" });
        });

        await Page.GotoAsync("http://localhost:5173/");

        var arrivalInput = Page.GetByLabel("Arrival Airport");
        await arrivalInput.FillAsync("Cai");
        await Page.GetByRole(AriaRole.Option, new() { Name = "Cairo" }).First.ClickAsync();

        var destinationInput = Page.GetByLabel("Destination");
        await destinationInput.FillAsync("Steigenberger");
        await Page.GetByRole(AriaRole.Option, new() { Name = "Steigenberger ALDAU Beach Hotel" }).First.ClickAsync();

        var roundTripButton = Page.GetByRole(AriaRole.Button, new() { Name = "Round Trip" });
        await roundTripButton.ClickAsync();

        var oneWayButton = Page.GetByRole(AriaRole.Button, new() { Name = "One Way" });
        await oneWayButton.ClickAsync();

        var adultsSelect = Page.GetByRole(AriaRole.Combobox, new() { Name = "Number of adults" });
        await adultsSelect.SelectOptionAsync(new[] { "3" });

        var arrivalValue = await arrivalInput.InputValueAsync();
        var destinationValue = await destinationInput.InputValueAsync();
        var adultsValue = await adultsSelect.InputValueAsync();

        Assert.Contains("CAI", arrivalValue);
        Assert.Contains("Steigenberger ALDAU Beach Hotel", destinationValue);
        Assert.Equal("3", adultsValue);

        await Page.GetByRole(AriaRole.Button, new() { Name = "Flight arrival" }).ClickAsync();
        await Page.GetByRole(AriaRole.Button, new() { Name = "19", Exact = true }).First.ClickAsync();

        var searchButton = Page.GetByRole(AriaRole.Button, new() { Name = "Search" });
        var requestTask = Page.WaitForRequestAsync(r => r.Method == "POST" && r.Url.Contains("/api/transfer-request"));
        await searchButton.ClickAsync();
        await requestTask;
        await Page.WaitForURLAsync("**/#submitted");

        Assert.Contains("#submitted", Page.Url);
        await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Request sent successfully" })).ToBeVisibleAsync();
        Assert.False(string.IsNullOrWhiteSpace(requestBody));

        using var payload = JsonDocument.Parse(requestBody!);
        var root = payload.RootElement;
        Assert.Equal("Cairo – CAI", root.GetProperty("arrival").GetString());
        Assert.Contains("Steigenberger ALDAU Beach Hotel", root.GetProperty("destination").GetString());
        Assert.Equal("Jun 19 · 12:00", root.GetProperty("flightArrival").GetString());
        Assert.False(root.GetProperty("roundTrip").GetBoolean());
        Assert.Equal(3, root.GetProperty("adults").GetInt32());
        Assert.Equal("en", root.GetProperty("language").GetString());
    }

    [Fact]
    public async Task FillAndSubmitSearchFormInArabic()
    {
        string? requestBody = null;
        await Page.RouteAsync("**/api/transfer-request", async route =>
        {
            requestBody = route.Request.PostData;
            await route.FulfillAsync(new() { Status = 202, ContentType = "application/json", Body = "{\"ok\":true}" });
        });

        await Page.GotoAsync("http://localhost:5173/");

        await Page.GetByRole(AriaRole.Button, new() { Name = "AR", Exact = true }).ClickAsync();

        var pageDirection = await Page.GetAttributeAsync("html", "dir");
        Assert.Equal("rtl", pageDirection);

        var arrivalInput = Page.GetByLabel("مطار الوصول");
        await arrivalInput.FillAsync("Cai");
        await Page.GetByRole(AriaRole.Option, new() { Name = "Cairo" }).First.ClickAsync();

        var destinationInput = Page.GetByLabel("الوجهة");
        await destinationInput.FillAsync("Steigenberger");
        await Page.GetByRole(AriaRole.Option, new() { Name = "Steigenberger ALDAU Beach Hotel" }).First.ClickAsync();

        var roundTripButton = Page.GetByRole(AriaRole.Button, new() { Name = "ذهاب وإياب" });
        await roundTripButton.ClickAsync();

        var oneWayButton = Page.GetByRole(AriaRole.Button, new() { Name = "ذهاب فقط" });
        await oneWayButton.ClickAsync();

        var adultsSelect = Page.GetByRole(AriaRole.Combobox, new() { Name = "عدد البالغين" });
        await adultsSelect.SelectOptionAsync(new[] { "4" });

        var arrivalValue = await arrivalInput.InputValueAsync();
        var destinationValue = await destinationInput.InputValueAsync();
        var adultsValue = await adultsSelect.InputValueAsync();

        Assert.Contains("CAI", arrivalValue);
        Assert.Contains("Steigenberger ALDAU Beach Hotel", destinationValue);
        Assert.Equal("4", adultsValue);

        await Page.GetByRole(AriaRole.Button, new() { Name = "وصول الرحلة" }).ClickAsync();
        await Page.GetByRole(AriaRole.Button, new() { Name = "19", Exact = true }).First.ClickAsync();

        var searchButton = Page.GetByRole(AriaRole.Button, new() { Name = "بحث" });
        var requestTask = Page.WaitForRequestAsync(r => r.Method == "POST" && r.Url.Contains("/api/transfer-request"));
        await searchButton.ClickAsync();
        await requestTask;
        await Page.WaitForURLAsync("**/#submitted");

        Assert.Contains("#submitted", Page.Url);
        await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "تم إرسال الطلب بنجاح" })).ToBeVisibleAsync();
        Assert.False(string.IsNullOrWhiteSpace(requestBody));

        using var payload = JsonDocument.Parse(requestBody!);
        var root = payload.RootElement;
        Assert.Equal("Cairo – CAI", root.GetProperty("arrival").GetString());
        Assert.Contains("Steigenberger ALDAU Beach Hotel", root.GetProperty("destination").GetString());
        Assert.Equal("Jun 19 · 12:00", root.GetProperty("flightArrival").GetString());
        Assert.False(root.GetProperty("roundTrip").GetBoolean());
        Assert.Equal(4, root.GetProperty("adults").GetInt32());
        Assert.Equal("ar", root.GetProperty("language").GetString());
    }
}
