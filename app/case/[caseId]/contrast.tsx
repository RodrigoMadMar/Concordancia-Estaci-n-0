import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { CategoryTray } from "@/components/contrast/CategoryTray";
import { NarrativeScene } from "@/components/narrative/NarrativeScene";
import { CaseChrome } from "@/components/shared/CaseChrome";
import { PaperPanel } from "@/components/shared/PaperPanel";
import { StatusPill } from "@/components/shared/StatusPill";
import { getCase } from "@/content";
import { tutorialFirstSealScene } from "@/content/tutorialVisuals";
import {
  getActiveContrastRule,
  getArchivedClaims,
  getClaimById,
  getObservationById,
  validateContrast,
  type ClaimWithEvidence,
  type ContrastRelation,
} from "@/domain/contrastEngine";
import type { Observation } from "@/domain/types";
import { useGameStore } from "@/store/useGameStore";
import { colors, spacing, typography } from "@/theme";
import {
  playDiscordanceFeedback,
  playStampFeedback,
  playTrainReleaseFeedback,
} from "@/utils/feedback";

const relationOptions: { label: string; relation: ContrastRelation }[] = [
  { label: "COINCIDEN", relation: "supports" },
  { label: "SE CONTRADICEN", relation: "contradicts" },
  { label: "UNA DEJA HUELLA EN OTRA", relation: "leaves_trace" },
];

