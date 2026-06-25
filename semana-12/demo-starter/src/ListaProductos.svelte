<script lang="ts">
  import { productos } from './lib/data';
  import { agregar } from './lib/carrito.svelte';
  import { formatearPrecio } from './lib/calculos';
</script>
<section>
  <h2>Productos</h2>
  <ul>
    {#each productos as producto (producto.id) }
    <li>
      {producto.nombre} - {formatearPrecio(producto.precio)}
      <button onclick = {() => agregar (producto)}>Agregar al carrito</button>
    </li>
    {/each}
  </ul>
</section>
