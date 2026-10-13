#!/usr/bin/env bash
# Makes a testimonial avatar: a 325x325 full-bleed round badge saved as .webp with transparent corners,
# the format every logo_<org>_round.webp in assets/logos/ shares.
#
#   make-round-logo.sh --src <image> --out assets/logos/logo_<org>_round.webp [--bg '#hex'] [--scale 0.62] [--key-white]
#
# Without --bg the source is already a disc (or a square avatar) and is cover-cropped into the circle.
# With --bg the source is a mark on a transparent (or, with --key-white, white) background: it is trimmed,
# scaled to --scale of the diameter and centred on a disc of that colour. --key-white only clears the white connected
# to the corners, so white details inside the mark survive. Needs ImageMagick 7 (with WebP support).
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
[[ "$scale" =~ ^(0?\.[0-9]*[1-9][0-9]*|1(\.0*)?)$ ]] || { echo "--scale must be a number above 0 and up to 1, got: $scale" >&2; exit 1; }
[[ "$out" == *.webp ]] || { echo "--out must be a .webp file, got: $out" >&2; exit 1; }
command -v magick >/dev/null || { echo "ImageMagick 7 (magick) is required" >&2; exit 1; }

size=325
r="$(awk -v s="$size" 'BEGIN { print (s - 1) / 2 }')"
circle="circle $r,$r $r,0"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# Rasterize vectors at a density high enough that the resize below only ever shrinks them.
read_src=(-background none -density 600 "$src")
key=()
# A white 1px frame connects every edge, so one flood fill from a corner clears the whole surrounding background.
# -compose Copy keeps -border from flattening transparent pixels onto white before the fill.
[ "$keywhite" = 1 ] && key=(-compose Copy -bordercolor white -border 1 -fuzz 6% -fill none -draw 'color 0,0 floodfill' -shave 1x1)

if [ -z "$bg" ]; then
  # cover-crop the source into the circle
  magick "${read_src[@]}" -alpha set ${key[@]+"${key[@]}"} -resize "${size}x${size}^" -gravity center -extent "${size}x${size}" \
    \( -size "${size}x${size}" xc:none -fill white -draw "$circle" \) \
    -compose DstIn -composite -quality 90 "$tmp/badge.webp"
else
  inner="$(awk -v s="$size" -v k="$scale" 'BEGIN { printf "%d", s * k + 0.5 }')"
  magick -size "${size}x${size}" xc:none -fill "$bg" -draw "$circle" \
    \( "${read_src[@]}" -alpha set ${key[@]+"${key[@]}"} -trim +repage -resize "${inner}x${inner}" \) \
    -gravity center -compose Over -composite -quality 90 "$tmp/badge.webp"
fi

mkdir -p "$(dirname "$out")"
mv "$tmp/badge.webp" "$out"
echo "wrote $out ($(magick identify -format '%wx%h alpha=%A' "$out"))"
