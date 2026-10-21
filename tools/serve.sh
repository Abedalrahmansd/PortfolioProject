#!/usr/bin/env bash
# Run the site locally the way the server runs it: Caddy + this repo's Caddyfile.
#   tools/serve.sh [port]        (default 8095) → http://127.0.0.1:<port>
# Uses `caddy` from PATH, else downloads Caddy once into tools/.bin (Linux/macOS).
# On Windows: `winget install CaddyServer.Caddy`, then run this from Git Bash.
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${1:-8095}"
VERSION=2.10.2

CADDY="$(command -v caddy || true)"
if [[ -z "$CADDY" ]]; then
	CADDY=tools/.bin/caddy
	if [[ ! -x "$CADDY" ]]; then
		os=$(uname -s | tr '[:upper:]' '[:lower:]'); arch=$(uname -m)
		case "$arch" in x86_64) arch=amd64 ;; aarch64|arm64) arch=arm64 ;; esac
		case "$os" in darwin) os=mac ;; esac
		mkdir -p tools/.bin
		echo "Downloading Caddy $VERSION ($os/$arch)…"
		curl -fsSL "https://github.com/caddyserver/caddy/releases/download/v${VERSION}/caddy_${VERSION}_${os}_${arch}.tar.gz" | tar xz -C tools/.bin caddy
	fi
fi

echo "Serving site/ at http://127.0.0.1:$PORT (Ctrl+C to stop)"
PORT="$PORT" SITE_ROOT="$PWD/site" exec "$CADDY" run --config Caddyfile --adapter caddyfile
