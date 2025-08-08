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
    ├── Orders.tsx
    ├── Profile.tsx
    └── Settings.tsx
```

Each screen can access navigation via context:

```tsx
import { ThemedButton } from "../components/ThemedButton";
import { useRouterContext } from "../router/RouterContext";

export default function Home() {
  const router = useRouterContext();

  return (
    <>
      <ThemedButton
        title="Go to Profile"
        onPress={() => router.push("/profile/123")}
      />
      <ThemedButton
        title="Go to Orders"
        onPress={() => router.push("/orders")}
      />
    </>
  );
}
```

---

### 3. Define Your Routes

Edit `src/router/routes.ts`:

```ts
import Home from "../screens/Home";
import Orders from "../screens/Orders";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import type { RouteDefinition } from "./types";

export const routeDefinitions: RouteDefinition[] = [
  { path: "/", component: Home },
  { path: "/orders", component: Orders },
  { path: "/profile/:id", component: Profile },
  { path: "/settings", component: Settings },
];
```

> Supports dynamic segments like `/profile/:id`, accessed via
> `router.params.id`.

---

### 4. Use the Router in `App.tsx`

Wrap your app with the router and theme providers:

```tsx
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { useRouter } from "./src/router/router";
import { useThemeColor } from "./src/hooks/useThemeColor";
import { BottomNavigationBar } from "./src/components/BottomNavigation";
import { Header } from "./src/components/Header";
import { RouteComponent } from "./src/router/types";

function MainLayout({ Content }: { Content: React.ComponentType }) {
  const { theme } = useTheme();
  const headerColor = useThemeColor({}, "header");
  const bottomColor = useThemeColor({}, "bottom");
  const textColor = useThemeColor({}, "text");

  return (
    <>
      <SafeAreaView style={{ backgroundColor: headerColor }} />

      <View style={styles.container}>
        <StatusBar
          backgroundColor={headerColor}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />

        <Header backgroundColor={headerColor} textColor={textColor} />

        <View style={styles.content}>
          <Content />
        </View>

        <BottomNavigationBar
          backgroundColor={bottomColor}
          textColor={textColor}
        />
      </View>
    </>
  );
}

export default function App() {
  const { RouterOutlet } = useRouter();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RouterOutlet>
          {({ component: CurrentScreen }: { component: RouteComponent }) => (
            <MainLayout Content={CurrentScreen} />
          )}
        </RouterOutlet>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
```

---

### 5. Install Required Dependencies

Install the required packages for vector icons and safe area support:

- [`react-native-icons-setup.md`](./react-native-icons-setup.md)
- [`react-native-safe-area-context.md`](./react-native-safe-area-context.md)

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

- 💾 Persist navigation state with `AsyncStorage`
- 🎬 Animate transitions between screens
- 🧩 Add query string support (e.g. `/profile?id=123`)

---

## 🧾 License

MIT License
