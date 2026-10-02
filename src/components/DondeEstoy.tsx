import { useLocalSearchParams, usePathname, useSegments } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) {
    return null;
  }

  return (
    <View style={styles.debugBox}>
      <Text style={styles.debugTitle}>Dónde estoy</Text>
      <Text style={styles.debugText}>Ruta: {pathname}</Text>
      <Text style={styles.debugText}>
        Segmentos: {segments.join(" / ") || "root"}
      </Text>
      <Text style={styles.debugText}>Parámetros: {JSON.stringify(params)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  debugBox: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 12,
  },
  debugTitle: {
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 6,
  },
  debugText: {
    color: "#334155",
    fontSize: 12,
    marginBottom: 4,
  },
});
