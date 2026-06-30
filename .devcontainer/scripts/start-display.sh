#!/usr/bin/env bash
set -euo pipefail

DISPLAY_NUM=99
VNC_PORT=5900
NOVNC_PORT=6080
NOVNC_WEB=/usr/share/novnc

if ! pgrep -x Xvfb > /dev/null; then
    echo "Starter Xvfb på display :${DISPLAY_NUM}..."
    Xvfb :${DISPLAY_NUM} -screen 0 1920x1080x24 &
    sleep 1
fi

if ! pgrep -x x11vnc > /dev/null; then
    echo "Starter x11vnc..."
    x11vnc -display :${DISPLAY_NUM} -nopw -listen localhost -xkb -forever -quiet &
    sleep 1
fi

if ! pgrep -f websockify > /dev/null; then
    echo "Starter noVNC på port ${NOVNC_PORT}..."
    websockify --web ${NOVNC_WEB} ${NOVNC_PORT} localhost:${VNC_PORT} &>/dev/null &
    sleep 1
fi

echo "noVNC klar — åbn http://localhost:6081/vnc.html i VSCode Simple Browser"
