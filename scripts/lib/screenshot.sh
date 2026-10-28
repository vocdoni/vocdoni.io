# Headless Chrome screenshots for the image templates (scripts/blog-cover/, scripts/og-image/). Source it, then call
#   screenshot <url> <width> <height> <out.png>
# Finds Google Chrome or Chromium on PATH or in the macOS app folder; override with CHROME=<path>.

if [ -z "${CHROME:-}" ]; then
  for candidate in google-chrome google-chrome-stable chromium chromium-browser '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; do
    if command -v "$candidate" >/dev/null 2>&1; then CHROME="$candidate"; break; fi
  done
fi
[ -n "${CHROME:-}" ] || { echo "Google Chrome or Chromium not found, set CHROME=<path>" >&2; exit 1; }

screenshot() {
  local url="$1" width="$2" height="$3" png="$4" log
  log="$(dirname "$png")/chrome.log"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --allow-file-access-from-files --virtual-time-budget=3000 --window-size="$width,$height" \
    --screenshot="$png" "$url" >"$log" 2>&1 ||
    { cat "$log" >&2; echo "$CHROME failed" >&2; exit 1; }
  [ -s "$png" ] || { cat "$log" >&2; echo "$CHROME wrote no screenshot" >&2; exit 1; }
}
