import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useRouter } from "./src/router/router";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { useThemeColor } from "./src/hooks/useThemeColor";
import { BottomNavigationBar } from "./src/components/BottomNavigation";

function AppContent() {
  const { Screen } = useRouter();
  const { theme } = useTheme();
  const bg = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar
        backgroundColor={bg}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      {/* <Screen /> */}
      <Screen>
        <BottomNavigationBar />
      </Screen>
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
