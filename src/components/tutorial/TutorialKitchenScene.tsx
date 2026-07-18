import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  type DimensionValue,
  useWindowDimensions,
  View,
} from "react-native";

import { getCase00BackgroundAsset, preloadTutorialAssets } from "@/assets/artRegistry";
import { DialoguePortrait } from "@/components/narrative/DialoguePortrait";
import { StatusPill } from "@/components/shared/StatusPill";
import {
  getTutorialOpeningScene,
  tutorialArchivedScene,
  tutorialExplorationScene,
  tutorialKitchenSecondCupHotspot,
  type NarrativeSceneData,
} from "@/content/tutorialVisuals";
import { findClaim, isPreciseFormulation } from "@/domain/evidenceProgress";
import type { CaseProgress, ClaimFormulation, GameCase, Hotspot } from "@/domain/types";
import { colors, spacing, typography } from "@/theme";

const kitchenAsset = getCase00BackgroundAsset("kitchen");

type TutorialSceneMode = "dialogue" | "explore" | "interpret";

interface TutorialKitchenSceneProps {
  gameCase: GameCase;
  onClaimExtracted: (claimId: string) => void;
  onOpenRegistry: () => void;
  progress: CaseProgress;
}

export function TutorialKitchenScene({
  gameCase,
  onClaimExtracted,
  onOpenRegistry,
  progress,
}: TutorialKitchenSceneProps) {
  const { width } = useWindowDimensions();
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [sceneMode, setSceneMode] = useState<TutorialSceneMode>("dialogue");
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | undefined>();
  const [feedback, setFeedback] = useState("La cocina conserva marcas demasiado recientes.");
  const tutorial = gameCase.tutorial;
  const breakfastEvidence = gameCase.evidence.find((evidence) =>
    evidence.claims.some((claim) => claim.id === tutorial?.cupClaimId),
  );
  const cupClaim =
    breakfastEvidence == null ? undefined : findClaim(breakfastEvidence, tutorial?.cupClaimId);
  const isArchived = cupClaim != null && progress.unlockedClaimIds.includes(cupClaim.id);
  const resolvedMode = isArchived ? "confirmed" : sceneMode;
  const activeScene = getActiveScene(resolvedMode, dialogueIndex);
  const dialogueComplete = activeScene.id === "tutorial-opening-kiru";
  const imageAspectRatio = kitchenAsset.width / kitchenAsset.height;
  const sceneHeight = Math.min(width <= 340 ? 430 : 490, width / imageAspectRatio);
  const cupHotspot = useMemo(
    () => ({
      ...tutorialKitchenSecondCupHotspot,
      claimId: cupClaim?.id ?? tutorialKitchenSecondCupHotspot.claimId,
    }),
    [cupClaim?.id],
  );

  useEffect(() => {
    preloadTutorialAssets();
  }, []);

  function advanceDialogue() {
    if (!dialogueComplete) {
      setDialogueIndex((current) => current + 1);
      return;
    }

    setSceneMode("explore");
    setFeedback("Kiru: Observe la rutina. Algo quedo fuera del relato.");
  }

  function inspectHotspot(hotspot: Hotspot) {
    if (resolvedMode === "dialogue") {
      return;
    }

    setSelectedHotspotId(hotspot.id);
    setSceneMode("interpret");
    setFeedback(cupClaim?.prompt ?? hotspot.description ?? "Formule la marca antes de archivarla.");
  }

  function selectFormulation(formulationId: string) {
    if (cupClaim == null) {
      return;
    }

    if (isPreciseFormulation(cupClaim, formulationId)) {
      onClaimExtracted(cupClaim.id);
      setFeedback("Marca archivada como consecuencia.");
      return;
    }

    setFeedback("Kiru: Eso salta demasiado lejos. Registre primero la huella.");
  }

  return (
    <View style={styles.sceneWrap}>
      <View style={styles.sceneShell}>
        <View style={styles.sceneMeta}>
          <Text style={styles.caseCode}>{gameCase.code}</Text>
          <Text style={styles.caseTitle}>Cocina de Ena / recepcion de campo</Text>
        </View>

        <View style={[styles.kitchenFrame, { aspectRatio: imageAspectRatio, minHeight: sceneHeight }]}>
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={kitchenAsset.source}
            style={styles.kitchenImage}
          />

          {activeScene.portraits.map((portrait) => (
            <DialoguePortrait
              accessibilityLabel={portrait.label}
              characterId={portrait.characterId}
              expression={portrait.expression}
              isActive={portrait.characterId === activeScene.activeCharacterId}
              key={`${portrait.characterId}-${portrait.expression}-${portrait.side}`}
              scale={portrait.scale}
              side={portrait.side}
            />
          ))}

          {resolvedMode !== "dialogue" && (
            <Pressable
              accessibilityHint={cupHotspot.description}
              accessibilityLabel={cupHotspot.label}
              accessibilityRole="button"
              onPress={() => inspectHotspot(cupHotspot)}
              style={[
                styles.cupHotspot,
                getHotspotLayout(cupHotspot),
                selectedHotspotId === cupHotspot.id && styles.cupHotspotSelected,
                isArchived && styles.cupHotspotArchived,
              ]}
            >
              <View style={styles.hotspotNeedle} />
            </Pressable>
          )}

          {resolvedMode === "dialogue" && (
            <DialogueLayer
              onAdvance={advanceDialogue}
              scene={activeScene}
              showObjective={false}
              title={activeScene.speakerLabel ?? "Recepcion"}
              actionLabel={dialogueComplete ? "Observar cocina" : "Continuar"}
            />
          )}

          {resolvedMode === "explore" && (
            <ObjectiveLayer
              objective={tutorialExplorationScene.objective ?? tutorial?.initialObjective}
            />
          )}

          {resolvedMode === "interpret" && (
            <InterpretationLayer
              feedback={feedback}
              formulations={cupClaim?.formulations ?? []}
              onFormulationSelected={selectFormulation}
              onReturnToScene={() => setSceneMode("explore")}
            />
          )}

          {resolvedMode === "confirmed" && (
            <ConfirmedLayer
              claimText={cupClaim?.text}
              onOpenRegistry={onOpenRegistry}
              scene={tutorialArchivedScene}
            />
          )}
        </View>
      </View>
    </View>
  );
}

