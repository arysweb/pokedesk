// JavaScript Principal de PokéDesk

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animaciones para elementos de la cuadrícula bento
    initBentoAnimations();
    
    // Añadir event listeners para elementos interactivos
    addEventListeners();
});

// Añadir animaciones sutiles a los elementos de la cuadrícula bento
function initBentoAnimations() {
    const bentoItems = document.querySelectorAll('.bento-item');
    
    bentoItems.forEach((item, index) => {
        // Añadir un pequeño retraso a cada elemento para un efecto escalonado
        const delay = index * 0.1;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, delay * 1000);
    });
}

// Añadir event listeners para elementos interactivos
function addEventListeners() {
    // Funcionalidad del botón de búsqueda
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Funcionalidad de búsqueda próximamente!');
        });
    }
    
    // Funcionalidad del botón de notificaciones
    const notificationsBtn = document.querySelector('.notifications-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            alert('Funcionalidad de notificaciones próximamente!');
        });
    }
    
    // Funcionalidad del botón CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('¡Únete a nuestra comunidad Pokémon hoy!');
        });
    }
    
    // Botones de acción de publicaciones (me gusta, comentar, compartir)
    const postActionButtons = document.querySelectorAll('.post-actions button');
    postActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Si es un botón de me gusta (contiene fa-heart)
            if (this.innerHTML.includes('fa-heart')) {
                const likeCount = parseInt(this.innerText.trim());
                this.innerHTML = `<i class="fas fa-heart"></i> ${likeCount + 1}`;
                this.style.color = 'var(--primary)';
                this.style.opacity = '1';
            } else if (this.innerHTML.includes('fa-comment')) {
                alert('Funcionalidad de comentarios próximamente!');
            } else if (this.innerHTML.includes('fa-share')) {
                alert('Funcionalidad de compartir próximamente!');
            }
        });
    });
}

// Función para simular la carga de datos de Pokémon (para futura integración de API)
function loadPokemonData() {
    // Esto sería reemplazado por llamadas reales a la API en el futuro
    console.log('Cargando datos de Pokémon...');
    
    // Carga de datos simulada
    setTimeout(() => {
        console.log('¡Datos de Pokémon cargados con éxito!');
    }, 1000);
}

// Para implementación futura: Cambio de modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Guardar preferencia en localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Comprobar si el usuario habilitó previamente el modo oscuro
function checkDarkModePreference() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
}
