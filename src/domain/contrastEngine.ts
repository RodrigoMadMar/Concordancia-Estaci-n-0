import type { CaseProgress, Claim, ContrastRule, GameCase, Observation } from "@/domain/types";

export type ContrastRelation = ContrastRule["relation"];

export interface ClaimWithEvidence {
  claim: Claim;
  evidenceCode: string;
  evidenceTitle: string;
}

export interface ContrastValidationResult {
  ok: boolean;
  feedback: string;
  observation?: Observation;
  rule?: ContrastRule;
}

const fallbackFeedback =
  "Maru: La Mesa no emite sello todavía. La relación propuesta no deja una observación estable.";

export function getArchivedClaims(gameCase: GameCase, progress: CaseProgress): ClaimWithEvidence[] {
  return gameCase.evidence.flatMap((evidence) =>
    evidence.claims
      .filter((claim) => progress.unlockedClaimIds.includes(claim.id))
      .map((claim) => ({
        claim,
        evidenceCode: evidence.code,
        evidenceTitle: evidence.title,
      })),
  );
}

export function getClaimById(gameCase: GameCase, claimId: string): ClaimWithEvidence | undefined {
  return gameCase.evidence.flatMap((evidence) =>
    evidence.claims.map((claim) => ({
      claim,
      evidenceCode: evidence.code,
      evidenceTitle: evidence.title,
    })),
  ).find((item) => item.claim.id === claimId);
}

export function getActiveContrastRule(
  gameCase: GameCase,
  progress: CaseProgress,
): ContrastRule | undefined {
  return gameCase.contrastRules.find((rule) => {
    if (progress.unlockedObservationIds.includes(rule.observationId)) {
      return false;
    }

    if (rule.unlockCondition == null) {
      return true;
    }

    if (rule.unlockCondition.type !== "observationUnlocked") {
      return false;
    }

    return progress.unlockedObservationIds.includes(rule.unlockCondition.id);
  });
}

export function getObservationById(
  gameCase: GameCase,
  observationId: string,
): Observation | undefined {
  return gameCase.observations.find((observation) => observation.id === observationId);
}

export function validateContrast(
  gameCase: GameCase,
  progress: CaseProgress,
  selectedClaimIds: string[],
  relation: ContrastRelation,
): ContrastValidationResult {
  const activeRule = getActiveContrastRule(gameCase, progress);

  if (selectedClaimIds.length < 2 || selectedClaimIds.length > 3) {
    const result: ContrastValidationResult = {
      feedback: "Kiru: La Mesa solo coteja dos o tres marcas por vez.",
      ok: false,
    };

    if (activeRule != null) {
      result.rule = activeRule;
    }

    return result;
  }

  if (activeRule == null) {
    return {
      feedback: "Maru: No quedan sellos abiertos en esta mesa.",
      ok: false,
    };
  }

  if (activeRule.relation !== relation) {
    return {
      feedback: activeRule.feedbackIncorrect ?? fallbackFeedback,
      ok: false,
      rule: activeRule,
    };
  }

  if (!sameClaimSet(selectedClaimIds, activeRule.requiredClaimIds)) {
    return {
      feedback: activeRule.feedbackIncorrect ?? fallbackFeedback,
      ok: false,
      rule: activeRule,
    };
  }

  const observation = getObservationById(gameCase, activeRule.observationId);

  if (observation == null) {
    return {
      feedback: "Maru: La regla existe, pero el sello no está registrado.",
      ok: false,
      rule: activeRule,
    };
  }

  return {
    feedback: "Sello emitido por la Mesa.",
    observation,
    ok: true,
    rule: activeRule,
  };
}

function sameClaimSet(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  const leftSorted = [...left].sort();
  const rightSorted = [...right].sort();

  return leftSorted.every((id, index) => id === rightSorted[index]);
}
