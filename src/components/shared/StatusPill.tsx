import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

interface StatusPillProps {
  label: string;
  tone?: "neutral" | "record" | "memory" | "consequence" | "remnant" | "locked";
}

const toneStyles = {
  consequence: colors.consequence,
  locked: colors.locked,
  memory: colors.memory,
  neutral: colors.institutionalGreen,
  record: colors.record,
  remnant: colors.remnant,
};

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  return (
    <View style={[styles.pill, { borderColor: toneStyles[tone] }]}>
      <View style={[styles.notch, { backgroundColor: toneStyles[tone] }]} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  notch: {
    height: 10,
    width: 10,
  },
  pill: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: 28,
    paddingHorizontal: spacing.xs,
  },
});
