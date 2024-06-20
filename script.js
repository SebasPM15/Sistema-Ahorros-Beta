function calcularAhorroMeta() {
    var metaDinero = parseFloat(document.getElementById('meta-dinero').value);
    var tiempoMeta = parseInt(document.getElementById('tiempo-meta').value);
    var tipoTiempo = document.getElementById('meta-tiempo').value;
    var sugerenciasHTML = '';

    if (isNaN(metaDinero) || metaDinero <= 0 || isNaN(tiempoMeta) || tiempoMeta <= 0) {
        sugerenciasHTML = '<p>Por favor, ingresa una meta de dinero y un tiempo válidos.</p>';
    } else {
        var sugerencias = calcularSugerencias(metaDinero, tiempoMeta, tipoTiempo);
        sugerenciasHTML = '<h2>Sugerencias:</h2>';
        sugerenciasHTML += '<table>';
        sugerenciasHTML += '<tr><th>Frecuencia</th><th>Valor</th><th>Duración</th></tr>';

        if (tipoTiempo === 'dias') {
            sugerenciasHTML += '<tr><td>Diario</td><td>$' + sugerencias.diario.toFixed(2) + '</td><td>' + tiempoMeta + ' días</td></tr>';
        } else if (tipoTiempo === 'semanas') {
            sugerenciasHTML += '<tr><td>Diario</td><td>$' + sugerencias.diario.toFixed(2) + '</td><td>' + tiempoMeta + ' semanas</td></tr>';
        } else if (tipoTiempo === 'meses') {
            sugerenciasHTML += '<tr><td>Diario</td><td>$' + sugerencias.diario.toFixed(2) + '</td><td>' + tiempoMeta * 30 + ' días</td></tr>';
            sugerenciasHTML += '<tr><td>Semanal</td><td>$' + sugerencias.semanal.toFixed(2) + '</td><td>' + tiempoMeta * 4 + ' semanas</td></tr>';
        }

        sugerenciasHTML += '</table>';
    }

    mostrarSugerencias(sugerenciasHTML);
}

function calcularSugerencias(metaDinero, tiempoMeta, tipoTiempo) {
    var diasTotales;

    if (tipoTiempo === 'dias') {
        diasTotales = tiempoMeta;
    } else if (tipoTiempo === 'semanas') {
        diasTotales = tiempoMeta * 7;
    } else if (tipoTiempo === 'meses') {
        diasTotales = tiempoMeta * 30;
    }

    return {
        diario: metaDinero / diasTotales,
        semanal: metaDinero / (diasTotales / 7),
        mensual: metaDinero / (diasTotales / 30)
    };
}

function mostrarSugerencias(sugerenciasHTML) {
    var sugerenciasDiv = document.getElementById('sugerencias-meta');
    sugerenciasDiv.innerHTML = sugerenciasHTML;
    sugerenciasDiv.classList.remove('hidden');
}

function calcularAhorroManual() {
    var dineroDiario = parseFloat(document.getElementById('dinero-diario').value);
    var diasSemana = parseInt(document.getElementById('dias-semana').value);
    var semanasMes = parseInt(document.getElementById('semanas-mes').value);

    if (isNaN(dineroDiario) || dineroDiario <= 0 || isNaN(diasSemana) || diasSemana <= 0 || isNaN(semanasMes) || semanasMes <= 0) {
        mostrarResultado('<p>Por favor, ingrese valores válidos en todos los campos.</p>');
        return;
    }

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
        opcionMeta.classList.remove('hidden');
        opcionManual.classList.add('hidden');
    } else if (opcion === 'manual') {
        opcionMeta.classList.add('hidden');
        opcionManual.classList.remove('hidden');
    }
}

window.onload = function() {
    mostrarOpcion();
};
