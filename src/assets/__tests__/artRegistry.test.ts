import {
  allCase00BackgroundAssets,
  allCharacterAssets,
  allRuntimeAssets,
  characterAssets,
} from "@/assets/artRegistry";

describe("artRegistry", () => {
  it("registers every current character bust and Case 0 background", () => {
    expect(Object.keys(characterAssets.ena)).toEqual([
      "ausencia",
      "certeza",
      "hospitalaria",
      "molestia",
    ]);
    expect(Object.keys(characterAssets.kiru)).toEqual([
      "concerned",
      "focused",
      "neutral",
      "skeptical",
    ]);
    expect(Object.keys(characterAssets.maru)).toEqual([
      "concerned",
      "focused",
      "neutral",
      "skeptical",
    ]);
    expect(allCharacterAssets).toHaveLength(12);
    expect(allCase00BackgroundAssets).toHaveLength(2);
    expect(allRuntimeAssets).toHaveLength(14);
  });

  it("keeps dimensions and transparency metadata available for the dev gallery", () => {
    allRuntimeAssets.forEach((asset) => {
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.hasTransparency).toBe(true);
      expect(asset.path).toMatch(/^assets\//);
      expect(asset.source).toBeTruthy();
    });
  });
});
