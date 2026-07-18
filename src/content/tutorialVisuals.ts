import type {
  AnyCharacterExpression,
  Case00BackgroundId,
  CharacterId,
} from "@/assets/artRegistry";
import type { Hotspot } from "@/domain/types";

export interface NarrativePortraitConfig {
  characterId: CharacterId;
  expression: AnyCharacterExpression;
  side: "left" | "right";
  scale?: number;
  label: string;
}

export interface NarrativeSceneData {
  id: string;
  backgroundId: Case00BackgroundId;
  speakerLabel?: string;
  activeCharacterId?: CharacterId;
  dialogue?: string;
  objective?: string;
  portraits: NarrativePortraitConfig[];
  hotspots?: Hotspot[];
}

export const tutorialKitchenSecondCupHotspot = {
  id: "scene-second-cup-target",
  label: "Inspeccionar segunda taza",
  description: "La taza derecha conserva una marca de uso reciente.",
  claimId: "claim-tutorial-coffee",
  layout: {
    height: 13,
    width: 18,
    x: 60,
    y: 62,
  },
} satisfies Hotspot;

const tutorialPortraits = {
  enaCerteza: {
    characterId: "ena",
    expression: "certeza",
    label: "Ena / certeza",
    scale: 1.14,
    side: "left",
  },
  kiruFocused: {
    characterId: "kiru",
    expression: "focused",
    label: "Kiru / concentrada",
    scale: 1.08,
    side: "left",
  },
  maruSkeptical: {
    characterId: "maru",
    expression: "skeptical",
    label: "Maru / escepticismo",
    scale: 1.12,
    side: "left",
  },
  enaMolestia: {
    characterId: "ena",
    expression: "molestia",
    label: "Ena / molestia",
    scale: 1.14,
    side: "left",
  },
} satisfies Record<string, NarrativePortraitConfig>;

export const tutorialExplorationScene = {
  backgroundId: "kitchen",
  id: "tutorial-explore-kitchen",
  objective: "Encuentra algo que no encaje.",
  portraits: [],
  hotspots: [tutorialKitchenSecondCupHotspot],
} satisfies NarrativeSceneData;

export const tutorialOpeningScenes = [
  {
    activeCharacterId: "ena",
    backgroundId: "kitchen",
    dialogue: "Toma acaba de tomar el tren.",
    id: "tutorial-opening-ena",
    objective: "Encuentra algo que no encaje.",
    portraits: [tutorialPortraits.enaCerteza],
    speakerLabel: "Ena",
  },
  {
    activeCharacterId: "maru",
    backgroundId: "kitchen",
    dialogue: "La línea lleva cuarenta años cerrada.",
    id: "tutorial-opening-maru",
    objective: "Encuentra algo que no encaje.",
    portraits: [tutorialPortraits.maruSkeptical],
    speakerLabel: "Maru",
  },
  {
    activeCharacterId: "kiru",
    backgroundId: "kitchen",
    dialogue: "Entonces algo aquí no encaja.",
    id: "tutorial-opening-kiru",
    objective: "Encuentra algo que no encaje.",
    portraits: [tutorialPortraits.kiruFocused],
    speakerLabel: "Kiru",
  },
] satisfies NarrativeSceneData[];

export const tutorialArchivedScene = {
  activeCharacterId: "kiru",
  backgroundId: "kitchen",
  dialogue: "Archivada como consecuencia. La taza no explica todavía quién falta.",
  id: "tutorial-cup-archived",
  objective: "Contraste la marca doméstica con un registro independiente.",
  portraits: [tutorialPortraits.kiruFocused],
  speakerLabel: "Kiru",
} satisfies NarrativeSceneData;

export const tutorialFirstSealScene = {
  activeCharacterId: "ena",
  backgroundId: "kitchen",
  dialogue: "La taza vibra una vez. A lo lejos, el tren pasa por una vía cerrada.",
  id: "tutorial-first-seal",
  objective: "Determine qué ocurre en la casa durante las 07:14.",
  portraits: [tutorialPortraits.enaMolestia],
  speakerLabel: "Recepcion",
} satisfies NarrativeSceneData;

export function getTutorialOpeningScene(index: number): NarrativeSceneData {
  const fallback = tutorialOpeningScenes[0];
  const scene = tutorialOpeningScenes[Math.min(index, tutorialOpeningScenes.length - 1)];

  if (fallback == null) {
    throw new Error("Tutorial opening scenes must include at least one scene.");
  }

  return scene ?? fallback;
}
