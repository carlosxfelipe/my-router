import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouterContext } from "../router/RouterContext";
import { matchPath } from "../router/matchPath";
import { Icon } from "../components/Icon";

type TabItem = {
  label: string;
  route: string;
  icon: [string, string]; // [ativo, inativo]
};

type BottomNavigationBarProps = {
  backgroundColor?: string;
  textColor?: string;
};

const TABS: TabItem[] = [
  { label: "Início", route: "/", icon: ["home", "home-outline"] },
  {
    label: "Pedidos",
    route: "/orders",
    icon: ["package-variant", "package-variant-closed"],
  },
  { label: "Configurações", route: "/settings", icon: ["cog", "cog-outline"] },
  {
    label: "Perfil",
    route: "/profile/:id",
    icon: ["account", "account-outline"],
  },
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

  const tabsToRender = useMemo(() => {
    return TABS.map((tab) => {
      const isActive = matchPath(tab.route, currentPath).matched;
      return {
        ...tab,
        isActive,
        iconName: isActive ? tab.icon[0] : tab.icon[1],
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
          <Icon
            name={tab.iconName}
            color={tab.color}
            size={24}
            style={styles.icon}
          />
          <Text style={[styles.label, { color: tab.color }]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
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
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
});
