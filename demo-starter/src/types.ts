export type Categoria = "Bebidas" | "Snacks" | "Lacteos" | "Panaderia";

export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    categoria: Categoria;
}

export type Resultado<T> =
    | { ok: true; valor: T }
    | { ok: false; error: string };

export const CATEGORIAS: readonly Categoria[] = [
    "Bebidas",
    "Snacks",
    "Lacteos",
    "Panaderia",
];