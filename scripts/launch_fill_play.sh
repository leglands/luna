#!/bin/bash
# launch_fill_play.sh — Launch Chrome with debugging + fill Play Console listings
#
# Usage:
# ./scripts/launch_fill_play.sh # fill all 40 locales
# ./scripts/launch_fill_play.sh --locale en-US # single locale
# ./scripts/launch_fill_play.sh --dry-run # navigate only

set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PLAY_URL="https://play.google.com/console/u/0/developers/6295830866613067582/app/4973061748192418870/main-store-listing"

echo "┌─────────────────────────────────────────────────────────────┐"
echo "│ LUNA Play Console Launcher │"
echo "└─────────────────────────────────────────────────────────────┘"
echo ""

# Check if Chrome debugging port is already open
if curl -s "http://localhost:9222/json/version" > /dev/null 2>&1; then
  echo "Chrome already running with debugging port 9222"
else
  echo "Starting Chrome with remote debugging..."
  "$CHROME" \
    --remote-debugging-port=9222 \
    --no-first-run \
    --no-default-browser-check \
    "$PLAY_URL" &
  
  echo " Waiting for Chrome to start..."
  for i in $(seq 1 20); do
    if curl -s "http://localhost:9222/json/version" > /dev/null 2>&1; then
      echo "Chrome ready on port 9222"
      break
    fi
    sleep 1
  done
fi

echo ""
echo "Running fill script..."
cd "$DIR"
node scripts/fill_play_cdp.js "$@"