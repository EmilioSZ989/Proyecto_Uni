// Variable para llevar un seguimiento de las cartas seleccionadas por el jugador
let cartasSeleccionadas = [];

// Variable para evitar que el jugador seleccione más cartas mientras se validan un par
let bloquearSeleccion = false;

// Función para mostrar la imagen de la parte frontal de una carta al hacer clic en la parte trasera
function mostrarFrente(cartaId) {
    if (bloquearSeleccion) {
        return; // Evitar acciones si ya hay 2 cartas seleccionadas y se están validando
    }

    const carta = document.getElementById(cartaId);
    const frente = carta.querySelector('.frente');
    const atras = carta.querySelector('.atras');

    frente.style.display = 'block'; // Mostrar la parte frontal
    atras.style.display = 'none';   // Ocultar la parte trasera

    cartasSeleccionadas.push({ id: cartaId, elemento: carta });

    // Verificar si se han seleccionado dos cartas para validar
    if (cartasSeleccionadas.length === 2) {
        bloquearSeleccion = true; // Bloquear la selección mientras se valida el par
        setTimeout(validarPar, 1000); // Esperar 1 segundo antes de validar el par
    }
}

// Función para validar si las dos cartas seleccionadas son iguales
function validarPar() {
    if (cartasSeleccionadas.length === 2) {
        const [carta1, carta2] = cartasSeleccionadas;
        const rutaImagen1 = carta1.elemento.querySelector('.frente').getAttribute('src');
        const rutaImagen2 = carta2.elemento.querySelector('.frente').getAttribute('src');

        if (rutaImagen1 === rutaImagen2) {
            // Las cartas son iguales, mantenerlas en su estado de frente
            cartasSeleccionadas = [];
        } else {
            // Las cartas no son iguales, volverlas a su estado de atrás
            carta1.elemento.querySelector('.frente').style.display = 'none';
            carta1.elemento.querySelector('.atras').style.display = 'block';

            carta2.elemento.querySelector('.frente').style.display = 'none';
            carta2.elemento.querySelector('.atras').style.display = 'block';

            cartasSeleccionadas = [];
        }

        bloquearSeleccion = false; // Desbloquear la selección
        verificarVictoria(); // Verificar si todas las cartas están en su estado de frente
    }
}

// Función para mezclar las cartas y mostrar la parte trasera
function mezclarCartas() {
    // Obtener todos los elementos con la clase 'carta'
    const cartas = document.querySelectorAll('.carta');
    
    // Crear un array con las rutas de las imágenes en pares
    const rutasImagenes = [
        '/img/catalogo/ajiaco.png',
        '/img/catalogo/ajiaco.png',
        '/img/catalogo/arepas.png',
        '/img/catalogo/arepas.png',
        '/img/catalogo/ArrozFrito.png',
        '/img/catalogo/ArrozFrito.png',
        '/img/catalogo/BandejaPaisa.png',
        '/img/catalogo/BandejaPaisa.png',
        '/img/catalogo/EspaguetiCarbonara.png',
        '/img/catalogo/EspaguetiCarbonara.png',
        '/img/catalogo/PolloGunPao.png',
        '/img/catalogo/PolloGunPao.png',
    ];

    // Mezclar las rutas de las imágenes aleatoriamente
    for (let i = rutasImagenes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rutasImagenes[i], rutasImagenes[j]] = [rutasImagenes[j], rutasImagenes[i]];
    }

    // Asignar las rutas mezcladas a las cartas y mostrar la parte trasera
    cartas.forEach((carta, index) => {
        const frente = carta.querySelector('.frente');
        const atras = carta.querySelector('.atras');
        
        frente.setAttribute('src', rutasImagenes[index]);
        frente.style.display = 'none'; // Ocultar la imagen de la parte frontal
        atras.style.display = 'block'; // Mostrar la imagen de la parte trasera
    });
}

// Función para verificar si todas las cartas están en su estado de frente
function verificarVictoria() {
    const cartas = document.querySelectorAll('.carta');

    let todasFrente = true; // Suponemos que todas las cartas están en su estado de frente

    // Verificar si alguna carta no está en su estado de frente
    cartas.forEach((carta) => {
        if (carta.querySelector('.frente').style.display !== 'block') {
            todasFrente = false;
            return; // Salir del bucle si encontramos una carta que no está en su estado de frente
        }
    });

    if (todasFrente) {
        // Todas las cartas están en su estado de frente, el jugador ha ganado
        alert('¡Ganaste! ¡no er@s tan retrasad@ como David :3!');
        mezclarCartas(); // Mezclar las cartas nuevamente
    }
}
