#!/usr/bin/env bash
set -euo pipefail

if ! command -v playwright >/dev/null 2>&1; then
	echo "Playwright CLI not found on PATH"
	exit 1
fi

echo "Playwright CLI found at: $(command -v playwright)"

# Validate the installation
.devcontainer/validate-installation.sh
