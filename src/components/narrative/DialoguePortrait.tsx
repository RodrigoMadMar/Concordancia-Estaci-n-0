import { useEffect, useState } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";

import {
  type AnyCharacterExpression,
  type CharacterId,
  getCharacterAsset,
} from "@/assets/artRegistry";
import { colors } from "@/theme";

interface DialoguePortraitProps {
  characterId: CharacterId;
  expression: AnyCharacterExpression;
  side: "left" | "right";
  isActive: boolean;
  scale?: number | undefined;
  accessibilityLabel: string;
}

export function DialoguePortrait({
  accessibilityLabel,
  characterId,
  expression,
  isActive,
  scale = 1,
  side,
}: DialoguePortraitProps) {
  const [opacity] = useState(() => new Animated.Value(isActive ? 1 : 0.42));
  const [translate] = useState(() => new Animated.Value(isActive ? 0 : side === "left" ? -8 : 8));
  const asset = getCharacterAsset(characterId, expression);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        duration: 190,
        easing: Easing.out(Easing.cubic),
        toValue: isActive ? 1 : 0.42,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        duration: 210,
        easing: Easing.out(Easing.cubic),
        toValue: isActive ? 0 : side === "left" ? -8 : 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, opacity, side, translate]);

  return (
    <Animated.View
      accessibilityLabel={accessibilityLabel}
      accessible
      style={[
        styles.wrap,
        side === "left" ? styles.left : styles.right,
        isActive ? styles.active : styles.inactive,
        {
          opacity,
          transform: [{ translateX: translate }, { scale }],
        },
      ]}
    >
      <View style={styles.shadow} />
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={asset.source}
        style={styles.image}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  active: {
    zIndex: 4,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  inactive: {
    zIndex: 2,
  },
  left: {
    left: 2,
  },
  right: {
    right: 2,
  },
  shadow: {
    backgroundColor: colors.shadow,
    borderRadius: 54,
    bottom: 2,
    height: 20,
    left: 30,
    opacity: 0.16,
    position: "absolute",
    right: 30,
  },
  wrap: {
    bottom: 106,
    height: 220,
    position: "absolute",
    width: 160,
  },
});
