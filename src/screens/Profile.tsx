import { Button, StyleSheet } from "react-native";
import type { Router } from "../router/types";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";

type Props = {
  router: Router;
};

export default function Profile({ router }: Props) {
  function goHome() {
    router.push("/");
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText>👤 Tela de Perfil</ThemedText>

      <ThemedView style={styles.spacer} />

      <Button title="Voltar para Home" onPress={goHome} />
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
