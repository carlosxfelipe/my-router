import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useRouter } from "./src/router/router";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { useThemeColor } from "./src/hooks/useThemeColor";
import { BottomNavigationBar } from "./src/components/BottomNavigation";
import { RouteComponent } from "./src/router/types";
import { Header } from "./src/components/Header";

function MainLayout({ Content }: { Content: React.ComponentType }) {
  const { theme } = useTheme();
  const bg = useThemeColor({}, "header");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar
        backgroundColor={bg}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <Header />

      <View style={styles.content}>
        <Content />
      </View>

      <BottomNavigationBar />
    </SafeAreaView>
  );
}

export default function App() {
  const { RouterOutlet } = useRouter();

  return (
    <ThemeProvider>
      <RouterOutlet>
        {({ component: CurrentScreen }: { component: RouteComponent }) => (
          <MainLayout Content={CurrentScreen} />
        )}
      </RouterOutlet>
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
