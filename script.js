document.addEventListener('DOMContentLoaded', () => {
    const contenedorJuego = document.querySelector('.contenedor-juego');
    let tarjetaRevelada = null;
    let puntos = 0;
    let intentos = 0;
    let nivel = 1;  // Variable para almacenar el nivel actual
    let paresEncontrados = 0;  // Variable para contar pares encontrados en el nivel actual

    function inicializarJuego() {
        contenedorJuego.innerHTML = '';
        let numeros = [];
        for (let i = 1; i <= nivel * 2; i++) { // Ajustamos la cantidad de pares según el nivel actual
            numeros.push(i, i);
        }
        numeros.sort(() => Math.random() - 0.5);

        numeros.forEach(valor => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.setAttribute('data-valor', valor);
            contenedorJuego.appendChild(tarjeta);
            tarjeta.addEventListener('click', () => handleClick(tarjeta));
        });
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
                tarjetaRevelada = null;
                puntos += 10;
                document.getElementById('puntos').textContent = puntos;
                paresEncontrados++;
                if (paresEncontrados === nivel) { // Si se completaron todos los pares del nivel
                    nivel++;
                    paresEncontrados = 0;
                    document.getElementById('nivel').textContent = nivel; // Actualiza el indicador de nivel
                    setTimeout(() => { // Pausa breve antes de pasar al siguiente nivel
                        inicializarJuego(); // Inicia el siguiente nivel
                    }, 1000);
                }
            } else {
                tarjeta.style.backgroundColor = 'red';
                tarjetaRevelada.style.backgroundColor = 'red';
                setTimeout(() => {
                    tarjetaRevelada.style.backgroundColor = '';
                    tarjetaRevelada.innerHTML = '';
                    tarjetaRevelada.style.fontSize = '0';
                    tarjeta.style.backgroundColor = '';
                    tarjeta.innerHTML = '';
                    tarjeta.style.fontSize = '0';
                    tarjetaRevelada = null;
                }, 1000);
            }
        }
    }

    document.getElementById('reset').addEventListener('click', () => {
        puntos = 0;
        intentos = 0;
        nivel = 1; // Reinicia el nivel al nivel 1
        paresEncontrados = 0;
        document.getElementById('puntos').textContent = '0';
        document.getElementById('intentos').textContent = '0';
        document.getElementById('nivel').textContent = '1'; // Reinicia el indicador de nivel
        tarjetaRevelada = null;
        inicializarJuego();
    });

    inicializarJuego();
});
