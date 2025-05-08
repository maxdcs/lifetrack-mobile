import { registerRootComponent } from "expo"
import { useFonts } from "expo-font"
import { ExpoRoot } from "expo-router"

// Must be exported or Fast Refresh won't update the context
export function App() {
  const [fontsLoaded] = useFonts({
    'Exo2': require('../mobile/assets/fonts/Exo2-VariableFont_wght.ttf'),
    'SpaceGrotesk': require('../mobile/assets/fonts/SpaceGrotesk-VariableFont_wght.ttf'),
  })
  

  if (!fontsLoaded) return null

  const ctx = require.context("./app")
  return (
      <ExpoRoot context={ctx} />
  )
}

registerRootComponent(App)
