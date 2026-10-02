import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

import { DondeEstoy } from "../../components/DondeEstoy";

export default function AyudaDetalleScreen() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params.slug)
    ? params.slug.join("/")
    : (params.slug ?? "inicio");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Artículo de ayuda</Text>
      <Text style={styles.slug}>Ruta: /ayuda/{slug}</Text>
      <Text style={styles.text}>
        Este contenido puede adaptarse según el slug recibido. En este ejemplo
        se muestra la ruta completa para que el aprendizaje de routing quede
        claro.
      </Text>
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },
  slug: {
    color: "#1d4ed8",
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
  },
});
