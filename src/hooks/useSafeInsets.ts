import { Platform, StatusBar } from "react-native";

function getSafeBottomInset(): number {
  if (Platform.OS === "ios") return 34; // iPhone X+ gesture area
  if (Platform.OS === "android") return 16; // estimativa razoável
  return 0;
}

function getSafeTopInset(): number {
  if (Platform.OS === "android") return StatusBar.currentHeight ?? 0;
  return 44; // iOS notch / safe area top
}

export function useSafeInsets() {
  return {
    top: getSafeTopInset(),
    bottom: getSafeBottomInset(),
  };
}

// TODO: import { useSafeAreaInsets } from "react-native-safe-area-context";
