import { case00 } from "@/content/case-00";
import {
  getEvidenceStatusLabels,
  getExtractedClaims,
  isPreciseFormulation,
} from "@/domain/evidenceProgress";
import { createInitialProgress } from "@/domain/progressionEngine";

function requireValue<T>(value: T | undefined): T {
  if (value == null) {
    throw new Error("Expected test fixture to exist");
  }

  return value;
}

describe("evidenceProgress", () => {
  it("does not reveal altered or remnant states before a mark is found", () => {
    const progress = createInitialProgress(case00);
    const remnantEvidence = requireValue(case00.evidence.find((item) => item.id === "e-02"));
    const alteredEvidence = requireValue(case00.evidence.find((item) => item.id === "e-04"));

    expect(getEvidenceStatusLabels(remnantEvidence, progress).map((status) => status.label)).toEqual([
      "sin revisar",
    ]);
    expect(getEvidenceStatusLabels(alteredEvidence, progress).map((status) => status.label)).toEqual([
      "sin revisar",
    ]);
  });

  it("derives review, mark and remnant states from progress and content", () => {
    const progress = {
      ...createInitialProgress(case00),
      reviewedEvidenceIds: ["e-02"],
      unlockedClaimIds: ["claim-record-erased-line"],
    };
    const evidence = requireValue(case00.evidence.find((item) => item.id === "e-02"));

    const labels = getEvidenceStatusLabels(evidence, progress).map((status) => status.label);

    expect(labels).toEqual(["revisada", "contiene marca", "remanente"]);
  });

  it("returns extracted claims for the current evidence only", () => {
    const progress = {
      ...createInitialProgress(case00),
      unlockedClaimIds: ["claim-memory-marriage", "claim-record-single"],
    };
    const evidence = requireValue(case00.evidence[0]);

    expect(getExtractedClaims(evidence, progress).map((claim) => claim.id)).toEqual([
      "claim-memory-marriage",
    ]);
  });

  it("accepts only the precise formulation for a claim", () => {
    const claim = requireValue(requireValue(case00.evidence[0]).claims[0]);

    expect(isPreciseFormulation(claim, "f-ena-marriage-precise")).toBe(true);
    expect(isPreciseFormulation(claim, "f-ena-marriage-wide")).toBe(false);
  });
});
