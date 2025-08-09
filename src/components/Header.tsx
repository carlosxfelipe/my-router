// src/components/Header.tsx
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouterContext } from "../router/RouterContext";
import { Icon } from "../components/Icon";

type HeaderProps = {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
};

export const Header = React.memo(function Header({
  title,
  backgroundColor = "#FFFFFF",
  textColor = "#000000",
}: HeaderProps) {
  const router = useRouterContext();

  const routeTitle = useMemo(
    () => title || getTitle(router.currentPath),
    [title, router.currentPath],
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.sideWrapper}>
        {router.canGoBack && (
          <TouchableOpacity
            onPress={router.pop}
            style={styles.backButton}
            accessibilityRole="button"
          >
            <Icon name="chevron-left" size={26} color={textColor} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleWrapper}>
        <Text style={[styles.title, { color: textColor }]}>{routeTitle}</Text>
      </View>

      <View style={styles.sideWrapper} />
    </View>
  );
});

function getTitle(path: string) {
  if (path.startsWith("/orders")) return "Pedidos";
  if (path.startsWith("/profile")) return "Perfil";
  if (path.startsWith("/settings")) return "Configurações";
  return "Início";
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  sideWrapper: {
    width: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backButton: { width: 32, alignItems: "flex-start", justifyContent: "center" },
  titleWrapper: { flex: 1, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "600" },
});
