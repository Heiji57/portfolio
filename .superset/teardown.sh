#!/usr/bin/env bash
# Runs when a Superset workspace is deleted: stops the dev server and frees its port.
set -uo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

kill_tree() {
  local child
  for child in $(pgrep -P "$1" 2>/dev/null); do kill_tree "$child"; done
  kill "$1" 2>/dev/null
}

if [ -f "$RUN_PIDFILE" ]; then
  pid="$(cat "$RUN_PIDFILE")"
  # Only kill it if the pid still belongs to a process in this workspace.
  cwd="$(readlink "/proc/$pid/cwd" 2>/dev/null \
    || lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
  if [ -n "$cwd" ] && [ "${cwd#"$WORKSPACE_PATH"}" != "$cwd" ]; then
    log "stopping dev server (pid $pid)"
    kill_tree "$pid"
  fi
  rm -f "$RUN_PIDFILE"
fi

port="$(read_workspace_port || true)"
if [ -n "$port" ]; then
  release_port "$port"
  log "released port $port"
fi
rm -f "$WORKSPACE_ENV"
exit 0
