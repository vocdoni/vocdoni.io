/**
 * Reference codes follow the pattern VOC-YYMM-XXXX where XXXX is four characters from a
 * 32-character alphabet without 0, 1, I and O, so a reference can be read down a phone line.
 * 256 % 32 === 0, so masking a random byte with 31 is unbiased.
 */
export const REFERENCE_PATTERN = /^VOC-\d{4}-[23456789A-HJ-NP-Z]{4}$/

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ' // 32 characters

/**
 * Builds a reference code like VOC-2610-K7P3.
 * The YYMM part comes from `now` (defaults to the current time).
 * The random suffix uses `randomBytes` (defaults to crypto.getRandomValues).
 */
export const buildReference = (
  now: Date = new Date(),
  randomBytes: (length: number) => Uint8Array = (n) => crypto.getRandomValues(new Uint8Array(n))
): string => {
  const yy = String(now.getUTCFullYear()).slice(-2)
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const bytes = randomBytes(4)
  const suffix = Array.from(bytes)
    .map((b) => ALPHABET[b & 31])
    .join('')
  return `VOC-${yy}${mm}-${suffix}`
}
