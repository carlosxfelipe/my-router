# 🧭 Custom Router for React Native CLI

This is a custom single-page style router for React Native projects (using React Native CLI), designed to replace `react-navigation` in simple scenarios.

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

Each screen will use the router context:

```tsx
import { Button, View } from "react-native";
import { useRouterContext } from "../router/RouterContext";

export default function Home() {
  const router = useRouterContext();
  return (
    <View>
      <Button title="Go to Profile" onPress={() => router.push("/profile")} />
    </View>
  );
}
```

---

### 3. Define Your Routes

Edit `src/router/routes.ts` to define the path-component mapping:

```ts
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Edit from "../screens/Settings/Edit";
import type { RouteDefinition } from "./types";

export const routeDefinitions: RouteDefinition[] = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile },
  { path: "/settings/edit", component: Edit },
];
```

---

### 4. Use in App.tsx

Wrap your app with the router:

```tsx
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useRouter } from "./src/router/router";

function AppContent() {
  const { Screen } = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Screen />
    </SafeAreaView>
  );
}

export default function App() {
  return <AppContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

---

### 5. Done 🎉

Now your routing system is working!

Use `useRouterContext()` inside screens to navigate:

```ts
router.push("/path")
router.go("/")
router.pop()
```

---

## 🧪 Advanced Ideas

- Add `AsyncStorage` to persist navigation history
- Support route params
- Animate transitions between screens

---

MIT License
