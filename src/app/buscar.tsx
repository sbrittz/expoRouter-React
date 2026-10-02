import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { DondeEstoy } from "../components/DondeEstoy";
import { PlatoCard } from "../components/PlatoCard";
import { useAppContext } from "../context/AppContext";
import { categoriasValidas, platos } from "../data/platos";

export default function BuscarScreen() {
  const params = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const { agregarAlCarrito } = useAppContext();
  const [texto, setTexto] = useState(String(params.q ?? ""));
  const categoriaActual = String(params.categoria ?? "");

  const resultados = useMemo(() => {
    const textoNormalizado = texto.trim().toLowerCase();

    return platos.filter((plato) => {
      const coincideTexto =
        textoNormalizado.length === 0 ||
        plato.nombre.toLowerCase().includes(textoNormalizado) ||
        plato.descripcion.toLowerCase().includes(textoNormalizado);

      const coincideCategoria =
        categoriaActual.length === 0 ||
        categoriaActual === "todos" ||
        plato.categoria === categoriaActual;

      return coincideTexto && coincideCategoria;
    });
  }, [categoriaActual, texto]);

  const actualizarBusqueda = (nuevoTexto: string, nuevaCategoria: string) => {
    setTexto(nuevoTexto);
    router.setParams({
      q: nuevoTexto,
      categoria: nuevaCategoria,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Buscar platos</Text>

      <TextInput
        value={texto}
        onChangeText={(value) => actualizarBusqueda(value, categoriaActual)}
        placeholder="Buscar por nombre o descripción"
        style={styles.input}
      />

      <View style={styles.categoriaRow}>
        <Pressable
          style={[styles.chip, categoriaActual === "" && styles.chipActive]}
          onPress={() => actualizarBusqueda(texto, "")}
        >
          <Text
            style={[
              styles.chipText,
              categoriaActual === "" && styles.chipTextActive,
            ]}
          >
            Todas
          </Text>
        </Pressable>

        {categoriasValidas.map((categoria) => (
          <Pressable
            key={categoria}
            style={[
              styles.chip,
              categoriaActual === categoria && styles.chipActive,
            ]}
            onPress={() => actualizarBusqueda(texto, categoria)}
          >
            <Text
              style={[
                styles.chipText,
                categoriaActual === categoria && styles.chipTextActive,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </View>

      {resultados.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No se encontraron resultados</Text>
          <Text style={styles.emptyText}>
            Probá con otro texto o cambiá la categoría.
          </Text>
        </View>
      ) : (
        resultados.map((plato) => (
          <PlatoCard key={plato.id} plato={plato} onAdd={agregarAlCarrito} />
        ))
      )}

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
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  categoriaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#93c5fd",
  },
  chipText: {
    textTransform: "capitalize",
    color: "#0f172a",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#1d4ed8",
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 18,
  },
  emptyTitle: {
    fontWeight: "700",
    marginBottom: 6,
    color: "#0f172a",
  },
  emptyText: {
    color: "#475569",
  },
});
