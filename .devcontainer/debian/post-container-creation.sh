#!/usr/bin/env bash
set -euo pipefail

playwright install --with-deps chromium

# Validate the installation
.devcontainer/validate-installation.sh
