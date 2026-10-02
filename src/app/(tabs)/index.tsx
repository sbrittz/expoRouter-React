import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppContext } from "../../context/AppContext";
import { DondeEstoy } from "../../components/DondeEstoy";

const cards = [
  {
    title: "Menú",
    href: "/menu",
    description: "Ver opciones por categoría",
    icon: "🍽️",
  },
  {
    title: "Buscar",
    href: "/buscar?q=&categoria=",
    description: "Buscar platos y filtros",
    icon: "🔎",
  },
  {
    title: "Ayuda",
    href: "/ayuda",
    description: "Preguntas frecuentes",
    icon: "💡",
  },
  {
    title: "Cocina",
    href: "/cocina",
    description: "Atender pedidos",
    icon: "👨‍🍳",
  },
] as const;

export default function InicioScreen() {
  const { usuario } = useAppContext();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Comedor IPF</Text>
      <Text style={styles.title}>¡Buen día!</Text>
      <Text style={styles.subtitle}>
        Todo listo para pedir tu comida del día.
      </Text>

      <View style={styles.grid}>
        {cards.map((card) => (
          <Link href={card.href as any} key={card.title} asChild>
            <View style={styles.card}>
              <Text style={styles.icon}>{card.icon}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardText}>{card.description}</Text>
            </View>
          </Link>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Estado</Text>
        <Text style={styles.infoText}>
          {usuario ? "Cocina activa" : "Usuario alumno"}
        </Text>
      </View>

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
    paddingBottom: 36,
  },
  eyebrow: {
    color: "#2563eb",
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0f172a",
  },
  subtitle: {
    color: "#475569",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "47%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#0f172a",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  icon: {
    fontSize: 26,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  cardText: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 13,
  },
  infoBox: {
    marginTop: 24,
    backgroundColor: "#dbeafe",
    borderRadius: 16,
    padding: 16,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#1d4ed8",
  },
  infoText: {
    color: "#0f172a",
    marginTop: 4,
    fontSize: 18,
    fontWeight: "600",
  },
});
