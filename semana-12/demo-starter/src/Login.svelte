<script lang="ts">
  import {sesion, iniciarSesion, cerrarSesion} from './lib/sesion.svelte';

  let nombre = $state('');

  function entrar(){
    if (nombre.trim() !==''&& nombre.trim() !== null) {
      iniciarSesion(nombre);
    }
    nombre = '';
  }
</script>

{#if sesion.usuario}
  <span>Bienvenido, {sesion.usuario} !</span>
  <button onclick = {cerrarSesion} >Cerrar Sesion</button>
{:else}
  <div class="login">
    <input type = "text" bind:value={nombre} placeholder="Nombre del usuario"/>
    <button onclick = {entrar}> Iniciar sesion </button>
  </div>
{/if}
