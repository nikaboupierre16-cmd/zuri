document.addEventListener("DOMContentLoaded", () => {
  // Récupérer les éléments
  const menu = document.querySelector(".menu");
  const navList = document.querySelector(".menu ul");
  
  // Fonction pour initialiser le menu mobile
  function initMobileMenu() {
    // Vérifier si on est sur mobile (<= 768px)
    if (window.innerWidth <= 768) {
      
      // Créer le hamburger s'il n'existe pas
      if (!document.querySelector(".hamburger")) {
        const hamburger = document.createElement("div");
        hamburger.className = "hamburger";
        hamburger.innerHTML = "☰";
        menu.insertBefore(hamburger, menu.firstChild);
      }
      
      // Créer le bouton fermer s'il n'existe pas
      if (!document.querySelector(".close-btn")) {
        const closeBtn = document.createElement("div");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "✕";
        navList.appendChild(closeBtn);
      }
      
      // Créer l'en-tête du menu mobile avec les logos
      if (!document.querySelector(".menu-header")) {
        const header = document.createElement("div");
        header.classList.add("menu-header");
        
        const logoContainer = document.createElement("div");
        logoContainer.classList.add("menu-logo");
        
        const logoIcon = document.createElement("img");
        logoIcon.src = "images/Vector.png";
        
        const logoText = document.createElement("img");
        logoText.src = "images/zuri_name.png";
        
        logoContainer.appendChild(logoIcon);
        logoContainer.appendChild(logoText);
        
        const closeBtn = document.querySelector(".close-btn");
        header.appendChild(logoContainer);
        header.appendChild(closeBtn);
        
        navList.prepend(header);
      }
      
      // Ajouter les événements
      const hamburger = document.querySelector(".hamburger");
      const closeBtn = document.querySelector(".close-btn");
      
      function openMenu() {
        navList.classList.add("active");
        hamburger.style.display = "none";
        document.body.style.overflow = "hidden";
      }
      
      function closeMenu() {
        navList.classList.remove("active");
        hamburger.style.display = "block";
        document.body.style.overflow = "";
      }
      
      hamburger.addEventListener("click", openMenu);
      closeBtn.addEventListener("click", closeMenu);
      
      // Fermer le menu en cliquant sur les liens
      const menuLinks = navList.querySelectorAll("a");
      menuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
      });
      
      // Empêcher la fermeture quand on clique sur le menu
      navList.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      
      // Fermer avec swipe vers la gauche
      let touchStartX = 0;
      navList.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
      });
      
      navList.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance < -100) {
          closeMenu();
        }
      });
      
      // Fermer en cliquant à l'extérieur
      document.addEventListener("click", (e) => {
        if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
          closeMenu();
        }
      });
    }
  }
  
  // Initialiser au chargement
  initMobileMenu();
  
  // Réinitialiser quand on redimensionne la fenêtre
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Si on passe en desktop, on supprime les éléments mobiles
      if (window.innerWidth > 768) {
        const hamburger = document.querySelector(".hamburger");
        const closeBtn = document.querySelector(".close-btn");
        const menuHeader = document.querySelector(".menu-header");
        
        if (hamburger) hamburger.remove();
        if (closeBtn) closeBtn.remove();
        if (menuHeader) menuHeader.remove();
        
        // Réinitialiser l'état du menu
        navList.classList.remove("active");
        document.body.style.overflow = "";
      } else {
        // Si on passe en mobile, on réinitialise le menu mobile
        initMobileMenu();
      }
    }, 250);
  });
});

// FAQ Interactive
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  function closeAllFaqs(except = null) {
    faqItems.forEach(item => {
      if (item !== except) {
        item.classList.remove('active');
      }
    });
  }
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const isOpening = !item.classList.contains('active');
      
      if (isOpening) {
        closeAllFaqs(item);
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});

// Bouton de défilement
const scrollBtn = document.getElementById("scrollBtn");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.innerHTML = "↑";
    } else {
      scrollBtn.innerHTML = "↓";
    }
  });
  
  scrollBtn.addEventListener("click", () => {
    if (window.scrollY > 300) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }
  });
}