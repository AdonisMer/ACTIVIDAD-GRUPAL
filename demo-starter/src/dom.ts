import { Producto, productos } from "./types";
import { formatearMoneda } from "./formatters";
function exigir<T extends Element>(selector: string) {
    const el = document.querySelector<T>(selector);
    if (!el) {
        throw new Error(`Elemento no encontrado: ${selector}`);
    }
    return el;
}

// ----- Selección tipada del DOM -----
export const elementos = {
  form: exigir<HTMLFormElement>("#form-producto"),
  nombre: exigir<HTMLInputElement>("#nombre"),
  precio: exigir<HTMLInputElement>("#precio"),
  stock: exigir<HTMLInputElement>("#stock"),
  categoria: exigir<HTMLSelectElement>("#categoria"),
  lista: exigir<HTMLUListElement>("#lista-productos"),
  contador: exigir<HTMLParagraphElement>("#contador")
};

if (
  !elementos.form ||
  !elementos.nombre ||
  !elementos.precio ||
  !elementos.stock ||
  !elementos.categoria ||
  !elementos.lista ||
  !elementos.contador
) {
  throw new Error("Falta un elemento esperado en el HTML.");
}
function actualizarContador(): void {
  const total = productos.length;
  const conteo = contarPorCategoria(productos);
  const detalle = Object.entries(conteo)
    .map(([cat, n]) => `${cat}: ${n}`)
    .join(" · ");
  elementos.contador!.textContent = total === 0
    ? "Sin productos todavía."
    : `${total} producto(s) — ${detalle}`;
}
function mostrarError(idCampo: string, mensaje: string): void {
  const span = document.querySelector<HTMLSpanElement>(`#error-${idCampo}`);
  if (span) span.textContent = mensaje;
}

function limpiarErrores(): void {
  for (const campo of ["nombre", "precio", "stock", "categoria"]) {
    mostrarError(campo, "");
  }
}

function renderizar(): void {
  elementos.lista!.innerHTML = "";

  for (const producto of productos) {
    const li = document.createElement("li");
    li.className = "item-producto";

    const datos = document.createElement("div");
    datos.className = "datos";
    datos.innerHTML =
      `<span class="nombre">${producto.nombre}</span><br>` +
      `<span class="meta">${formatearMoneda(producto.precio)} · ` +
      `stock ${producto.stock} · ${producto.categoria}</span>`;

    const boton = document.createElement("button");
    boton.className = "btn-eliminar";
    boton.textContent = "Eliminar";

    // ⚠️ Un listener por cada botón. Si hay 100 productos, hay 100 listeners.
    boton.addEventListener("click", () => {
      const indice = productos.findIndex((p) => p.id === producto.id);
      if (indice !== -1) {
        productos.splice(indice, 1);
        renderizar();
        actualizarContador();
      }
    });

    li.append(datos, boton);
    elementos.lista!.appendChild(li);
  }
}

function contarPorCategoria(items: Producto[]): Record<string, number> {
  const conteo: Record<string, number> = {};
  for (const p of items) {
    conteo[p.categoria] = (conteo[p.categoria] ?? 0) + 1;
  }
  return conteo;