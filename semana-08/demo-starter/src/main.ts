// ─────────────────────────────────────────────────────────────
//  main.ts · Punto de entrada de la Mini App de Productos
//
//  Hoy (martes, Semana 6) vamos a conectar el formulario
//  del HTML con los validadores que escribimos la semana 5.
//
//  Por ahora este archivo solo confirma que la librería existe.
//  Abre la consola del navegador y deberías ver el mensaje.
// ─────────────────────────────────────────────────────────────

import { validarNombre } from "./validators.ts";

// Prueba rápida de que la librería de S5 sigue viva.
const prueba = validarNombre("Audífonos Bluetooth");
console.log("Validador de S5 funcionando:", prueba);

console.log("Listos para tocar el DOM. ✋");
