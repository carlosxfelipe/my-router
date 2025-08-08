yarn add react-native-safe-area-context npx pod-install

```tsx
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* seu app aqui */}
    </SafeAreaProvider>
  );
}
```
