import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";

import { selectIsVerdictUnlocked, useGameStore } from "@/store/useGameStore";
import { colors } from "@/theme";

const iconByRoute = {
  contrast: "tray-full",
  evidence: "file-search-outline",
  overview: "clipboard-text-outline",
  verdict: "lock-outline",
} as const;

export default function CaseTabsLayout() {
  const verdictUnlocked = useGameStore(selectIsVerdictUnlocked);
  const progress = useGameStore((state) => state.progress);
  const { width } = useWindowDimensions();
  const browserWidth =
    typeof window !== "undefined" && typeof window.outerWidth === "number"
      ? window.outerWidth
      : width;
  const tabAlign = browserWidth > 600 ? "center" : "flex-start";
  const tabMaxWidth = browserWidth > 600 ? 430 : 320;
  const piecesUnlocked = progress.tutorialStage !== "kitchen";
  const mesaUnlocked =
    progress.tutorialStage === "mesaUnlocked" ||
    progress.tutorialStage === "cameraUnlocked" ||
    progress.tutorialStage === "identityUnlocked" ||
    progress.tutorialStage === "discordanceConfirmed";
  const dictamenVisible = progress.tutorialStage === "discordanceConfirmed";

  return (
    <Tabs
      screenOptions={({ route }) => ({
        sceneStyle: {
          backgroundColor: colors.exterior,
        },
        headerShown: false,
        tabBarActiveTintColor: colors.institutionalGreen,
        tabBarInactiveTintColor: colors.locked,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "900",
          letterSpacing: 0,
          textTransform: "uppercase",
        },
        tabBarStyle: {
          alignSelf: tabAlign,
          backgroundColor: colors.paperPressed,
          borderColor: colors.hairline,
          borderTopWidth: 2,
          maxWidth: tabMaxWidth,
          minHeight: 66,
          width: "100%",
        },
        tabBarItemStyle: {
          borderLeftColor: colors.hairline,
          borderLeftWidth: route.name === "overview" ? 0 : 1,
          paddingBottom: 8,
          paddingTop: 7,
        },
        tabBarIcon: ({ color, size }) => {
          const name = iconByRoute[route.name as keyof typeof iconByRoute] ?? "file-outline";
          return <MaterialCommunityIcons color={color} name={name} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="overview" options={{ title: "Caso" }} />
      <Tabs.Screen
        name="evidence"
        options={{ title: "Piezas", ...(!piecesUnlocked && { href: null }) }}
      />
      <Tabs.Screen
        name="contrast"
        options={{ title: "Mesa", ...(!mesaUnlocked && { href: null }) }}
      />
      <Tabs.Screen
        name="verdict"
        options={{
          title: verdictUnlocked ? "Dict." : "Dict.",
          ...(!dictamenVisible && { href: null }),
        }}
      />
    </Tabs>
  );
}
