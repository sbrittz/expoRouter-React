import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Menú" }} />
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: "Detalle del plato" }}
      />
    </Stack>
  );
}
