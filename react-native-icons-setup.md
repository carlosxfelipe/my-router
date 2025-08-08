## 📦 Instalação de ícones no React Native

### 1. Instale as dependências

```bash
yarn add react-native-svg react-native-vector-icons
yarn add -D @types/react-native-vector-icons
npx pod-install
```

---

### 2. Android – `android/app/build.gradle`

Adicione a seguinte linha **no final do arquivo**:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

---

### 3. iOS – `ios/Info.plist`

Adicione dentro da tag `<dict>`:

```xml
<key>UIAppFonts</key>
<array>
  <string>MaterialCommunityIcons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>Ionicons.ttf</string>
  <string>Feather.ttf</string>
</array>
```

---

✅ Pronto! Os ícones agora funcionarão corretamente no Android e iOS 🎉\
(A partir do React Native 0.71+, o autolinking também cuida das fontes no iOS —
não é necessário adicioná-las manualmente no Xcode)
