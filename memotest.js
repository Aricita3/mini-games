let turno = 0;
let ficha1 = null;
let ficha2 = null;
let primeraCarta = null;
let segundaCarta = null;
let aciertos = 0;
let movimientos = 0;
let tiempoInicio;
let intervaloTiempo;

const mostrarAciertos = document.getElementById('aciertos');
const mostrarMovimientos = document.getElementById('movimientos');
const mostrarTiempo = document.getElementById('timer');
const botonReiniciar = document.getElementById('reiniciar');


let num = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
num = num.sort(() => Math.random() - 0.5);

function destapar(id) {
    if (turno === 2) return;
    
    turno++;
    
    if (turno === 1) {
        ficha1 = document.getElementById(id);
        primeraCarta = num[id];
        ficha1.innerHTML = primeraCarta;
        ficha1.disabled = true;

        if (movimientos === 0 && aciertos === 0) {
            iniciarTemporizador();
        }

    } else if (turno === 2) {
        ficha2 = document.getElementById(id);
        segundaCarta = num[id];
        ficha2.innerHTML = segundaCarta;
        ficha2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primeraCarta === segundaCarta) {
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                mostrarAciertos.innerHTML = `¡Felicitaciones! Has ganado con ${aciertos} aciertos.`;
                clearInterval(intervaloTiempo);
            }

            turno = 0;

        } else {
            setTimeout(() => {
                ficha1.innerHTML = '';
                ficha2.innerHTML = '';
                ficha1.disabled = false;
                ficha2.disabled = false;
                turno = 0;
            }, 1000);
        }
    }
}

function iniciarTemporizador() {
    tiempoInicio = new Date();
    intervaloTiempo = setInterval(actualizarTemporizador, 1000);
}

function actualizarTemporizador() {
    let ahora = new Date();
    let tiempoTranscurrido = Math.floor((ahora - tiempoInicio) / 1000);
    mostrarTiempo.innerHTML = `Tiempo transcurrido: ${tiempoTranscurrido}s`;
}

function reiniciarJuego() {
    turno = 0;
    aciertos = 0;
    movimientos = 0;
    clearInterval(intervaloTiempo);

    num = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    num = num.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i <= 15; i++) {
        let boton = document.getElementById(i);
        boton.innerHTML = '';
        boton.disabled = false;
    }

    mostrarAciertos.innerHTML = `Aciertos: 0`;
    mostrarMovimientos.innerHTML = `Movimientos: 0`;
    mostrarTiempo.innerHTML = `Tiempo transcurrido: 0s`;
}
