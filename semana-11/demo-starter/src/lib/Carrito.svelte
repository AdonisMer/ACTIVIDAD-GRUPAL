<script lang="ts">

  import type { LineaFactura } from "./types";
  let {lineas, subtotal, iva, total, vaciarCarrito}:
  { lineas:LineaFactura[], subtotal:number, iva:number, total:number, vaciarCarrito: () => void }=$props();
</script>

<section class="panel">
  <h2>Carrito</h2>
    {#if lineas.length === 0}
    <p>Tu carrito está vacío.</p>
  {:else}
    <ul class="lista">
      {#each lineas as l (l.producto.id)}
        <li class="item">
          <span>{l.producto.nombre}</span>
          <span>{l.cantidad} x ${l.producto.precio.toFixed(2)}</span>
          <span>${(l.producto.precio * l.cantidad).toFixed(2)}</span>
        </li>
      {/each}
    </ul>
  {/if}

<div class="Totales">
  <span>Subtotal: ${subtotal.toFixed(2)}</span>  
  <span>IVA: ${iva.toFixed(2)}</span>  
  <span>Total: ${total.toFixed(2)}</span>  
  <button onclick={vaciarCarrito}>
    Vaciar carrito
  </button>
</div>
</section>

  


<style>
  .panel { background:#fff; border-radius:12px; padding:1rem 1.25rem; box-shadow:0 1px 4px rgba(0,0,0,.08); }
  h2 { color:#1E2761; margin-top:0; }
  .Totales {font-weight:bold;}
  .lista {list-style:none; padding:0; margin:0;}
  .item {display:flex; justify-content:space-between; margin-bottom:0.5rem;}
  .item span {width:33.33%;}
  button{ color: #1E2761; background-attachment: fixed; }
</style>
