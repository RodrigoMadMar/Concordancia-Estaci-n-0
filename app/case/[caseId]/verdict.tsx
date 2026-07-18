import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CaseChrome } from "@/components/shared/CaseChrome";
import { PaperPanel } from "@/components/shared/PaperPanel";
import { StatusPill } from "@/components/shared/StatusPill";
import { getCase } from "@/content";
import { selectIsVerdictUnlocked, useGameStore } from "@/store/useGameStore";
import { colors, spacing, typography } from "@/theme";

export default function VerdictScreen() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const gameCase = getCase(caseId);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const verdictUnlocked = useGameStore(selectIsVerdictUnlocked);

  useEffect(() => {
    setActiveTab("verdict");
  }, [setActiveTab]);

  return (
    <CaseChrome gameCase={gameCase}>
      <PaperPanel meta="Dictamen" title={verdictUnlocked ? "Continuidad disponible" : "Documento retenido"} variant="sealed">
        {verdictUnlocked ? (
          <View style={styles.stack}>
            <Text style={styles.body}>Conclusión técnica pendiente de emisión formal.</Text>
            {gameCase.verdicts.map((verdict) => (
              <View key={verdict.id} style={styles.verdictOption}>
                <Text style={styles.optionTitle}>{verdict.title}</Text>
                <Text style={styles.body}>{verdict.description}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.sealedArea}>
            <View style={styles.hiddenDocument}>
              <View style={styles.documentLineLong} />
              <View style={styles.documentLineMid} />
              <View style={styles.documentLineShort} />
            </View>
            <View style={styles.sealBand}>
              <Text style={styles.sealText}>RETENIDO POR LA MESA</Text>
            </View>
            <StatusPill label="requiere hipótesis dominante" tone="locked" />
            <Text style={styles.body}>
              Dictamen no circulable. Falta una hipótesis dominante registrada por Contraste.
            </Text>
          </View>
        )}
      </PaperPanel>
    </CaseChrome>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.mutedInk,
    fontSize: typography.size.body,
    letterSpacing: 0,
    lineHeight: 22,
  },
  documentLineLong: {
    backgroundColor: colors.faintLine,
    height: 2,
    width: "86%",
  },
  documentLineMid: {
    backgroundColor: colors.faintLine,
    height: 2,
    width: "64%",
  },
  documentLineShort: {
    backgroundColor: colors.faintLine,
    height: 2,
    width: "42%",
  },
  hiddenDocument: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderRadius: 2,
    borderWidth: 1,
    gap: spacing.sm,
    height: 150,
    justifyContent: "center",
    padding: spacing.md,
    transform: [{ rotate: "1.2deg" }],
  },
  optionTitle: {
    color: colors.ink,
    fontSize: typography.size.body,
    fontWeight: "800",
    letterSpacing: 0,
  },
  stack: {
    gap: spacing.md,
  },
  sealBand: {
    alignItems: "center",
    backgroundColor: colors.remnant,
    left: -spacing.md,
    paddingVertical: spacing.xs,
    position: "absolute",
    right: -spacing.md,
    top: 70,
    transform: [{ rotate: "-4deg" }],
  },
  sealText: {
    color: colors.paper,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
  },
  sealedArea: {
    gap: spacing.md,
  },
  verdictOption: {
    borderColor: colors.hairline,
    borderRadius: 4,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
  },
});
