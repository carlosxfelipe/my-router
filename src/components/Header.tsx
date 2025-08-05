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

type HeaderProps = {
  title?: string;
  icon?: string | React.ReactNode;
};

export function Header({ title, icon }: HeaderProps) {
  const bg = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const router = useRouterContext();

  const isHome = router.currentPath === "/";
  const routeTitle = title || getTitle(router.currentPath);
  const routeIcon = icon ?? getIcon(router.currentPath);

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
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
        {routeIcon && (
          typeof routeIcon === "string"
            ? (
              <Text style={[styles.iconText, { color: textColor }]}>
                {routeIcon}
              </Text>
            )
            : <View style={styles.iconWrapper}>{routeIcon}</View>
        )}
        <Text style={[styles.title, { color: textColor }]}>{routeTitle}</Text>
      </View>
    </View>
  );
}

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
    paddingTop: Platform.OS === "ios" ? 12 : 8,
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
