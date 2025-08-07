import { Dimensions, Platform, StatusBar } from "react-native";

function getSafeBottomInset(): number {
  if (Platform.OS === "ios") return 34; // iPhone X+ gesture area

  const { height, width } = Dimensions.get("window");

  const aspectRatio = height / width;

  // Tentativa de detectar dispositivos com barra de gestos
  return aspectRatio > 2.1 ? 24 : 0;
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

// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export function useSafeInsets() {
//   return useSafeAreaInsets();
// }
