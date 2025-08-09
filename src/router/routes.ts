import Home from "../screens/Home";
import Orders from "../screens/Orders";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import type { RouteDefinition } from "./types";

export const routeDefinitions: RouteDefinition[] = [
  { path: "/", component: Home, keepMounted: true },
  { path: "/orders", component: Orders, keepMounted: true },
  { path: "/settings", component: Settings, keepMounted: true },
  { path: "/profile/:id", component: Profile, keepMounted: false },
];
