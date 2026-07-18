import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  CameraSequencePlaceholder,
  DocumentThumbnail,
  MagneticTapePlaceholder,
} from "@/components/shared/Placeholders";
import { StatusPill } from "@/components/shared/StatusPill";
import { findClaim, getExtractedClaims, isPreciseFormulation } from "@/domain/evidenceProgress";
import type { CaseProgress, Claim, Evidence, EvidenceFrame, EvidenceSection } from "@/domain/types";
import { colors, spacing, typography } from "@/theme";

interface EvidenceViewerProps {
  evidence: Evidence;
  progress: CaseProgress;
  onClaimExtracted: (claimId: string) => void;
}

function getCategoryLabel(claim: Claim): string {
  const labelByCategory = {
    anomaly: "ANOMALÍA",
    consequence: "CONSECUENCIA",
    memory: "MEMORIA",
    record: "REGISTRO",
  } as const;

  if (claim.remnant) {
    return `${labelByCategory[claim.category]} / REMANENTE`;
  }

  return labelByCategory[claim.category];
}

function getClaimTone(claim: Claim): "record" | "memory" | "consequence" | "remnant" {
  if (claim.remnant) {
    return "remnant";
  }

  if (claim.category === "anomaly") {
    return "remnant";
  }

  return claim.category;
}

function getInitialSection(sections?: EvidenceSection[]): EvidenceSection | undefined {
  return sections?.[0];
}

function getInitialFrame(frames?: EvidenceFrame[]): EvidenceFrame | undefined {
  return frames?.[0];
}

