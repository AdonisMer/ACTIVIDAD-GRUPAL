import type { Producto } from "./types";
import {
  validarCategoria,
  validarStock,
  validarPrecio,
  validarNombre
} from "./validators";

import {
  actualizarContador,
  elementos,
  limpiarErrores,
  mostrarError,
  renderizar
} from "./dom";

const productos: Producto[] = [];

function refrescar() {
  renderizar(productos);
  actualizarContador(productos);
}

// ----- FORM SUBMIT -----
function registrarEnvio() {
  elementos.form.addEventListener("submit", (evento: SubmitEvent) => {
    evento.preventDefault();
    limpiarErrores();

    const rNombre = validarNombre(elementos.nombre.value);
    const rPrecio = validarPrecio(elementos.precio.value);
    const rStock = validarStock(elementos.stock.value);
    const rCategoria = validarCategoria(elementos.categoria.value);

    let hayError = false;

    if (!rNombre.ok) { mostrarError("nombre", rNombre.error); hayError = true; }
    if (!rPrecio.ok) { mostrarError("precio", rPrecio.error); hayError = true; }
    if (!rStock.ok) { mostrarError("stock", rStock.error); hayError = true; }
    if (!rCategoria.ok) { mostrarError("categoria", rCategoria.error); hayError = true; }

    if (hayError) return;

productos.push({
  id: Date.now().toString(),
  nombre: rNombre.valor,
  precio: rPrecio.valor,
  stock: rStock.valor,
  categoria: rCategoria.valor
});

    elementos.form.reset();
    refrescar();
  });
}

// ----- DELEGACIÓN (BIEN HECHO) -----
function registrarDelegacionEliminar() {
  elementos.lista.addEventListener("click", (evento: MouseEvent) => {
    const target = evento.target as HTMLElement;

    if (target.matches(".btn-eliminar")) {
      const li = target.closest("li");
      const id = li?.dataset.id;

      if (!id) return; 

      const indice = productos.findIndex(p => p.id === id);
      if (indice !== -1) {
        productos.splice(indice, 1);
        refrescar();
      }
    }
  });
}

// ----- UX -----
function registrarValidacionesReactivas() {
  elementos.nombre.addEventListener("input", () => mostrarError("nombre", ""));
  elementos.precio.addEventListener("input", () => mostrarError("precio", ""));
  elementos.stock.addEventListener("input", () => mostrarError("stock", ""));
  elementos.categoria.addEventListener("change", () => mostrarError("categoria", ""));
}

// ----- INIT -----
export function iniciar() {
  registrarEnvio();
  registrarDelegacionEliminar();
  registrarValidacionesReactivas();
  refrescar();
}