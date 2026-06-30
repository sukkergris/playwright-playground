#!/usr/bin/env bash
if ! curl -sf http://localhost:5173 > /dev/null 2>&1; then
    echo ""
    echo "  FEJL: spa-lit er ikke startet. Kør 'task spa-lit:start' i en anden terminal."
    echo ""
    exit 1
fi
