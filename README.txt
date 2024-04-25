Documentación del Proyecto Memotest
Descripción del Proyecto
El proyecto Memotest es un juego de memoria desarrollado utilizando tecnologías web como HTML, CSS y JavaScript. El objetivo del juego es encontrar todos los pares de tarjetas idénticas en el menor número de intentos posible.
Estructura de Archivos
El proyecto consta de tres archivos principales:
1.	HTML (index.html): Contiene la estructura de la página web y la lógica básica del juego.
2.	CSS (estilos.css): Define los estilos y la apariencia visual del juego.
3.	JavaScript (script.js): Implementa la lógica del juego, incluyendo la generación dinámica de tarjetas, la interacción del usuario y el control del estado del juego.
Funcionamiento del Juego
Interfaz de Usuario
El juego presenta una interfaz minimalista con las siguientes secciones:
•	Puntos: Muestra la cantidad de puntos obtenidos por el jugador.
•	Intentos: Indica la cantidad de intentos realizados para encontrar todos los pares.
•	Nivel: Muestra el nivel actual del juego.
•	Botón de Reset: Permite reiniciar el juego en cualquier momento.
•	Contenedor de Juego: Área donde se muestran las tarjetas del juego.
•	Controles de Audio: Permite al jugador activar/desactivar la música de fondo y ajustar el volumen.
Flujo del Juego
1.	El juego comienza con un conjunto de tarjetas boca abajo.
2.	El jugador debe hacer clic en las tarjetas para revelar su contenido.
3.	Si las tarjetas coinciden, se mantienen visibles y el jugador gana puntos.
4.	Si las tarjetas no coinciden, se vuelven a ocultar y se penaliza al jugador.
5.	El juego continúa hasta que todas las tarjetas hayan sido encontradas.
6.	Al completar un nivel, el jugador avanza al siguiente nivel con tarjetas adicionales.
7.	El juego termina cuando se completan todos los niveles o se agotan los puntos.
Modal de Reinicio
•	Se presenta un modal al jugador si pierde todos los puntos.
•	El modal le ofrece la opción de reiniciar el juego desde el nivel inicial.
Personalización del Juego
El proyecto está diseñado para ser fácilmente personalizable:
•	Se pueden modificar los estilos CSS para adaptar la apariencia del juego.
•	La música de fondo se puede cambiar simplemente reemplazando el archivo de audio.
•	Es posible ajustar la dificultad del juego modificando el número de tarjetas por nivel en el archivo JavaScript.
Conclusiones
El proyecto Memotest ofrece una experiencia de juego entretenida y desafiante para usuarios de todas las edades. Su diseño modular y su código bien estructurado facilitan su mantenimiento y personalización. ¡Diviértete jugando y mejorando tu memoria con Memotest!
