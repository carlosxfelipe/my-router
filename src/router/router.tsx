import React, { useMemo, useState } from "react";
import { Text } from "react-native";
import type { RouteComponent, Router } from "./types";
import { routeDefinitions } from "./routes";
import { RouterProvider } from "./RouterContext";
import { matchPath } from "./matchPath";

type ScreenProps = {
  children?:
    | ((props: { component: RouteComponent }) => React.ReactNode)
    | React.ReactNode;
};

const NotFound: RouteComponent = () => <Text>404 - Página não encontrada</Text>;

export function useRouter(): { RouterOutlet: RouteComponent } {
  const [history, setHistory] = useState<string[]>(["/"]);

  const currentPath = history[history.length - 1];

  const { component: CurrentComponent, params: routeParams } = useMemo(() => {
    for (const route of routeDefinitions) {
      const { matched, params } = matchPath(route.path, currentPath);
      if (matched) {
        return { component: route.component, params };
      }
    }
    return { component: NotFound, params: {} };
  }, [currentPath]);

  const reset = (path: string) => setHistory([path]);
  const push = (path: string) => setHistory((prev) => [...prev, path]);
  const pop = () =>
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const replace = (path: string) =>
    setHistory((prev) => [...prev.slice(0, -1), path]);

  const router: Router = {
    reset,
    push,
    pop,
    replace,
    params: routeParams,
    currentPath,
  };

  const RouterOutlet: React.FC<ScreenProps> = ({ children, ...props }) => {
    return (
      <RouterProvider value={router}>
        {typeof children === "function"
          ? (
            children({ component: CurrentComponent })
          )
          : (
            <>
              <CurrentComponent {...props} />
              {children}
            </>
          )}
      </RouterProvider>
    );
  };

  return { RouterOutlet };
}