function getActiveScene(
  mode: TutorialSceneMode | "confirmed",
  dialogueIndex: number,
): NarrativeSceneData {
  if (mode === "confirmed") {
    return tutorialArchivedScene;
  }

  if (mode === "dialogue") {
    return getTutorialOpeningScene(dialogueIndex);
  }

  return tutorialExplorationScene;
}

interface DialogueLayerProps {
  actionLabel: string;
  onAdvance: () => void;
  scene: NarrativeSceneData;
  showObjective: boolean;
  title: string;
}

function DialogueLayer({ actionLabel, onAdvance, scene, showObjective, title }: DialogueLayerProps) {
  return (
    <View style={styles.dialogueLayer}>
      <View style={styles.speakerPlate}>
        <Text style={styles.speakerName}>{title}</Text>
      </View>
      <Text style={styles.dialogueText}>{scene.dialogue}</Text>
      {showObjective && scene.objective != null && (
        <Text style={styles.inlineObjective}>{scene.objective}</Text>
      )}
      <Pressable accessibilityRole="button" onPress={onAdvance} style={styles.sceneAction}>
        <Text style={styles.sceneActionText}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

function ObjectiveLayer({ objective }: { objective?: string }) {
  return (
    <View style={styles.objectiveLayer}>
      <StatusPill label="objetivo" tone="record" />
      <Text style={styles.objectiveText}>{objective}</Text>
    </View>
  );
}

interface InterpretationLayerProps {
  feedback: string;
  formulations: ClaimFormulation[];
  onFormulationSelected: (formulationId: string) => void;
  onReturnToScene: () => void;
}

function InterpretationLayer({
  feedback,
  formulations,
  onFormulationSelected,
  onReturnToScene,
}: InterpretationLayerProps) {
  return (
    <View style={styles.interpretationLayer}>
      <View style={styles.layerHeader}>
        <StatusPill label="marca material" tone="consequence" />
        <Pressable accessibilityRole="button" onPress={onReturnToScene} style={styles.smallAction}>
          <Text style={styles.smallActionText}>Volver</Text>
        </Pressable>
      </View>
      <Text style={styles.feedbackText}>{feedback}</Text>
      <View style={styles.formulationStack}>
        {formulations.map((formulation) => (
          <Pressable
            accessibilityRole="button"
            key={formulation.id}
            onPress={() => onFormulationSelected(formulation.id)}
            style={styles.formulationButton}
          >
            <Text style={styles.formulationText}>{formulation.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

interface ConfirmedLayerProps {
  claimText?: string | undefined;
  onOpenRegistry: () => void;
  scene: NarrativeSceneData;
}

function ConfirmedLayer({ claimText, onOpenRegistry, scene }: ConfirmedLayerProps) {
  return (
    <View style={styles.confirmedLayer}>
      <View style={styles.layerHeader}>
        <StatusPill label="CONSECUENCIA" tone="consequence" />
        <Text style={styles.archiveStamp}>Marca archivada</Text>
      </View>
      <Text style={styles.dialogueText}>{scene.dialogue}</Text>
      {claimText != null && <Text style={styles.claimText}>{claimText}</Text>}
      <Pressable accessibilityRole="button" onPress={onOpenRegistry} style={styles.sceneAction}>
        <Text style={styles.sceneActionText}>Abrir registro civil</Text>
      </Pressable>
    </View>
  );
}

function getHotspotLayout(hotspot: Hotspot) {
  return {
    height: `${hotspot.layout?.height ?? 14}%` as DimensionValue,
    left: `${hotspot.layout?.x ?? 0}%` as DimensionValue,
    top: `${hotspot.layout?.y ?? 0}%` as DimensionValue,
    width: `${hotspot.layout?.width ?? 14}%` as DimensionValue,
  };
}

const styles = StyleSheet.create({
  archiveStamp: {
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  caseCode: {
    color: colors.paperPressed,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
  },
  caseTitle: {
    color: colors.paper,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  claimText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 18,
  },
  confirmedLayer: {
    backgroundColor: "rgba(241,238,229,0.94)",
    borderColor: colors.consequence,
    borderLeftColor: colors.consequence,
    borderLeftWidth: 5,
    borderWidth: 1,
    gap: spacing.xs,
    left: spacing.sm,
    padding: spacing.sm,
    position: "absolute",
    right: spacing.sm,
    top: spacing.sm,
    zIndex: 8,
  },
  cupHotspot: {
    alignItems: "center",
    backgroundColor: "rgba(241,238,229,0.05)",
    borderColor: colors.paper,
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    minWidth: 44,
    position: "absolute",
    zIndex: 5,
  },
  cupHotspotArchived: {
    backgroundColor: "rgba(88,118,104,0.14)",
    borderColor: colors.consequence,
    borderStyle: "solid",
  },
  cupHotspotSelected: {
    backgroundColor: "rgba(241,238,229,0.16)",
    borderColor: colors.consequence,
    borderWidth: 2,
  },
  dialogueLayer: {
    backgroundColor: "rgba(241,238,229,0.92)",
    borderColor: colors.hairline,
    borderWidth: 1,
    gap: spacing.xs,
    left: spacing.sm,
    padding: spacing.sm,
    position: "absolute",
    right: spacing.sm,
    top: spacing.sm,
    zIndex: 8,
  },
  dialogueText: {
    color: colors.ink,
    fontSize: typography.size.body,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 22,
  },
  feedbackText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 18,
  },
  formulationButton: {
    backgroundColor: "rgba(255,255,255,0.82)",
    borderColor: colors.hairline,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  formulationStack: {
    gap: spacing.xs,
  },
  formulationText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  hotspotNeedle: {
    backgroundColor: colors.paper,
    borderColor: colors.institutionalGreen,
    borderRadius: 999,
    borderWidth: 2,
    height: 12,
    opacity: 0.92,
    width: 12,
  },
  inlineObjective: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 18,
  },
  interpretationLayer: {
    backgroundColor: "rgba(241,238,229,0.94)",
    borderColor: colors.hairline,
    borderWidth: 1,
    gap: spacing.xs,
    left: spacing.sm,
    padding: spacing.sm,
    position: "absolute",
    right: spacing.sm,
    top: spacing.sm,
    zIndex: 8,
  },
  kitchenFrame: {
    backgroundColor: colors.paperPressed,
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  kitchenImage: {
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  layerHeader: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    justifyContent: "space-between",
  },
  objectiveLayer: {
    alignItems: "flex-start",
    backgroundColor: "rgba(241,238,229,0.92)",
    borderColor: colors.hairline,
    borderLeftColor: colors.institutionalGreen,
    borderLeftWidth: 5,
    borderWidth: 1,
    gap: spacing.xs,
    left: spacing.sm,
    padding: spacing.sm,
    position: "absolute",
    right: spacing.sm,
    top: spacing.sm,
    zIndex: 8,
  },
  objectiveText: {
    color: colors.ink,
    fontSize: typography.size.section,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 23,
  },
  sceneAction: {
    alignItems: "center",
    borderColor: colors.hairline,
    borderTopWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  sceneActionText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  sceneMeta: {
    backgroundColor: colors.institutionalGreen,
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  sceneShell: {
    backgroundColor: colors.shadow,
    borderColor: colors.hairline,
    borderWidth: 1,
    overflow: "hidden",
  },
  sceneWrap: {
    gap: spacing.sm,
  },
  smallAction: {
    alignItems: "center",
    borderColor: colors.hairline,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  smallActionText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
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
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
});