export function EvidenceViewer({ evidence, onClaimExtracted, progress }: EvidenceViewerProps) {
  const [activeSectionId, setActiveSectionId] = useState(
    getInitialSection(evidence.inspection.sections)?.id,
  );
  const [activeFrameId, setActiveFrameId] = useState(
    getInitialFrame(evidence.inspection.frames)?.id,
  );
  const [activeClaimId, setActiveClaimId] = useState<string | undefined>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState("Mesa lista para recibir una marca.");

  const extractedClaims = getExtractedClaims(evidence, progress);
  const activeClaim = findClaim(evidence, activeClaimId);
  const activeSection =
    evidence.inspection.sections?.find((section) => section.id === activeSectionId) ??
    getInitialSection(evidence.inspection.sections);
  const activeFrame =
    evidence.inspection.frames?.find((frame) => frame.id === activeFrameId) ??
    getInitialFrame(evidence.inspection.frames);
  const archivedClaimIds = progress.unlockedClaimIds;

  const visualKind = useMemo(() => {
    if (evidence.type === "audio") {
      return "audio";
    }

    if (evidence.type === "sequence") {
      return "sequence";
    }

    if (evidence.type === "scene") {
      return "scene";
    }

    return "document";
  }, [evidence.type]);

  function inspectClaim(claimId?: string) {
    const claim = findClaim(evidence, claimId);

    if (claim == null) {
      setFeedback("La marca no produce una afirmación estable.");
      setActiveClaimId(undefined);
      return;
    }

    setActiveClaimId(claim.id);
    setFeedback("Seleccione la formulación más precisa.");
  }

  function selectFormulation(formulationId: string) {
    if (activeClaim == null) {
      return;
    }

    if (isPreciseFormulation(activeClaim, formulationId)) {
      onClaimExtracted(activeClaim.id);
      setFeedback("Afirmación archivada por la Mesa.");
      return;
    }

    setFeedback("Formulación rechazada: contiene inferencia excesiva.");
  }

  function isClaimArchived(claimId?: string): boolean {
    return claimId != null && archivedClaimIds.includes(claimId);
  }

  function getInspectableStyle(claimId?: string) {
    return [
      claimId != null && styles.inspectable,
      activeClaimId === claimId && styles.inspectableSelected,
      isClaimArchived(claimId) && styles.inspectableArchived,
    ];
  }

  return (
    <View style={styles.viewer}>
      <View style={styles.headerLine}>
        <View>
          <Text style={styles.meta}>{evidence.code}</Text>
          <Text style={styles.title}>{evidence.title}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsExpanded((current) => !current)}
          style={styles.expandButton}
        >
          <Text style={styles.expandText}>{isExpanded ? "Reducir" : "Ampliar"}</Text>
        </Pressable>
      </View>

      <Text style={styles.body}>{evidence.inspection.summary}</Text>
      <Text style={styles.instruction}>{evidence.inspection.instructions}</Text>

      <View style={[styles.materialSurface, isExpanded && styles.materialSurfaceExpanded]}>
        {visualKind === "document" && <DocumentThumbnail />}
        {visualKind === "scene" && <SceneDiagram />}
        {visualKind === "sequence" && <CameraSequencePlaceholder />}
        {visualKind === "audio" && <MagneticTapePlaceholder />}
      </View>

      {evidence.inspection.sections != null && (
        <View style={styles.segmentGroup}>
          {evidence.inspection.sections.map((section) => (
            <Pressable
              accessibilityRole="button"
              key={section.id}
              onPress={() => setActiveSectionId(section.id)}
              style={[styles.segment, section.id === activeSection?.id && styles.segmentActive]}
            >
              <Text style={styles.segmentText}>{section.side === "back" ? "Reverso" : section.title}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {activeSection != null && (
        <View style={styles.inspectionBlock}>
          <Text style={styles.blockTitle}>{activeSection.title}</Text>
          <Text style={styles.body}>{activeSection.body}</Text>
        </View>
      )}

      {evidence.inspection.frames != null && (
        <View style={styles.frameStack}>
          {evidence.inspection.frames.map((frame) => (
            <Pressable
              accessibilityRole="button"
              key={frame.id}
              onPress={() => {
                setActiveFrameId(frame.id);
                inspectClaim(frame.claimId);
              }}
              style={[
                styles.frame,
                frame.id === activeFrame?.id && styles.frameActive,
                ...getInspectableStyle(frame.claimId),
              ]}
            >
              <Text style={styles.frameTime}>{frame.time}</Text>
              <Text style={styles.frameText}>{frame.text}</Text>
              {isClaimArchived(frame.claimId) && <Text style={styles.archiveStamp}>Archivada</Text>}
            </Pressable>
          ))}
        </View>
      )}

      {evidence.inspection.transcript != null && (
        <View style={styles.transcript}>
          {evidence.inspection.transcript.map((line) => (
            <Pressable
              accessibilityRole="button"
              key={line.id}
              onPress={() => inspectClaim(line.claimId)}
              style={[
                styles.transcriptLine,
                line.claimId != null && styles.transcriptMarked,
                ...getInspectableStyle(line.claimId),
              ]}
            >
              <Text style={styles.timecode}>{line.time}</Text>
              <Text style={styles.transcriptText}>
                {line.speaker != null ? `${line.speaker}: ` : ""}
                {line.text}
              </Text>
              {isClaimArchived(line.claimId) && <Text style={styles.archiveStamp}>Archivada</Text>}
            </Pressable>
          ))}
        </View>
      )}

      {evidence.hotspots != null && (
        <View style={styles.hotspotGroup}>
          {evidence.hotspots.map((hotspot) => (
            <Pressable
              accessibilityRole="button"
              key={hotspot.id}
              onPress={() => inspectClaim(hotspot.claimId)}
              style={[styles.hotspot, ...getInspectableStyle(hotspot.claimId)]}
            >
              <Text style={styles.hotspotLabel}>{hotspot.label}</Text>
              {hotspot.description != null && (
                <Text style={styles.hotspotDescription}>{hotspot.description}</Text>
              )}
              {isClaimArchived(hotspot.claimId) && <Text style={styles.archiveStamp}>Archivada</Text>}
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.formulationBox}>
        <Text style={styles.blockTitle}>{activeClaim?.prompt ?? "Marcas extraídas"}</Text>
        {activeClaim?.formulations?.map((formulation) => (
          <Pressable
            accessibilityRole="button"
            key={formulation.id}
            onPress={() => selectFormulation(formulation.id)}
            style={[
              styles.formulation,
              activeClaim != null &&
                isClaimArchived(activeClaim.id) &&
                formulation.precise &&
                styles.formulationArchived,
            ]}
          >
            <Text style={styles.formulationText}>{formulation.text}</Text>
          </Pressable>
        )) ?? <Text style={styles.body}>Toque un elemento relevante para formular una afirmación.</Text>}
        <Text style={styles.feedback}>{feedback}</Text>
      </View>

      {extractedClaims.length > 0 && (
        <View style={styles.claimStack}>
          {extractedClaims.map((claim) => (
            <View key={claim.id} style={styles.claimSlip}>
              <Text style={styles.claimStamp}>Marca archivada</Text>
              <StatusPill
                label={getCategoryLabel(claim)}
                tone={getClaimTone(claim)}
              />
              <Text style={styles.claimText}>{claim.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function SceneDiagram() {
  return (
    <View style={styles.sceneDiagram}>
      <View style={styles.table} />
      <View style={[styles.cup, styles.teaCup]} />
      <View style={[styles.cup, styles.coffeeCup]} />
      <View style={styles.chair} />
      <View style={styles.dragMark} />
    </View>
  );
}

const styles = StyleSheet.create({
  blockTitle: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  body: {
    color: colors.mutedInk,
    fontSize: typography.size.body,
    letterSpacing: 0,
    lineHeight: 21,
  },
  archiveStamp: {
    alignSelf: "flex-start",
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  chair: {
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderWidth: 2,
    bottom: 18,
    height: 36,
    position: "absolute",
    right: 26,
    transform: [{ rotate: "-8deg" }],
    width: 32,
  },
  claimSlip: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderLeftColor: colors.institutionalGreen,
    borderLeftWidth: 5,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
    transform: [{ rotate: "-0.25deg" }],
  },
  claimStack: {
    gap: spacing.xs,
  },
  claimStamp: {
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  claimText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    letterSpacing: 0,
    lineHeight: 18,
  },
  coffeeCup: {
    backgroundColor: colors.memory,
    right: 76,
    top: 58,
  },
  cup: {
    borderColor: colors.ink,
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    position: "absolute",
    width: 24,
  },
  dragMark: {
    backgroundColor: colors.faintLine,
    bottom: 14,
    height: 2,
    position: "absolute",
    right: 20,
    transform: [{ rotate: "-8deg" }],
    width: 64,
  },
  expandButton: {
    alignItems: "center",
    borderColor: colors.hairline,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  expandText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  feedback: {
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
  },
  formulation: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    padding: spacing.sm,
  },
  formulationArchived: {
    borderColor: colors.institutionalGreen,
    borderLeftColor: colors.institutionalGreen,
    borderLeftWidth: 4,
  },
  formulationBox: {
    backgroundColor: colors.paperAged,
    borderColor: colors.hairline,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
  },
  formulationText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
  frame: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: 54,
    padding: spacing.sm,
  },
  frameActive: {
    borderColor: colors.steelBlue,
    borderLeftColor: colors.steelBlue,
    borderLeftWidth: 4,
  },
  frameStack: {
    gap: spacing.xs,
  },
  frameText: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    letterSpacing: 0,
    lineHeight: 17,
  },
  frameTime: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
  },
  headerLine: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  hotspot: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderStyle: "dashed",
    borderWidth: 1,
    minHeight: 44,
    padding: spacing.sm,
  },
  hotspotDescription: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    letterSpacing: 0,
    lineHeight: 17,
  },
  hotspotGroup: {
    gap: spacing.xs,
  },
  hotspotLabel: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  inspectionBlock: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
  },
  inspectable: {
    borderBottomColor: colors.institutionalGreen,
    borderBottomWidth: 2,
  },
  inspectableArchived: {
    backgroundColor: colors.paperAged,
    borderColor: colors.institutionalGreen,
    borderStyle: "solid",
  },
  inspectableSelected: {
    backgroundColor: colors.white,
    borderColor: colors.memory,
    borderStyle: "solid",
    borderWidth: 2,
  },
  instruction: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
  materialSurface: {
    alignItems: "center",
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderWidth: 1,
    minHeight: 142,
    justifyContent: "center",
    padding: spacing.sm,
  },
  materialSurfaceExpanded: {
    minHeight: 210,
  },
  meta: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
  },
  sceneDiagram: {
    height: 132,
    position: "relative",
    width: "100%",
  },
  segment: {
    borderColor: colors.hairline,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.xs,
  },
  segmentActive: {
    backgroundColor: colors.paper,
    borderColor: colors.institutionalGreen,
  },
  segmentGroup: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  segmentText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    textAlign: "center",
  },
  table: {
    backgroundColor: colors.paper,
    borderColor: colors.hairline,
    borderWidth: 2,
    height: 86,
    left: 34,
    position: "absolute",
    top: 18,
    transform: [{ rotate: "1deg" }],
    width: 160,
  },
  teaCup: {
    backgroundColor: colors.consequence,
    left: 70,
    top: 48,
  },
  timecode: {
    color: colors.steelBlue,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    width: 44,
  },
  title: {
    color: colors.ink,
    fontSize: typography.size.section,
    fontWeight: "800",
    letterSpacing: 0,
  },
  transcript: {
    backgroundColor: colors.tapeBlack,
    gap: 1,
    padding: spacing.xs,
  },
  transcriptLine: {
    backgroundColor: colors.paper,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: 44,
    padding: spacing.xs,
  },
  transcriptMarked: {
    backgroundColor: colors.paperAged,
  },
  transcriptText: {
    color: colors.ink,
    flex: 1,
    fontSize: typography.size.caption,
    letterSpacing: 0,
    lineHeight: 17,
  },
  viewer: {
    gap: spacing.sm,
  },
});
