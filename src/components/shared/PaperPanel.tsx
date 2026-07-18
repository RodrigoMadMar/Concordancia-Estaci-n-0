import type { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

interface PaperPanelProps extends PropsWithChildren {
  title?: string;
  meta?: string;
  testID?: string;
  variant?: "sheet" | "slip" | "sealed";
}

const textureLines = ["line-1", "line-2", "line-3", "line-4", "line-5"];

export function PaperPanel({ children, meta, testID, title, variant = "sheet" }: PaperPanelProps) {
  return (
    <View style={[styles.panel, styles[variant]]} testID={testID}>
      <View style={styles.texture}>
        {textureLines.map((line) => (
          <View key={line} style={styles.textureLine} />
        ))}
      </View>
      {(title != null || meta != null) && (
        <View style={styles.heading}>
          {meta != null && <Text style={styles.meta}>{meta}</Text>}
          {title != null && <Text style={styles.title}>{title}</Text>}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.paper,
    borderColor: colors.hairline,
    borderRadius: 3,
    borderWidth: 1,
    gap: spacing.sm,
    overflow: "hidden",
    padding: spacing.md,
    boxShadow: `0px 2px 4px ${colors.shadow}14`,
  },
  heading: {
    borderBottomColor: colors.hairline,
    borderBottomWidth: 1,
    gap: spacing.xxs,
    paddingBottom: spacing.sm,
  },
  meta: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  sealed: {
    backgroundColor: colors.paperAged,
    transform: [{ rotate: "-0.4deg" }],
  },
  sheet: {
    transform: [{ rotate: "0deg" }],
  },
  slip: {
    backgroundColor: colors.white,
    borderLeftColor: colors.institutionalGreen,
    borderLeftWidth: 4,
    transform: [{ rotate: "0.25deg" }],
  },
  texture: {
    bottom: 0,
    left: 0,
    opacity: 0.35,
    pointerEvents: "none",
    position: "absolute",
    right: 0,
    top: 0,
  },
  textureLine: {
    backgroundColor: colors.faintLine,
    height: 1,
    marginTop: 24,
  },
  title: {
    color: colors.ink,
    fontSize: typography.size.section,
    fontWeight: "700",
    letterSpacing: 0,
  },
});
