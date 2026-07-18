# Esquema de contenido

## Objetivo

Permitir crear nuevos casos sin modificar componentes centrales.

## Entidades principales

- Case
- Evidence
- Hotspot
- Claim
- ContrastRule
- Observation
- TimelineEvent
- Hypothesis
- Verdict
- Dialogue
- AnchorMutation

## Tipos sugeridos

```ts
export type ClaimCategory = "record" | "memory" | "consequence";

export type EvidenceType =
  | "document"
  | "image"
  | "scene"
  | "audio"
  | "sequence";

export interface Claim {
  id: string;
  evidenceId: string;
  text: string;
  category: ClaimCategory;
  remnant?: boolean;
  unlockCondition?: Condition;
}

export interface Evidence {
  id: string;
  code: string;
  title: string;
  type: EvidenceType;
  source?: string;
  asset?: string;
  description?: string;
  hotspots?: Hotspot[];
  claims: Claim[];
}

export interface ContrastRule {
  id: string;
  requiredClaimIds: string[];
  relation: "supports" | "contradicts" | "leaves_trace";
  observationId: string;
  feedbackIncorrect?: string;
}

export interface Observation {
  id: string;
  text: string;
  strength: "weak" | "firm" | "discordance";
}

export interface TimelineEvent {
  id: string;
  time?: string;
  text: string;
  correctIndex: number;
}

export interface Hypothesis {
  id: string;
  title: string;
  description: string;
  status: "insufficient" | "compatible" | "viable" | "dominant" | "unstable";
  requiredObservationIds: string[];
  slots: HypothesisSlot[];
}

export interface Verdict {
  id: string;
  title: string;
  description: string;
  consequences: string[];
  endingSceneId: string;
}

export interface GameCase {
  id: string;
  code: string;
  title: string;
  initialTitle?: string;
  fatigue: string;
  initialDrift: string;
  objectives: Objective[];
  evidence: Evidence[];
  contrastRules: ContrastRule[];
  observations: Observation[];
  timeline?: TimelineEvent[];
  hypotheses: Hypothesis[];
  verdicts: Verdict[];
}
```

## Estado de sesión

```ts
export interface CaseProgress {
  caseId: string;
  reviewedEvidenceIds: string[];
  unlockedClaimIds: string[];
  selectedClaimIds: string[];
  unlockedObservationIds: string[];
  timelineOrder: string[];
  validatedHypothesisId?: string;
  selectedVerdictId?: string;
  currentObjectiveId: string;
  anchorValues: Record<string, string>;
  completed: boolean;
}
```

## Condiciones

El motor debe soportar inicialmente:

- evidenceReviewed;
- claimUnlocked;
- observationUnlocked;
- timelineCompleted;
- hypothesisValidated;
- verdictSelected.

No construir un lenguaje complejo de reglas. Usar condiciones declarativas simples.
