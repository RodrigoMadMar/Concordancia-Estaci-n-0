import { Image, type ImageSourcePropType } from "react-native";

export type CharacterId = "ena" | "kiru" | "maru";
export type SharedAgentExpression = "concerned" | "focused" | "neutral" | "skeptical";
export type EnaExpression = "ausencia" | "certeza" | "hospitalaria" | "molestia";
export type CharacterExpression<C extends CharacterId = CharacterId> = C extends "ena"
  ? EnaExpression
  : SharedAgentExpression;
export type AnyCharacterExpression = EnaExpression | SharedAgentExpression;
export type Case00BackgroundId = "breakfastTableInspection" | "kitchen";
export type RuntimeAssetId =
  | `character.${CharacterId}.${AnyCharacterExpression}`
  | `case-00.${Case00BackgroundId}`;

export interface RuntimeAsset {
  id: RuntimeAssetId;
  label: string;
  source: ImageSourcePropType;
  path: string;
  width: number;
  height: number;
  hasTransparency: boolean;
  runtimeUse: "tutorial" | "inspection" | "available";
}

type CharacterAssetMap = {
  [C in CharacterId]: Record<CharacterExpression<C>, RuntimeAsset>;
};

export const characterAssets = {
  ena: {
    ausencia: {
      hasTransparency: true,
      height: 577,
      id: "character.ena.ausencia",
      label: "Ena / ausencia",
      path: "assets/characters/ena/ausencia.png",
      runtimeUse: "available",
      source: require("../../assets/characters/ena/ausencia.png"),
      width: 427,
    },
    certeza: {
      hasTransparency: true,
      height: 577,
      id: "character.ena.certeza",
      label: "Ena / certeza",
      path: "assets/characters/ena/certeza.png",
      runtimeUse: "tutorial",
      source: require("../../assets/characters/ena/certeza.png"),
      width: 427,
    },
    hospitalaria: {
      hasTransparency: true,
      height: 577,
      id: "character.ena.hospitalaria",
      label: "Ena / hospitalaria",
      path: "assets/characters/ena/hospitalaria.png",
      runtimeUse: "available",
      source: require("../../assets/characters/ena/hospitalaria.png"),
      width: 427,
    },
    molestia: {
      hasTransparency: true,
      height: 577,
      id: "character.ena.molestia",
      label: "Ena / molestia",
      path: "assets/characters/ena/molestia.png",
      runtimeUse: "tutorial",
      source: require("../../assets/characters/ena/molestia.png"),
      width: 427,
    },
  },
  kiru: {
    concerned: {
      hasTransparency: true,
      height: 546,
      id: "character.kiru.concerned",
      label: "Kiru / concerned",
      path: "assets/characters/kiru/concerned.png",
      runtimeUse: "available",
      source: require("../../assets/characters/kiru/concerned.png"),
      width: 500,
    },
    focused: {
      hasTransparency: true,
      height: 546,
      id: "character.kiru.focused",
      label: "Kiru / focused",
      path: "assets/characters/kiru/focused.png",
      runtimeUse: "tutorial",
      source: require("../../assets/characters/kiru/focused.png"),
      width: 500,
    },
    neutral: {
      hasTransparency: true,
      height: 546,
      id: "character.kiru.neutral",
      label: "Kiru / neutral",
      path: "assets/characters/kiru/neutral.png",
      runtimeUse: "available",
      source: require("../../assets/characters/kiru/neutral.png"),
      width: 500,
    },
    skeptical: {
      hasTransparency: true,
      height: 546,
      id: "character.kiru.skeptical",
      label: "Kiru / skeptical",
      path: "assets/characters/kiru/skeptical.png",
      runtimeUse: "available",
      source: require("../../assets/characters/kiru/skeptical.png"),
      width: 500,
    },
  },
  maru: {
    concerned: {
      hasTransparency: true,
      height: 502,
      id: "character.maru.concerned",
      label: "Maru / concerned",
      path: "assets/characters/maru/concerned.png",
      runtimeUse: "available",
      source: require("../../assets/characters/maru/concerned.png"),
      width: 410,
    },
    focused: {
      hasTransparency: true,
      height: 502,
      id: "character.maru.focused",
      label: "Maru / focused",
      path: "assets/characters/maru/focused.png",
      runtimeUse: "available",
      source: require("../../assets/characters/maru/focused.png"),
      width: 410,
    },
    neutral: {
      hasTransparency: true,
      height: 502,
      id: "character.maru.neutral",
      label: "Maru / neutral",
      path: "assets/characters/maru/neutral.png",
      runtimeUse: "available",
      source: require("../../assets/characters/maru/neutral.png"),
      width: 410,
    },
    skeptical: {
      hasTransparency: true,
      height: 502,
      id: "character.maru.skeptical",
      label: "Maru / skeptical",
      path: "assets/characters/maru/skeptical.png",
      runtimeUse: "tutorial",
      source: require("../../assets/characters/maru/skeptical.png"),
      width: 410,
    },
  },
} satisfies CharacterAssetMap;

