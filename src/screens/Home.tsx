import { Button, StyleSheet, Text, View } from "react-native";
import type { Router } from "../router/types";

type Props = {
  router: Router;
};

export default function Home({ router }: Props) {
  function goToProfile() {
    router.push("/profile");
  }

  function goToEditSettings() {
    router.push("/settings/edit");
  }

  return (
    <View style={styles.container}>
      <Text>🏠 Tela Home</Text>

      <Button title="Ir para Perfil" onPress={goToProfile} />

      <View style={{ height: 12 }} />

      <Button title="Editar Configurações" onPress={goToEditSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
