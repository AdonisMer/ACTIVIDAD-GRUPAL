import type { Producto, ItemCarrito } from './types';

export const carrito = $state({
 items: [] as ItemCarrito[],
});
export function agregar(producto: Producto) {
 const ya = carrito.items.some(it => it.producto.id === producto.id);
 if (!ya) carrito.items.push({ producto, cantidad: 1 });
}
export function quitar(id: number) {
 carrito.items = carrito.items.filter(it => it.producto.id !== id);
}