import type { Producto } from "./types";
import {validarCategoria,validarStock,validarPrecio,validarNombre} from "./validators";

import {actualizarContador,elementos,limpiarErrores,mostrarError,renderizar} from "./dom";

const productos: Producto[] = [];

function refrescar() {
  renderizar(productos);
  actualizarContador(productos);
}

function registrarEnvio() {
  elementos.form.addEventListener("submit", (evento: SubmitEvent) => {
    evento.preventDefault();
    limpiarErrores();

    const rNombre = validarNombre(elementos.nombre.value);
    const rPrecio = validarPrecio(elementos.precio.value);
    const rStock = validarStock(elementos.stock.value);
    const rCategoria = validarCategoria(elementos.categoria.value);

    if (!rNombre.ok) mostrarError("nombre", rNombre.error);
    if (!rPrecio.ok) mostrarError("precio", rPrecio.error);
    if (!rStock.ok) mostrarError("stock", rStock.error);
    if (!rCategoria.ok) mostrarError("categoria", rCategoria.error);

    if (rNombre.ok && rPrecio.ok && rStock.ok && rCategoria.ok) {
      productos.push({
        id: crypto.randomUUID(), 
        nombre: rNombre.valor,
        precio: rPrecio.valor,
        stock: rStock.valor,
        categoria: rCategoria.valor
      });

      elementos.form.reset();
      refrescar();
    }
  });
}

function registrarDelegacionEliminar() {
  elementos.lista.addEventListener("click", (evento: MouseEvent) => {
    const target = evento.target as HTMLElement;

    if (target.matches(".btn-eliminar")) {
      const li = target.closest("li");
      const id = li?.dataset.id;

      const indice = productos.findIndex(p => p.id === id);
      if (indice !== -1) {
        productos.splice(indice, 1);
        refrescar();
      }
    }
  });
}

function registrarValidacionesReactivas() {
  elementos.nombre.addEventListener("input", () => mostrarError("nombre", ""));
  elementos.precio.addEventListener("input", () => mostrarError("precio", ""));
  elementos.stock.addEventListener("input", () => mostrarError("stock", ""));
  elementos.categoria.addEventListener("change", () => mostrarError("categoria", ""));
}

export function iniciar() {
  registrarEnvio();
  registrarDelegacionEliminar();
  registrarValidacionesReactivas();
  refrescar();
}