#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "$script_dir" && pwd)"
env_file="$repo_root/.devcontainer/debian/.env"

if [[ -f "$env_file" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "$env_file"
    set +a
fi

DISPLAY_NUM=99
VNC_PORT=5900
NOVNC_PORT=6080
HOST_NOVNC_PORT=${HOST_NOVNC_PORT:-6080}
NOVNC_WEB=/usr/share/novnc

# Start Xvfb hvis ikke kørende
if ! pgrep -x Xvfb > /dev/null; then
    echo "Starter Xvfb på display :${DISPLAY_NUM}..."
    Xvfb :${DISPLAY_NUM} -screen 0 1920x1080x24 &
    sleep 1
fi

# Start x11vnc hvis ikke kørende
if ! pgrep -x x11vnc > /dev/null; then
    echo "Starter x11vnc..."
    x11vnc -display :${DISPLAY_NUM} -nopw -listen localhost -xkb -forever -quiet &
    sleep 1
fi

# Start noVNC/websockify hvis ikke kørende
if ! pgrep -f websockify > /dev/null; then
    echo "Starter noVNC på port ${NOVNC_PORT}..."
    websockify --web ${NOVNC_WEB} ${NOVNC_PORT} localhost:${VNC_PORT} &>/dev/null &
    sleep 1
fi

echo ""
echo "  noVNC i containeren kører på port ${NOVNC_PORT}"
echo "  Åbn i host-browser: http://localhost:${HOST_NOVNC_PORT}/vnc.html"
echo ""

DISPLAY=:${DISPLAY_NUM} playwright -p /xyz/backend codegen --target=csharp "$@"
