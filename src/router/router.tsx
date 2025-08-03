import React, { useState } from "react";
import { Text } from "react-native";
import { routes } from "./routes";

export function useRouter() {
  const [path, setPath] = useState("/");

  const push = (newPath: string) => {
    if (routes[newPath]) {
      setPath(newPath);
    } else {
      setPath("/"); // fallback para Home
    }
  };

  const Screen = routes[path] ?? (() => {
    return <Text>404</Text>;
  });

  return { Screen, push };
}
