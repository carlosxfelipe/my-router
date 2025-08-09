export type Router = {
  reset: (path: string) => void;
  push: (path: string) => void;
  pop: () => void;
  replace: (path: string) => void;
  params: Record<string, string>;
  currentPath: string;
  canGoBack: boolean;
};

export type RouteComponent = React.ComponentType<any>;

export type RouteDefinition = {
  path: string;
  component: RouteComponent;
  keepMounted?: boolean; // default: false
};
