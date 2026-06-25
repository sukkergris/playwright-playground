#!/usr/bin/env bash
set -Eeuo pipefail

# Copy all SSH files from template to ~/.ssh and set permissions
if [ -d /container-user/.sshtemplate ]; then
  cp -rf /container-user/.sshtemplate/. ~/.ssh/
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/* 2>/dev/null || true
  echo "SSH files copied from .sshtemplate."
fi
