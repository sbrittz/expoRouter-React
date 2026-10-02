import { ScrollView, StyleSheet, Text, View } from "react-native";

import { PlatoCard } from "../../../components/PlatoCard";
import { useAppContext } from "../../../context/AppContext";
import { platos } from "../../../data/platos";
import type { Categoria } from "../../../types";
import { DondeEstoy } from "../../../components/DondeEstoy";

const categorias: Categoria[] = ["desayuno", "almuerzo", "bebidas", "kiosco"];

export default function MenuScreen() {
  const { agregarAlCarrito } = useAppContext();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Menú del comedor</Text>
      {categorias.map((categoria) => {
        const platosCategoria = platos.filter(
          (plato) => plato.categoria === categoria,
        );

        return (
          <View key={categoria} style={styles.seccion}>
            <Text style={styles.categoriaTitle}>{categoria}</Text>

            {platosCategoria.map((plato) => (
              <PlatoCard
                key={plato.id}
                plato={plato}
                onAdd={agregarAlCarrito}
              />
            ))}
          </View>
        );
      })}

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
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 20,
  },
  seccion: {
    marginBottom: 18,
  },
  categoriaTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 10,
    textTransform: "capitalize",
  },
});
