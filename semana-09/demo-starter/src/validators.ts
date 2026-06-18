import { CATEGORIAS, type Categoria, type Resultado } from "./types";

export function validarNombre(nombre: string): Resultado<string> {
  const limpio = nombre.trim();
  if (limpio.length < 3) {
    return { ok: false, error: "El nombre necesita al menos 3 caracteres." };
  }
  return { ok: true, valor: limpio };
}

export function validarPrecio(valor: string): Resultado<number> {
  const numero = Number(valor);
  if (valor.trim() === "" || Number.isNaN(numero)) {
    return { ok: false, error: "El precio debe ser un número." };
  }
  if (numero <= 0) {
    return { ok: false, error: "El precio debe ser mayor que 0." };
  }
  return { ok: true, valor: numero };
}

export function validarStock(valor: string): Resultado<number> {
  const numero = Number(valor);
  if (valor.trim() === "" || !Number.isInteger(numero)) {
    return { ok: false, error: "El stock debe ser un número entero." };
  }
  if (numero < 0) {
    return { ok: false, error: "El stock no puede ser negativo." };
  }
  return { ok: true, valor: numero };
}

export function validarCategoria(valor: string): Resultado<Categoria> {
  if ((CATEGORIAS as readonly string[]).includes(valor)) {
    return { ok: true, valor: valor as Categoria };
  }
  return { ok: false, error: "Selecciona una categoría válida." };
}