/**
 * SkyGuards - Contador animado para estadísticas
 * Este script anima los contadores numéricos para que incrementen desde 0 hasta el valor objetivo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos con la clase stat-number
    const counters = document.querySelectorAll('.stat-number');
    
    // Función para animar un contador
    function animateCounter(counter) {
        // Obtener el valor objetivo del atributo data-target
        const target = parseInt(counter.getAttribute('data-target'));
        // Duración de la animación en milisegundos
        const duration = 2000;
        // Valor inicial
        let current = 0;
        // Calcular el incremento por paso
        const increment = target / (duration / 16);
        
        // Función para actualizar el contador
        function updateCounter() {
            current += increment;
            // Si el valor actual es mayor que el objetivo, establecer al objetivo
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            
            // Actualizar el texto del contador con el valor actual redondeado
            counter.textContent = Math.floor(current);
            // Continuar la animación
            requestAnimationFrame(updateCounter);
        }
        
        // Iniciar la animación
        updateCounter();
    }
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para iniciar animaciones cuando los elementos son visibles
    function checkVisibility() {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    // Verificar visibilidad al cargar la página
    checkVisibility();
    
    // Verificar visibilidad al hacer scroll
    window.addEventListener('scroll', checkVisibility);
});