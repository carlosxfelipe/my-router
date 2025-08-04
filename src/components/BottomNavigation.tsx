import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { useRouterContext } from "../router/RouterContext";

type TabItem = {
  label: string;
  route: string;
  emoji: [string, string]; // [active, inactive]
};

const TABS: TabItem[] = [
  { label: "Início", route: "/", emoji: ["🏠", "🏡"] },
  { label: "Pedidos", route: "/orders", emoji: ["🛒", "🧺"] },
  { label: "Perfil", route: "/profile", emoji: ["👤", "👥"] },
];

export function BottomNavigationBar() {
  const router = useRouterContext();
  const currentPath = router.currentPath;

  const backgroundColor = useThemeColor({}, "surface");
  const textColor = useThemeColor({}, "text");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {TABS.map((tab) => {
        const isActive = currentPath === tab.route;
        const emoji = isActive ? tab.emoji[0] : tab.emoji[1];
        const color = isActive ? textColor : `${textColor}99`;

        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => {
              if (!isActive) router.replace(tab.route);
            }}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.emoji, { color }]}>{emoji}</Text>
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
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
