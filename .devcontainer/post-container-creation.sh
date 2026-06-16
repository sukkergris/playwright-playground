#!/usr/bin/env bash
set -euo pipefail

if ! command -v playwright >/dev/null 2>&1; then
	echo "Playwright CLI not found on PATH"
	exit 1
fi

echo "Playwright CLI found at: $(command -v playwright)"

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

root_dir="$(cd -- "$script_dir/.." && pwd)"

playwright -p "$root_dir/backend/src/PlaywrightTests/PlaywrightTests.csproj" install --with-deps chromium

# Validate the installation
.devcontainer/validate-installation.sh
