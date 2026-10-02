import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { DondeEstoy } from "../../components/DondeEstoy";

const articulos = [
  { titulo: "Formas de pago", href: "/ayuda/pagos/efectivo" },
  { titulo: "Horarios", href: "/ayuda/horarios" },
  { titulo: "Cómo comprar", href: "/ayuda/pedidos/como-comprar" },
  { titulo: "Preguntas frecuentes", href: "/ayuda/preguntas/frecuentes" },
] as const;

export default function AyudaIndexScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Centro de ayuda</Text>

      {articulos.map((articulo) => (
        <Link key={articulo.href} href={articulo.href as any} asChild>
          <View style={styles.item}>
            <Text style={styles.itemText}>{articulo.titulo}</Text>
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
    marginBottom: 18,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 12,
  },
  itemText: {
    color: "#0f172a",
    fontWeight: "600",
    fontSize: 16,
  },
});
