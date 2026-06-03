// ============================================================================
//  Gestor de Productos — versión MONOLÍTICA (resultado de Semana 6)
//  Todo vive en este único archivo: tipos, validadores, formato, DOM y eventos.
//  Este es el punto de partida del refactor de Semana 7.
//  "Huele mal" a propósito: un addEventListener por cada botón eliminar.
// ============================================================================

// ----- Tipos -----


// ----- Validadores -----




// ----- Formato -----




// ----- Mostrar / limpiar errores -----


// ----- Render del contador (estado derivado) -----
function contarPorCategoria(items: Producto[]): Record<string, number> {
  const conteo: Record<string, number> = {};
  for (const p of items) {
    conteo[p.categoria] = (conteo[p.categoria] ?? 0) + 1;
  }
  return conteo;
}



// ----- Render de la lista -----
// PROBLEMA (lo arregla S7): cada vez que renderizamos, recorremos la lista
// y le ponemos un addEventListener PROPIO al botón eliminar de cada ítem.


// ----- Envío del formulario -----
form.addEventListener("submit", (evento: SubmitEvent) => {
  evento.preventDefault();
  limpiarErrores();

  const rNombre = validarNombre(inputNombre!.value);
  const rPrecio = validarPrecio(inputPrecio!.value);
  const rStock = validarStock(inputStock!.value);
  const rCategoria = validarCategoria(selectCategoria!.value);

  let hayError = false;
  if (!rNombre.ok) { mostrarError("nombre", rNombre.error); hayError = true; }
  if (!rPrecio.ok) { mostrarError("precio", rPrecio.error); hayError = true; }
  if (!rStock.ok) { mostrarError("stock", rStock.error); hayError = true; }
  if (!rCategoria.ok) {
    mostrarError("categoria", rCategoria.error);
    hayError = true;
  }

  if (
    hayError ||
    !rNombre.ok ||
    !rPrecio.ok ||
    !rStock.ok ||
    !rCategoria.ok
  ) {
    return;
  }

  productos.push({
    id: crypto.randomUUID(),
    nombre: rNombre.valor,
    precio: rPrecio.valor,
    stock: rStock.valor,
    categoria: rCategoria.valor,
  });

  form.reset();
  renderizar();
  actualizarContador();
});

// ----- Arranque -----
actualizarContador();
