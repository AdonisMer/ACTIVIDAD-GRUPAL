<script lang="ts">
  import { calcularTotal, formatearPrecio } from './lib/calculos';
  import { carrito, quitar } from './lib/carrito.svelte';
  const total = $derived(carrito.items.reduce((s, it) => s + it.producto.precio * it.cantidad,0));
</script>

<section>
  <h2>Carrito</h2>
  {#if carrito.items.length === 0}
    <p>El carrito está vacío</p>
  {:else}
    <ul>
      {#each carrito.items as item (item.producto.id)}
        <li>
          {item.producto.nombre} - {formatearPrecio(item.producto.precio)}
          <input type="number" min="1" bind:value={item.cantidad} />
          <button onclick={() => quitar(item.producto.id)}>Quitar del carrito</button>
        </li>
      {/each}
    </ul>
    <p> <strong>Total: {formatearPrecio(total)}</strong></p>
  {/if}
</section>