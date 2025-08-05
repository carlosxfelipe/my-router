import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useRouter } from "./src/router/router";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { useThemeColor } from "./src/hooks/useThemeColor";
import { BottomNavigationBar } from "./src/components/BottomNavigation";
import { Header } from "./src/components/Header";
import { RouteComponent } from "./src/router/types";

function MainLayout({ Content }: { Content: React.ComponentType }) {
  const { theme } = useTheme();
  const headerColor = useThemeColor({}, "header");
  const bottomColor = useThemeColor({}, "bottom");
  const textColor = useThemeColor({}, "text");

  return (
    <>
      {/* SafeArea para o topo (notch) */}
      <SafeAreaView style={{ backgroundColor: headerColor }} />

      <View style={styles.container}>
        <StatusBar
          backgroundColor={headerColor}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />

        <Header backgroundColor={headerColor} textColor={textColor} />

        <View style={styles.content}>
          <Content />
        </View>

        <View style={{ backgroundColor: bottomColor }}>
          <BottomNavigationBar />
          {/* Área de gesto no iOS */}
          {Platform.OS === "ios" && <View style={{ height: 34 }} />}
        </View>
      </View>
    </>
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
