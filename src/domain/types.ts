export type ClaimCategory = "record" | "memory" | "consequence" | "anomaly";

export type EvidenceType = "document" | "image" | "scene" | "audio" | "sequence";
export type EvidenceStatusFlag = "altered" | "remnant";

export type ConditionType =
  | "evidenceReviewed"
  | "claimUnlocked"
  | "observationUnlocked"
  | "timelineCompleted"
  | "hypothesisValidated"
  | "verdictSelected";

export interface Condition {
  type: ConditionType;
  id: string;
}

export interface Objective {
  id: string;
  text: string;
  completionCondition: Condition;
}

export interface Hotspot {
  id: string;
  label: string;
  description?: string;
  claimId?: string;
  sectionId?: string;
  layout?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ClaimFormulation {
  id: string;
  text: string;
  precise: boolean;
}

export interface Claim {
  id: string;
  evidenceId: string;
  text: string;
  category: ClaimCategory;
  remnant?: boolean;
  unlockCondition?: Condition;
  prompt?: string;
  formulations?: ClaimFormulation[];
}

export interface EvidenceSection {
  id: string;
  title: string;
  body: string;
  side?: "front" | "back";
}

export interface EvidenceFrame {
  id: string;
  time: string;
  text: string;
  claimId?: string;
}

export interface AudioTranscriptLine {
  id: string;
  speaker?: string;
  time?: string;
  text: string;
  claimId?: string;
}

export interface EvidenceInspection {
  summary: string;
  instructions: string;
  sections?: EvidenceSection[];
  frames?: EvidenceFrame[];
  transcript?: AudioTranscriptLine[];
}

export interface Evidence {
  id: string;
  code: string;
  title: string;
  type: EvidenceType;
  source?: string;
  asset?: string;
  description?: string;
  statusFlags?: EvidenceStatusFlag[];
  inspection: EvidenceInspection;
  hotspots?: Hotspot[];
  claims: Claim[];
}

export interface ContrastRule {
  id: string;
  requiredClaimIds: string[];
  relation: "supports" | "contradicts" | "leaves_trace";
  observationId: string;
  unlockCondition?: Condition;
  feedbackIncorrect?: string;
}

export interface Observation {
  id: string;
  text: string;
  strength: "weak" | "firm" | "confirmed" | "discordance";
}

export interface TimelineEvent {
  id: string;
  time?: string;
  text: string;
  correctIndex: number;
}

export interface HypothesisSlot {
  id: string;
  category: ClaimCategory;
  requiredClaimId: string;
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

export interface ProductMetadata {
  universe: string;
  title: string;
  arc: string;
}

export type TutorialStage =
  | "kitchen"
  | "recordUnlocked"
  | "mesaUnlocked"
  | "cameraUnlocked"
  | "identityUnlocked"
  | "discordanceConfirmed";

export interface TutorialDialogueLine {
  speaker: "Ena" | "Maru" | "Kiru";
  text: string;
}

export interface GameTutorial {
  initialObjective: string;
  dialogue: TutorialDialogueLine[];
  cupClaimId: string;
  registryEvidenceId: string;
  registryClaimId: string;
  mesaObservationId: string;
  cameraEvidenceId: string;
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
  product: ProductMetadata;
  tutorial?: GameTutorial;
}

export interface CaseProgress {
  caseId: string;
  tutorialStage: TutorialStage;
  reviewedEvidenceIds: string[];
  unlockedClaimIds: string[];
  selectedClaimIds: string[];
  unlockedObservationIds: string[];
  timelineOrder: string[];
  validatedHypothesisId?: string;
  selectedVerdictId?: string;
  currentObjectiveId: string;
  caseStatus: "receiving" | "contrasting" | "sequencePending" | "discordanceConfirmed";
  currentDrift: string;
  anchorValues: Record<string, string>;
  completed: boolean;
}
