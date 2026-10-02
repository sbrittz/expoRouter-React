import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../../components/DondeEstoy";
import { useAppContext } from "../../context/AppContext";

export default function CocinaScreen() {
  const { colaPedidos, atenderSiguientePedido, cerrarSesion } = useAppContext();
  const pedidoActual = colaPedidos.frente();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Panel de cocina</Text>

      <View style={styles.summary}>
        <Text style={styles.label}>Pedidos esperando</Text>
        <Text style={styles.value}>{colaPedidos.tamanio}</Text>
      </View>

      {pedidoActual ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pedido #{pedidoActual.numero}</Text>
          <Text style={styles.cardText}>
            Nota: {pedidoActual.nota || "Sin aclaración"}
          </Text>
          <Text style={styles.cardText}>Total: $ {pedidoActual.total}</Text>

          {pedidoActual.items.map((item) => (
            <Text
              key={`${pedidoActual.id}-${item.plato.id}`}
              style={styles.itemText}
            >
              - {item.cantidad}x {item.plato.nombre}
            </Text>
          ))}

          <Pressable
            style={styles.button}
            onPress={() => atenderSiguientePedido()}
          >
            <Text style={styles.buttonText}>Atender siguiente</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No hay pedidos pendientes</Text>
        </View>
      )}

      <Pressable style={styles.logout} onPress={cerrarSesion}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
  summary: {
    backgroundColor: "#dcfce7",
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  label: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 26,
    fontWeight: "800",
    color: "#14532d",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 18,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
  },
  cardText: {
    color: "#475569",
    marginBottom: 8,
  },
  itemText: {
    color: "#1e293b",
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#0f766e",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 18,
  },
  emptyTitle: {
    color: "#0f172a",
    fontWeight: "700",
  },
  logout: {
    marginTop: 18,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#991b1b",
    fontWeight: "700",
  },
});
