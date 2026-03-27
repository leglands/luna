#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./scripts/install_presidio_hooks.sh [--skip-install]

Installs the local Microsoft Presidio-powered git hooks for this repository.

Options:
  --skip-install   Configure repo-managed hooks but do not create/update the
                   local Presidio virtualenv.
EOF
}

SKIP_INSTALL=0
if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
  usage
  exit 0
fi
if [ "${1:-}" = "--skip-install" ]; then
  SKIP_INSTALL=1
elif [ -n "${1:-}" ]; then
  usage >&2
  exit 1
fi

REPO_ROOT=$(git rev-parse --show-toplevel)
GIT_DIR=$(git rev-parse --git-dir)
HOOKS_DIR="$REPO_ROOT/.githooks"
LOCAL_HOOKS_DIR="$GIT_DIR/local-hooks"
VENV_DIR=${PRESIDIO_HOOK_VENV:-"$GIT_DIR/presidio-hook-venv"}

pick_python() {
  if [ -n "${PRESIDIO_HOOK_PYTHON:-}" ]; then
    printf '%s\n' "$PRESIDIO_HOOK_PYTHON"
    return 0
  fi

  local candidate
  for candidate in python3.13 python3.12 python3.11 python3.10; do
    if command -v "$candidate" >/dev/null 2>&1; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  return 1
}

backup_existing_hook() {
  local hook_name="$1"
  local source_hook="$GIT_DIR/hooks/$hook_name"
  local backup_hook="$LOCAL_HOOKS_DIR/$hook_name.local"

  if [ ! -f "$source_hook" ] || [ -f "$backup_hook" ]; then
    return 0
  fi

  if grep -q "block commits during work hours" "$source_hook" 2>/dev/null; then
    echo "[luna-presidio] Existing $hook_name behavior is now tracked in .githooks/$hook_name"
    return 0
  fi

  if grep -q "Luna — post-commit hook" "$source_hook" 2>/dev/null; then
    echo "[luna-presidio] Existing $hook_name behavior is now tracked in .githooks/$hook_name"
    return 0
  fi

  cp "$source_hook" "$backup_hook"
  chmod +x "$backup_hook"
  echo "[luna-presidio] Backed up local $hook_name to $backup_hook"
}

mkdir -p "$LOCAL_HOOKS_DIR"
chmod +x "$HOOKS_DIR"/pre-commit "$HOOKS_DIR"/commit-msg "$HOOKS_DIR"/post-commit \
  "$REPO_ROOT/scripts/run_presidio_hook_scan.sh" \
  "$REPO_ROOT/scripts/install_presidio_hooks.sh"

backup_existing_hook pre-commit
backup_existing_hook commit-msg
backup_existing_hook post-commit

if [ "$SKIP_INSTALL" -eq 0 ]; then
  PYTHON_BIN=$(pick_python || true)
  if [ -z "${PYTHON_BIN:-}" ]; then
    echo "[luna-presidio] Python 3.10-3.13 is required for Presidio." >&2
    echo "[luna-presidio] Set PRESIDIO_HOOK_PYTHON=/path/to/python3.12 if needed." >&2
    exit 1
  fi

  echo "[luna-presidio] Using $PYTHON_BIN"
  "$PYTHON_BIN" -m venv "$VENV_DIR"
  "$VENV_DIR/bin/python" -m pip install --upgrade pip setuptools wheel
  "$VENV_DIR/bin/python" -m pip install "presidio_analyzer>=2,<3"
  echo "[luna-presidio] Installed Presidio into $VENV_DIR"
else
  echo "[luna-presidio] --skip-install selected; leaving Presidio virtualenv untouched"
fi

git config core.hooksPath .githooks
echo "[luna-presidio] Repo hooks enabled via core.hooksPath=.githooks"
echo "[luna-presidio] Presidio blocks suspicious staged additions and commit messages."
