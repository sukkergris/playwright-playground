#!/usr/bin/env bash

set -euo pipefail

COMMAND="${1:-}"

show_prefix() {
  npm config get prefix
}

show_root() {
  npm root -g
}

show_bin() {
  dirname "$(which node)"
}

test_cli() {
  local tool="${1:-eslint}"

  if command -v "$tool" >/dev/null 2>&1; then
    echo "✔ CLI '$tool' found at: $(command -v "$tool")"
    "$tool" --version || true
  else
    echo "✘ CLI '$tool' not found in PATH"
    exit 1
  fi
}

test_path() {
  local nvm_bin
  nvm_bin="$(dirname "$(which node)")"

  echo "Node bin: $nvm_bin"
  echo "PATH: $PATH"
  echo

  if echo "$PATH" | grep -q "$nvm_bin"; then
    echo "✔ nvm bin is in PATH"
  else
    echo "✘ nvm bin is NOT in PATH"
    exit 1
  fi
}

test_nvm() {
  echo "nvm version: $(nvm --version)"
  echo "node version: $(node --version)"
  echo "npm version: $(npm --version)"
}

env_check() {
  show_prefix
  show_root
  show_bin
  test_path
  test_nvm
}

case "$COMMAND" in
  prefix) show_prefix ;;
  root) show_root ;;
  bin) show_bin ;;
  test-cli) test_cli "${2:-}" ;;
  test-path) test_path ;;
  test-nvm) test_nvm ;;
  env-check) env_check ;;
  *)
    echo "Usage: $0 {prefix|root|bin|test-cli <tool>|test-path|test-nvm|env-check}"
    exit 1
    ;;
esac
