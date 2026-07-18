import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { getCase00BackgroundAsset } from "@/assets/artRegistry";
import { DialoguePortrait } from "@/components/narrative/DialoguePortrait";
import { StatusPill } from "@/components/shared/StatusPill";
import type { NarrativeSceneData } from "@/content/tutorialVisuals";
import type { Hotspot } from "@/domain/types";
import { colors, spacing, typography } from "@/theme";

interface NarrativeSceneProps {
  fondo: NarrativeSceneData["backgroundId"];
  personajesVisibles: NarrativeSceneData["portraits"];
  hablanteActivo?: NarrativeSceneData["activeCharacterId"] | undefined;
  speakerLabel?: string | undefined;
  dialogo?: string | undefined;
  objetivo?: string | undefined;
  hotspots?: Hotspot[];
  height: number;
  onHotspotPress?: ((hotspot: Hotspot) => void) | undefined;
  onAdvance?: (() => void) | undefined;
  advanceLabel?: string | undefined;
}

export function NarrativeScene({
  advanceLabel,
  dialogo,
  fondo,
  hablanteActivo,
  height,
  hotspots = [],
  objetivo,
  onAdvance,
  onHotspotPress,
  personajesVisibles,
  speakerLabel,
}: NarrativeSceneProps) {
  const background = getCase00BackgroundAsset(fondo);

  return (
    <View style={[styles.stage, { height }]}>
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="cover"
        source={background.source}
        style={styles.background}
      />

      {hotspots.map((hotspot) => (
        <Pressable
          accessibilityHint={hotspot.description}
          accessibilityLabel={hotspot.label}
          accessibilityRole="button"
          key={hotspot.id}
          onPress={() => onHotspotPress?.(hotspot)}
          style={[styles.hotspot, getHotspotLayout(hotspot)]}
        />
      ))}

      {personajesVisibles.map((portrait) => (
        <DialoguePortrait
          accessibilityLabel={portrait.label}
          characterId={portrait.characterId}
          expression={portrait.expression}
          isActive={portrait.characterId === hablanteActivo}
          key={`${portrait.characterId}-${portrait.expression}-${portrait.side}`}
          scale={portrait.scale}
          side={portrait.side}
        />
      ))}

      {(dialogo != null || objetivo != null) && (
        <View style={styles.dialogueDock}>
          {speakerLabel != null && (
            <View style={styles.speakerPlate}>
              <Text style={styles.speakerName}>{speakerLabel}</Text>
            </View>
          )}
          {dialogo != null && <Text style={styles.dialogueLine}>{dialogo}</Text>}
          {objetivo != null && (
            <View style={styles.objectiveLine}>
              <StatusPill label="objetivo" tone="record" />
              <Text style={styles.objectiveText}>{objetivo}</Text>
            </View>
          )}
          {onAdvance != null && (
            <Pressable accessibilityRole="button" onPress={onAdvance} style={styles.dialogueAction}>
              <Text style={styles.dialogueActionText}>{advanceLabel ?? "Continuar"}</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

function getHotspotLayout(hotspot: Hotspot) {
  return {
    height: `${hotspot.layout?.height ?? 14}%`,
    left: `${hotspot.layout?.x ?? 0}%`,
    top: `${hotspot.layout?.y ?? 0}%`,
    width: `${hotspot.layout?.width ?? 14}%`,
  } as const;
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.paperPressed,
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  dialogueAction: {
    alignItems: "center",
    borderColor: colors.hairline,
    borderTopWidth: 1,
    justifyContent: "center",
    marginTop: spacing.xs,
    minHeight: 38,
  },
  dialogueActionText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  dialogueDock: {
    backgroundColor: "rgba(241,238,229,0.94)",
    borderColor: colors.hairline,
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    minHeight: 104,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    position: "absolute",
    right: 0,
    zIndex: 6,
  },
  dialogueLine: {
    color: colors.ink,
    fontSize: typography.size.body,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 22,
  },
  hotspot: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 1,
    minHeight: 44,
    minWidth: 44,
    position: "absolute",
    zIndex: 5,
  },
  objectiveLine: {
    alignItems: "flex-start",
    gap: spacing.xxs,
    marginTop: spacing.xs,
  },
  objectiveText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  speakerName: {
    color: colors.white,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  speakerPlate: {
    alignSelf: "flex-start",
    backgroundColor: colors.institutionalGreen,
    marginBottom: spacing.xxs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  stage: {
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
  },
});
