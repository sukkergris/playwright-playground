#!/bin/bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "$script_dir/.." && pwd)"
playwright_project="$repo_root/backend/src/PlaywrightTests/PlaywrightTests.csproj"

echo "=== Validating Installation ==="
echo

echo "1. Checking .NET tools:"
dotnet tool list --global
echo

echo "2. Checking Playwright CLI path:"
if command -v playwright >/dev/null 2>&1; then
    command -v playwright
else
    echo "✗ Playwright CLI not found on PATH"
    exit 1
fi
echo

echo "3. Checking Playwright CLI version:"
playwright -p "$playwright_project" --version
echo

echo "4. Checking OS release:"
cat /etc/os-release | grep -E "PRETTY_NAME|VERSION_ID"
echo

echo "5. Checking Chromium binary cache:"
if ls ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome &>/dev/null; then
    echo "✓ Chromium binary found"
    ls -lh ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome
else
    echo "✗ Chromium binary not found in cache"
    exit 1
fi