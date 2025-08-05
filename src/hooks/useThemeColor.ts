import { useTheme } from "../theme/ThemeContext";

type Colors = {
  light?: string;
  dark?: string;
};

export type ThemeColorName =
  | "text"
  | "background"
  | "primary"
  | "onPrimary"
  | "secondary"
  | "onSecondary"
  | "surface"
  | "onSurface"
  | "surfaceVariant"
  | "outline"
  | "error"
  | "onError"
  | "inverseSurface"
  | "inverseOnSurface"
  | "header"
  | "bottom";

const defaultColors: Record<ThemeColorName, { light: string; dark: string }> = {
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
  onPrimary: {
    light: "#FFFFFF",
    dark: "#381E72",
  },
  secondary: {
    light: "#625B71",
    dark: "#CCC2DC",
  },
  onSecondary: {
    light: "#FFFFFF",
    dark: "#332D41",
  },
  surface: {
    light: "#FFFBFE",
    dark: "#1C1B1F",
  },
  onSurface: {
    light: "#1C1B1F",
    dark: "#E6E1E5",
  },
  surfaceVariant: {
    light: "#E7E0EC",
    dark: "#49454F",
  },
  outline: {
    light: "#79747E",
    dark: "#938F99",
  },
  error: {
    light: "#B3261E",
    dark: "#F2B8B5",
  },
  onError: {
    light: "#FFFFFF",
    dark: "#601410",
  },
  inverseSurface: {
    light: "#313033",
    dark: "#E6E1E5",
  },
  inverseOnSurface: {
    light: "#F4EFF4",
    dark: "#1C1B1F",
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
