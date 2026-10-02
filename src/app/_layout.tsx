import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProvider, useAppContext } from "../context/AppContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { usuario } = useAppContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#0f172a",
        contentStyle: { backgroundColor: "#f8fafc" },
      }}
    >
      <Stack.Protected guard={!usuario}>
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={Boolean(usuario)}>
        <Stack.Screen
          name="cocina"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="buscar" options={{ headerTitle: "Buscar" }} />
      <Stack.Screen
        name="categorias/[categoria]"
        options={{ headerTitle: "Categoría" }}
      />
      <Stack.Screen
        name="confirmar"
        options={{ presentation: "modal", headerTitle: "Confirmar pedido" }}
      />
      <Stack.Screen
        name="turno/[numero]"
        options={{ headerTitle: "Turno asignado" }}
      />
      <Stack.Screen name="ayuda/index" options={{ headerTitle: "Ayuda" }} />
      <Stack.Screen
        name="ayuda/[...slug]"
        options={{ headerTitle: "Artículo" }}
      />
      <Stack.Screen name="pedido" options={{ headerShown: false }} />
      <Stack.Screen
        name="+not-found"
        options={{ headerTitle: "Página no encontrada" }}
      />
    </Stack>
  );
}
