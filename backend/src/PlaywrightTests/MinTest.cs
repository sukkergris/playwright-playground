using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

using var playwright = await Playwright.CreateAsync();
await using var browser = await playwright.Chromium.LaunchAsync(new()
{
    Headless = false,
});
var context = await browser.NewContextAsync();

var page = await context.NewPageAsync();
await page.GotoAsync("http://localhost:5173/");
await page.Locator("img").First.ClickAsync();
await page.GetByRole(AriaRole.Button, new() { Name = "Count is" }).ClickAsync();
await page.GetByRole(AriaRole.Button, new() { Name = "Count is" }).DblClickAsync();
await page.GetByRole(AriaRole.Button, new() { Name = "Count is" }).DblClickAsync();
