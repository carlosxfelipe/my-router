import { StyleSheet, View } from "react-native";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useRouterContext } from "../router/RouterContext";
import { ThemedButton } from "../components/ThemedButton";
import { useTheme } from "../theme/ThemeContext";
import { Icon } from "../components/Icon";
import { useThemeColor } from "../hooks/useThemeColor";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouterContext();
  const iconColor = useThemeColor({}, "inverseOnSurface");

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Ações
        </ThemedText>

        <ThemedButton
          title="Voltar para Home"
          onPress={() => router.reset("/")}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Aparência
        </ThemedText>

        <ThemedButton
          title={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
          onPress={toggleTheme}
          iconRight={
            <Icon
              name={theme === "light" ? "weather-night" : "weather-sunny"}
              color={iconColor}
            />
          }
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});
