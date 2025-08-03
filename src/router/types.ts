export type Router = {
  go: (path: string) => void;
  push: (path: string) => void;
  pop: () => void;
  replace: (path: string) => void;
};

export type RouteComponent = React.ComponentType<any>;

export type RouteDefinition = {
  path: string;
  component: RouteComponent;
};
