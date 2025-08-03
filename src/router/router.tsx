import React, { useState } from "react";
import { Text } from "react-native";
import type { RouteComponent, Router } from "./types";
import { routeDefinitions } from "./routes";
import { RouterProvider } from "./RouterContext";

const NotFound: RouteComponent = () => <Text>404 - Página não encontrada</Text>;

function matchPath(
  routePath: string,
  actualPath: string,
): { matched: boolean; params: Record<string, string> } {
  const routeSegments = routePath.split("/").filter(Boolean);
  const pathSegments = actualPath.split("/").filter(Boolean);

  if (routeSegments.length !== pathSegments.length) {
    return { matched: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const routePart = routeSegments[i];
    const pathPart = pathSegments[i];

    if (routePart.startsWith(":")) {
      params[routePart.slice(1)] = pathPart;
    } else if (routePart !== pathPart) {
      return { matched: false, params: {} };
    }
  }

  return { matched: true, params };
}

export function useRouter(): { Screen: RouteComponent } {
  const [history, setHistory] = useState<string[]>(["/"]);

  let routeParams: Record<string, string> = {};

  const findComponent = (path: string): RouteComponent => {
    for (const route of routeDefinitions) {
      const { matched, params } = matchPath(route.path, path);
      if (matched) {
        routeParams = params;
        return route.component;
      }
    }
    routeParams = {};
    return NotFound;
  };

  const currentPath = history[history.length - 1];
  const CurrentComponent = findComponent(currentPath);

  const go = (path: string) => setHistory([path]);
  const push = (path: string) => setHistory((prev) => [...prev, path]);
  const pop = () =>
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const replace = (path: string) =>
    setHistory((prev) => [...prev.slice(0, -1), path]);

  const router: Router = { go, push, pop, replace, params: routeParams };

  const Screen: RouteComponent = (props) => (
    <RouterProvider value={router}>
      <CurrentComponent {...props} />
    </RouterProvider>
  );

  return { Screen };
}
