// Fonction pour inclure les composants
function includeComponents() {
    // Déterminer le chemin de base selon la page
    let path = '';
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/seller/') || 
        currentPath.includes('/deliver/') || 
        currentPath.includes('/vtc/')) {
        path = '../';
    }
    
    console.log('Chemin détecté:', path); // Pour déboguer
    
    // Charger le header
    fetch(path + 'components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Header non trouvé');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
            
            // Ajuster les chemins d'images dans le header
            const headerImages = document.querySelectorAll('#header img');
            headerImages.forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http')) {
                    img.setAttribute('src', path + src);
                }
            });
            
            // Ajuster les liens dans le header
            const headerLinks = document.querySelectorAll('#header a');
            headerLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('http')) {
                    if (path === '../') {
                        // Ne pas modifier les liens qui commencent déjà par ../
                        if (!href.startsWith('../')) {
                            link.setAttribute('href', '../' + href);
                        }
                    }
                }
            });
            
            // FORCER LE STYLE DU HEADER SUR LES PAGES SPECIFIQUES
            if (currentPath.includes('/seller/') || 
                currentPath.includes('/deliver/') || 
                currentPath.includes('/vtc/')) {
                
                const navbar = document.querySelector('#header .navbar');
                if (navbar) {
                    navbar.style.background = 'transparent';
                    navbar.style.position = 'absolute';
                    navbar.style.top = '0';
                    navbar.style.left = '0';
                    navbar.style.width = '100%';
                }
                
                // Forcer la couleur des liens
                const links = document.querySelectorAll('#header .commerçant, #header .livreur, #header .vtc');
                links.forEach(link => {
                    link.style.color = '#FFFFFF';
                });
            }
        })
        .catch(error => {
            console.error('Erreur chargement header:', error);
            document.getElementById('header').innerHTML = '<p style="color:red">Erreur chargement header</p>';
        });
    
    // Charger le footer
    fetch(path + 'components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Footer non trouvé');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            
            // Ajuster les chemins d'images dans le footer
            const footerImages = document.querySelectorAll('#footer img');
            footerImages.forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http')) {
                    img.setAttribute('src', path + src);
                }
            });
        })
        .catch(error => {
            console.error('Erreur chargement footer:', error);
            document.getElementById('footer').innerHTML = '<p style="color:red">Erreur chargement footer</p>';
        });
}

// Exécuter au chargement
document.addEventListener('DOMContentLoaded', includeComponents);