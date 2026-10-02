import { Stack } from "expo-router";

export default function CarritoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Carrito" }} />
      <Stack.Screen
        name="nota"
        options={{ headerTitle: "Nota para la cocina" }}
      />
    </Stack>
  );
}
