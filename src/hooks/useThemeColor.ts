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
  | "outline";

const defaultColors = {
  text: {
    light: "#1C1B1F", // M3 - OnBackground
    dark: "#E6E1E5", // M3 - OnBackground (dark)
  },
  background: {
    light: "#FFFFFF", // M3 - Background
    dark: "#1C1B1F", // M3 - Background dark
  },
  primary: {
    light: "#6750A4", // M3 - Primary
    dark: "#D0BCFF", // M3 - Primary dark
  },
  secondary: {
    light: "#625B71", // M3 - Secondary
    dark: "#CCC2DC", // M3 - Secondary dark
  },
  surface: {
    light: "#FFFBFE", // M3 - Surface
    dark: "#1C1B1F", // M3 - Surface dark
  },
  outline: {
    light: "#79747E",
    dark: "#938F99",
  },
};

export function useThemeColor(
  props: Colors,
  colorName: ThemeColorName,
) {
  const { theme } = useTheme();
  return props[theme] ?? defaultColors[colorName][theme];
}
