# 🧭 Custom Router for React Native CLI

A lightweight, custom single-page style router for React Native projects (using
React Native CLI), designed to replace `react-navigation` in simple scenarios —
no native dependencies or linking required.

---

## ✅ How to Use in a New Project

### 1. Copy the Router Files

Copy the following files into your new project's `src/router/` folder:

```
src/
└── router/
    ├── router.tsx
    ├── RouterContext.tsx
    ├── routes.ts
    └── types.ts
```

---

### 2. Create Screens

Create your screens under `src/screens/`. Example:

```
src/
└── screens/
    ├── Home.tsx
    ├── Profile.tsx
    └── Settings/
        └── Edit.tsx
```

Each screen can access routing functions via context:

```tsx
import { Button, View } from "react-native";
import { useRouterContext } from "../router/RouterContext";

export default function Home() {
  const router = useRouterContext();

  return (
    <View>
      <Button
        title="Go to Profile"
        onPress={() => router.push("/profile/123")}
      />
      <Button
        title="Replace with Edit Screen"
        onPress={() => router.replace("/settings/edit")}
      />
    </View>
  );
}
```

---

### 3. Define Your Routes

Edit `src/router/routes.ts` to define the mapping between paths and screen
components:

```ts
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Edit from "../screens/Settings/Edit";
import type { RouteDefinition } from "./types";

export const routeDefinitions: RouteDefinition[] = [
  { path: "/", component: Home },
  { path: "/profile/:id", component: Profile },
  { path: "/settings/edit", component: Edit },
];
```

> Supports dynamic segments like `/profile/:id` which will be available via
> `router.params.id`.

---

### 4. Use the Router in App.tsx

Wrap your app with the custom router:

```tsx
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useRouter } from "./src/router/router";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { BottomNavigationBar } from "./src/components/BottomNavigation";

function MainLayout({ Content }: { Content: React.ComponentType }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Content />
      </View>
      <BottomNavigationBar />
    </SafeAreaView>
  );
}

export default function App() {
  const { RouterOutlet } = useRouter();

  return (
    <ThemeProvider>
      <RouterOutlet>
        {({ component: CurrentScreen }) => (
          <MainLayout Content={CurrentScreen} />
        )}
      </RouterOutlet>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
```

---

### 5. Done 🎉

Now your navigation is working!

---

## ✨ Router API (via `useRouterContext()`)

| Function        | Description                       |
| --------------- | --------------------------------- |
| `push(path)`    | Navigate forward to a new screen  |
| `replace(path)` | Replace current screen            |
| `reset(path)`   | Reset stack and go to screen      |
| `pop()`         | Go back one screen                |
| `params`        | Object with route parameters      |
| `currentPath`   | String of current path (e.g. `/`) |

Example for dynamic parameters:

```tsx
const { id } = useRouterContext().params;
```

---

## 🧪 Advanced Ideas

- ✅ Use `<BottomNavigationBar />` inside layout to persist across views
- 💾 Add `AsyncStorage` to persist navigation state
- 💡 Animate transitions between screens
- 🧪 Add query string support (e.g. `/profile?id=123`)

---

## 📁 Recommended Structure

```
src/
├── components/
│   └── BottomNavigation.tsx
├── screens/
│   ├── Home.tsx
│   ├── Profile.tsx
│   └── Settings/
│       └── Edit.tsx
├── router/
│   ├── router.tsx
│   ├── RouterContext.tsx
│   ├── routes.ts
│   └── types.ts
├── theme/
│   └── ThemeContext.tsx
├── hooks/
│   └── useThemeColor.ts
```

> Place the navigation bar in `/components` — it's UI, not routing logic.

---

## 🧾 License

MIT License
