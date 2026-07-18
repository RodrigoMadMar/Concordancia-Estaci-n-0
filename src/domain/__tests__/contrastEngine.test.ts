import { case00 } from "@/content/case-00";
import { getActiveContrastRule, validateContrast } from "@/domain/contrastEngine";
import { createInitialProgress } from "@/domain/progressionEngine";

describe("contrastEngine", () => {
  it("starts with the playable tutorial contrast", () => {
    const progress = {
      ...createInitialProgress(case00),
      unlockedClaimIds: ["claim-tutorial-coffee", "claim-tutorial-official-alone"],
    };

    const result = validateContrast(
      case00,
      progress,
      ["claim-tutorial-official-alone", "claim-tutorial-coffee"],
      "contradicts",
    );

    expect(getActiveContrastRule(case00, progress)?.id).toBe("contrast-tutorial");
    expect(result.ok).toBe(true);
    expect(result.observation?.id).toBe("obs-tutorial-second-person");
  });

  it("validates the camera contrast regardless of claim order", () => {
    const progress = {
      ...createInitialProgress(case00),
      unlockedClaimIds: ["claim-record-empty-room", "claim-consequence-missing-cup"],
      unlockedObservationIds: ["obs-tutorial-second-person"],
    };

    const result = validateContrast(
      case00,
      progress,
      ["claim-consequence-missing-cup", "claim-record-empty-room"],
      "supports",
    );

    expect(result.ok).toBe(true);
    expect(result.observation?.id).toBe("obs-alternate-room");
  });

  it("rejects a correct future combination before its rule is active", () => {
    const progress = {
      ...createInitialProgress(case00),
      unlockedClaimIds: [
        "claim-record-erased-line",
        "claim-memory-marriage",
        "claim-consequence-second-cup",
      ],
      unlockedObservationIds: ["obs-tutorial-second-person"],
    };

    const result = validateContrast(
      case00,
      progress,
      ["claim-consequence-second-cup", "claim-record-erased-line", "claim-memory-marriage"],
      "contradicts",
    );

    expect(getActiveContrastRule(case00, progress)?.id).toBe("contrast-camera-room");
    expect(result.ok).toBe(false);
  });

  it("unlocks the final discordance only after the camera observation", () => {
    const progress = {
      ...createInitialProgress(case00),
      unlockedClaimIds: [
        "claim-record-erased-line",
        "claim-memory-marriage",
        "claim-consequence-second-cup",
      ],
      unlockedObservationIds: [
        "obs-tutorial-second-person",
        "obs-alternate-room",
      ],
    };

    const result = validateContrast(
      case00,
      progress,
      ["claim-consequence-second-cup", "claim-record-erased-line", "claim-memory-marriage"],
      "contradicts",
    );

    expect(getActiveContrastRule(case00, progress)?.id).toBe("contrast-identity-erased");
    expect(result.ok).toBe(true);
    expect(result.observation?.strength).toBe("discordance");
  });
});
