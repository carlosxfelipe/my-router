import React, { createContext, useContext } from "react";
import type { Router } from "./types";

const RouterContext = createContext<Router | undefined>(undefined);

export function RouterProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Router;
}) {
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useRouterContext(): Router {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }
  return context;
}
