import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouterContext } from "../router/RouterContext";
import { useSafeInsets } from "../hooks/useSafeInsets";

type HeaderProps = {
  title?: string;
  icon?: string | React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
};

export const Header = React.memo(function Header({
  title,
  icon,
  backgroundColor = "#FFFFFF",
  textColor = "#000000",
}: HeaderProps) {
  const router = useRouterContext();
  const isHome = router.currentPath === "/";
  const insets = useSafeInsets();

  const routeTitle = useMemo(
    () => title || getTitle(router.currentPath),
    [title, router.currentPath],
  );

  const routeIcon = useMemo(
    () => icon ?? getIcon(router.currentPath),
    [icon, router.currentPath],
  );

  const iconElement = useMemo(() => {
    if (!routeIcon) return null;
    return typeof routeIcon === "string"
      ? <Text style={[styles.iconText, { color: textColor }]}>{routeIcon}</Text>
      : <View style={styles.iconWrapper}>{routeIcon}</View>;
  }, [routeIcon, textColor]);

  return (
    <View
      style={[styles.container, { backgroundColor, paddingTop: insets.top }]}
    >
      {!isHome && (
        <TouchableOpacity
          onPress={router.pop}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <Text style={[styles.backText, { color: textColor }]}>←</Text>
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        {iconElement}
        <Text style={[styles.title, { color: textColor }]}>{routeTitle}</Text>
      </View>
    </View>
  );
});

// Títulos baseados na rota
function getTitle(path: string) {
  if (path.startsWith("/profile")) return "Perfil";
  if (path.startsWith("/settings")) return "Configurações";
  return "Início";
}

// Emojis por padrão, mas pode ser sobrescrito via prop
function getIcon(path: string): string {
  if (path.startsWith("/profile")) return "👤";
  if (path.startsWith("/settings")) return "⚙️";
  return "🏠";
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconText: {
    fontSize: 20,
  },
  iconWrapper: {
    marginRight: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
