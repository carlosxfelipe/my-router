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
    light: "#FFFFFF",
    dark: "#1C1B1F",
  },
  bottom: {
    light: "#FFFFFF",
    dark: "#1C1B1F",
  },
};

export function useThemeColor(
  props: Colors,
  colorName: ThemeColorName,
) {
  const { theme } = useTheme();
  return props[theme] ?? defaultColors[colorName][theme];
}
