import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getInitialCase } from "@/content";
import type { CaseProgress, TutorialStage } from "@/domain/types";
import { createInitialProgress, isVerdictUnlocked } from "@/domain/progressionEngine";

type CaseTab = "overview" | "evidence" | "contrast" | "verdict";

interface GameState {
  activeCaseId: string;
  activeTab: CaseTab;
  progress: CaseProgress;
  setActiveTab: (tab: CaseTab) => void;
  markEvidenceReviewed: (evidenceId: string) => void;
  unlockClaim: (claimId: string) => void;
  setTutorialStage: (stage: TutorialStage) => void;
  toggleSelectedClaim: (claimId: string) => void;
  clearSelectedClaims: () => void;
  unlockObservation: (observationId: string) => void;
  setAnchorValue: (anchorId: string, value: string) => void;
  resetProgress: () => void;
  clearStoredProgress: () => Promise<void>;
  unlockEvidencesForDevelopment: () => void;
}

const initialCase = getInitialCase();
const storageKey = "concordancia-case-00-progress";
const evidenceIdByClaimId = new Map(
  initialCase.evidence.flatMap((evidence) =>
    evidence.claims.map((claim) => [claim.id, evidence.id] as const),
  ),
);

function addUnique(items: string[], item: string): string[] {
  return items.includes(item) ? items : [...items, item];
}

function createFreshProgress(): CaseProgress {
  return createInitialProgress(initialCase);
}

function getTutorialStageForClaim(claimId: string): TutorialStage | undefined {
  if (claimId === initialCase.tutorial?.cupClaimId) {
    return "recordUnlocked";
  }

  if (claimId === initialCase.tutorial?.registryClaimId) {
    return "mesaUnlocked";
  }

  return undefined;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      activeCaseId: initialCase.id,
      activeTab: "overview",
      progress: createFreshProgress(),
      setActiveTab: (tab) => set({ activeTab: tab }),
      markEvidenceReviewed: (evidenceId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            reviewedEvidenceIds: addUnique(state.progress.reviewedEvidenceIds, evidenceId),
          },
        })),
      unlockClaim: (claimId) =>
        set((state) => {
          const nextTutorialStage = getTutorialStageForClaim(claimId);
          const evidenceId = evidenceIdByClaimId.get(claimId);
          const currentObjectiveId =
            nextTutorialStage === "recordUnlocked"
              ? "obj-tutorial-registry"
              : nextTutorialStage === "mesaUnlocked"
                ? "obj-tutorial-table"
                : state.progress.currentObjectiveId;

          return {
            progress: {
              ...state.progress,
              tutorialStage: nextTutorialStage ?? state.progress.tutorialStage,
              currentObjectiveId,
              reviewedEvidenceIds:
                evidenceId == null
                  ? state.progress.reviewedEvidenceIds
                  : addUnique(state.progress.reviewedEvidenceIds, evidenceId),
              unlockedClaimIds: addUnique(state.progress.unlockedClaimIds, claimId),
            },
          };
        }),
      setTutorialStage: (stage) =>
        set((state) => ({
          progress: {
            ...state.progress,
            tutorialStage: stage,
          },
        })),
      toggleSelectedClaim: (claimId) =>
        set((state) => {
          const isSelected = state.progress.selectedClaimIds.includes(claimId);
          const selectedClaimIds = isSelected
            ? state.progress.selectedClaimIds.filter((id) => id !== claimId)
            : state.progress.selectedClaimIds.length >= 3
              ? state.progress.selectedClaimIds
              : [...state.progress.selectedClaimIds, claimId];

          return {
            progress: {
              ...state.progress,
              selectedClaimIds,
            },
          };
        }),
      clearSelectedClaims: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            selectedClaimIds: [],
          },
        })),
      unlockObservation: (observationId) =>
        set((state) => {
          const unlockedObservationIds = addUnique(
            state.progress.unlockedObservationIds,
            observationId,
          );
          const isFinalDiscordance = observationId === "obs-discordance";
          const isTutorialSeal = observationId === initialCase.tutorial?.mesaObservationId;
          const isCameraSeal = observationId === "obs-alternate-room";

          return {
            progress: {
              ...state.progress,
              caseStatus: isFinalDiscordance
                ? "discordanceConfirmed"
                : "contrasting",
              currentDrift: isFinalDiscordance
                ? "+11:00"
                : isCameraSeal
                  ? "+11:00"
                  : isTutorialSeal
                    ? "+11:12"
                    : state.progress.currentDrift,
              currentObjectiveId: isFinalDiscordance
                ? "obj-continuity-cut"
                : isCameraSeal
                  ? "obj-identity"
                  : isTutorialSeal
                    ? "obj-camera-unlocked"
                    : state.progress.currentObjectiveId,
              selectedClaimIds: [],
              tutorialStage: isFinalDiscordance
                ? "discordanceConfirmed"
                : isCameraSeal
                  ? "identityUnlocked"
                  : isTutorialSeal
                    ? "cameraUnlocked"
                    : state.progress.tutorialStage,
              unlockedObservationIds,
            },
          };
        }),
      setAnchorValue: (anchorId, value) =>
        set((state) => ({
          progress: {
            ...state.progress,
            anchorValues: {
              ...state.progress.anchorValues,
              [anchorId]: value,
            },
          },
        })),
      resetProgress: () =>
        set({
          activeTab: "overview",
          progress: createFreshProgress(),
        }),
      clearStoredProgress: async () => {
        await AsyncStorage.removeItem(storageKey);
        set({
          activeTab: "overview",
          progress: createFreshProgress(),
        });
      },
      unlockEvidencesForDevelopment: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            tutorialStage: "cameraUnlocked",
            reviewedEvidenceIds: initialCase.evidence.map((evidence) => evidence.id),
          },
        })),
    }),
    {
      name: storageKey,
      partialize: (state) => ({
        activeCaseId: state.activeCaseId,
        progress: state.progress,
      }),
      merge: (persisted, current) => {
        const stored = persisted as Partial<GameState> | undefined;
        const storedProgress = stored?.progress;
        const mergedProgress =
          storedProgress?.tutorialStage == null
            ? current.progress
            : {
                ...current.progress,
                ...storedProgress,
              };
        const progress =
          mergedProgress.tutorialStage === "kitchen" ? current.progress : mergedProgress;

        return {
          ...current,
          ...stored,
          progress,
        };
      },
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function selectIsVerdictUnlocked(state: GameState): boolean {
  return isVerdictUnlocked(state.progress);
}
