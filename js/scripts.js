document.addEventListener('DOMContentLoaded', function() {
    // Get the container and sections
    const container = document.querySelector('.horizontal-scroll-container');
    const sections = document.querySelectorAll('.section');
    const sectionWidth = window.innerWidth; // Each section is 100vw wide
    
    // Get background overlays for cross-fade effect
    const backgrounds = [
        document.getElementById('bg-1'),
        document.getElementById('bg-2'),
        document.getElementById('bg-3')
    ];
    
    // Make sure all sections are visible initially
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
    
    // Track current section and background
    let currentSection = 0;
    let currentBackground = 0;
    
    // Function to cross-fade between background images
    function crossFadeBackground(index) {
        // Fade out all backgrounds except the target one
        backgrounds.forEach((bg, i) => {
            if (i === index) {
                // Fade in the target background
                bg.style.opacity = '1';
            } else {
                // Fade out other backgrounds
                bg.style.opacity = '0';
            }
        });
    }
    
    // Enhanced function for active section management
    function updateActiveSection(index) {
        // Cross-fade to the corresponding background
        crossFadeBackground(index);
        
        // Update active classes on sections
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        // Update current section tracker
        currentSection = index;
        currentBackground = index;
    }
    
    // Function to scroll to a specific section
    function scrollToSection(index) {
        // Make sure index is within bounds
        index = Math.max(0, Math.min(index, sections.length - 1));
        currentSection = index;
        
        // Scroll to the section
        container.scrollTo({
            left: index * sectionWidth,
            behavior: 'smooth'
        });
        
        // Update active sections for fluid background transitions
        updateActiveSection(index);
    }
    
    // Handle mouse wheel events with debounce to prevent skipping sections
    let wheelTimeout = null;
    let wheelThreshold = 50; // Threshold to determine scroll intent
    let wheelAccumulator = 0;
    
    window.addEventListener('wheel', function(e) {
        // Prevent default scroll
        e.preventDefault();
        
        // Accumulate scroll values
        wheelAccumulator += e.deltaY;
        
        // Clear any existing timeout
        clearTimeout(wheelTimeout);
        
        // Set a new timeout to handle the scroll after a short delay
        wheelTimeout = setTimeout(function() {
            // Check if we've accumulated enough scroll to change section
            if (wheelAccumulator > wheelThreshold && currentSection < sections.length - 1) {
                // Scroll right to next section
                scrollToSection(currentSection + 1);
            } else if (wheelAccumulator < -wheelThreshold && currentSection > 0) {
                // Scroll left to previous section
                scrollToSection(currentSection - 1);
            }
            
            // Reset accumulator
            wheelAccumulator = 0;
        }, 50); // Short delay to accumulate scroll events
    }, { passive: false });
    
    // Handle keyboard navigation
    window.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });
    
    // Handle touch events for mobile
    let touchStartX = 0;
    
    container.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    });
    
    container.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;
        
        // Threshold for swipe detection
        if (Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSection < sections.length - 1) {
                // Swipe left, go to next section
                scrollToSection(currentSection + 1);
            } else if (diffX < 0 && currentSection > 0) {
                // Swipe right, go to previous section
                scrollToSection(currentSection - 1);
            }
        }
    });
    
    // Update active section on scroll
    container.addEventListener('scroll', function() {
        // Get exact scroll position
        const scrollPosition = container.scrollLeft;
        
        // Calculate current section index
        const index = Math.round(scrollPosition / sectionWidth);
        
        // Update active section if changed
        if (index !== currentSection) {
            currentSection = index;
            updateActiveSection(index);
        }
    });
    
    // Initialize - set up the first background and section
    // Make sure the first background is visible immediately
    backgrounds[0].style.opacity = '1';
    
    // Set first section as active
    sections[0].classList.add('active');
    
    // Initialize current section trackers
    currentSection = 0;
    currentBackground = 0;
    
    console.log('Cross-fade background transitions initialized');
});