export const case00BackgroundAssets = {
  breakfastTableInspection: {
    hasTransparency: true,
    height: 1672,
    id: "case-00.breakfastTableInspection",
    label: "Caso 0 / mesa de desayuno",
    path: "assets/case-00/breakfast-table-inspection.png",
    runtimeUse: "inspection",
    source: require("../../assets/case-00/breakfast-table-inspection.png"),
    width: 941,
  },
  kitchen: {
    hasTransparency: true,
    height: 975,
    id: "case-00.kitchen",
    label: "Caso 0 / cocina",
    path: "assets/case-00/kitchen-background.png",
    runtimeUse: "tutorial",
    source: require("../../assets/case-00/kitchen-background.png"),
    width: 914,
  },
} satisfies Record<Case00BackgroundId, RuntimeAsset>;

export const allCharacterAssets = Object.values(characterAssets).flatMap((expressions) =>
  Object.values(expressions),
) as RuntimeAsset[];

export const allCase00BackgroundAssets = Object.values(case00BackgroundAssets);
export const allRuntimeAssets = [...allCharacterAssets, ...allCase00BackgroundAssets];

const imageResolver = Image as typeof Image & {
  resolveAssetSource?: (source: unknown) => { uri?: string } | undefined;
};

export function getCharacterAsset(
  characterId: CharacterId,
  expression: AnyCharacterExpression,
): RuntimeAsset {
  if (characterId === "ena") {
    return characterAssets.ena[
      expression === "ausencia" ||
      expression === "certeza" ||
      expression === "hospitalaria" ||
      expression === "molestia"
        ? expression
        : "hospitalaria"
    ];
  }

  if (characterId === "kiru") {
    return characterAssets.kiru[
      expression === "concerned" ||
      expression === "focused" ||
      expression === "neutral" ||
      expression === "skeptical"
        ? expression
        : "neutral"
    ];
  }

  return characterAssets.maru[
    expression === "concerned" ||
    expression === "focused" ||
    expression === "neutral" ||
    expression === "skeptical"
      ? expression
      : "neutral"
  ];
}

export function getCase00BackgroundAsset(backgroundId: Case00BackgroundId): RuntimeAsset {
  return case00BackgroundAssets[backgroundId];
}

export function preloadRuntimeAssets(assets: RuntimeAsset[]): void {
  assets.forEach((asset) => {
    const uri = imageResolver.resolveAssetSource?.(asset.source)?.uri;
    if (uri != null) {
      void Image.prefetch(uri);
    }
  });
}

export function preloadTutorialAssets(): void {
  preloadRuntimeAssets(
    allRuntimeAssets.filter(
      (asset) => asset.runtimeUse === "tutorial" || asset.runtimeUse === "inspection",
    ),
  );
}
