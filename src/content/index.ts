import { case00 } from "@/content/case-00";
import type { GameCase } from "@/domain/types";

const cases = {
  [case00.id]: case00,
} satisfies Record<string, GameCase>;

export function getCase(caseId: string): GameCase {
  return cases[caseId] ?? case00;
}

export function getInitialCase(): GameCase {
  return case00;
}
