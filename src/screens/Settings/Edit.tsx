import { Button, StyleSheet, Text, View } from "react-native";
import type { Router } from "../../router/types";

type Props = {
  router: Router;
};

export default function Edit({ router }: Props) {
  function goHome() {
    router.push("/");
  }

  return (
    <View style={styles.container}>
      <Text>✏️ Tela de Edição de Configurações</Text>
      <Button title="Voltar para Home" onPress={goHome} />
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
