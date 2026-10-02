import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useAppContext } from "../../../context/AppContext";

export default function NotaCarritoScreen() {
  const { nota, setNota } = useAppContext();
  const [texto, setTexto] = useState(nota);

  const guardar = () => {
    setNota(texto.trim());
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aclaración para la cocina</Text>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Ej: sin sal"
        multiline
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>Guardar nota</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 16,
  },
  input: {
    minHeight: 140,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 16,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    marginTop: 18,
    backgroundColor: "#0f766e",
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
