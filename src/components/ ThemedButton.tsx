import React from "react";
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

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
    { light: lightColor ?? "#e0e0e0", dark: darkColor ?? "#444" },
    "background"
  );
  const textColor = useThemeColor({}, "text");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? "#bbb" : backgroundColor,
          borderColor: textColor,
        },
        buttonStyle,
      ]}
      {...rest}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
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
    borderWidth: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
