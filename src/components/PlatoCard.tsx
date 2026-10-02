import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Plato } from "../types";

interface PlatoCardProps {
  plato: Plato;
  onAdd?: (plato: Plato) => void;
}

export function PlatoCard({ plato, onAdd }: PlatoCardProps) {
  return (
    <View style={styles.card}>
      <Link
        href={{
          pathname: "/menu/[id]",
          params: { id: String(plato.id) },
        }}
        asChild
      >
        <Pressable style={styles.content}>
          <Text style={styles.nombre}>{plato.nombre}</Text>
          <Text style={styles.descripcion} numberOfLines={2}>
            {plato.descripcion}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.categoria}>{plato.categoria}</Text>
            <Text style={styles.precio}>$ {plato.precio}</Text>
          </View>
        </Pressable>
      </Link>

      <Pressable style={styles.button} onPress={() => onAdd?.(plato)}>
        <Text style={styles.buttonText}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  content: {
    gap: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  descripcion: {
    color: "#475569",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  categoria: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  precio: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    marginTop: 14,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
