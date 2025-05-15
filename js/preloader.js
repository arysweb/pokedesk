// Preloader functionality
window.addEventListener('load', function() {
    // Check if this is a page reload
    const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
            .getEntriesByType('navigation')
            .map((nav) => nav.type)
            .includes('reload')
    );
    
    const preloader = document.getElementById('preloader');
    
    // If it's a reload, hide the preloader immediately
    if (pageAccessedByReload) {
        preloader.style.display = 'none';
    } else {
        // For initial page load, show the preloader with animation
        setTimeout(function() {
            preloader.classList.add('hidden');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // Show preloader for at least 1.5 seconds
    }
    
    // Store that the page has been loaded in session storage
    sessionStorage.setItem('pageLoaded', 'true');
});
