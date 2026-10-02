#!/usr/bin/env bash
# Runs when a Superset workspace is created. Safe to re-run.
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
cd "$WORKSPACE_PATH"

# Extra untracked files to copy from the main checkout, relative to the repo root.
# .env* files anywhere in the tree are always copied.
COPY_EXTRA=()

# --- 1. Copy untracked env files from the main checkout -----------------------
copy_from_root() {
  local rel="$1"
  # Committed files already exist in the worktree.
  git -C "$ROOT_PATH" ls-files --error-unmatch -- "$rel" >/dev/null 2>&1 && return 0
  if [ -e "$WORKSPACE_PATH/$rel" ]; then
    log "keep existing $rel"
    return 0
  fi
  mkdir -p "$(dirname "$WORKSPACE_PATH/$rel")"
  cp -a "$ROOT_PATH/$rel" "$WORKSPACE_PATH/$rel"
  log "copied $rel"
}

if [ "$ROOT_PATH" = "$WORKSPACE_PATH" ]; then
  log "running in the main checkout, nothing to copy"
else
  while IFS= read -r -d '' f; do
    copy_from_root "${f#"$ROOT_PATH"/}"
  done < <(find "$ROOT_PATH" \
    \( -name .git -o -name node_modules -o -name .venv -o -name target \
       -o -name dist -o -name build -o -name .next -o -name .superset \) -prune \
    -o -type f -name '.env*' -print0)

  for rel in "${COPY_EXTRA[@]}"; do
    [ -e "$ROOT_PATH/$rel" ] && copy_from_root "$rel"
  done
fi

# --- 2. Install dependencies --------------------------------------------------
if [ -f package.json ]; then
  pm="$(node_pm)"
  log "installing Node dependencies with $pm"
  case "$pm" in
    bun) bun install ;;
    pnpm) pnpm install --prefer-offline ;;
    yarn) yarn install ;;
    npm) if [ -f package-lock.json ]; then npm ci; else npm install; fi ;;
  esac
fi

if [ -f uv.lock ] || { [ -f pyproject.toml ] && command -v uv >/dev/null; }; then
  log "installing Python dependencies with uv"
  uv sync
elif [ -f requirements.txt ]; then
  log "installing Python dependencies into .venv"
  [ -d .venv ] || python3 -m venv .venv
  .venv/bin/pip install -q -r requirements.txt
fi

if [ -f Cargo.toml ]; then
  log "fetching Rust crates"
  cargo fetch
fi

# --- 3. Reserve a dev-server port for this workspace --------------------------
port="$(lease_port)"
write_workspace_env "$port"
log "dev server port: $port"
