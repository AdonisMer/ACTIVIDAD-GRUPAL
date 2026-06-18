<script lang="ts">
  import type { Producto } from "./types";
  let {productos, onAgregar}: {productos: Producto[], onAgregar:(p:Producto)=>void} = $props();
</script>

<section class="panel">
  <h2>Catálogo</h2>
  <ul class="lista">
    {#each productos as p (p.id)}
      <li class = "item">
        <span class = "nombre">{p.nombre} ${p.precio.toFixed(2)}</span>
        <button onclick={() => onAgregar(p)}>Agregar</button>

      </li>
    {/each}
  </ul>
</section>

<style>
  .panel { background:#fff; border-radius:12px; padding:1rem 1.25rem; box-shadow:0 1px 4px rgba(0,0,0,.08); }
  h2 { color:#1E2761; margin-top:0; }
  button { color: #1E2761; background-attachment: fixed; }
</style>
