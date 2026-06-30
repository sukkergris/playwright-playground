#!/usr/bin/env bash
set -euo pipefail

if curl -sf http://localhost:5173 > /dev/null 2>&1; then
    echo "spa-lit kører allerede på port 5173"
    exit 0
fi

echo "Starter spa-lit i baggrunden..."
nohup bash -c "cd /xyz/frontend && npm run dev" > /tmp/spa-lit.log 2>&1 &

echo "Venter på http://localhost:5173..."
for i in $(seq 1 30); do
    if curl -sf http://localhost:5173 > /dev/null 2>&1; then
        echo "spa-lit klar!"
        exit 0
    fi
    sleep 1
done

echo "FEJL: spa-lit startede ikke inden for 30 sekunder. Tjek /tmp/spa-lit.log"
exit 1
