import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { useRouter } from "./src/router/router";
import { useThemeColor } from "./src/hooks/useThemeColor";
import { BottomNavigationBar } from "./src/components/BottomNavigation";
import { Header } from "./src/components/Header";
import { RouteComponent } from "./src/router/types";
import { BackAware } from "./src/router/BackAware";

function MainLayout({ Content }: { Content: React.ComponentType }) {
  const { theme } = useTheme();
  const headerColor = useThemeColor({}, "header");
  const bottomColor = useThemeColor({}, "bottom");
  const textColor = useThemeColor({}, "text");

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: headerColor }} />

      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />

        <Header backgroundColor={headerColor} textColor={textColor} />

        <View style={styles.content}>
          <Content />
        </View>

        <BottomNavigationBar
          backgroundColor={bottomColor}
          textColor={textColor}
        />

        <SafeAreaView
          edges={["bottom"]}
          style={{ backgroundColor: bottomColor }}
        />
      </View>
    </>
  );
}

export default function App() {
  const { RouterOutlet } = useRouter();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RouterOutlet>
          {({ component: CurrentScreen }: { component: RouteComponent }) => (
            <>
              <BackAware />
              <MainLayout Content={CurrentScreen} />
            </>
          )}
        </RouterOutlet>
      </ThemeProvider>
    </SafeAreaProvider>
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
