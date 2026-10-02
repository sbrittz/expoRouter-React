import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../../components/DondeEstoy";
import { platos } from "../../data/platos";
import type { Categoria } from "../../types";

const categoriasValidas: Categoria[] = [
  "desayuno",
  "almuerzo",
  "bebidas",
  "kiosco",
];

export default function CategoriaScreen() {
  const params = useLocalSearchParams<{ categoria?: string }>();
  const categoria = String(params.categoria ?? "").toLowerCase();

  if (!categoriasValidas.includes(categoria as Categoria)) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Categoría inválida</Text>
        <Text style={styles.emptyText}>
          La categoría {categoria || "ingresada"} no existe.
        </Text>
        <DondeEstoy />
      </View>
    );
  }

  const platosCategoria = platos.filter(
    (plato) => plato.categoria === categoria,
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{categoria}</Text>

      {platosCategoria.map((plato) => (
        <Link
          key={plato.id}
          href={{
            pathname: "/menu/[id]",
            params: { id: String(plato.id) },
          }}
          asChild
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{plato.nombre}</Text>
            <Text style={styles.cardText}>{plato.descripcion}</Text>
            <Text style={styles.cardPrice}>$ {plato.precio}</Text>
          </View>
        </Link>
      ))}

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
    paddingBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    textTransform: "capitalize",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  cardText: {
    color: "#475569",
    marginTop: 6,
  },
  cardPrice: {
    marginTop: 8,
    color: "#0f766e",
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  emptyText: {
    color: "#475569",
  },
});
