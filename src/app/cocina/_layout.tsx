import { Drawer } from "expo-router/drawer";

export default function CocinaLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Siguiente pedido" }} />
      <Drawer.Screen name="atendidos" options={{ title: "Historial" }} />
    </Drawer>
  );
}
