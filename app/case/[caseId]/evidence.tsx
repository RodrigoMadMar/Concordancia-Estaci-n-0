import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AssetGallery } from "@/components/dev/AssetGallery";
import { EvidenceRow } from "@/components/evidence/EvidenceRow";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { CaseChrome } from "@/components/shared/CaseChrome";
import { PaperPanel } from "@/components/shared/PaperPanel";
import { getCase } from "@/content";
import { getEvidenceStatusLabels } from "@/domain/evidenceProgress";
import type { CaseProgress, Evidence, GameCase } from "@/domain/types";
import { useGameStore } from "@/store/useGameStore";
import { colors, spacing, typography } from "@/theme";

export default function EvidenceScreen() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const router = useRouter();
  const gameCase = getCase(caseId);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | undefined>();
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const progress = useGameStore((state) => state.progress);
  const markEvidenceReviewed = useGameStore((state) => state.markEvidenceReviewed);
  const unlockClaim = useGameStore((state) => state.unlockClaim);
  const resetProgress = useGameStore((state) => state.resetProgress);
  const clearStoredProgress = useGameStore((state) => state.clearStoredProgress);
  const unlockEvidencesForDevelopment = useGameStore(
    (state) => state.unlockEvidencesForDevelopment,
  );
  const visibleEvidence = useMemo(
    () => getVisibleEvidenceForProgress(gameCase, progress),
    [gameCase, progress],
  );

  const selectedEvidence = useMemo(
    () => visibleEvidence.find((evidence) => evidence.id === selectedEvidenceId),
    [selectedEvidenceId, visibleEvidence],
  );

  useEffect(() => {
    setActiveTab("evidence");
  }, [setActiveTab]);

  useEffect(() => {
    if (
      selectedEvidenceId != null &&
      !progress.reviewedEvidenceIds.includes(selectedEvidenceId)
    ) {
      markEvidenceReviewed(selectedEvidenceId);
    }
  }, [markEvidenceReviewed, progress.reviewedEvidenceIds, selectedEvidenceId]);

  return (
    <CaseChrome gameCase={gameCase}>
      <PaperPanel meta="Bandeja de recepción" title="Piezas recibidas" variant="slip">
        <Text style={styles.body}>
          Recepción abre una pieza a la vez. Las marcas válidas quedan archivadas para la
          Mesa.
        </Text>
        <View>
          {visibleEvidence.map((evidence) => (
            <EvidenceRow
              evidence={evidence}
              key={evidence.id}
              onPress={() => setSelectedEvidenceId(evidence.id)}
              statusLabels={getEvidenceStatusLabels(evidence, progress)}
            />
          ))}
        </View>
      </PaperPanel>

      {progress.tutorialStage === "mesaUnlocked" && (
        <PaperPanel meta="Mesa habilitada" title="Dos marcas listas">
          <Text style={styles.body}>
            La marca doméstica y el registro oficial ya pueden cotejarse sin abrir nuevas piezas.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/case/${gameCase.id}/contrast`)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Ir a La Mesa</Text>
          </Pressable>
        </PaperPanel>
      )}

      {progress.tutorialStage === "cameraUnlocked" && (
        <PaperPanel meta="Nueva pieza" title="Cámara de arrastre liberada">
          <Text style={styles.body}>
            El sello hizo vibrar la taza. Recepción autoriza revisar la secuencia alrededor de
            las 07:14.
          </Text>
        </PaperPanel>
      )}

      {(progress.tutorialStage === "identityUnlocked" ||
        progress.tutorialStage === "discordanceConfirmed") && (
        <PaperPanel meta="Nuevas piezas" title="Segunda continuidad">
          <Text style={styles.body}>
            La cámara no cerró la pregunta. Recepción libera memoria, soporte civil y cinta
            remanente para identificar la continuidad restante.
          </Text>
        </PaperPanel>
      )}

      {progress.tutorialStage === "discordanceConfirmed" && (
        <PaperPanel meta="Secuencia" title="Reconstrucción bloqueada" variant="sealed">
          <Text style={styles.body}>
            La Mesa reconoce la discordancia. La reconstrucción del corte queda preparada para
            la siguiente fase.
          </Text>
        </PaperPanel>
      )}

      {__DEV__ && (
        <View style={styles.devEntryWrap}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsDevOpen((current) => !current)}
            style={styles.devEntry}
          >
            <Text style={styles.devEntryText}>Mesa auxiliar</Text>
          </Pressable>
          {isDevOpen && (
            <PaperPanel meta="Desarrollo" title="Controles de prueba" variant="sealed">
              <View style={styles.devActions}>
                <DevButton label="Reiniciar Caso 0" onPress={resetProgress} />
                <DevButton label="Borrar progreso" onPress={() => void clearStoredProgress()} />
                <DevButton label="Desbloquear evidencias" onPress={unlockEvidencesForDevelopment} />
                <DevButton label="Galeria de assets" onPress={() => setIsGalleryOpen(true)} />
              </View>
            </PaperPanel>
          )}
        </View>
      )}

      {__DEV__ && (
        <Modal animationType="slide" onRequestClose={() => setIsGalleryOpen(false)} visible={isGalleryOpen}>
          <SafeAreaView style={styles.modalRoot}>
            <View style={styles.modalHeader}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsGalleryOpen(false)}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>Volver a Mesa auxiliar</Text>
              </Pressable>
              <View style={styles.modalTitleBlock}>
                <Text style={styles.modalMeta}>Desarrollo</Text>
                <Text style={styles.modalTitle}>Galeria de assets</Text>
              </View>
            </View>
            <AssetGallery />
          </SafeAreaView>
        </Modal>
      )}

      {selectedEvidence != null && (
        <Modal animationType="slide" onRequestClose={() => setSelectedEvidenceId(undefined)} visible>
          <SafeAreaView style={styles.modalRoot}>
            <View style={styles.modalHeader}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setSelectedEvidenceId(undefined)}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>Volver a Piezas</Text>
              </Pressable>
              <View style={styles.modalTitleBlock}>
                <Text style={styles.modalMeta}>{selectedEvidence.code}</Text>
                <Text style={styles.modalTitle}>{selectedEvidence.title}</Text>
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
              <PaperPanel meta="Mesa de inspección" title="Visor de evidencia">
                <EvidenceViewer
                  evidence={selectedEvidence}
                  onClaimExtracted={unlockClaim}
                  progress={progress}
                />
              </PaperPanel>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}
    </CaseChrome>
  );
}

function getVisibleEvidenceForProgress(gameCase: GameCase, progress: CaseProgress): Evidence[] {
  const tutorial = gameCase.tutorial;

  if (tutorial == null) {
    return gameCase.evidence;
  }

  if (progress.tutorialStage === "kitchen") {
    return [];
  }

  const registry = gameCase.evidence.find((evidence) => evidence.id === tutorial.registryEvidenceId);
  const camera = gameCase.evidence.find((evidence) => evidence.id === tutorial.cameraEvidenceId);
  const declaration = gameCase.evidence.find((evidence) => evidence.id === "e-01");
  const breakfast = gameCase.evidence.find((evidence) => evidence.id === "e-03");
  const tape = gameCase.evidence.find((evidence) => evidence.id === "e-05");

  if (registry == null) {
    return [];
  }

  const tutorialRegistry = createTutorialRegistryEvidence(registry, tutorial.registryClaimId);

  if (progress.tutorialStage === "cameraUnlocked") {
    return [createCameraEvidence(camera)].filter((evidence): evidence is Evidence => evidence != null);
  }

  if (
    progress.tutorialStage === "identityUnlocked" ||
    progress.tutorialStage === "discordanceConfirmed"
  ) {
    return [declaration, createIdentityRegistryEvidence(registry), createIdentityBreakfastEvidence(breakfast), tape].filter(
      (evidence): evidence is Evidence => evidence != null,
    );
  }

  return [tutorialRegistry];
}

function createTutorialRegistryEvidence(evidence: Evidence, claimId: string): Evidence {
  const hotspots = evidence.hotspots?.filter((hotspot) => hotspot.claimId === claimId);

  return {
    ...evidence,
    claims: evidence.claims.filter((claim) => claim.id === claimId),
    description: "Certificado civil habilitado para cotejo inicial.",
    ...(hotspots != null && { hotspots }),
    inspection: {
      ...evidence.inspection,
      instructions: "Toque el dato oficial marcado para formular una afirmación de registro.",
      summary: "Hoja oficial suficiente para cotejar la cocina con un dato administrativo.",
    },
  };
}

function createCameraEvidence(evidence?: Evidence): Evidence | undefined {
  if (evidence == null) {
    return undefined;
  }

  const relevantClaimIds = ["claim-record-empty-room", "claim-consequence-missing-cup"];
  const hotspots = evidence.hotspots?.filter((hotspot) =>
    relevantClaimIds.includes(hotspot.claimId ?? ""),
  );
  const frames = evidence.inspection.frames?.map((frame) =>
    relevantClaimIds.includes(frame.claimId ?? "")
      ? frame
      : {
          id: frame.id,
          text: frame.text,
          time: frame.time,
        },
  );

  return {
    ...evidence,
    claims: evidence.claims.filter((claim) => relevantClaimIds.includes(claim.id)),
    ...(hotspots != null && { hotspots }),
    inspection: {
      ...evidence.inspection,
      ...(frames != null && { frames }),
      instructions:
        "Revise los fotogramas alrededor de 07:14. No toda marca visible produce todavía una afirmación.",
      summary: "Tira de cámara liberada tras el sello doméstico.",
    },
  };
}

function createIdentityRegistryEvidence(evidence: Evidence): Evidence {
  const claimIds = ["claim-record-erased-line"];
  const hotspots = evidence.hotspots?.filter((hotspot) => claimIds.includes(hotspot.claimId ?? ""));

  return {
    ...evidence,
    claims: evidence.claims.filter((claim) => claimIds.includes(claim.id)),
    ...(hotspots != null && { hotspots }),
    inspection: {
      ...evidence.inspection,
      instructions: "Revise el reverso. La huella del soporte puede archivarse sin leer el nombre.",
      summary: "El certificado vuelve con luz rasante aplicada sobre el reverso.",
    },
  };
}

function createIdentityBreakfastEvidence(evidence?: Evidence): Evidence | undefined {
  if (evidence == null) {
    return undefined;
  }

  const claimIds = ["claim-consequence-second-cup"];
  const hotspots = evidence.hotspots?.filter((hotspot) => claimIds.includes(hotspot.claimId ?? ""));

  return {
    ...evidence,
    claims: evidence.claims.filter((claim) => claimIds.includes(claim.id)),
    ...(hotspots != null && { hotspots }),
    inspection: {
      ...evidence.inspection,
      instructions: "Recepción separa la huella material de la formulación usada en el tutorial.",
      summary: "La mesa de desayuno se reabre como soporte material, no como escena introductoria.",
    },
  };
}

interface DevButtonProps {
  label: string;
  onPress: () => void;
}

function DevButton({ label, onPress }: DevButtonProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.devButton}>
      <Text style={styles.devButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    borderColor: colors.paperPressed,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  backButtonText: {
    color: colors.white,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  body: {
    color: colors.mutedInk,
    fontSize: typography.size.body,
    letterSpacing: 0,
    lineHeight: 22,
  },
  devActions: {
    gap: spacing.xs,
  },
  devButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  devButtonText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  devEntry: {
    alignSelf: "flex-end",
    borderBottomColor: colors.hairline,
    borderBottomWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.xs,
  },
  devEntryText: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  devEntryWrap: {
    gap: spacing.xs,
  },
  modalContent: {
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.xl,
    width: "100%",
  },
  modalHeader: {
    alignItems: "center",
    backgroundColor: colors.institutionalGreen,
    borderBottomColor: colors.shadow,
    borderBottomWidth: 2,
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  modalMeta: {
    color: colors.paperPressed,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
  },
  modalRoot: {
    backgroundColor: colors.white,
    flex: 1,
  },
  modalTitle: {
    color: colors.white,
    fontSize: typography.size.body,
    fontWeight: "800",
    letterSpacing: 0,
  },
  modalTitleBlock: {
    flex: 1,
    minWidth: 0,
  },
  primaryButton: {
    alignItems: "center",
    borderColor: colors.institutionalGreen,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  primaryButtonText: {
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
});
