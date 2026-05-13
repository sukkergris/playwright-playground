#!/usr/bin/env bash
set -e

DISPLAY_NUM=99
VNC_PORT=5900
NOVNC_PORT=6080
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
    echo ""
    echo "Åbn i browser: http://localhost:${NOVNC_PORT}/vnc.html"
    echo "(Forward port ${NOVNC_PORT} i VS Code hvis nødvendigt)"
    echo ""
fi

DISPLAY=:${DISPLAY_NUM} playwright codegen --target=csharp "$@"
