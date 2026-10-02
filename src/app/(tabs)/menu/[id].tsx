import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../../../components/DondeEstoy";
import { useAppContext } from "../../../context/AppContext";
import { platos } from "../../../data/platos";

export default function MenuDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { agregarAlCarrito } = useAppContext();

  const platoId = Number(id);
  const plato = platos.find((item) => item.id === platoId);

  if (!id || Number.isNaN(platoId) || !plato) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Plato no encontrado</Text>
        <Text style={styles.emptyText}>
          No existe un plato con ese identificador.
        </Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>{plato.categoria}</Text>
      <Text style={styles.title}>{plato.nombre}</Text>
      <Text style={styles.price}>$ {plato.precio}</Text>
      <Text style={styles.description}>{plato.descripcion}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{plato.categoria}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => agregarAlCarrito(plato)}>
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: "700",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textTransform: "capitalize",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0f172a",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f766e",
    marginTop: 8,
  },
  description: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
  },
  card: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    marginTop: 6,
    color: "#0f172a",
    fontSize: 18,
    textTransform: "capitalize",
  },
  button: {
    marginTop: 22,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyText: {
    color: "#475569",
    marginBottom: 12,
  },
});
