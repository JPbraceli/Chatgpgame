document.addEventListener('DOMContentLoaded', () => {
    const contenedorJuego = document.querySelector('.contenedor-juego');
    const modalPerdida = document.getElementById('modalPerdida');
    const btnCerrar = document.querySelector('.close');
    const btnResetModal = document.getElementById('resetModal');

    let puntos = 10;
    let intentos = 0;
    let nivel = 1;
    let tarjetaRevelada = null;
    let espera = false;
    let animacionEnProgreso = false;

    btnCerrar.onclick = function() {
        modalPerdida.style.display = "none";
    }

    btnResetModal.addEventListener('click', () => {
        reiniciarJuego();
        modalPerdida.style.display = "none";
    });

    function inicializarJuego() {
        contenedorJuego.innerHTML = '';
        let pares = nivel + 1;
        let numeros = [];
        for (let i = 1; i <= pares; i++) {
            numeros.push(i, i);
        }
        numeros.sort(() => Math.random() - 0.5);
    
        numeros.forEach(valor => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.setAttribute('data-valor', valor);
            contenedorJuego.appendChild(tarjeta);
            tarjeta.addEventListener('click', () => {
                if (!espera && !animacionEnProgreso) handleClick(tarjeta);
            });
        });
        document.getElementById('nivel').textContent = nivel;
        document.getElementById('puntos').textContent = puntos; // Asegúrate de actualizar los puntos aquí
    }
    

    function handleClick(tarjeta) {
        if (!tarjetaRevelada) {
            tarjetaRevelada = tarjeta;
            tarjeta.style.backgroundColor = 'lightblue';
            tarjeta.innerHTML = tarjeta.getAttribute('data-valor');
            tarjeta.style.fontSize = '36px';
        } else if (tarjeta === tarjetaRevelada) {

        } else {
            intentos++;
            document.getElementById('intentos').textContent = intentos;

            if (tarjeta.getAttribute('data-valor') === tarjetaRevelada.getAttribute('data-valor')) {
                tarjeta.style.backgroundColor = 'lightgreen';
                tarjeta.innerHTML = tarjeta.getAttribute('data-valor');
                tarjeta.style.fontSize = '36px';
                tarjetaRevelada.style.backgroundColor = 'lightgreen';
                tarjetaRevelada.innerHTML = tarjetaRevelada.getAttribute('data-valor');
                tarjetaRevelada.style.fontSize = '36px';
                puntos += 10;
                document.getElementById('puntos').textContent = puntos;
                animacionEnProgreso = true;
                setTimeout(() => {
                    tarjeta.style.visibility = 'hidden';
                    tarjetaRevelada.style.visibility = 'hidden';
                    tarjetaRevelada = null;
                    animacionEnProgreso = false;
                    checkNivelCompleto();
                }, 1000);
            } else {
                puntos -= 5;
                puntos = Math.max(0, puntos);
                document.getElementById('puntos').textContent = puntos;
                if (puntos === 0) {
                    modalPerdida.style.display = "block";
                    return;
                }
                espera = true;
                tarjeta.style.backgroundColor = 'red';
                setTimeout(() => {
                    tarjeta.style.backgroundColor = '';
                    tarjetaRevelada.style.backgroundColor = '';
                    tarjetaRevelada.innerHTML = '';
                    tarjetaRevelada.style.fontSize = '0';
                    tarjeta.innerHTML = '';
                    tarjeta.style.fontSize = '0';
                    tarjetaRevelada = null;
                    espera = false;
                }, 250);
            }
        }
    }

    function checkNivelCompleto() {
        const tarjetasReveladas = document.querySelectorAll('.tarjeta[style*="visibility: hidden"]');
        if (tarjetasReveladas.length === ((nivel + 1) * 2)) {
            if (nivel < 7) {
                nivel++;
                setTimeout(() => {
                    alert('¡Nivel completado!');
                    inicializarJuego();
                }, 250);
            } else {
                alert('¡Felicidades! Completaste todos los niveles.');
            }
        }
    }

    function reiniciarJuego() {
        puntos = 10;
        intentos = 0;
        nivel = 1;
        document.getElementById('puntos').textContent = '10';
        document.getElementById('intentos').textContent = '0';
        document.getElementById('nivel').textContent = '1';
        tarjetaRevelada = null;
        espera = false;
        animacionEnProgreso = false;
        inicializarJuego();
    }

    document.getElementById('reset').addEventListener('click', () => {
        reiniciarJuego();
    });

    inicializarJuego();
});
