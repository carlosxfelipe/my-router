import { Button, StyleSheet, View } from "react-native";
import type { Router } from "../router/types";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  router: Router;
};

export default function Home({ router }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText>🏠 Tela Home</ThemedText>

      <View style={styles.spacer} />

      <Button title="Ir para Perfil" onPress={() => router.push("/profile")} />

      <View style={styles.spacer} />

      <Button
        title="Editar Configurações"
        onPress={() => router.push("/settings/edit")}
      />

      <View style={styles.spacer} />

      <Button
        title={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
        onPress={toggleTheme}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  spacer: {
    height: 12,
  },
});
