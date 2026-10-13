#!/usr/bin/env bash
# Makes a testimonial avatar: a 325x325 full-bleed round badge saved as .webp with transparent corners,
# the format every logo_<org>_round.webp in assets/logos/ shares.
#
#   make-round-logo.sh --src <image> --out assets/logos/logo_<org>_round.webp [--bg '#hex'] [--scale 0.62] [--key-white]
#
# Without --bg the source is already a disc (or a square avatar) and is cover-cropped into the circle.
# With --bg the source is a mark on a transparent (or, with --key-white, white) background: it is trimmed,
# scaled to --scale of the diameter and centred on a disc of that colour. Needs ImageMagick 7 and cwebp.
set -euo pipefail

src='' out='' bg='' scale='0.62' keywhite=0
while [ $# -gt 0 ]; do
  case "$1" in
    --src) src="$2"; shift 2 ;;
    --out) out="$2"; shift 2 ;;
    --bg) bg="$2"; shift 2 ;;
    --scale) scale="$2"; shift 2 ;;
    --key-white) keywhite=1; shift ;;
    *) echo "unknown option: $1" >&2; exit 1 ;;
  esac
done
[ -n "$src" ] && [ -n "$out" ] || { echo "usage: $0 --src <image> --out <file.webp> [--bg '#hex'] [--scale 0.62] [--key-white]" >&2; exit 1; }

size=325
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

key=()
[ "$keywhite" = 1 ] && key=(-fuzz 6% -transparent white)

if [ -z "$bg" ]; then
  # cover-crop the source into the circle
  magick "$src" -alpha set ${key[@]+"${key[@]}"} -resize "${size}x${size}^" -gravity center -extent "${size}x${size}" \
    \( -size "${size}x${size}" xc:none -fill white -draw "circle 162.5,162.5 162.5,0" \) \
    -compose DstIn -composite "$tmp/badge.png"
else
  inner="$(python3 -c "print(int(round($size * $scale)))")"
  magick -size "${size}x${size}" xc:none -fill "$bg" -draw "circle 162.5,162.5 162.5,0" \
    \( "$src" -alpha set ${key[@]+"${key[@]}"} -trim +repage -resize "${inner}x${inner}" \) \
    -gravity center -compose Over -composite "$tmp/badge.png"
fi

mkdir -p "$(dirname "$out")"
cwebp -quiet -q 90 "$tmp/badge.png" -o "$out"
echo "wrote $out ($(magick identify -format '%wx%h alpha=%A' "$out"))"
