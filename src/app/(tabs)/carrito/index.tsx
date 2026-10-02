import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../../../components/DondeEstoy";
import { useAppContext } from "../../../context/AppContext";

export default function CarritoScreen() {
  const { carrito, pilaAcciones, deshacerUltimo, nota } = useAppContext();

  const total = carrito.reduce(
    (sum, item) => sum + item.plato.precio * item.cantidad,
    0,
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Mi pedido</Text>

      {carrito.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>El carrito está vacío</Text>
          <Text style={styles.emptyText}>
            Agregá algunos platos desde el menú.
          </Text>
        </View>
      ) : (
        carrito.map((item) => (
          <View key={item.plato.id} style={styles.itemRow}>
            <View>
              <Text style={styles.itemName}>{item.plato.nombre}</Text>
              <Text style={styles.itemMeta}>Cantidad: {item.cantidad}</Text>
            </View>
            <Text style={styles.itemPrice}>
              $ {item.plato.precio * item.cantidad}
            </Text>
          </View>
        ))
      )}

      {nota ? (
        <View style={styles.notaBox}>
          <Text style={styles.notaLabel}>Nota para cocina</Text>
          <Text style={styles.notaText}>{nota}</Text>
        </View>
      ) : null}

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>$ {total}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[
            styles.secondaryButton,
            pilaAcciones.vacia && styles.disabledButton,
          ]}
          disabled={pilaAcciones.vacia}
          onPress={deshacerUltimo}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              pilaAcciones.vacia && styles.disabledText,
            ]}
          >
            Deshacer último
          </Text>
        </Pressable>

        <Link href="/carrito/nota" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Agregar nota</Text>
          </Pressable>
        </Link>
      </View>

      <Pressable
        style={[
          styles.primaryButton,
          carrito.length === 0 && styles.disabledButton,
        ]}
        disabled={carrito.length === 0}
        onPress={() => router.push("/confirmar")}
      >
        <Text style={styles.primaryButtonText}>Confirmar pedido</Text>
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
    paddingBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 18,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 22,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6,
  },
  emptyText: {
    color: "#475569",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },
  itemName: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  itemMeta: {
    color: "#64748b",
    fontSize: 13,
  },
  itemPrice: {
    fontWeight: "700",
    color: "#0f172a",
  },
  notaBox: {
    marginTop: 12,
    backgroundColor: "#eef2ff",
    borderRadius: 14,
    padding: 14,
  },
  notaLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4338ca",
    textTransform: "uppercase",
  },
  notaText: {
    marginTop: 6,
    color: "#1e293b",
  },
  totalBox: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    borderRadius: 14,
    padding: 16,
  },
  totalLabel: {
    color: "#1d4ed8",
    fontWeight: "700",
    fontSize: 16,
  },
  totalValue: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 22,
  },
  actions: {
    marginTop: 18,
    gap: 10,
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#0f172a",
    fontWeight: "700",
  },
  linkButton: {
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#fef3c7",
    alignItems: "center",
  },
  linkButtonText: {
    color: "#92400e",
    fontWeight: "700",
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#cbd5e1",
  },
  disabledText: {
    color: "#64748b",
  },
});
