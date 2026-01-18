/* ============================================
   SISTEMA DE FILTRADO DINÁMICO
   ============================================ */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const portfolioGrid = document.getElementById('portfolioGrid');

    /**
     * Función principal para filtrar las tarjetas según la categoría seleccionada
     * @param {string} filterValue - Valor del filtro ('all', 'projects', 'teaching', 'media')
     */
    function filterCards(filterValue) {
        // Recorrer todas las tarjetas y aplicar el filtro
        portfolioCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // Si el filtro es 'all', mostrar todas las tarjetas
            if (filterValue === 'all') {
                showCard(card);
            } 
            // Si la categoría de la tarjeta coincide con el filtro, mostrarla
            else if (cardCategory === filterValue) {
                showCard(card);
            } 
            // Si no coincide, ocultar la tarjeta
            else {
                hideCard(card);
            }
        });
    }

    /**
     * Función para ocultar una tarjeta con animación fade out
     * @param {HTMLElement} card - Elemento de la tarjeta a ocultar
     */
    function hideCard(card) {
        // Agregar clase 'hidden' para aplicar estilos CSS y animación
        card.classList.add('hidden');
    }

    /**
     * Función para mostrar una tarjeta con animación fade in
     * @param {HTMLElement} card - Elemento de la tarjeta a mostrar
     */
    function showCard(card) {
        // Remover clase 'hidden' para mostrar la tarjeta con animación
        card.classList.remove('hidden');
    }

    /**
     * Función para actualizar el estado activo de los botones de filtro
     * @param {HTMLElement} activeButton - Botón que debe estar activo
     */
    function updateActiveButton(activeButton) {
        // Remover clase 'active' de todos los botones
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Agregar clase 'active' al botón seleccionado
        activeButton.classList.add('active');
    }

    // Agregar event listeners a cada botón de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Obtener el valor del filtro desde el atributo data-filter
            const filterValue = button.getAttribute('data-filter');
            
            // Actualizar el estado visual del botón activo
            updateActiveButton(button);
            
            // Aplicar el filtro a las tarjetas
            filterCards(filterValue);
        });
    });

    /* ============================================
       SCROLL SMOOTH PARA NAVEGACIÓN
       ============================================ */
    
    // Agregar smooth scroll a los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Si el href es solo '#', no hacer nada
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular la posición considerando la altura del header sticky
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Scroll suave hacia el elemento
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============================================
       EFECTO HEADER AL SCROLLEAR
       ============================================ */
    
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Agregar sombra al header cuando se hace scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    /* ============================================
       ANIMACIONES AL HACER SCROLL (Intersection Observer)
       ============================================ */
    
    // Configuración del Intersection Observer para animar elementos al entrar en vista
    const observerOptions = {
        threshold: 0.1, // Porcentaje del elemento que debe ser visible
        rootMargin: '0px 0px -50px 0px' // Margen adicional para el cálculo
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando el elemento entra en vista, agregar clase para animación
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas del portfolio para animarlas al aparecer
    portfolioCards.forEach(card => {
        // Establecer estado inicial (invisible y ligeramente desplazado hacia abajo)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observar cada tarjeta
        observer.observe(card);
    });

    // Observar la sección de contacto
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.style.opacity = '0';
        contactSection.style.transform = 'translateY(20px)';
        contactSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactSection);
    }
});
