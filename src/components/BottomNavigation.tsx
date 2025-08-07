import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouterContext } from "../router/RouterContext";
import { useSafeInsets } from "../hooks/useSafeInsets";

type TabItem = {
  label: string;
  route: string;
  emoji: [string, string]; // [active, inactive]
};

type BottomNavigationBarProps = {
  backgroundColor?: string;
  textColor?: string;
};

const TABS: TabItem[] = [
  { label: "Início", route: "/", emoji: ["🏠", "🏡"] },
  { label: "Pedidos", route: "/orders", emoji: ["📦", "📬"] },
  { label: "Configurações", route: "/settings", emoji: ["⚙️", "🔧"] },
  { label: "Perfil", route: "/profile/123", emoji: ["👤", "👥"] },
];

function withOpacity(hex: string, opacity: number = 0.6) {
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return hex + alpha;
}

export const BottomNavigationBar = React.memo(function BottomNavigationBar({
  backgroundColor = "#FFFFFF",
  textColor = "#000000",
}: BottomNavigationBarProps) {
  const router = useRouterContext();
  const currentPath = router.currentPath;
  const insets = useSafeInsets();

  const tabsToRender = useMemo(() => {
    return TABS.map((tab) => {
      const isActive = currentPath === tab.route;
      return {
        ...tab,
        isActive,
        emoji: isActive ? tab.emoji[0] : tab.emoji[1],
        color: isActive ? textColor : withOpacity(textColor, 0.6),
      };
    });
  }, [currentPath, textColor]);

  const handlePress = useCallback(
    (route: string, isActive: boolean) => {
      if (!isActive) router.push(route);
    },
    [router],
  );

  return (
    <>
      <View style={[styles.container, { backgroundColor }]}>
        {tabsToRender.map((tab) => (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => handlePress(tab.route, tab.isActive)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: tab.isActive }}
          >
            <Text style={[styles.emoji, { color: tab.color }]}>
              {tab.emoji}
            </Text>
            <Text style={[styles.label, { color: tab.color }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[{ height: insets.bottom, backgroundColor }]} />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
});
