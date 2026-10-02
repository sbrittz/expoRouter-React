import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useAppContext } from "../context/AppContext";

export default function LoginScreen() {
  const [usuario, setUsuario] = useState("cocina");
  const [clave, setClave] = useState("1234");
  const [error, setError] = useState("");
  const { iniciarSesion } = useAppContext();

  const handleLogin = () => {
    const ok = iniciarSesion(usuario, clave);

    if (!ok) {
      setError("Credenciales inválidas.");
      return;
    }

    // Reemplazamos la pantalla de login para que no quede en el historial.
    router.replace("/cocina");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso a cocina</Text>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        value={clave}
        onChangeText={setClave}
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0f766e",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
