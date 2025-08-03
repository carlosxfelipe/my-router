import React, { useState } from "react";
import { Text } from "react-native";
import type { RouteComponent, Router } from "./types";
import { routeDefinitions } from "./routes";
import { RouterProvider } from "./RouterContext";

const NotFound: RouteComponent = () => <Text>404 - Página não encontrada</Text>;

export function useRouter(): { Screen: RouteComponent } {
  const [history, setHistory] = useState<string[]>(["/"]);

  const findComponent = (path: string): RouteComponent => {
    const route = routeDefinitions.find((r) => r.path === path);
    return route ? route.component : NotFound;
  };

  const currentPath = history[history.length - 1];
  const CurrentComponent = findComponent(currentPath);

  const go = (path: string) => setHistory([path]);
  const push = (path: string) => setHistory((prev) => [...prev, path]);
  const pop = () =>
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const router: Router = { go, push, pop };

  const Screen: RouteComponent = (props) => (
    <RouterProvider value={router}>
      <CurrentComponent {...props} />
    </RouterProvider>
  );

  return { Screen };
}
