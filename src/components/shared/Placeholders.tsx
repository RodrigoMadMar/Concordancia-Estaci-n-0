import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

export function EnaFilePlaceholder() {
  return (
    <View style={styles.enaCard}>
      <View style={styles.silhouette}>
        <View style={styles.head} />
        <View style={styles.shoulders} />
      </View>
      <View style={styles.fileLines}>
        <Text style={styles.code}>SUJETO / ENA VAR</Text>
        <View style={styles.lineLong} />
        <View style={styles.lineMid} />
        <Text style={styles.muted}>estado civil no concordante</Text>
      </View>
    </View>
  );
}

export function DocumentThumbnail() {
  return (
    <View style={styles.documentThumb}>
      <Text style={styles.docCode}>IIC-REG</Text>
      <View style={styles.printLine} />
      <View style={styles.printLineShort} />
      <View style={styles.erasedLine} />
      <View style={styles.stamp}>
        <Text style={styles.stampText}>COPIA</Text>
      </View>
    </View>
  );
}

export function MagneticTapePlaceholder() {
  return (
    <View style={styles.tapeBody}>
      <View style={styles.reel} />
      <View style={styles.tapeWindow}>
        <View style={styles.tapeStrip} />
      </View>
      <View style={styles.reel} />
      <Text style={styles.tapeLabel}>CINTA / COCINA</Text>
    </View>
  );
}

export function CameraSequencePlaceholder() {
  return (
    <View style={styles.sequence}>
      {["07:09", "07:12", "07:14", "07:15"].map((time, index) => (
        <View key={time} style={[styles.frame, index === 2 && styles.frameBlank]}>
          <Text style={styles.frameTime}>{time}</Text>
          <View style={[styles.frameMark, index === 1 && styles.doubleMark]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  code: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "900",
    letterSpacing: 0,
  },
  docCode: {
    color: colors.mutedInk,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
  },
  documentThumb: {
    backgroundColor: colors.paper,
    borderColor: colors.hairline,
    borderRadius: 2,
    borderWidth: 1,
    height: 92,
    justifyContent: "space-between",
    padding: spacing.xs,
    width: 76,
  },
  doubleMark: {
    backgroundColor: colors.remnant,
    boxShadow: `3px 1px 0px ${colors.remnant}66`,
  },
  enaCard: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.sm,
  },
  erasedLine: {
    backgroundColor: colors.faintLine,
    height: 2,
    marginLeft: spacing.md,
    transform: [{ rotate: "-1deg" }],
    width: "70%",
  },
  fileLines: {
    flex: 1,
    gap: spacing.xs,
    justifyContent: "center",
  },
  frame: {
    backgroundColor: colors.tapeBlack,
    borderColor: colors.hairline,
    borderWidth: 1,
    height: 58,
    justifyContent: "space-between",
    padding: 5,
    width: "23%",
  },
  frameBlank: {
    backgroundColor: colors.paperPressed,
  },
  frameMark: {
    backgroundColor: colors.paper,
    height: 18,
    opacity: 0.9,
    width: 16,
  },
  frameTime: {
    color: colors.paper,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0,
  },
  head: {
    backgroundColor: colors.mutedInk,
    borderRadius: 16,
    height: 28,
    width: 28,
  },
  lineLong: {
    backgroundColor: colors.faintLine,
    height: 2,
    width: "92%",
  },
  lineMid: {
    backgroundColor: colors.faintLine,
    height: 2,
    width: "68%",
  },
  muted: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    letterSpacing: 0,
  },
  printLine: {
    backgroundColor: colors.faintLine,
    height: 2,
    width: "100%",
  },
  printLineShort: {
    backgroundColor: colors.faintLine,
    height: 2,
    width: "64%",
  },
  reel: {
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderRadius: 18,
    borderWidth: 4,
    height: 36,
    width: 36,
  },
  sequence: {
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "space-between",
  },
  shoulders: {
    backgroundColor: colors.mutedInk,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    height: 18,
    width: 52,
  },
  silhouette: {
    alignItems: "center",
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderRadius: 2,
    borderWidth: 1,
    height: 82,
    justifyContent: "flex-end",
    overflow: "hidden",
    width: 68,
  },
  stamp: {
    alignItems: "center",
    borderColor: colors.remnant,
    borderWidth: 2,
    paddingVertical: 2,
    transform: [{ rotate: "-8deg" }],
    width: 48,
  },
  stampText: {
    color: colors.remnant,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
  },
  tapeBody: {
    alignItems: "center",
    backgroundColor: colors.tapeBlack,
    borderColor: colors.hairline,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 70,
    padding: spacing.sm,
  },
  tapeLabel: {
    bottom: 4,
    color: colors.paperPressed,
    fontSize: 9,
    fontWeight: "800",
    left: spacing.sm,
    letterSpacing: 0,
    position: "absolute",
  },
  tapeStrip: {
    backgroundColor: colors.remnant,
    height: 4,
    opacity: 0.7,
    width: "100%",
  },
  tapeWindow: {
    backgroundColor: colors.paper,
    flex: 1,
    height: 22,
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
});
