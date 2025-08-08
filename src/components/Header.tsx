import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouterContext } from "../router/RouterContext";
import { useSafeInsets } from "../hooks/useSafeInsets";
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
  const isHome = router.currentPath === "/";
  const insets = useSafeInsets();

  const routeTitle = useMemo(
    () => title || getTitle(router.currentPath),
    [title, router.currentPath],
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, paddingTop: insets.top },
      ]}
    >
      {!isHome && (
        <TouchableOpacity
          onPress={router.pop}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <Icon name="chevron-left" size={26} color={textColor} />
        </TouchableOpacity>
      )}

      <View style={styles.titleWrapper}>
        <Text style={[styles.title, { color: textColor }]}>
          {routeTitle}
        </Text>
      </View>

      {/* Placeholder para alinhar título ao centro */}
      {!isHome && <View style={styles.backButton} />}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  backButton: {
    width: 32,
    alignItems: "flex-start",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
