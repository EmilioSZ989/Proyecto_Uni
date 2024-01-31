// Seleccionar elementos del slider
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let currentIndex = 0;

// Función para ir a una diapositiva específica
function goToSlide(index) {
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
}

// Función para mostrar la siguiente diapositiva
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
}

// Función para mostrar la diapositiva anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
}

// Agregar event listeners para los botones de siguiente y anterior
nextBtn.addEventListener('click', () => {
    nextSlide();
    clearInterval(sliderInterval); // Reiniciar el intervalo al hacer clic
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    clearInterval(sliderInterval); // Reiniciar el intervalo al hacer clic
});

// Configurar un intervalo para cambiar automáticamente las diapositivas cada 5 segundos
let sliderInterval = setInterval(nextSlide, 5000);

// Función para mostrar los detalles del modal
function mostrarDetalles() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
