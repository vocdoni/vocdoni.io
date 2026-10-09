#!/usr/bin/env bash
# Renders a 1685x920 blog cover from template.html with headless Chrome and saves it as .webp.
#
#   scripts/blog-cover/render.sh --partner assets/images/fcb.webp \
#     --out public/blog/images/2026/10/header_vocdoni_fcbarcelona.webp [--variant stripes|stat|pitch|ballot|centered] \
#     [--eyebrow ...] [--title ...] [--stat 84%] [--label turnout] [--c1 #hex --c2 #hex] [--photo ...] \
#     [--filter 'grayscale(1) brightness(0.5)'] [--fit full|panel|band|stage] [--motif rows|rings|none] [--badge ring|none]
#
# --filter is the CSS filter applied to the photo ("none" keeps a pre-treated photo as is). --fit, --motif and --badge
# only apply to the centered variant (photo placement, background drawing, partner badge): see template.html.
# Paths are relative to the repo root. Needs Google Chrome (override with CHROME=...) and cwebp.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
partner='' out='' eyebrow='Success stories' photo='' variant='pitch' title='Success stories' stat='84%' label='turnout' c1='' c2='' filter='' fit='' motif='' badge=''

while [ $# -gt 0 ]; do
  case "$1" in
    --partner) partner="$2"; shift 2 ;;
    --out) out="$2"; shift 2 ;;
    --eyebrow) eyebrow="$2"; shift 2 ;;
    --photo) photo="$2"; shift 2 ;;
    --variant) variant="$2"; shift 2 ;;
    --title) title="$2"; shift 2 ;;
    --stat) stat="$2"; shift 2 ;;
    --label) label="$2"; shift 2 ;;
    --c1) c1="$2"; shift 2 ;;
    --c2) c2="$2"; shift 2 ;;
    --filter) filter="$2"; shift 2 ;;
    --fit) fit="$2"; shift 2 ;;
    --motif) motif="$2"; shift 2 ;;
    --badge) badge="$2"; shift 2 ;;
    *) echo "unknown option: $1" >&2; exit 1 ;;
  esac
done
[ -n "$partner" ] && [ -n "$out" ] || { echo "usage: $0 --partner <logo> --out <file.webp> [--variant ...] [--eyebrow ...] [--title ...] [--stat ...] [--label ...] [--c1 ... --c2 ...] [--photo ...] [--filter ...] [--fit ...] [--motif ...] [--badge ...]" >&2; exit 1; }

urlencode() { python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1]))' "$1"; }

query="variant=$variant&partner=$(urlencode "../../$partner")&eyebrow=$(urlencode "$eyebrow")&title=$(urlencode "$title")&stat=$(urlencode "$stat")&label=$(urlencode "$label")"
[ -n "$c1" ] && query="$query&c1=$(urlencode "$c1")"
[ -n "$c2" ] && query="$query&c2=$(urlencode "$c2")"
[ -n "$photo" ] && query="$query&photo=$(urlencode "../../$photo")"
[ -n "$filter" ] && query="$query&filter=$(urlencode "$filter")"
[ -n "$fit" ] && query="$query&fit=$(urlencode "$fit")"
[ -n "$motif" ] && query="$query&motif=$(urlencode "$motif")"
[ -n "$badge" ] && query="$query&badge=$(urlencode "$badge")"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=3000 --window-size=1685,920 \
  --screenshot="$tmp/cover.png" "file://$ROOT/scripts/blog-cover/template.html?$query" >/dev/null 2>&1

case "$out" in /*) dest="$out" ;; *) dest="$ROOT/$out" ;; esac
mkdir -p "$(dirname "$dest")"
cwebp -quiet -q 90 "$tmp/cover.png" -o "$dest"
echo "wrote $out"
