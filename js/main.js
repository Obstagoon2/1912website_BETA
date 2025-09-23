document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mainNav.contains(event.target)) {
                mobileMenuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                mobileMenuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            }
        });
        
        // Mobile dropdown toggles
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.parentElement;
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
                    if (openDropdown !== dropdown) {
                        openDropdown.classList.remove('open');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('open');
            });
        });
        
        // Close dropdowns when clicking on links
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close all dropdowns
                document.querySelectorAll('.dropdown.open').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
                // Close mobile menu
                mobileMenuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });
    }

    // --- Awards dropdown functionality ---
    document.querySelectorAll('.awards-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isOpen = content.classList.contains('open');

            if (isOpen) {
                content.style.maxHeight = content.scrollHeight + "px"; // lock height before collapsing
                requestAnimationFrame(() => {
                    content.style.maxHeight = "0"; // then collapse
                });
                content.classList.remove('open');
                button.textContent = button.textContent.replace("▴", "▾");
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // expand
                content.classList.add('open');
                button.textContent = button.textContent.replace("▾", "▴");

                // Reset height after transition so resizing works
                content.addEventListener('transitionend', function removeHeight() {
                    if (content.classList.contains('open')) {
                        content.style.maxHeight = "none";
                    }
                    content.removeEventListener('transitionend', removeHeight);
                });
            }
        });
    });
});
