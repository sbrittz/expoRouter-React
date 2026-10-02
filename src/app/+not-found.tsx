import { Link, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página no encontrada</Text>
      <Text style={styles.subtitle}>
        La ruta ingresada no existe en esta app.
      </Text>
      <Text style={styles.path}>Ruta: {pathname}</Text>

      <Link href="/" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 10,
  },
  path: {
    fontSize: 14,
    color: "#1d4ed8",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
