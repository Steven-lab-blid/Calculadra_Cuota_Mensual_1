import { calcularCuota, armarInformacion, reportes } from './funciones.js';

const btnEjecutar = document.getElementById("ejecutar");
const btnRecordar = document.getElementById("recordar");

btnEjecutar.addEventListener('click', ingresarPrestamo);
btnRecordar.addEventListener('click', desplegarTodos);

let historial = []; // arreglo para guardar objetos de préstamos
let info = ''; // para mostrar todas las salidas acumuladas

let tARespuesta = document.getElementById("laRespuesta");

function ingresarPrestamo() {
    let nombre = document.getElementById("elNombre").value;
    let prestamo = parseFloat(document.getElementById("elPrestamo").value);
    let meses = parseInt(document.getElementById("losMeses").value);
    let interes = parseFloat(document.getElementById("elInteres").value);
    let res;

    if (nombre.length === 0 || isNaN(prestamo) || isNaN(meses) || isNaN(interes)) {
        res = 'Alguno de los campos está vacío o mal diligenciado.';
        document.getElementById("error").innerHTML = res;
        console.log(res);
    } else {
        document.getElementById("error").innerHTML = "";
        const cuota = parseFloat(calcularCuota(prestamo, meses, interes));

        // objeto de préstamo
        const persona = {
            nombre,
            prestamo,
            meses,
            interes,
            cuota
        };

        historial.push(persona);

        res = armarInformacion(persona);
        info += res + '\n';

        tARespuesta.textContent = res;
    }
}

function desplegarTodos() {
    let salida = '📋 Historial de Préstamos:\n';
    historial.forEach(p => {
        salida += armarInformacion(p) + '\n';
    });

    salida += '\n📊 Reportes:\n' + reportes(historial);
    tARespuesta.textContent = salida;
}
