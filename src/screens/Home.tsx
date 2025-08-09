import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useRouterContext } from "../router/RouterContext";
import { ThemedButton } from "../components/ThemedButton";

export default function Home() {
  const router = useRouterContext();

  const userId = "123";

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Ações
          </ThemedText>

          <View style={styles.buttonGroup}>
            <ThemedButton
              title={`Ir para Perfil do Usuário ${userId}`}
              onPress={() => router.push(`/profile/${userId}`)}
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
