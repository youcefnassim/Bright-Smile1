// Theme Toggle Functionality for Bright Smile Medical Space
class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme on page load
        this.applyTheme(this.currentTheme);
        
        // Create toggle button if it doesn't exist
        this.createToggleButton();
        
        // Add event listener
        this.addEventListeners();
    }

    createToggleButton() {
        // Check if button already exists
        if (document.querySelector('.dark-mode-toggle')) {
            return;
        }

        const toggleButton = document.createElement('button');
        toggleButton.className = 'dark-mode-toggle';
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        toggleButton.setAttribute('aria-label', 'Basculer le mode sombre');
        toggleButton.setAttribute('title', 'Basculer entre mode clair et sombre');
        
        document.body.appendChild(toggleButton);
    }

    addEventListeners() {
        const toggleButton = document.querySelector('.dark-mode-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        this.updateToggleIcon();
        
        // Add visual feedback
        this.showNotification(`Mode ${this.currentTheme === 'dark' ? 'sombre' : 'clair'} activé`);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        const toggleButton = document.querySelector('.dark-mode-toggle');
        if (toggleButton) {
            const icon = toggleButton.querySelector('i');
            if (this.currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
                toggleButton.setAttribute('title', 'Passer au mode clair');
            } else {
                icon.className = 'fas fa-moon';
                toggleButton.setAttribute('title', 'Passer au mode sombre');
            }
        }
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification theme-notification success show';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Method to set theme programmatically
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.saveTheme();
            this.updateToggleIcon();
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeToggle = new ThemeToggle();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeToggle = new ThemeToggle();
    });
} else {
    window.themeToggle = new ThemeToggle();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeToggle;
}
