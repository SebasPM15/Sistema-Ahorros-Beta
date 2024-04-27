function calcularAhorroMeta() {
    var metaDinero = parseFloat(document.getElementById('meta-dinero').value);
    var sugerenciasHTML = '';

    if (metaDinero <= 0) {
        sugerenciasHTML = '<p>Por favor, ingresa una meta de dinero válida mayor que cero.</p>';
    } else {
        var sugerencias = calcularSugerencias(metaDinero);
        sugerenciasHTML = '<h2>Sugerencias:</h2>';
        sugerenciasHTML += '<table>';
        sugerenciasHTML += '<tr><th>Valor</th><th>Cantidad</th><th>Para</th></tr>';
        sugerenciasHTML += '<tr><td>Diario</td><td>$' + sugerencias.diario.toFixed(2) + '</td><td>30 días</td></tr>';
        sugerenciasHTML += '<tr><td>Semanal</td><td>$' + sugerencias.semanal.toFixed(2) + '</td><td>4 semanas</td></tr>';
        sugerenciasHTML += '<tr><td>Mensual</td><td>$' + sugerencias.mensual.toFixed(2) + '</td><td>1 mes</td></tr>';
        sugerenciasHTML += '<tr><td>Diario a partir de valor semanal</td><td>$' + sugerencias.diarioDesdeSemanal.toFixed(2) + '</td><td>1 semana</td></tr>';
        sugerenciasHTML += '<tr><td>Diario a partir de valor mensual</td><td>$' + sugerencias.diarioDesdeMensual.toFixed(2) + '</td><td>1 mes</td></tr>';
        sugerenciasHTML += '</table>';
    }

    mostrarSugerencias(sugerenciasHTML);
}

function calcularSugerencias(metaDinero) {
    // Calcular sugerencias específicas basadas en la meta de dinero
    var sugerencias = {
        diario: metaDinero / 30, // Dividir la meta entre 30 días
        semanal: metaDinero / 4, // Dividir la meta entre 4 semanas
        mensual: metaDinero / 1, // La meta es por mes
        diarioDesdeSemanal: (metaDinero / 4) / 7, // Dividir el valor semanal entre 7 días
        diarioDesdeMensual: (metaDinero / 1) / 30 // Dividir el valor mensual entre 30 días
    };
    return sugerencias;
}

function mostrarSugerencias(sugerenciasHTML) {
    var sugerenciasDiv = document.getElementById('sugerencias-meta');
    sugerenciasDiv.innerHTML = sugerenciasHTML;
    sugerenciasDiv.style.display = 'block';
}

function calcularAhorroManual() {
    var dineroDiario = parseFloat(document.getElementById('dinero-diario').value);
    var diasSemana = parseInt(document.getElementById('dias-semana').value);
    var semanasMes = parseInt(document.getElementById('semanas-mes').value);

    var dineroSemana = dineroDiario * diasSemana;
    var dineroMes = dineroSemana * semanasMes;

    var resultadoHTML = '<h2>Resultados:</h2>';
    resultadoHTML += '<p>Dinero ahorrado semanalmente: $' + dineroSemana.toFixed(2) + '</p>';
    resultadoHTML += '<p>Dinero ahorrado mensualmente: $' + dineroMes.toFixed(2) + '</p>';

    mostrarResultado(resultadoHTML);
}

function mostrarResultado(resultado) {
    document.getElementById('resultado').innerHTML = resultado;
}

function mostrarOpcion() {
    var opcion = document.getElementById('opcion').value;
    var opcionMeta = document.getElementById('opcion-meta');
    var opcionManual = document.getElementById('opcion-manual');

    if (opcion === 'meta') {
        opcionMeta.style.display = 'block';
        opcionManual.style.display = 'none';
    } else if (opcion === 'manual') {
        opcionMeta.style.display = 'none';
        opcionManual.style.display = 'block';
    }
}

window.onload = function() {
    mostrarMarcaAgua();
    mostrarCalendario();
};

function mostrarMarcaAgua() {
    var marcaAguaDiv = document.getElementById('marca-agua');
    marcaAguaDiv.innerHTML = 'Mateo Codes';
}

function mostrarCalendario() {
    var hoy = new Date();
    var diaActual = hoy.getDate();
    var mesActual = hoy.getMonth() + 1;
    var anioActual = hoy.getFullYear();

    var calendarioDiv = document.getElementById('calendario');
    calendarioDiv.innerHTML = 'Inicio: ' + diaActual + '/' + mesActual + '/' + anioActual + '<br>';
    
    var opcion = document.getElementById('opcion').value;
    if (opcion === 'meta') {
        var metaDinero = parseFloat(document.getElementById('meta-dinero').value);
        if (!isNaN(metaDinero) && metaDinero > 0) {
            var diasNecesarios = Math.ceil(metaDinero / (metaDinero / 30)); // Suponiendo 30 días al mes
            var diaFinal = diaActual + diasNecesarios;
            var mesFinal = mesActual;
            var anioFinal = anioActual;
            if (diaFinal > 30) { // Si excede los días del mes actual
                diaFinal -= 30;
                mesFinal++;
                if (mesFinal > 12) { // Si excede los meses del año actual
                    mesFinal = 1;
                    anioFinal++;
                }
            }
            calendarioDiv.innerHTML += 'Fin: ' + diaFinal + '/' + mesFinal + '/' + anioFinal;
        } else {
            calendarioDiv.innerHTML += 'Fin: No se ha establecido una meta de dinero válida';
        }
    } else if (opcion === 'manual') {
        var dineroDiario = parseFloat(document.getElementById('dinero-diario').value);
        var diasSemana = parseInt(document.getElementById('dias-semana').value);
        var semanasMes = parseInt(document.getElementById('semanas-mes').value);

        var totalDiasAhorro = diasSemana * semanasMes;
        var totalDineroAhorroPorDia = dineroDiario * totalDiasAhorro;

        if (totalDineroAhorroPorDia > 0) {
            var diasNecesarios = Math.ceil(metaDinero / totalDineroAhorroPorDia);
            var fechaFinal = new Date(hoy.getTime() + diasNecesarios * 24 * 60 * 60 * 1000);
            var diaFinal = fechaFinal.getDate();
            var mesFinal = fechaFinal.getMonth() + 1;
            var anioFinal = fechaFinal.getFullYear();
            calendarioDiv.innerHTML += 'Fin: ' + diaFinal + '/' + mesFinal + '/' + anioFinal;
        } else {
            calendarioDiv.innerHTML += 'Fin: No se ha ingresado una cantidad de dinero diaria válida';
        }
    }
}

function mostrarOpcion() {
    var opcion = document.getElementById('opcion').value;
    if (opcion === 'meta') {
        document.getElementById('opcion-meta').style.display = 'block';
        document.getElementById('opcion-manual').style.display = 'none';
    } else if (opcion === 'manual') {
        document.getElementById('opcion-meta').style.display = 'none';
        document.getElementById('opcion-manual').style.display = 'block';
    }
}
