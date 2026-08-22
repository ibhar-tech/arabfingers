import { describe, expect, it } from "vitest";
import { hashPin, verifyPin } from "@/lib/pin";

describe("hashPin", () => {
  it("is deterministic and hex-encoded to 8 chars", () => {
    const h1 = hashPin("1234");
    const h2 = hashPin("1234");
    expect(h1).toBe(h2);
    expect(h1).toMatch(/^[0-9a-f]{8}$/);
  });

  it("differs for different pins", () => {
    const digests = new Set(["0000", "1234", "9999", "0123"].map(hashPin));
    expect(digests.size).toBe(4);
  });

  it("never returns the plaintext", () => {
    expect(hashPin("1234")).not.toContain("1234");
  });
});

describe("verifyPin", () => {
  it("accepts the pin that produced the stored hash", () => {
    const stored = hashPin("4821");
    expect(verifyPin("4821", stored)).toBe(true);
  });

  it("rejects wrong pins and tampered hashes", () => {
    const stored = hashPin("4821");
    expect(verifyPin("4822", stored)).toBe(false);
    expect(verifyPin("", stored)).toBe(false);
    // A hash from a different pin must not verify.
    expect(verifyPin("4821", hashPin("1111"))).toBe(false);
  });
});
