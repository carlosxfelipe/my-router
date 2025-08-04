import React from "react";
import {
  Platform,
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { getContrastingTextColor } from "../utils/colors";

type ThemedButtonProps = PressableProps & {
  title: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  title,
  textStyle,
  buttonStyle,
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary",
  );
  const contrastColor = getContrastingTextColor(backgroundColor);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          opacity: pressed ? 0.95 : 1,
        },
        Platform.OS === "ios" ? styles.iosShadow : styles.androidElevation,
        buttonStyle,
      ]}
      android_ripple={{ color: "#ffffff22" }}
      {...rest}
    >
      <Text style={[styles.text, { color: contrastColor }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  iosShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  androidElevation: {
    elevation: 2,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
