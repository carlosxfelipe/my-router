import { useTheme } from "../theme/ThemeContext";

type Colors = {
  light?: string;
  dark?: string;
};

const defaultColors = {
  text: {
    light: "#000",
    dark: "#fff",
  },
  background: {
    light: "#fff",
    dark: "#000",
  },
};

export function useThemeColor(
  props: Colors,
  colorName: keyof typeof defaultColors,
) {
  const { theme } = useTheme();
  return props[theme] ?? defaultColors[colorName][theme];
}
