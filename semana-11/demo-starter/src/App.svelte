<script lang="ts">
  import { onMount } from "svelte";
  import type { Producto, LineaFactura, Totales } from "./lib/types";
  import Catalogo from "./lib/Catalogo.svelte";
  import Carrito from "./lib/Carrito.svelte"
  import { agregarProducto, calcularTotales } from "./lib/calculos";

  
  let productos = $state<Producto[]>([])
  let cargando = $state(true);
  let error = $state("");
  let lineas =$state<LineaFactura[]>([]);
  let totales =$derived( calcularTotales(lineas) );
  let cantidadItems = $derived(
  lineas.reduce((acum, linea) => acum + linea.cantidad, 0)
  );

  function onAgregar(producto:Producto){
    lineas = agregarProducto(lineas, producto);
  }

  function vaciarCarrito() {
  lineas = [];
  }

onMount(async () => {
  try{
    const response = await fetch("/productos.json");
    if(!response.ok){
      throw new Error("Error al cargar los productos");
    }
    productos = await response.json();
  }
  catch(error){
    error = (error as Error).message;
  }
  finally{
    cargando = false;
  }

});

</script>

<main>
  <h1>🧾 Mini Facturador — Svelte 5</h1>
  <h2>Carrito ({cantidadItems})</h2>
  {#if cargando}
    <p class = "aviso">cargando...</p>
  {:else if error}
    <p class = "aviso">Error:{error}</p>
  {:else}
  <div class = "layaout">
    <p>Productos cargados correctamente {productos.length}</p>
      <Catalogo {productos} onAgregar = { onAgregar } />
      <Carrito {lineas}
        subtotal = {totales.subtotal}
        iva = {totales.iva}
        total = {totales.total}
        vaciarCarrito = {vaciarCarrito}
      />
  </div>
  {/if}
</main>

<style>
  main { max-width: 860px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
    h1 { color: #1E2761; }
  .aviso{color:#F00}

</style>
