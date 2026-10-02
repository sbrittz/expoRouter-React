import { ScrollView, StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../../components/DondeEstoy";
import { useAppContext } from "../../context/AppContext";

export default function AtendidosScreen() {
  const { historialAtendidos } = useAppContext();
  const atendidos = historialAtendidos.aArray().slice().reverse();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pedidos atendidos</Text>

      {atendidos.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Aún no hubo pedidos atendidos.</Text>
        </View>
      ) : (
        atendidos.map((pedido) => (
          <View key={pedido.id} style={styles.card}>
            <Text style={styles.pedidoTitle}>Pedido #{pedido.numero}</Text>
            <Text style={styles.text}>Total: $ {pedido.total}</Text>
            <Text style={styles.text}>
              Nota: {pedido.nota || "Sin aclaración"}
            </Text>
            {pedido.items.map((item) => (
              <Text key={`${pedido.id}-${item.plato.id}`} style={styles.item}>
                {item.cantidad}x {item.plato.nombre}
              </Text>
            ))}
          </View>
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
    marginBottom: 18,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 12,
  },
  pedidoTitle: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 6,
  },
  text: {
    color: "#475569",
    marginBottom: 4,
  },
  item: {
    color: "#1e293b",
    marginTop: 4,
  },
});
