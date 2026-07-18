import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Evidence } from "@/domain/types";
import { colors, spacing, typography } from "@/theme";
import { StatusPill } from "@/components/shared/StatusPill";
import type { EvidenceStatusLabel } from "@/domain/evidenceProgress";

interface EvidenceRowProps {
  evidence: Evidence;
  isSelected?: boolean;
  onPress: () => void;
  statusLabels: EvidenceStatusLabel[];
}

export function EvidenceRow({ evidence, isSelected = false, onPress, statusLabels }: EvidenceRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onPress}
      style={[styles.piece, isSelected && styles.selected]}
    >
      <View style={styles.pinLine} />
      <View style={styles.labelStrip}>
        <Text style={styles.code}>{evidence.code}</Text>
        <Text style={styles.kind}>{evidence.type}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{evidence.title}</Text>
        <Text style={styles.source}>{evidence.source}</Text>
        <View style={styles.pills}>
          {statusLabels.map((status) => (
            <StatusPill key={status.label} label={status.label} tone={status.tone} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: spacing.xs,
  },
  code: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
  },
  labelStrip: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kind: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  piece: {
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderRadius: 2,
    borderWidth: 1,
    gap: spacing.xs,
    marginBottom: spacing.sm,
    padding: spacing.sm,
    transform: [{ rotate: "-0.2deg" }],
  },
  pinLine: {
    backgroundColor: colors.faintLine,
    height: 1,
    position: "absolute",
    right: spacing.sm,
    top: spacing.xs,
    width: "36%",
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  selected: {
    borderColor: colors.institutionalGreen,
    borderLeftColor: colors.institutionalGreen,
    borderLeftWidth: 4,
  },
  source: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    letterSpacing: 0,
  },
  title: {
    color: colors.ink,
    fontSize: typography.size.body,
    fontWeight: "700",
    letterSpacing: 0,
  },
});
