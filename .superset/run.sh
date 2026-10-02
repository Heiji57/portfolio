#!/usr/bin/env bash
# Superset "Run" button: starts the dev server on this workspace's leased port.
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
cd "$WORKSPACE_PATH"

port="$(read_workspace_port || true)"
[ -n "$port" ] || port="$(lease_port)"
if port_in_use "$port"; then
  log "port $port is busy, leasing another"
  old="$port"
  port="$(lease_port "$old")"
  release_port "$old"
fi
write_workspace_env "$port"
export PORT="$port"

cmd=()
if [ -f package.json ] && grep -Eq '"dev"[[:space:]]*:' package.json; then
  pm="$(node_pm)"
  cmd=("$pm" run dev)
  # Next.js, Remix, Express etc. read $PORT; Vite and Astro need a flag.
  extra=()
  if grep -Eq '"dev"[[:space:]]*:[[:space:]]*"[^"]*vite' package.json; then
    extra=(--port "$port" --strictPort)
  elif grep -Eq '"dev"[[:space:]]*:[[:space:]]*"[^"]*astro' package.json; then
    extra=(--port "$port")
  fi
  if [ ${#extra[@]} -gt 0 ]; then
    [ "$pm" = npm ] && cmd+=(--)
    cmd+=("${extra[@]}")
  fi
elif [ -f manage.py ]; then
  py=python3
  [ -x .venv/bin/python ] && py=.venv/bin/python
  cmd=("$py" manage.py runserver "$port")
elif [ -f Cargo.toml ]; then
  cmd=(cargo run)
else
  log "no dev command found: add a \"dev\" script to package.json,"
  log "or override \"run\" in .superset/config.local.json"
  exit 1
fi

log "starting on http://localhost:$port  ->  ${cmd[*]}"
echo $$ >"$RUN_PIDFILE"
exec "${cmd[@]}"
