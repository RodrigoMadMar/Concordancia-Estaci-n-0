import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { GameCase } from "@/domain/types";
import { useGameStore } from "@/store/useGameStore";
import { colors, spacing, typography } from "@/theme";

interface CaseChromeProps extends PropsWithChildren {
  gameCase: GameCase;
}

export function CaseChrome({ children, gameCase }: CaseChromeProps) {
  const { width } = useWindowDimensions();
  const progress = useGameStore((state) => state.progress);
  const driftLabel = progress.currentDrift ?? gameCase.initialDrift;
  const showAdministrativeMetrics =
    progress.tutorialStage !== "kitchen" &&
    (progress.tutorialStage === "cameraUnlocked" || progress.unlockedObservationIds.length > 0);
  const browserWidth =
    typeof window !== "undefined" && typeof window.outerWidth === "number"
      ? window.outerWidth
      : width;
  const isDesktopFrame = browserWidth > 600;
  const deviceMaxWidth = isDesktopFrame ? 430 : 390;
  const contentMaxWidth = isDesktopFrame ? 430 : deviceMaxWidth;

  return (
    <View style={[styles.exterior, isDesktopFrame ? styles.exteriorDesktop : styles.exteriorMobile]}>
      <SafeAreaView style={[styles.device, { maxWidth: deviceMaxWidth }]}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.caseCodeBlock}>
              <Text style={styles.caseCode}>{gameCase.code}</Text>
              <Text style={styles.product}>{gameCase.product.title}</Text>
            </View>
          </View>
          {showAdministrativeMetrics && (
            <View style={styles.metrics}>
              <Text style={styles.metric}>FATIGA {gameCase.fatigue}</Text>
              <Text style={styles.metric}>DERIVA {driftLabel}</Text>
            </View>
          )}
        </View>
        <ScrollView
          contentContainerStyle={[styles.content, { maxWidth: contentMaxWidth }]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  caseCode: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
  },
  caseCodeBlock: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  content: {
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.xl,
    width: "100%",
  },
  device: {
    backgroundColor: colors.white,
    boxShadow: `0px 10px 26px ${colors.shadow}1f`,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    width: "100%",
  },
  exterior: {
    backgroundColor: colors.exterior,
    flex: 1,
    width: "100%",
  },
  exteriorDesktop: {
    alignItems: "center",
  },
  exteriorMobile: {
    alignItems: "flex-start",
  },
  header: {
    backgroundColor: colors.institutionalGreen,
    borderBottomColor: colors.shadow,
    borderBottomWidth: 2,
    gap: spacing.xxs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  headerTop: {
    flexDirection: "row",
    minWidth: 0,
  },
  metric: {
    color: colors.white,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
  },
  metrics: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  product: {
    color: colors.paperPressed,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
  },
});
