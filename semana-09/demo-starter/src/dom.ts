import type { Producto } from "./types";
import { formatearMoneda } from "./formatters";

function exigir<T extends Element>(selector: string) {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Elemento no encontrado: ${selector}`);
  return el;
}

export const elementos = {
  form: exigir<HTMLFormElement>("#form-producto"),
  nombre: exigir<HTMLInputElement>("#nombre"),
  precio: exigir<HTMLInputElement>("#precio"),
  stock: exigir<HTMLInputElement>("#stock"),
  categoria: exigir<HTMLSelectElement>("#categoria"),
  lista: exigir<HTMLUListElement>("#lista-productos"),
  contador: exigir<HTMLParagraphElement>("#contador")
};

export function mostrarError(idCampo: string, mensaje: string): void {
  const span = document.querySelector<HTMLSpanElement>(`#error-${idCampo}`);
  if (span) span.textContent = mensaje;
}

export function limpiarErrores(): void {
  for (const campo of ["nombre", "precio", "stock", "categoria"]) {
    mostrarError(campo, "");
  }
}

function contarPorCategoria(items: Producto[]): Record<string, number> {
  const conteo: Record<string, number> = {};
  for (const p of items) {
    conteo[p.categoria] = (conteo[p.categoria] ?? 0) + 1;
  }
  return conteo;
}

export function actualizarContador(productos: Producto[]): void {
  const total = productos.length;
  const conteo = contarPorCategoria(productos);

  const detalle = Object.entries(conteo)
    .map(([cat, n]) => `${cat}: ${n}`)
    .join(" · ");

  elementos.contador.textContent =
    total === 0
      ? "Sin productos todavía."
      : `${total} producto(s) — ${detalle}`;
}

export function renderizar(productos: Producto[]): void {
  elementos.lista.innerHTML = "";

  for (const producto of productos) {
    const li = document.createElement("li");
    li.className = "item-producto";
    li.dataset.id = producto.id;

    const datos = document.createElement("div");
    datos.innerHTML =
      `<strong>${producto.nombre}</strong><br>` +
      `${formatearMoneda(producto.precio)} · stock ${producto.stock} · ${producto.categoria}`;

    const boton = document.createElement("button");
    boton.className = "btn-eliminar";
    boton.textContent = "Eliminar";

    li.append(datos, boton);
    elementos.lista.appendChild(li);
  }
}