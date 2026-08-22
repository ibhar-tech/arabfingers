/**
 * The parent PIN is stored in localStorage, which anything on the device can
 * read. It is a speed bump for a toddler, not authentication, so we don't pretend
 * otherwise — but storing only a hash means the raw PIN never sits on disk where
 * a curious child (or anyone holding the device) can read it outright.
 *
 * FNV-1a 32-bit: tiny, dependency-free, and adequate for a 4-digit keyspace.
 * This is deliberately NOT cryptographic — the threat model is "don't show the
 * PIN to someone reading storage", nothing more.
 */
export function hashPin(pin: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < pin.length; i++) {
    hash ^= pin.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/** Constant-time-ish comparison for equal-length hex digests. */
export function verifyPin(pin: string, storedHash: string): boolean {
  const candidate = hashPin(pin);
  if (candidate.length !== storedHash.length) {
    return false;
  }
  let mismatch = 0;
  for (let i = 0; i < candidate.length; i++) {
    mismatch |= candidate.charCodeAt(i) ^ storedHash.charCodeAt(i);
  }
  return mismatch === 0;
}
