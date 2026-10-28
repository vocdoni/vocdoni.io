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

if [ -z "${CHROME:-}" ]; then
  for candidate in google-chrome google-chrome-stable chromium chromium-browser '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; do
    if command -v "$candidate" >/dev/null 2>&1; then CHROME="$candidate"; break; fi
  done
fi
[ -n "${CHROME:-}" ] || { echo "Google Chrome or Chromium not found, set CHROME=<path>" >&2; exit 1; }

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=3000 --window-size=1200,630 \
  --screenshot="$tmp/og.png" "file://$ROOT/scripts/og-image/template.html" >"$tmp/chrome.log" 2>&1 ||
  { cat "$tmp/chrome.log" >&2; echo "$CHROME failed" >&2; exit 1; }
[ -s "$tmp/og.png" ] || { cat "$tmp/chrome.log" >&2; echo "$CHROME wrote no screenshot" >&2; exit 1; }

case "$out" in /*) dest="$out" ;; *) dest="$ROOT/$out" ;; esac
mkdir -p "$(dirname "$dest")"
cp "$tmp/og.png" "$dest"
echo "wrote $out"
