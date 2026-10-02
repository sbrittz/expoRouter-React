import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../components/DondeEstoy";
import { useAppContext } from "../context/AppContext";

export default function ConfirmarPedidoScreen() {
  const { carrito, nota, confirmarPedido } = useAppContext();

  const total = carrito.reduce(
    (sum, item) => sum + item.plato.precio * item.cantidad,
    0,
  );

  const handleConfirmar = () => {
    const numero = confirmarPedido();

    if (numero === undefined) {
      return;
    }

    // Usamos replace para evitar volver a la pantalla de confirmación al tocar "atrás".
    router.replace({
      pathname: "/turno/[numero]",
      params: { numero: String(numero) },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Confirmar pedido</Text>

      {carrito.map((item) => (
        <View key={item.plato.id} style={styles.itemRow}>
          <Text style={styles.itemName}>{item.plato.nombre}</Text>
          <Text style={styles.itemMeta}>
            {item.cantidad} x $ {item.plato.precio}
          </Text>
        </View>
      ))}

      {nota ? (
        <View style={styles.notaBox}>
          <Text style={styles.label}>Nota</Text>
          <Text style={styles.value}>{nota}</Text>
        </View>
      ) : null}

      <View style={styles.totalBox}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.totalValue}>$ {total}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleConfirmar}
        disabled={carrito.length === 0}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 18,
  },
  itemRow: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 10,
  },
  itemName: {
    fontWeight: "700",
    color: "#0f172a",
  },
  itemMeta: {
    marginTop: 4,
    color: "#64748b",
  },
  notaBox: {
    marginTop: 10,
    backgroundColor: "#eef2ff",
    borderRadius: 14,
    padding: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#4338ca",
  },
  value: {
    marginTop: 6,
    color: "#1e293b",
  },
  totalBox: {
    marginTop: 18,
    backgroundColor: "#dbeafe",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalValue: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 22,
  },
  button: {
    marginTop: 20,
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
});
