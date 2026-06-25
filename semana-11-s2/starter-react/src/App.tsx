import "./App.css";
import { useState, useEffect, useMemo } from "react";
import type { Producto, LineaFactura } from "./lib/types";
import { agregarProducto, calcularTotales } from "./lib/calculos";

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [lineas, setLineas] = useState<LineaFactura[]>([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      });
  }, []);
  function manejarAgregar(p: Producto) {
    setLineas((prev) => {
      const nuevasLineas = agregarProducto(prev, p);
      console.log("lineas:", nuevasLineas);
      return nuevasLineas;
    });
  }
  const totales = useMemo(() => calcularTotales(lineas), [lineas]);
  return (
    <main>
      <h1>🧾 Mini Facturador — React</h1>
      <p>Punto de partida. Reutiliza src/lib/types.ts y src/lib/calculos.ts.</p>
      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <p>Total productos: {productos.length}</p>
          <h2>Catálogo</h2>
          <ul>
            {productos.map((p) => (
              <li key={p.id}>
                {p.nombre} - ${p.precio}
                <button onClick={() => manejarAgregar(p)}>
                  Agregar
                </button>
              </li>
            ))}
          </ul>
          <h2>Carrito</h2>
          {lineas.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <ul>
              {lineas.map((l, index) => (
                <li key={index}>
                  {l.producto.nombre} x {l.cantidad} = $
                  {l.producto.precio * l.cantidad}
                </li>
              ))}
            </ul>
          )}
          <h3>Total: ${totales.total}</h3>
        </>
      )}
    </main>
  );
}