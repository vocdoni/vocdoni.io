#!/usr/bin/env bash
# Renders the default social share image (1200x630) from template.html with headless Chrome.
#
#   scripts/og-image/render.sh [--out assets/images/og-default.png]
#
# PNG rather than WebP: some link-preview crawlers still skip WebP og:images. Needs Google Chrome or Chromium (found on
# PATH or in the macOS app folder, override with CHROME=...).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
out='assets/images/og-default.png'

while [ $# -gt 0 ]; do
  case "$1" in
    --out) out="$2"; shift 2 ;;
    *) echo "unknown option: $1" >&2; exit 1 ;;
  esac
done

. "$ROOT/scripts/lib/screenshot.sh"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

screenshot "file://$ROOT/scripts/og-image/template.html" 1200 630 "$tmp/og.png"

case "$out" in /*) dest="$out" ;; *) dest="$ROOT/$out" ;; esac
mkdir -p "$(dirname "$dest")"
cp "$tmp/og.png" "$dest"
echo "wrote $out"
