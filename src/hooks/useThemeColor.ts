import { useTheme } from "../theme/ThemeContext";

type Colors = {
  light?: string;
  dark?: string;
};

type ThemeColorName =
  | "text"
  | "background"
  | "primary"
  | "secondary"
  | "surface"
  | "outline"
  | "header"
  | "bottom";

const defaultColors = {
  text: {
    light: "#1C1B1F",
    dark: "#E6E1E5",
  },
  background: {
    light: "#FFFFFF",
    dark: "#1C1B1F",
  },
  primary: {
    light: "#6750A4",
    dark: "#D0BCFF",
  },
  secondary: {
    light: "#625B71",
    dark: "#CCC2DC",
  },
  surface: {
    light: "#FFFBFE",
    dark: "#1C1B1F",
  },
  outline: {
    light: "#79747E",
    dark: "#938F99",
  },
  header: {
    light: "#F7F2FA",
    dark: "#2A1C3A",
  },
  bottom: {
    light: "#EFE7FD",
    dark: "#1E1A22",
  },
};

// TODO: Corrigir espaço com a cor do header abaixo do BottomNavigationBar no iOS.
// A área segura inferior (safe area bottom) não está sendo preenchida com a cor do bottom.
// Atualmente, o SafeAreaView cobre apenas o topo (header), e o BottomNavigationBar não considera o padding inferior.
// Sugestão: adicionar paddingBottom no BottomNavigationBar (ex: Platform.OS === "ios" ? 20 : 0)

export function useThemeColor(
  props: Colors,
  colorName: ThemeColorName,
) {
  const { theme } = useTheme();
  return props[theme] ?? defaultColors[colorName][theme];
}
