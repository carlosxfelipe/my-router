import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useRouterContext } from "./RouterContext";

// Back físico (Android)

export function BackAware() {
  const router = useRouterContext();

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (router.canGoBack) {
        router.pop();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [router]);

  return null;
}
