// Navigation centralisée pour l'espace médecin Bright Smile
// Ce fichier gère la navigation cohérente entre tous les modules

class BrightSmileNavigation {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.menuItems = [
            { href: 'Accueil.html', icon: 'fas fa-home', text: 'Accueil', id: 'accueil' },
            { href: 'services.html', icon: 'fas fa-stethoscope', text: 'Services', id: 'services' },
            { href: 'temoignages.html', icon: 'fas fa-quote-left', text: 'Témoignages', id: 'temoignages' },
            { href: 'ordonnance.html', icon: 'fas fa-prescription', text: 'Ordonnances', id: 'ordonnances' },
            { href: 'médicaments.html', icon: 'fas fa-pills', text: 'Médicaments', id: 'medicaments' },
            { href: 'traitement.html', icon: 'fas fa-teeth', text: 'Traitements', id: 'traitements' },
            { href: 'travauxode.html', icon: 'fas fa-tooth', text: 'Travaux ODE', id: 'travaux' },
            { href: 'laboratoire.html', icon: 'fas fa-flask', text: 'Laboratoire', id: 'laboratoire' },
            { href: 'Rdvs.html', icon: 'fas fa-calendar-alt', text: 'RDVs', id: 'rdvs' },
            { href: 'galerie.html', icon: 'fas fa-images', text: 'La Galerie', id: 'galerie' },
            { href: 'complément.html', icon: 'fas fa-chart-bar', text: 'Complément', id: 'complement' },
            { href: 'statistique.html', icon: 'fas fa-chart-line', text: 'Statistique', id: 'statistiques' },
            { href: 'paramètres.html', icon: 'fas fa-cog', text: 'Paramètres', id: 'parametres' },
            { href: 'documentation.html', icon: 'fas fa-book', text: 'Documentation', id: 'documentation' }
        ];
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }

    generateSidebarHTML() {
        return `
            <div class="sidebar">
                <div class="logo">
                    <img src="../img/logo.jpg" alt="Bright Smile Dental Clinic" class="logo-image">
                    <h1>Bright Smile</h1>
                    <p>Gestion de cabinet dentaire</p>
                </div>
                
                <ul class="menu">
                    ${this.menuItems.map(item => `
                        <li>
                            <a href="${item.href}" class="${this.currentPage === item.href ? 'active' : ''}">
                                <i class="${item.icon}"></i> 
                                <span>${item.text}</span>
                            </a>
                        </li>
                    `).join('')}
                    <li class="menu-separator"></li>
                    <li>
                        <a href="../medecin/dashboard.php" class="backend-link">
                            <i class="fas fa-database"></i> 
                            <span>Backend Admin</span>
                        </a>
                    </li>
                    <li>
                        <a href="../medecin/logout.php" class="logout-link">
                            <i class="fas fa-sign-out-alt"></i> 
                            <span>Déconnexion</span>
                        </a>
                    </li>
                </ul>
            </div>
        `;
    }

    generateHeaderHTML() {
        const pageTitle = this.getPageTitle();
        return `
            <div class="header">
                <div class="header-left">
                    <h2>${pageTitle}</h2>
                    <div class="current-time-display">
                        <i class="fas fa-clock"></i>
                        <span class="current-time">--:--</span>
                    </div>
                </div>
                <div class="user-info">
                    <img src="https://ui-avatars.com/api/?name=Dr+Dentiste&background=1976d2&color=fff" alt="Docteur">
                    <div>
                        <div>Dr. AYAD SOUMIA</div>
                        <small>Dentiste</small>
                        <div class="status-indicator status-online"></div>
                    </div>
                    <a href="index-public.html" class="public-site-link" title="Voir le site public">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;
    }

    getPageTitle() {
        const pageTitles = {
            'Accueil.html': 'Tableau de Bord',
            'services.html': 'Services Dentaires',
            'temoignages.html': 'Témoignages Patients',
            'ordonnance.html': 'Gestion des Ordonnances',
            'médicaments.html': 'Gestion des Médicaments',
            'traitement.html': 'Gestion des Traitements',
            'travauxode.html': 'Travaux ODE',
            'laboratoire.html': 'Laboratoire Dentaire',
            'Rdvs.html': 'Gestion des Rendez-vous',
            'galerie.html': 'Galerie Photos',
            'complément.html': 'Informations Complémentaires',
            'statistique.html': 'Statistiques du Cabinet',
            'paramètres.html': 'Paramètres Système',
            'documentation.html': 'Documentation',
            'index.html': 'Accueil - Bright Smile'
        };
        return pageTitles[this.currentPage] || 'Bright Smile Dental Clinic';
    }

    generateFooterHTML() {
        return `
            <div class="footer">
                <p>Avec <span class="highlight">Bright Smile</span> votre cabinet désormais bien organisé</p>
                <p>© 2025 Bright Smile Dental Clinic - Tous droits réservés</p>
            </div>
        `;
    }

    generateBreadcrumbHTML() {
        const breadcrumbs = this.getBreadcrumbs();
        if (breadcrumbs.length <= 1) return '';
        
        return `
            <nav class="breadcrumb">
                ${breadcrumbs.map((crumb, index) => `
                    ${index > 0 ? '<i class="fas fa-chevron-right"></i>' : ''}
                    ${index === breadcrumbs.length - 1 
                        ? `<span class="current">${crumb.text}</span>`
                        : `<a href="${crumb.href}">${crumb.text}</a>`
                    }
                `).join('')}
            </nav>
        `;
    }

    getBreadcrumbs() {
        const breadcrumbs = [{ href: 'Accueil.html', text: 'Accueil' }];
        
        const currentItem = this.menuItems.find(item => item.href === this.currentPage);
        if (currentItem && currentItem.href !== 'Accueil.html') {
            breadcrumbs.push({ href: currentItem.href, text: currentItem.text });
        }
        
        return breadcrumbs;
    }

    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    render() {
        // Injecter la sidebar si elle n'existe pas déjà
        if (!document.querySelector('.sidebar')) {
            document.body.insertAdjacentHTML('afterbegin', this.generateSidebarHTML());
        }

        // Injecter le header si le conteneur existe
        const headerContainer = document.querySelector('.header');
        if (headerContainer && !headerContainer.querySelector('.header-left')) {
            headerContainer.innerHTML = this.generateHeaderHTML().replace('<div class="header">', '').replace('</div>', '');
        }

        // Injecter le breadcrumb
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !document.querySelector('.breadcrumb')) {
            const breadcrumbHTML = this.generateBreadcrumbHTML();
            if (breadcrumbHTML) {
                mainContent.insertAdjacentHTML('afterbegin', breadcrumbHTML);
            }
        }

        // Injecter le footer si il n'existe pas
        if (!document.querySelector('.footer')) {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.insertAdjacentHTML('beforeend', this.generateFooterHTML());
            }
        }

        // Configurer les événements de navigation
        this.setupNavigationEvents();
        
        // Marquer l'élément actif
        this.markActiveMenuItem();
    }

    setupNavigationEvents() {
        const menuLinks = document.querySelectorAll('.menu a:not(.backend-link):not(.logout-link)');
        
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Permettre la navigation normale
                // Retirer la classe active de tous les éléments
                menuLinks.forEach(item => item.classList.remove('active'));
                
                // Ajouter la classe active à l'élément cliqué
                link.classList.add('active');
                
                // Sauvegarder la page active
                localStorage.setItem('brightSmileActivePage', link.getAttribute('href'));
            });
        });

        // Gérer les liens spéciaux
        const backendLink = document.querySelector('.backend-link');
        if (backendLink) {
            backendLink.addEventListener('click', (e) => {
                if (!confirm('Voulez-vous accéder au backend d\'administration ?')) {
                    e.preventDefault();
                }
            });
        }

        const logoutLink = document.querySelector('.logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                if (!confirm('Voulez-vous vraiment vous déconnecter ?')) {
                    e.preventDefault();
                } else {
                    localStorage.removeItem('brightSmileActivePage');
                }
            });
        }
    }

    markActiveMenuItem() {
        const menuLinks = document.querySelectorAll('.menu a');
        const currentPage = this.currentPage;
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === 'Accueil.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Méthodes utilitaires pour l'intégration avec le backend
    static async checkAuthStatus() {
        try {
            const response = await fetch('../medecin/api/check-auth.php');
            const data = await response.json();
            return data.authenticated || false;
        } catch (error) {
            console.warn('Impossible de vérifier le statut d\'authentification:', error);
            return false;
        }
    }

    static async redirectToLogin() {
        window.location.href = '../medecin/login.php';
    }

    // Méthode pour synchroniser avec le backend
    static async syncWithBackend() {
        const isAuthenticated = await BrightSmileNavigation.checkAuthStatus();
        
        if (!isAuthenticated) {
            const shouldRedirect = confirm('Votre session a expiré. Voulez-vous vous reconnecter ?');
            if (shouldRedirect) {
                BrightSmileNavigation.redirectToLogin();
            }
        }
        
        return isAuthenticated;
    }
}

// Styles CSS additionnels pour la navigation
const navigationStyles = `
<style>
.menu-separator {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 15px 20px;
    border: none;
}

.backend-link, .logout-link {
    opacity: 0.8;
    transition: var(--transition);
}

.backend-link:hover, .logout-link:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1) !important;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0;
    margin-bottom: 20px;
    font-size: 14px;
    color: var(--text-secondary);
}

.breadcrumb a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition);
}

.breadcrumb a:hover {
    color: var(--accent-color);
}

.breadcrumb .current {
    color: var(--text-primary);
    font-weight: 600;
}

.breadcrumb i {
    font-size: 12px;
    color: var(--text-secondary);
}

.public-site-link {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--gradient-primary);
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 0.8rem;
    transition: var(--transition);
    box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);
}

.public-site-link:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);
}
</style>
`;

// Injecter les styles
document.head.insertAdjacentHTML('beforeend', navigationStyles);

// Initialiser la navigation automatiquement
window.brightSmileNav = new BrightSmileNavigation();

// Vérifier l'authentification périodiquement (toutes les 5 minutes)
setInterval(() => {
    BrightSmileNavigation.syncWithBackend();
}, 300000);

// Exporter pour utilisation globale
window.BrightSmileNavigation = BrightSmileNavigation;
