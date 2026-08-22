// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { award, coloredCount, getProgress, totalStars } from "@/lib/progress";

beforeEach(() => {
  localStorage.clear();
});

describe("getProgress", () => {
  it("returns empty progress with no stored data", () => {
    expect(getProgress()).toEqual({ traced: [], tapped: [] });
  });

  it("ignores corrupt or wrongly-shaped storage instead of throwing", () => {
    localStorage.setItem("arab_fingers_progress", "{not json");
    expect(getProgress()).toEqual({ traced: [], tapped: [] });
    localStorage.setItem("arab_fingers_progress", JSON.stringify({ traced: "oops", tapped: 42 }));
    expect(getProgress()).toEqual({ traced: [], tapped: [] });
  });
});

describe("award", () => {
  it("records a letter once per game and returns the updated progress", () => {
    expect(award("traced", "ب").traced).toEqual(["ب"]);
    // Deduped: tracing ب twice earns one star.
    expect(award("traced", "ب").traced).toEqual(["ب"]);
    award("tapped", "ب");
    // Tracing and tapping ب are separate accomplishments.
    expect(award("tapped", "ب").tapped).toEqual(["ب"]);
  });

  it("persists across reads", () => {
    award("traced", "ا");
    award("tapped", "م");
    expect(getProgress().traced).toEqual(["ا"]);
    expect(getProgress().tapped).toEqual(["م"]);
  });
});

describe("totalStars", () => {
  it("sums traced + tapped + colored (a sum, not a set-union)", () => {
    localStorage.setItem("arab_fingers_colored_letters", JSON.stringify(["ب", "ا"]));
    award("traced", "ب");
    award("tapped", "ب");
    award("tapped", "ج");
    expect(totalStars()).toBe(5);
  });

  it("counts zero when nothing was done anywhere", () => {
    expect(totalStars()).toBe(0);
  });

  it("coloredCount tolerates a corrupt key", () => {
    localStorage.setItem("arab_fingers_colored_letters", "{{{");
    expect(coloredCount()).toBe(0);
  });
});
