import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CaseChrome } from "@/components/shared/CaseChrome";
import { PaperPanel } from "@/components/shared/PaperPanel";
import { EnaFilePlaceholder } from "@/components/shared/Placeholders";
import { StatusPill } from "@/components/shared/StatusPill";
import { TutorialKitchenScene } from "@/components/tutorial/TutorialKitchenScene";
import { getCase } from "@/content";
import { useGameStore } from "@/store/useGameStore";
import { colors, spacing, typography } from "@/theme";

export default function OverviewScreen() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const router = useRouter();
  const gameCase = getCase(caseId);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const progress = useGameStore((state) => state.progress);
  const unlockClaim = useGameStore((state) => state.unlockClaim);
  const currentObjectiveId = progress.currentObjectiveId;
  const objective =
    gameCase.objectives.find((item) => item.id === currentObjectiveId) ?? gameCase.objectives[0];

  useEffect(() => {
    setActiveTab("overview");
  }, [setActiveTab]);

  return (
    <CaseChrome gameCase={gameCase}>
      {(progress.tutorialStage === "kitchen" || progress.tutorialStage === "recordUnlocked") && (
        <TutorialKitchenScene
          gameCase={gameCase}
          onClaimExtracted={unlockClaim}
          onOpenRegistry={() => router.push(`/case/${gameCase.id}/evidence`)}
          progress={progress}
        />
      )}

      {progress.tutorialStage !== "kitchen" && (
        <>
      <PaperPanel meta="Expediente de recepción" title={gameCase.title} variant="slip">
        <EnaFilePlaceholder />
        <View style={styles.metaGrid}>
          <View style={styles.metaCell}>
            <Text style={styles.label}>Sujeto</Text>
            <Text style={styles.value}>Ena Var</Text>
          </View>
          <View style={styles.metaCell}>
            <Text style={styles.label}>Ubicacion</Text>
            <Text style={styles.value}>Casa de Ena / línea 07:14</Text>
          </View>
          <View style={styles.metaCell}>
            <Text style={styles.label}>Motivo</Text>
            <Text style={styles.value}>Conviviente sin registro civil verificable</Text>
          </View>
        </View>
        <StatusPill label="expediente abierto" tone="record" />
      </PaperPanel>

      <PaperPanel meta="Orden interna" title="Objetivo asignado">
        <Text style={styles.body}>{objective?.text}</Text>
      </PaperPanel>

      <PaperPanel meta="Notas de ingreso" title="Anclas declaradas">
        <View style={styles.anchorList}>
          <Text style={styles.body}>1. Ancla corporal pendiente de declaración.</Text>
          <Text style={styles.body}>2. Noa me crió.</Text>
          <Text style={styles.body}>3. Volveré a la estación.</Text>
        </View>
      </PaperPanel>
        </>
      )}
    </CaseChrome>
  );
}

const styles = StyleSheet.create({
  anchorList: {
    gap: spacing.xs,
  },
  body: {
    color: colors.ink,
    fontSize: typography.size.body,
    letterSpacing: 0,
    lineHeight: 22,
  },
  label: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  metaCell: {
    gap: spacing.xxs,
  },
  metaGrid: {
    gap: spacing.sm,
  },
  value: {
    color: colors.ink,
    fontSize: typography.size.body,
    letterSpacing: 0,
  },
});
