import React, { useMemo, useReducer } from "react";
import { Text } from "react-native";
import type { RouteComponent, Router } from "./types";
import { routeDefinitions } from "./routes";
import { RouterProvider } from "./RouterContext";
import { matchPath } from "./matchPath";

type Entry = { key: string; path: string };
type TabKey = "home" | "orders" | "settings" | "profile";

type NavState = {
  activeTab: TabKey;
  stacks: Record<TabKey, Entry[]>;
};

const initial: NavState = {
  activeTab: "home",
  stacks: {
    home: [{ key: "home-key", path: "/" }],
    orders: [{ key: "orders-key", path: "/orders" }],
    settings: [{ key: "settings-key", path: "/settings" }],
    profile: [{ key: "profile-key", path: "/profile/:id" }],
  },
};

function tabForPath(path: string): TabKey {
  if (path.startsWith("/orders")) return "orders";
  if (path.startsWith("/settings")) return "settings";
  if (path.startsWith("/profile")) return "profile";
  return "home";
}

type Action =
  | { type: "TAB_TO"; tab: TabKey }
  | { type: "PUSH"; path: string }
  | { type: "REPLACE"; path: string }
  | { type: "POP"; count?: number }
  | { type: "RESET"; path: string };

function reduce(state: NavState, action: Action): NavState {
  const tab = state.activeTab;
  const stack = state.stacks[tab];

  const withStack = (t: TabKey, next: Entry[]) => ({
    ...state,
    stacks: { ...state.stacks, [t]: next },
  });

  switch (action.type) {
    case "TAB_TO":
      return { ...state, activeTab: action.tab };

    case "PUSH": {
      const targetTab = tabForPath(action.path);
      const targetStack = state.stacks[targetTab];
      const top = targetStack[targetStack.length - 1];
      // dedupe simples: evita duplicar topo idêntico
      if (top?.path === action.path) {
        // mesmo path: só trocar para a aba alvo
        return { ...state, activeTab: targetTab };
      }
      const next = [...targetStack, {
        key: `${targetTab}-${Date.now()}`,
        path: action.path,
      }];
      return { ...withStack(targetTab, next), activeTab: targetTab };
    }

    case "REPLACE": {
      const targetTab = tabForPath(action.path);
      const targetStack = state.stacks[targetTab];
      const next = [...targetStack.slice(0, -1), {
        key: `${targetTab}-${Date.now()}`,
        path: action.path,
      }];
      return { ...withStack(targetTab, next), activeTab: targetTab };
    }

    case "POP": {
      const n = Math.max(1, action.count ?? 1);
      if (stack.length <= 1) return state; // não passa do primeiro
      const nextLen = Math.max(1, stack.length - n);
      return withStack(tab, stack.slice(0, nextLen));
    }

    case "RESET": {
      const targetTab = tabForPath(action.path);
      const next = [{ key: `${targetTab}-${Date.now()}`, path: action.path }];
      return { ...withStack(targetTab, next), activeTab: targetTab };
    }

    default:
      return state;
  }
}

type ScreenProps = {
  children?:
    | ((props: { component: RouteComponent }) => React.ReactNode)
    | React.ReactNode;
};

const NotFound: RouteComponent = () => <Text>404 - Página não encontrada</Text>;

export function useRouter(): { RouterOutlet: RouteComponent } {
  const [nav, dispatch] = useReducer(reduce, initial);

  // caminho atual = topo da pilha da aba ativa
  const currentStack = nav.stacks[nav.activeTab];
  const currentEntry = currentStack[currentStack.length - 1];
  const currentPath = currentEntry.path;

  const { component: CurrentComponent, params } = useMemo(() => {
    for (const route of routeDefinitions) {
      const res = matchPath(route.path, currentPath);
      if (res.matched) {
        return { component: route.component, params: res.params };
      }
    }
    return { component: NotFound, params: {} };
  }, [currentPath]);

  const canGoBack = currentStack.length > 1;

  const api: Router = {
    currentPath,
    params,
    canGoBack,
    push: (p) => dispatch({ type: "PUSH", path: p }),
    replace: (p) => dispatch({ type: "REPLACE", path: p }),
    pop: () => dispatch({ type: "POP" }),
    reset: (p) => dispatch({ type: "RESET", path: p }),
    // (futuro) switchTab: (tab: TabKey) => dispatch({ type: "TAB_TO", tab }),
  };

  const RouterOutlet: React.FC<ScreenProps> = ({ children, ...props }) => (
    <RouterProvider value={api}>
      {typeof children === "function"
        ? children({ component: CurrentComponent })
        : (
          <>
            <CurrentComponent {...props} />
            {children}
          </>
        )}
    </RouterProvider>
  );

  return { RouterOutlet };
}
