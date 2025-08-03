import { Button, StyleSheet } from "react-native";
import type { Router } from "../../router/types";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";

type Props = {
  router: Router;
};

export default function Edit({ router }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>✏️ Tela de Edição de Configurações</ThemedText>

      <ThemedView style={styles.spacer} />

      <Button title="Voltar para Home" onPress={() => router.go("/")} />
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
