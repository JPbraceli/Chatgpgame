document.addEventListener('DOMContentLoaded', () => {
    const contenedorJuego = document.querySelector('.contenedor-juego');
    let tarjetaRevelada = null;
    let puntos = 0;
    let intentos = 0;
    let nivel = 1; // Inicializa el nivel
    let espera = false; // Controla si se está esperando para ocultar tarjetas
    let animacionEnProgreso = false; // Indica si hay una animación en curso

    function inicializarJuego() {
        contenedorJuego.innerHTML = ''; // Limpiamos el contenedor
        let pares = nivel + 1; // Número de pares aumenta con el nivel
        let numeros = [];
        for (let i = 1; i <= pares; i++) {
            numeros.push(i, i);
        }
        numeros.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente

        numeros.forEach(valor => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.setAttribute('data-valor', valor);
            contenedorJuego.appendChild(tarjeta);
            tarjeta.addEventListener('click', () => {
                if (!espera && !animacionEnProgreso) handleClick(tarjeta); // Verifica si no hay animación en progreso
            });
        });
        document.getElementById('nivel').textContent = nivel; // Actualiza el indicador de nivel en el DOM
    }

    function handleClick(tarjeta) {
        if (!tarjetaRevelada) {
            tarjetaRevelada = tarjeta;
            tarjeta.style.backgroundColor = 'lightblue';
            tarjeta.innerHTML = tarjeta.getAttribute('data-valor');
            tarjeta.style.fontSize = '36px';
        } else if (tarjeta === tarjetaRevelada) {
            // Ignorar clics en la misma tarjeta
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
                animacionEnProgreso = true; // Establece que hay una animación en curso
                setTimeout(() => { // Hacer que las tarjetas coincidentes se oculten
                    tarjeta.style.visibility = 'hidden';
                    tarjetaRevelada.style.visibility = 'hidden';
                    tarjetaRevelada = null;
                    animacionEnProgreso = false; // La animación ha terminado
                    checkNivelCompleto(); // Verificar si se completó el nivel después de ocultar las tarjetas
                }, 1000);
            } else {
                espera = true; // Impide más clics mientras se muestra el error
                tarjeta.style.backgroundColor = 'red'; // Resalta la tarjeta incorrecta en rojo
                setTimeout(() => {
                    tarjeta.style.backgroundColor = ''; // Restablecer color de fondo
                    tarjetaRevelada.style.backgroundColor = ''; // Restablecer color de fondo
                    tarjetaRevelada.innerHTML = '';
                    tarjetaRevelada.style.fontSize = '0';
                    tarjeta.innerHTML = '';
                    tarjeta.style.fontSize = '0';
                    tarjetaRevelada = null;
                    espera = false; // Permite clics de nuevo después de ocultar las tarjetas
                }, 250); // Cambiado a 1/4 de segundo (250 milisegundos)
            }
        }
    }

    function checkNivelCompleto() {
        const tarjetasReveladas = document.querySelectorAll('.tarjeta[style*="visibility: hidden"]');
        if (tarjetasReveladas.length === ((nivel + 1) * 2)) {
            if (nivel < 7) {
                nivel++;
                setTimeout(() => { // Mostrar alerta más rápido
                    alert('¡Nivel completado!'); // Muestra una alerta cuando se completa el nivel
                    inicializarJuego(); // Inicializar el siguiente nivel
                }, 250); // Cambiado a 1/4 de segundo (250 milisegundos)
            } else {
                alert('¡Felicidades! Completaste todos los niveles.');
            }
        }
    }

    document.getElementById('reset').addEventListener('click', () => {
        puntos = 0;
        intentos = 0;
        nivel = 1;
        document.getElementById('puntos').textContent = '0';
        document.getElementById('intentos').textContent = '0';
        document.getElementById('nivel').textContent = '1';
        tarjetaRevelada = null;
        espera = false;
        animacionEnProgreso = false; // Reinicia la bandera de animación en progreso
        inicializarJuego();
    });

    inicializarJuego(); // Inicializar el juego por primera vez
});
