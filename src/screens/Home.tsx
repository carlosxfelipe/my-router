import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useTheme } from "../theme/ThemeContext";
import { useRouterContext } from "../router/RouterContext";
import { ThemedButton } from "../components/ThemedButton";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouterContext();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Navegação
          </ThemedText>

          <View style={styles.buttonGroup}>
            <ThemedButton
              title="Ir para Perfil do Usuário 123"
              onPress={() => router.push("/profile/123")}
            />
            <View style={styles.spacer} />
            <ThemedButton
              title="Ir para Pedidos"
              onPress={() => router.push("/orders")}
            />
            <View style={styles.spacer} />
            <ThemedButton
              title="Configurações"
              onPress={() => router.push("/settings")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Aparência
          </ThemedText>

          <ThemedButton
            title={`Alternar para tema ${
              theme === "light" ? "escuro" : "claro"
            }`}
            onPress={toggleTheme}
            iconRight={
              <View>
                <ThemedText>🌓</ThemedText>
              </View>
            }
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  buttonGroup: {
    gap: 12,
  },
  spacer: {
    height: 12,
  },
});
