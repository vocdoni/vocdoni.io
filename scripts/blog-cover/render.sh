#!/usr/bin/env bash
# Renders a 1685x920 blog cover from template.html with headless Chrome and saves it as .webp.
#
#   scripts/blog-cover/render.sh --partner assets/logos/logo_fcb_round.webp [--partner ...] \
#     --out public/blog/images/2026/10/header_vocdoni_fcbarcelona.webp --variant stripes|stat|pitch|ballot|centered \
#     --c1 '#004d98' --c2 '#a50044' [--eyebrow ...] [--title ...] [--stat 84%] [--label turnout] \
#     [--highlight '84% turnout' ...] [--photo ...] [--filter 'grayscale(1) brightness(0.5)'] \
#     [--fit full|panel|band|stage] [--motif rows|rings|none] [--badge none|ring]
#
# --highlight '<figure> <label>' sets one figure of the vote large, its label under it; pass two, by default votes and
# turnout (another figure when turnout is low).
# --partner can be repeated for a vote run jointly by several organizations: the logos sit side by side in the lockup
# (and the ballot variant shows the first one).
# --partner is the organization's brand disc (assets/logos/logo_<org>_round.webp), shown filling its circle; pass
# --badge ring for a bare transparent mark, which then sits inside a cream circle.
# --filter is the CSS filter applied to the photo ("none" keeps a pre-treated photo as is). --fit and --motif
# only apply to the centered variant (photo placement, background drawing): see template.html.
# --variant, --c1 and --c2 are required: the template's own fallbacks are FC Barcelona's pitch and blaugrana.
# Paths are relative to the repo root. Needs Google Chrome or Chromium (found on PATH or in the macOS app folder,
# override with CHROME=...) and cwebp.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
partners=() highlights=() out='' eyebrow='Success stories' photo='' variant='' title='Success stories' stat='84%' label='turnout' c1='' c2='' filter='' fit='' motif='' badge=''

while [ $# -gt 0 ]; do
  case "$1" in
    --partner) partners+=("$2"); shift 2 ;;
    --highlight) highlights+=("$2"); shift 2 ;;
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
[ ${#partners[@]} -gt 0 ] && [ -n "$out" ] && [ -n "$variant" ] && [ -n "$c1" ] && [ -n "$c2" ] || { echo "usage: $0 --partner <logo> [--partner <logo> ...] --out <file.webp> --variant <variant> --c1 <#hex> --c2 <#hex> [--eyebrow ...] [--title ...] [--stat ...] [--label ...] [--highlight ...] [--photo ...] [--filter ...] [--fit ...] [--motif ...] [--badge ...]" >&2; exit 1; }

if [ -z "${CHROME:-}" ]; then
  for candidate in google-chrome google-chrome-stable chromium chromium-browser '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; do
    if command -v "$candidate" >/dev/null 2>&1; then CHROME="$candidate"; break; fi
  done
fi
[ -n "${CHROME:-}" ] || { echo "Google Chrome or Chromium not found, set CHROME=<path>" >&2; exit 1; }
command -v cwebp >/dev/null || { echo "cwebp is required (libwebp)" >&2; exit 1; }

urlencode() { python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1]))' "$1"; }

query="variant=$variant&eyebrow=$(urlencode "$eyebrow")&title=$(urlencode "$title")&stat=$(urlencode "$stat")&label=$(urlencode "$label")&c1=$(urlencode "$c1")&c2=$(urlencode "$c2")"
for partner in "${partners[@]}"; do query="$query&partner=$(urlencode "../../$partner")"; done
for highlight in "${highlights[@]+"${highlights[@]}"}"; do query="$query&highlight=$(urlencode "$highlight")"; done
[ -n "$photo" ] && query="$query&photo=$(urlencode "../../$photo")"
[ -n "$filter" ] && query="$query&filter=$(urlencode "$filter")"
[ -n "$fit" ] && query="$query&fit=$(urlencode "$fit")"
[ -n "$motif" ] && query="$query&motif=$(urlencode "$motif")"
[ -n "$badge" ] && query="$query&badge=$(urlencode "$badge")"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=3000 --window-size=1685,920 \
  --screenshot="$tmp/cover.png" "file://$ROOT/scripts/blog-cover/template.html?$query" >"$tmp/chrome.log" 2>&1 ||
  { cat "$tmp/chrome.log" >&2; echo "$CHROME failed" >&2; exit 1; }
[ -s "$tmp/cover.png" ] || { cat "$tmp/chrome.log" >&2; echo "$CHROME wrote no screenshot" >&2; exit 1; }

case "$out" in /*) dest="$out" ;; *) dest="$ROOT/$out" ;; esac
mkdir -p "$(dirname "$dest")"
cwebp -quiet -q 90 "$tmp/cover.png" -o "$dest"
echo "wrote $out"
