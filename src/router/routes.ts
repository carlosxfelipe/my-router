import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Edit from "../screens/Settings/Edit";

export const routes: Record<string, React.ComponentType<any>> = {
  "/": Home,
  "/profile": Profile,
  "/settings/edit": Edit,
};
