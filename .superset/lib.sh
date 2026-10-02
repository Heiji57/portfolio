# Shared helpers for the Superset lifecycle scripts. Sourced, not executed.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_PATH="${SUPERSET_WORKSPACE_PATH:-$(cd "$SCRIPT_DIR/.." && pwd)}"
ROOT_PATH="${SUPERSET_ROOT_PATH:-$WORKSPACE_PATH}"

# Per-workspace runtime state (gitignored).
WORKSPACE_ENV="$WORKSPACE_PATH/.superset/.workspace.env"
RUN_PIDFILE="$WORKSPACE_PATH/.superset/.run.pid"

# Port leases are machine-wide so workspaces of *any* project don't collide.
# One file per leased port, containing the owning workspace path.
LEASE_DIR="${SUPERSET_HOME_DIR:-$HOME/.superset}/port-leases"
PORT_MIN="${SUPERSET_PORT_MIN:-3000}"
PORT_MAX="${SUPERSET_PORT_MAX:-3999}"

log() { printf '[superset] %s\n' "$*"; }

port_in_use() {
  (exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null && return 0
  (exec 3<>"/dev/tcp/::1/$1") 2>/dev/null && return 0
  return 1
}

# Lease a free port for this workspace (reuses an existing lease) and print it.
# Pass a port to skip it, e.g. when it's taken by something outside Superset.
lease_port() {
  local skip="${1:-}" p owner
  mkdir -p "$LEASE_DIR"

  for f in "$LEASE_DIR"/*; do
    [ -f "$f" ] || continue
    p="$(basename "$f")"
    [ "$p" = "$skip" ] && continue
    if [ "$(cat "$f")" = "$WORKSPACE_PATH" ]; then
      echo "$p"
      return 0
    fi
  done

  for ((p = PORT_MIN; p <= PORT_MAX; p++)); do
    [ "$p" = "$skip" ] && continue
    if [ -f "$LEASE_DIR/$p" ]; then
      owner="$(cat "$LEASE_DIR/$p" 2>/dev/null)"
      # Reclaim leases left behind by workspaces that no longer exist.
      [ -n "$owner" ] && [ -d "$owner" ] && continue
      rm -f "$LEASE_DIR/$p"
    fi
    port_in_use "$p" && continue
    if (set -o noclobber; echo "$WORKSPACE_PATH" >"$LEASE_DIR/$p") 2>/dev/null; then
      echo "$p"
      return 0
    fi
  done

  log "no free port in $PORT_MIN-$PORT_MAX" >&2
  return 1
}

release_port() {
  local p="$1"
  [ -n "$p" ] && [ -f "$LEASE_DIR/$p" ] || return 0
  [ "$(cat "$LEASE_DIR/$p")" = "$WORKSPACE_PATH" ] && rm -f "$LEASE_DIR/$p"
  return 0
}

write_workspace_env() {
  printf 'PORT=%s\n' "$1" >"$WORKSPACE_ENV"
}

read_workspace_port() {
  [ -f "$WORKSPACE_ENV" ] && sed -n 's/^PORT=//p' "$WORKSPACE_ENV"
}

# Package manager for a Node project, from its lockfile.
node_pm() {
  if [ -f bun.lock ] || [ -f bun.lockb ]; then echo bun
  elif [ -f pnpm-lock.yaml ]; then echo pnpm
  elif [ -f yarn.lock ]; then echo yarn
  else echo npm
  fi
}
