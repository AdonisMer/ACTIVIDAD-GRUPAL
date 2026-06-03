export function formatearMoneda(n: number): string {
    return new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
    }).format(n);
}