import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useRouter } from "./src/router/router";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";

function AppContent() {
  const { Screen, router } = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000" : "#fff" },
      ]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Screen router={router} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
