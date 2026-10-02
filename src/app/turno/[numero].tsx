import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../../components/DondeEstoy";
import { useAppContext } from "../../context/AppContext";

export default function TurnoScreen() {
  const params = useLocalSearchParams<{ numero?: string }>();
  const { colaPedidos } = useAppContext();
  const numero = Number(params.numero ?? 0);
  const pedidosAdelante = Math.max(0, colaPedidos.tamanio - 1);
  const tiempoEstimado = pedidosAdelante * 3;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Tu turno</Text>
      <Text style={styles.numero}>{numero}</Text>
      <Text style={styles.text}>Hay {pedidosAdelante} pedido(s) adelante.</Text>
      <Text style={styles.text}>Tiempo estimado: {tiempoEstimado} min.</Text>
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  eyebrow: {
    color: "#2563eb",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  numero: {
    fontSize: 64,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    color: "#475569",
    marginBottom: 4,
  },
});
