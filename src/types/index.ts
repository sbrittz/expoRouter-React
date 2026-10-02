export type Categoria = "desayuno" | "almuerzo" | "bebidas" | "kiosco";

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
}

export interface ItemCarrito {
  plato: Plato;
  cantidad: number;
}

export interface Pedido {
  id: number;
  numero: number;
  items: ItemCarrito[];
  nota: string;
  total: number;
  fecha: string;
}

export interface Usuario {
  nombre: string;
  usuario: string;
  rol: "cocina";
}

export interface AccionCarrito {
  plato: Plato;
}
