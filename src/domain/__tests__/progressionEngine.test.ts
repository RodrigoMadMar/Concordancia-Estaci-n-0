import { case00 } from "@/content/case-00";
import { createInitialProgress, isVerdictUnlocked } from "@/domain/progressionEngine";

describe("progressionEngine", () => {
  it("creates initial progress for the current case", () => {
    const progress = createInitialProgress(case00);

    expect(progress.caseId).toBe("case-00");
    expect(progress.tutorialStage).toBe("kitchen");
    expect(progress.currentObjectiveId).toBe("obj-tutorial-kitchen");
    expect(progress.caseStatus).toBe("receiving");
    expect(progress.currentDrift).toBe("+11:00");
    expect(progress.timelineOrder).toEqual(["t1", "t2", "t3", "t4", "t5", "t6"]);
    expect(progress.completed).toBe(false);
  });

  it("keeps verdict locked until a dominant hypothesis is validated", () => {
    const progress = createInitialProgress(case00);

    expect(isVerdictUnlocked(progress)).toBe(false);
    expect(
      isVerdictUnlocked({
        ...progress,
        validatedHypothesisId: "hypothesis-dominant",
      }),
    ).toBe(true);
  });
});
