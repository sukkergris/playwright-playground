#!/bin/bash

echo "=== Validating Installation ==="
echo

echo "1. Checking .NET tools:"
dotnet tool list --global
echo

echo "2. Checking Playwright version:"
playwright --version
echo

echo "3. Checking OS release:"
cat /etc/os-release | grep -E "PRETTY_NAME|VERSION_ID"
echo

echo "4. Checking Chromium installation:"
if playwright install chromium --dry-run 2>&1 | grep -q "is already installed"; then
    echo "✓ Chromium is installed"
else
    echo "✗ Chromium may not be installed"
fi
echo

echo "5. Checking Chromium binary:"
if ls ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome &>/dev/null; then
    echo "✓ Chromium binary found"
    ls -lh ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome
else
    echo "✗ Chromium binary not found"
fi