export default function ContrastScreen() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const gameCase = getCase(caseId);
  const [feedback, setFeedback] = useState("La Mesa espera dos o tres marcas archivadas.");
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const progress = useGameStore((state) => state.progress);
  const toggleSelectedClaim = useGameStore((state) => state.toggleSelectedClaim);
  const clearSelectedClaims = useGameStore((state) => state.clearSelectedClaims);
  const unlockObservation = useGameStore((state) => state.unlockObservation);

  const archivedClaims = useMemo(() => getArchivedClaims(gameCase, progress), [gameCase, progress]);
  const tutorialClaimIds = useMemo(
    () =>
      gameCase.tutorial == null
        ? []
        : [gameCase.tutorial.cupClaimId, gameCase.tutorial.registryClaimId],
    [gameCase.tutorial],
  );
  const isTutorialMesa = progress.tutorialStage === "mesaUnlocked";
  const visibleArchivedClaims = isTutorialMesa
    ? archivedClaims.filter((item) => tutorialClaimIds.includes(item.claim.id))
    : archivedClaims;
  const selectedClaims = progress.selectedClaimIds
    .map((claimId) => getClaimById(gameCase, claimId))
    .filter((claim): claim is ClaimWithEvidence => claim != null);
  const activeRule = getActiveContrastRule(gameCase, progress);
  const usedClaimIds = useMemo(() => {
    const emittedRules = gameCase.contrastRules.filter((rule) =>
      progress.unlockedObservationIds.includes(rule.observationId),
    );

    return Array.from(new Set(emittedRules.flatMap((rule) => rule.requiredClaimIds)));
  }, [gameCase.contrastRules, progress.unlockedObservationIds]);
  const emittedObservations = progress.unlockedObservationIds
    .map((observationId) => getObservationById(gameCase, observationId))
    .filter((observation): observation is Observation => observation != null);
  const objective =
    gameCase.objectives.find((item) => item.id === progress.currentObjectiveId) ??
    gameCase.objectives[0];
  const narrativeLines = getNarrativeLines(progress.unlockedObservationIds);
  const showFirstSealScene =
    progress.unlockedObservationIds.includes("obs-tutorial-second-person") &&
    !progress.unlockedObservationIds.includes("obs-alternate-room");

  useEffect(() => {
    setActiveTab("contrast");
  }, [setActiveTab]);

  function handleRelation(relation: ContrastRelation) {
    const result = validateContrast(gameCase, progress, progress.selectedClaimIds, relation);

    setFeedback(result.feedback);

    if (result.ok && result.observation != null) {
      if (result.observation.id === "obs-alternate-room" || result.observation.id === "obs-discordance") {
        playDiscordanceFeedback();
      } else {
        playStampFeedback();
      }
      unlockObservation(result.observation.id);
      setFeedback(`OBSERVACIÓN ${getObservationLabel(result.observation).toUpperCase()} — ${result.observation.text}`);

      if (result.observation.id === gameCase.tutorial?.mesaObservationId) {
        playTrainReleaseFeedback();
      }
    }
  }

  const recordClaims = visibleArchivedClaims.filter((item) => item.claim.category === "record");
  const memoryClaims = visibleArchivedClaims.filter((item) => item.claim.category === "memory");
  const consequenceClaims = visibleArchivedClaims.filter(
    (item) => item.claim.category === "consequence",
  );

  return (
    <CaseChrome gameCase={gameCase}>
      <PaperPanel meta="Módulo de contraste" title="La Mesa" variant="slip">
        <View style={styles.objectiveBlock}>
          <StatusPill label={activeRule == null ? "mesa cerrada" : "sello pendiente"} tone="record" />
          <Text style={styles.body}>{objective?.text}</Text>
          {isTutorialMesa && (
            <Text style={styles.guideText}>
              Seleccione la marca doméstica y el registro civil. La relación disponible debe explicar
              por qué no pueden estabilizarse juntos.
            </Text>
          )}
          <Text style={styles.caseState}>
            Estado: {getCaseStateLabel(progress.caseStatus)}
          </Text>
        </View>

        <View style={styles.trays}>
          <CategoryTray
            category="record"
            claims={recordClaims}
            instruction="Recepción aún no archivó registros cotejables."
            label="Registro"
            onToggleClaim={toggleSelectedClaim}
            selectedClaimIds={progress.selectedClaimIds}
            usedClaimIds={usedClaimIds}
          />
          <CategoryTray
            category="memory"
            claims={memoryClaims}
            instruction="Recepción aún no archivó memorias cotejables."
            label="Memoria"
            onToggleClaim={toggleSelectedClaim}
            selectedClaimIds={progress.selectedClaimIds}
            usedClaimIds={usedClaimIds}
          />
          <CategoryTray
            category="consequence"
            claims={consequenceClaims}
            instruction="Recepción aún no archivó consecuencias cotejables."
            label="Consecuencia"
            onToggleClaim={toggleSelectedClaim}
            selectedClaimIds={progress.selectedClaimIds}
            usedClaimIds={usedClaimIds}
          />
        </View>
      </PaperPanel>

      <PaperPanel meta="Área de cotejo" title="Marcas sobre mesa">
        <View style={styles.cotejoStack}>
          {selectedClaims.length === 0 ? (
            <Text style={styles.body}>Seleccione dos o tres marcas archivadas desde las bandejas.</Text>
          ) : (
            selectedClaims.map((item) => (
              <View key={item.claim.id} style={styles.selectedSlip}>
                <Text style={styles.selectedOrigin}>
                  {item.evidenceCode} / {item.evidenceTitle}
                </Text>
                <Text style={styles.selectedText}>{item.claim.text}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.relationStack}>
          {relationOptions.map((option) => (
            <Pressable
              accessibilityRole="button"
              key={option.relation}
              onPress={() => handleRelation(option.relation)}
              style={styles.relationButton}
            >
              <Text style={styles.relationText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.feedbackBand}>
          <Text style={styles.feedback}>{feedback}</Text>
        </View>

        {selectedClaims.length > 0 && (
          <Pressable accessibilityRole="button" onPress={clearSelectedClaims} style={styles.clearButton}>
            <Text style={styles.clearText}>Retirar marcas del cotejo</Text>
          </Pressable>
        )}
      </PaperPanel>

      {narrativeLines.length > 0 && (
        <PaperPanel meta="Reacción ambiental" title="Después del sello">
          {showFirstSealScene ? (
            <NarrativeScene
              dialogo={tutorialFirstSealScene.dialogue}
              fondo={tutorialFirstSealScene.backgroundId}
              hablanteActivo={tutorialFirstSealScene.activeCharacterId}
              height={292}
              objetivo={tutorialFirstSealScene.objective}
              personajesVisibles={tutorialFirstSealScene.portraits}
              speakerLabel={tutorialFirstSealScene.speakerLabel}
            />
          ) : (
            <View style={styles.dialogueStack}>
              {narrativeLines.map((line) => (
                <Text key={line} style={styles.dialogueLine}>
                  {line}
                </Text>
              ))}
            </View>
          )}
        </PaperPanel>
      )}

      <PaperPanel meta="Observaciones" title="Sellos emitidos">
        {emittedObservations.length === 0 ? (
          <View style={styles.observationHeader}>
            <StatusPill label="sin sello" tone="locked" />
            <Text style={styles.body}>La Mesa no ha archivado observaciones.</Text>
          </View>
        ) : (
          <View style={styles.sealStack}>
            {emittedObservations.map((observation) => (
              <ObservationSeal key={observation.id} observation={observation} />
            ))}
          </View>
        )}
      </PaperPanel>

      {progress.tutorialStage === "discordanceConfirmed" && (
        <PaperPanel meta="Secuencia" title="Reconstrucción bloqueada" variant="sealed">
          <Text style={styles.body}>
            La discordancia quedó confirmada. La Mesa conserva las marcas para reconstruir el
            corte de continuidad en la siguiente fase.
          </Text>
        </PaperPanel>
      )}
    </CaseChrome>
  );
}

function getCaseStateLabel(caseStatus: string): string {
  if (caseStatus === "discordanceConfirmed") {
    return "DISCORDANCIA CONFIRMADA";
  }

  if (caseStatus === "sequencePending") {
    return "discordancia asentada";
  }

  return caseStatus === "contrasting" ? "cotejo" : "recepción";
}

function getNarrativeLines(unlockedObservationIds: string[]): string[] {
  if (unlockedObservationIds.includes("obs-discordance")) {
    return [
      "Maru: El papel lo niega, pero la casa sigue gastando su lugar.",
      "Kiru: Toma no aparece. Queda la presión de haber sido retirado.",
    ];
  }

  if (unlockedObservationIds.includes("obs-alternate-room")) {
    return [
      "Maru: La cámara no perdió un minuto. Registró otra habitación.",
      "Kiru: La misma habitación. Otra historia.",
    ];
  }

  if (unlockedObservationIds.includes("obs-tutorial-second-person")) {
    return ["La taza vibra una vez. A lo lejos, el tren pasa por una vía cerrada."];
  }

  return [];
}

function getObservationLabel(observation: Observation): string {
  if (observation.strength === "discordance") {
    return "discordancia confirmada";
  }

  if (observation.strength === "confirmed") {
    return "confirmada";
  }

  return "firme";
}

function ObservationSeal({ observation }: { observation: Observation }) {
  const tone = observation.strength === "discordance" ? "remnant" : "record";
  const label = getObservationLabel(observation);

  return (
    <View style={[styles.seal, observation.strength === "discordance" && styles.discordanceSeal]}>
      <StatusPill label={label} tone={tone} />
      <Text style={styles.sealText}>{observation.text}</Text>
      <Text style={styles.sealStamp}>Sello emitido</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.mutedInk,
    fontSize: typography.size.body,
    letterSpacing: 0,
    lineHeight: 22,
  },
  caseState: {
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  clearButton: {
    alignItems: "center",
    borderColor: colors.hairline,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  clearText: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  cotejoStack: {
    gap: spacing.xs,
  },
  discordanceSeal: {
    backgroundColor: colors.paperAged,
    borderColor: colors.remnant,
    boxShadow: `2px 2px 0px ${colors.remnant}33`,
  },
  dialogueLine: {
    color: colors.ink,
    fontSize: typography.size.body,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 21,
  },
  dialogueStack: {
    gap: spacing.xs,
  },
  feedback: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 18,
  },
  guideText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 18,
  },
  feedbackBand: {
    backgroundColor: colors.paperAged,
    borderColor: colors.hairline,
    borderWidth: 1,
    padding: spacing.sm,
  },
  objectiveBlock: {
    gap: spacing.xs,
  },
  observationHeader: {
    gap: spacing.sm,
  },
  relationButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    padding: spacing.sm,
  },
  relationStack: {
    gap: spacing.xs,
  },
  relationText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textAlign: "center",
  },
  seal: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderLeftColor: colors.institutionalGreen,
    borderLeftWidth: 5,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
  },
  sealStack: {
    gap: spacing.xs,
  },
  sealStamp: {
    alignSelf: "flex-start",
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  sealText: {
    color: colors.ink,
    fontSize: typography.size.body,
    letterSpacing: 0,
    lineHeight: 21,
  },
  selectedOrigin: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  selectedSlip: {
    backgroundColor: colors.white,
    borderColor: colors.memory,
    borderLeftColor: colors.memory,
    borderLeftWidth: 5,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
  },
  selectedText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
  trays: {
    gap: spacing.sm,
  },
});
