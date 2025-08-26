/*Funciones*/
// Calcula la cuota mensual usando la fórmula.
export function calcularCuota(prestamo, meses, interes) {
    const cuota = (prestamo * interes) / (1 - Math.pow(1 + interes, -meses));
    return cuota.toFixed(2); // redondeamos a 2 decimales
}

// Crea un mensaje en formato requerido
export function armarInformacion(persona) {
    return `${persona.nombre} debe pagar $${persona.cuota} cada mes por el préstamo de $${persona.prestamo} a ${persona.meses} meses con el interés del ${persona.interes * 100}%`;
}

// Genera todos los reportes solicitados
export function reportes(historial) {
    let salida = '';

    // a) Sumatoria de cuotas
    const sumaCuotas = historial.reduce((acc, p) => acc + p.cuota, 0);
    salida += `a) Sumatoria de cuotas: $${sumaCuotas.toFixed(2)}\n`;

    // b) Cuotas > 300000
    const cuotasAltas = historial.filter(p => p.cuota > 300000);
    salida += `b) Cuotas > $300.000: ${cuotasAltas.map(p => p.nombre).join(', ') || 'Ninguna'}\n`;

    // c) Pagos en menos de un año
    const menosDeUnAnio = historial.filter(p => p.meses < 12);
    salida += `c) Pagos < 1 año: ${menosDeUnAnio.map(p => p.nombre).join(', ') || 'Ninguno'}\n`;

    // d) Primer préstamo > 5 millones
    const prestamoGrande = historial.find(p => p.prestamo > 5000000);
    salida += `d) Préstamo > $5.000.000: ${prestamoGrande ? prestamoGrande.nombre : 'Ninguno'}\n`;

    // e) Primer interés < 2%
    const interesBajo = historial.find(p => p.interes < 0.02);
    salida += `e) Interés < 2%: ${interesBajo ? interesBajo.nombre : 'Ninguno'}\n`;

    // f) Cuotas incrementadas en $90.000
    const cuotasAumentadas = historial.map(p => ({ ...p, cuota: p.cuota + 90000 }));
    salida += `f) Cuotas +$90.000:\n${cuotasAumentadas.map(p => `${p.nombre}: $${p.cuota.toFixed(2)}`).join('\n')}\n`;

    // g) Préstamos reducidos en $90.000
    const prestamosReducidos = historial.map(p => ({ ...p, prestamo: p.prestamo - 90000 }));
    salida += `g) Préstamos -$90.000:\n${prestamosReducidos.map(p => `${p.nombre}: $${p.prestamo}`).join('\n')}\n`;

    // h) Solo cuotas
    const soloCuotas = historial.map(p => p.cuota);
    salida += `h) Cuotas solamente: ${soloCuotas.join(', ')}\n`;

    return salida;
}
