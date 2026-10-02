import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Cola } from "../estructuras/Cola";
import { Pila } from "../estructuras/Pila";
import type {
  AccionCarrito,
  ItemCarrito,
  Pedido,
  Plato,
  Usuario,
} from "../types";

interface AppContextValue {
  usuario: Usuario | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  carrito: ItemCarrito[];
  nota: string;
  setNota: (nota: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  confirmarPedido: () => number | undefined;
  colaPedidos: Cola<Pedido>;
  historialAtendidos: Pila<Pedido>;
  atenderSiguientePedido: () => Pedido | undefined;
  pilaAcciones: Pila<AccionCarrito>;
  proximoNumero: number;
  limpiarCarrito: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }

  return context;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState<string>("");
  const [pilaAcciones, setPilaAcciones] = useState<Pila<AccionCarrito>>(
    () => new Pila<AccionCarrito>(),
  );
  const [colaPedidos, setColaPedidos] = useState<Cola<Pedido>>(
    () => new Cola<Pedido>(),
  );
  const [historialAtendidos, setHistorialAtendidos] = useState<Pila<Pedido>>(
    () => new Pila<Pedido>(),
  );
  const [proximoNumero, setProximoNumero] = useState<number>(1);

  const iniciarSesion = useCallback((nombreUsuario: string, clave: string) => {
    if (nombreUsuario === "cocina" && clave === "1234") {
      setUsuario({
        nombre: "Cocina IPF",
        usuario: nombreUsuario,
        rol: "cocina",
      });
      return true;
    }

    return false;
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
    setCarrito([]);
    setNota("");
    setPilaAcciones(new Pila<AccionCarrito>());
  }, []);

  const agregarAlCarrito = useCallback((plato: Plato) => {
    setCarrito((actual) => {
      const copia = [...actual];
      const indice = copia.findIndex((item) => item.plato.id === plato.id);

      if (indice === -1) {
        copia.push({ plato, cantidad: 1 });
        return copia;
      }

      copia[indice] = {
        ...copia[indice],
        cantidad: copia[indice].cantidad + 1,
      };

      return copia;
    });

    setPilaAcciones((actual) => {
      const nuevaPila = new Pila<AccionCarrito>(actual.aArray());
      nuevaPila.push({ plato });
      return nuevaPila;
    });
  }, []);

  const deshacerUltimo = useCallback(() => {
    if (pilaAcciones.vacia) {
      return;
    }

    const ultimo = pilaAcciones.tope();

    if (!ultimo) {
      return;
    }

    const nuevaPila = new Pila<AccionCarrito>(pilaAcciones.aArray());
    nuevaPila.pop();
    setPilaAcciones(nuevaPila);

    setCarrito((actual) => {
      const copia = [...actual];

      for (let index = copia.length - 1; index >= 0; index -= 1) {
        const item = copia[index];

        if (item.plato.id !== ultimo.plato.id) {
          continue;
        }

        if (item.cantidad > 1) {
          copia[index] = {
            ...item,
            cantidad: item.cantidad - 1,
          };
        } else {
          copia.splice(index, 1);
        }

        break;
      }

      return copia;
    });
  }, [pilaAcciones]);

  const limpiarCarrito = useCallback(() => {
    setCarrito([]);
    setNota("");
    setPilaAcciones(new Pila<AccionCarrito>());
  }, []);

  const confirmarPedido = useCallback(() => {
    if (carrito.length === 0) {
      return undefined;
    }

    const numero = proximoNumero;
    const total = carrito.reduce(
      (suma, item) => suma + item.plato.precio * item.cantidad,
      0,
    );
    const pedido: Pedido = {
      id: Date.now(),
      numero,
      items: carrito,
      nota,
      total,
      fecha: new Date().toISOString(),
    };

    const nuevaCola = new Cola<Pedido>(colaPedidos.aArray());
    nuevaCola.encolar(pedido);
    setColaPedidos(nuevaCola);
    setProximoNumero((anterior) => anterior + 1);
    limpiarCarrito();

    return numero;
  }, [carrito, colaPedidos, limpiarCarrito, nota, proximoNumero]);

  const atenderSiguientePedido = useCallback(() => {
    if (colaPedidos.vacia) {
      return undefined;
    }

    const colaActual = new Cola<Pedido>(colaPedidos.aArray());
    const pedido = colaActual.desencolar();

    if (!pedido) {
      return undefined;
    }

    const historialActual = new Pila<Pedido>(historialAtendidos.aArray());
    historialActual.push(pedido);
    setColaPedidos(colaActual);
    setHistorialAtendidos(historialActual);

    return pedido;
  }, [colaPedidos, historialAtendidos]);

  const value = useMemo<AppContextValue>(
    () => ({
      usuario,
      iniciarSesion,
      cerrarSesion,
      carrito,
      nota,
      setNota,
      agregarAlCarrito,
      deshacerUltimo,
      confirmarPedido,
      colaPedidos,
      historialAtendidos,
      atenderSiguientePedido,
      pilaAcciones,
      proximoNumero,
      limpiarCarrito,
    }),
    [
      agregarAlCarrito,
      atenderSiguientePedido,
      carrito,
      cerrarSesion,
      colaPedidos,
      confirmarPedido,
      deshacerUltimo,
      historialAtendidos,
      iniciarSesion,
      limpiarCarrito,
      nota,
      pilaAcciones,
      proximoNumero,
      usuario,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
