import type { CaseProgress, Claim, Evidence } from "@/domain/types";

export type EvidenceStatusTone = "neutral" | "record" | "memory" | "consequence" | "remnant" | "locked";

export interface EvidenceStatusLabel {
  label: string;
  tone: EvidenceStatusTone;
}

export function getEvidenceStatusLabels(
  evidence: Evidence,
  progress: CaseProgress,
): EvidenceStatusLabel[] {
  const isReviewed = progress.reviewedEvidenceIds.includes(evidence.id);
  const extractedClaims = evidence.claims.filter((claim) =>
    progress.unlockedClaimIds.includes(claim.id),
  );

  const labels: EvidenceStatusLabel[] = [
    isReviewed
      ? { label: "revisada", tone: "neutral" }
      : { label: "sin revisar", tone: "locked" },
  ];

  if (extractedClaims.length > 0) {
    labels.push({ label: "contiene marca", tone: "record" });
  }

  if (extractedClaims.length > 0 && evidence.statusFlags?.includes("altered")) {
    labels.push({ label: "alterada", tone: "remnant" });
  }

  if (extractedClaims.some((claim) => claim.remnant)) {
    labels.push({ label: "remanente", tone: "remnant" });
  }

  return labels;
}

export function getExtractedClaims(evidence: Evidence, progress: CaseProgress): Claim[] {
  return evidence.claims.filter((claim) => progress.unlockedClaimIds.includes(claim.id));
}

export function findClaim(evidence: Evidence, claimId?: string): Claim | undefined {
  if (claimId == null) {
    return undefined;
  }

  return evidence.claims.find((claim) => claim.id === claimId);
}

export function isPreciseFormulation(claim: Claim, formulationId: string): boolean {
  return claim.formulations?.some(
    (formulation) => formulation.id === formulationId && formulation.precise,
  ) ?? false;
}
