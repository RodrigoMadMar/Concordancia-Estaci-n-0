import type { CaseProgress, GameCase } from "@/domain/types";

export function createInitialProgress(gameCase: GameCase): CaseProgress {
  return {
    caseId: gameCase.id,
    tutorialStage: "kitchen",
    reviewedEvidenceIds: [],
    unlockedClaimIds: [],
    selectedClaimIds: [],
    unlockedObservationIds: [],
    timelineOrder: gameCase.timeline?.map((event) => event.id) ?? [],
    currentObjectiveId: gameCase.objectives[0]?.id ?? "",
    caseStatus: "receiving",
    currentDrift: gameCase.initialDrift,
    anchorValues: {
      body: "",
      origin: "Noa me crió",
      return: "Volveré a la estación",
    },
    completed: false,
  };
}

export function isVerdictUnlocked(progress: CaseProgress): boolean {
  return progress.validatedHypothesisId != null;
}
