import { getInitialCase } from "@/content";

describe("case-00 content", () => {
  it("loads Case 0 as typed case data", () => {
    const gameCase = getInitialCase();

    expect(gameCase.product.title).toBe("Concordancia: Estación 0");
    expect(gameCase.evidence).toHaveLength(5);
    expect(gameCase.contrastRules).toHaveLength(3);
    expect(gameCase.tutorial?.initialObjective).toBe("Encuentra algo que no encaje.");
    expect(gameCase.verdicts).toHaveLength(2);
  });

  it("defines inspection material and formulations for every evidence claim", () => {
    const gameCase = getInitialCase();
    const claims = gameCase.evidence.flatMap((evidence) => evidence.claims);

    expect(claims).toHaveLength(15);
    expect(gameCase.evidence.every((evidence) => evidence.inspection.summary.length > 0)).toBe(true);
    expect(
      claims.every(
        (claim) =>
          claim.formulations != null &&
          claim.formulations.length >= 2 &&
          claim.formulations.some((formulation) => formulation.precise),
      ),
    ).toBe(true);
  });
});
