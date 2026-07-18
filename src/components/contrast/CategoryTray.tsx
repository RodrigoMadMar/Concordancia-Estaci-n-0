import { Pressable, StyleSheet, Text, View } from "react-native";

import { StatusPill } from "@/components/shared/StatusPill";
import type { ClaimWithEvidence } from "@/domain/contrastEngine";
import type { ClaimCategory } from "@/domain/types";
import { colors, spacing, typography } from "@/theme";

interface CategoryTrayProps {
  category: Exclude<ClaimCategory, "anomaly">;
  claims: ClaimWithEvidence[];
  instruction: string;
  label: string;
  onToggleClaim: (claimId: string) => void;
  selectedClaimIds: string[];
  usedClaimIds: string[];
}

export function CategoryTray({
  category,
  claims,
  instruction,
  label,
  onToggleClaim,
  selectedClaimIds,
  usedClaimIds,
}: CategoryTrayProps) {
  return (
    <View style={styles.tray}>
      <View style={styles.trayHeader}>
        <StatusPill label={label} tone={category} />
        <Text style={styles.count}>{claims.length}</Text>
      </View>

      {claims.length === 0 ? (
        <View style={styles.emptyWell}>
          <View style={styles.wellLine} />
          <Text style={styles.instruction}>{instruction}</Text>
        </View>
      ) : (
        <View style={styles.claimStack}>
          {claims.map((item) => {
            const isSelected = selectedClaimIds.includes(item.claim.id);
            const isUsed = usedClaimIds.includes(item.claim.id);

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                key={item.claim.id}
                onPress={() => onToggleClaim(item.claim.id)}
                style={[
                  styles.claim,
                  isSelected && styles.claimSelected,
                  isUsed && styles.claimUsed,
                  item.claim.remnant && styles.claimRemnant,
                ]}
              >
                <View style={styles.claimTopline}>
                  <CategoryGlyph category={category} remnant={item.claim.remnant === true} />
                  <Text style={styles.origin}>
                    {item.evidenceCode} / {item.evidenceTitle}
                  </Text>
                </View>
                <Text style={styles.claimText}>{item.claim.text}</Text>
                <View style={styles.stateLine}>
                  {isSelected && <Text style={styles.stateLabel}>En cotejo</Text>}
                  {isUsed && <Text style={styles.stateLabel}>Usada</Text>}
                  {item.claim.remnant && <Text style={styles.stateLabel}>Remanente</Text>}
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

interface CategoryGlyphProps {
  category: Exclude<ClaimCategory, "anomaly">;
  remnant?: boolean;
}

function CategoryGlyph({ category, remnant }: CategoryGlyphProps) {
  return (
    <View style={[styles.glyphWrap, remnant && styles.glyphRemnant]}>
      {category === "record" && <View style={[styles.glyph, styles.recordGlyph]} />}
      {category === "memory" && <View style={[styles.glyph, styles.memoryGlyph]} />}
      {category === "consequence" && <View style={[styles.glyph, styles.consequenceGlyph]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  claim: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderLeftColor: colors.hairline,
    borderLeftWidth: 3,
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: 72,
    padding: spacing.sm,
  },
  claimRemnant: {
    boxShadow: `2px 2px 0px ${colors.remnant}33`,
  },
  claimSelected: {
    borderColor: colors.memory,
    borderLeftColor: colors.memory,
    borderLeftWidth: 5,
  },
  claimStack: {
    gap: spacing.xs,
  },
  claimText: {
    color: colors.ink,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
  claimTopline: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  claimUsed: {
    backgroundColor: colors.paperAged,
  },
  consequenceGlyph: {
    borderColor: colors.consequence,
    borderRadius: 10,
    borderWidth: 3,
  },
  count: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
  },
  emptyWell: {
    backgroundColor: colors.white,
    borderColor: colors.hairline,
    borderRadius: 2,
    borderStyle: "dashed",
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: 64,
    padding: spacing.sm,
  },
  glyph: {
    height: 16,
    width: 16,
  },
  glyphRemnant: {
    boxShadow: `2px 0px 0px ${colors.remnant}66`,
  },
  glyphWrap: {
    alignItems: "center",
    height: 22,
    justifyContent: "center",
    width: 22,
  },
  instruction: {
    color: colors.mutedInk,
    fontSize: typography.size.caption,
    letterSpacing: 0,
  },
  memoryGlyph: {
    backgroundColor: colors.memory,
    height: 4,
    transform: [{ rotate: "-8deg" }],
    width: 18,
  },
  origin: {
    color: colors.mutedInk,
    flex: 1,
    fontSize: typography.size.caption,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  recordGlyph: {
    borderColor: colors.record,
    borderWidth: 3,
  },
  stateLabel: {
    color: colors.institutionalGreen,
    fontSize: typography.size.caption,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  stateLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  tray: {
    backgroundColor: colors.paperPressed,
    borderColor: colors.hairline,
    borderRadius: 2,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
  },
  trayHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wellLine: {
    backgroundColor: colors.faintLine,
    height: 1,
    width: "82%",
  },
});
