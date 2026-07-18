import { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  allCase00BackgroundAssets,
  allCharacterAssets,
  type RuntimeAsset,
} from "@/assets/artRegistry";
import { PaperPanel } from "@/components/shared/PaperPanel";
import { StatusPill } from "@/components/shared/StatusPill";
import { colors, spacing, typography } from "@/theme";

export function AssetGallery() {
  const assets = useMemo(
    () => ({
      backgrounds: allCase00BackgroundAssets,
      busts: allCharacterAssets,
    }),
    [],
  );

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <PaperPanel meta="Desarrollo" title="Galeria de assets" variant="slip">
        <Text style={styles.body}>
          Registro runtime del paquete artistico conectado al tutorial y al Caso 0.
        </Text>
      </PaperPanel>

      <PaperPanel meta="Bustos" title="Personajes registrados">
        <View style={styles.assetGrid}>
          {assets.busts.map((asset) => (
            <AssetCard asset={asset} key={asset.id} kind="portrait" />
          ))}
        </View>
      </PaperPanel>

      <PaperPanel meta="Fondos" title="Caso 0">
        <View style={styles.assetGrid}>
          {assets.backgrounds.map((asset) => (
            <AssetCard asset={asset} key={asset.id} kind="background" />
          ))}
        </View>
      </PaperPanel>
    </ScrollView>
  );
}

interface AssetCardProps {
  asset: RuntimeAsset;
  kind: "background" | "portrait";
}

function AssetCard({ asset, kind }: AssetCardProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View style={styles.assetCard}>
      <View style={[styles.preview, kind === "background" && styles.backgroundPreview]}>
        <Image
          accessibilityIgnoresInvertColors
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          resizeMode="contain"
          source={asset.source}
          style={styles.image}
        />
      </View>
      <View style={styles.assetMeta}>
        <Text style={styles.assetTitle}>{asset.label}</Text>
        <Text style={styles.path}>{asset.path}</Text>
        <Text style={styles.body}>
          {asset.width} x {asset.height} / {asset.hasTransparency ? "transparencia" : "opaco"}
        </Text>
        <View style={styles.statusRow}>
          <StatusPill label={hasError ? "error de carga" : isLoaded ? "cargado" : "pendiente"} tone={hasError ? "locked" : "record"} />
          <StatusPill label={asset.runtimeUse} tone="consequence" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assetCard: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.xs,
  },
  assetGrid: {
    gap: spacing.sm,
  },
  assetMeta: {
    gap: spacing.xxs,
  },
  assetTitle: {
    color: colors.ink,
    fontSize: typography.size.body,
    fontWeight: "900",
    letterSpacing: 0,
  },
  backgroundPreview: {
    height: 160,
  },
  body: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    letterSpacing: 0,
    lineHeight: 18,
  },
  content: {
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  path: {
    color: colors.ink,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
  },
  preview: {
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderWidth: 1,
    height: 132,
  },
  statusRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
});
