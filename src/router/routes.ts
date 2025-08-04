import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Edit from "../screens/Settings/Edit";
import type { RouteDefinition } from "./types";

export const routeDefinitions: RouteDefinition[] = [
  { path: "/", component: Home, keepMounted: true },
  { path: "/profile/:id", component: Profile, keepMounted: true },
  { path: "/settings/edit", component: Edit, keepMounted: true },
];
