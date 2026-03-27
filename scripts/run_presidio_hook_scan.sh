#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT=$(git rev-parse --show-toplevel)
GIT_DIR=$(git rev-parse --git-dir)
VENV_DIR=${PRESIDIO_HOOK_VENV:-"$GIT_DIR/presidio-hook-venv"}
PYTHON_BIN="$VENV_DIR/bin/python"

if [ ! -x "$PYTHON_BIN" ]; then
  echo "[luna-presidio] Presidio hook environment is missing." >&2
  echo "[luna-presidio] Run: ./scripts/install_presidio_hooks.sh" >&2
  echo "[luna-presidio] To bypass once: git commit --no-verify" >&2
  exit 1
fi

exec "$PYTHON_BIN" "$REPO_ROOT/scripts/presidio_scan.py" "$@"
