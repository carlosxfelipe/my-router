import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useRouter } from "./src/router/router";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { useThemeColor } from "./src/hooks/useThemeColor";
import { BottomNavigationBar } from "./src/components/BottomNavigation";
import { RouteComponent } from "./src/router/types";

function AppContent({ Content }: { Content: React.ComponentType }) {
  const { theme } = useTheme();
  const bg = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar
        backgroundColor={bg}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      {/* Área principal com a tela da rota */}
      <View style={styles.content}>
        <Content />
      </View>

      {/* Barra de navegação fixa */}
      <BottomNavigationBar />
    </SafeAreaView>
  );
}

export default function App() {
  const { Screen } = useRouter();

  return (
    <ThemeProvider>
      <Screen>
        {({ component }: { component: RouteComponent }) => (
          <AppContent Content={component} />
        )}
      </Screen>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
