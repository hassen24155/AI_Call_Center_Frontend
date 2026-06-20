/* 
========================================================================
   Centre d'Appel Intelligent IA - Shared Layout Component Coordinator
   ISGMATECH - Dynamic Layouts, Themes, Languages & Navigation
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic UI structures
  layoutManager.init();
});

const layoutManager = {
  init: function() {
    // 1. Ensure translation module is loaded
    if (!window.i18n) {
      console.error("Translation module (translations.js) is required!");
      return;
    }

    // 2. Render common layout structures
    this.renderSidebar();
    this.renderHeader();
    this.ensureToastContainer();

    // 3. Apply active styling in sidebar menu
    this.highlightActiveMenu();

    // 4. Bind theme controls
    this.setupTheme();

    // 5. Bind language switcher controls
    this.setupLanguage();

    // 6. Trigger initial translation run
    window.i18n.setLanguage(window.i18n.currentLang);

    // 7. Check for session warnings (e.g., unauthorized redirects)
    this.checkSessionWarnings();
  },

  // Renders the standard sidebar structure
  renderSidebar: function() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const user = window.auth ? window.auth.getCurrentUser() : null;
    const isAdmin = user && user.role === 'Administrator';

    let menuItemsHTML = `
      <a href="index.html" class="menu-item" id="menu-home">
        <i class="fa-solid fa-house"></i>
        <span data-i18n="nav-home">Accueil</span>
      </a>
    `;

    // Only show protected tabs if logged in
    if (user) {
      menuItemsHTML += `
        <a href="chat.html" class="menu-item" id="menu-chat">
          <i class="fa-solid fa-comments"></i>
          <span data-i18n="nav-chat">Chat IA</span>
        </a>
        <a href="transport.html" class="menu-item" id="menu-transport">
          <i class="fa-solid fa-car"></i>
          <span data-i18n="nav-transport">Transport</span>
        </a>
        <a href="suivi.html" class="menu-item" id="menu-tracking">
          <i class="fa-solid fa-map-location-dot"></i>
          <span data-i18n="nav-tracking">Suivi</span>
        </a>
      `;
    }

    // Admin Dashboard visible only to Administrators
    if (isAdmin) {
      menuItemsHTML += `
        <a href="dashboard.html" class="menu-item" id="menu-dashboard">
          <i class="fa-solid fa-chart-line"></i>
          <span data-i18n="nav-dashboard">Dashboard</span>
        </a>
      `;
    }

    // If guest, show login/register options in sidebar
    if (!user) {
      menuItemsHTML += `
        <a href="login.html" class="menu-item" id="menu-login">
          <i class="fa-solid fa-right-to-bracket"></i>
          <span data-i18n="nav-login">Connexion</span>
        </a>
        <a href="register.html" class="menu-item" id="menu-register">
          <i class="fa-solid fa-user-plus"></i>
          <span data-i18n="nav-register">Inscription</span>
        </a>
      `;
    }

    // User profile panel at the bottom of the sidebar
    let profileHTML = "";
    if (user) {
      const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      profileHTML = `
        <div class="sidebar-user-profile">
          <div class="user-profile-info">
            <div class="user-profile-avatar">${initials}</div>
            <div class="user-profile-meta">
              <span class="user-profile-name">${user.name}</span>
              <span class="user-profile-role" data-i18n="${user.role === 'Administrator' ? 'auth-role-admin' : 'auth-role-client'}">${user.role}</span>
            </div>
          </div>
          <button class="logout-btn" id="logoutBtn" title="Déconnexion">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      `;
    }

    sidebar.innerHTML = `
      <div class="sidebar-brand">
        <img src="assets/images/logo.png" alt="ISGMATECH Logo" class="logo">
        <span>ISGMATECH</span>
      </div>
      <nav class="sidebar-menu">
        ${menuItemsHTML}
      </nav>
      ${profileHTML}
    `;

    // Bind logout button click
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn && window.auth) {
      logoutBtn.addEventListener('click', () => {
        if (confirm(window.i18n.currentLang === 'fr' ? "Voulez-vous vous déconnecter ?" : "هل تريد تسجيل الخروج؟")) {
          window.auth.logout();
        }
      });
    }
  },

  // Renders the standard top header items
  renderHeader: function() {
    const header = document.querySelector('.top-header');
    if (!header) return;

    // Mobile Hamburger
    const hasHamburger = header.querySelector('.mobile-toggle');
    let hamburgerBtnHTML = `
      <button class="mobile-toggle" id="mobileSidebarToggle" aria-label="Toggle Navigation Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    `;
    if (hasHamburger) {
      hamburgerBtnHTML = ""; // Don't duplicate if already present in markup
    }

    // Fetch page localized label mapping
    const pageName = window.i18n.getPageName();
    let headerI18nKey = "nav-home";
    if (pageName === 'chat') headerI18nKey = "nav-chat";
    if (pageName === 'transport') headerI18nKey = "nav-transport";
    if (pageName === 'tracking') headerI18nKey = "nav-tracking";
    if (pageName === 'dashboard') headerI18nKey = "nav-dashboard";
    if (pageName === 'login') headerI18nKey = "nav-login";
    if (pageName === 'register') headerI18nKey = "nav-register";

    const titleHTML = `
      <div class="page-title-area">
        <h1 data-i18n="${headerI18nKey}">Accueil</h1>
      </div>
    `;

    // Active Language name
    let activeLangName = "Français";
    if (window.i18n.currentLang === 'ar') activeLangName = "العربية";
    if (window.i18n.currentLang === 'hr') activeLangName = "الحسانية";

    const actionsHTML = `
      <div style="display: flex; align-items: center; gap: 16px;">
        
        <!-- Language Switcher Dynamic Dropdown -->
        <div class="lang-switcher-container">
          <button class="lang-btn" id="langDropdownBtn">
            <i class="fa-solid fa-globe"></i>
            <span>${activeLangName}</span>
            <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem;"></i>
          </button>
          
          <div class="lang-dropdown" id="langDropdown">
            <button class="lang-option" data-lang="fr">
              <span>Français</span>
              ${window.i18n.currentLang === 'fr' ? '<i class="fa-solid fa-check"></i>' : ''}
            </button>
            <button class="lang-option" data-lang="ar">
              <span>العربية</span>
              ${window.i18n.currentLang === 'ar' ? '<i class="fa-solid fa-check"></i>' : ''}
            </button>
            <button class="lang-option" data-lang="hr">
              <span>الحسانية</span>
              ${window.i18n.currentLang === 'hr' ? '<i class="fa-solid fa-check"></i>' : ''}
            </button>
          </div>
        </div>

        <!-- Light / Dark Theme Button -->
        <button class="theme-toggle" id="themeToggleBtn" style="width: 42px; height: 42px; padding: 0; border-radius: 50%;">
          <i class="fa-solid fa-moon"></i>
        </button>
        
      </div>
    `;

    // Append to Header
    if (!hasHamburger) {
      header.innerHTML = hamburgerBtnHTML + titleHTML + actionsHTML;
    } else {
      // If hamburger exists, preserve it, replace rest
      const titleArea = header.querySelector('.page-title-area');
      if (titleArea) titleArea.remove();
      const rightSpacer = header.querySelector('div:last-child');
      if (rightSpacer) rightSpacer.remove();
      
      header.innerHTML += titleHTML + actionsHTML;
    }

    // Set up hamburger sidebar events
    const mobileToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== mobileToggle) {
          sidebar.classList.remove('active');
        }
      });
    }
  },

  // Highlight menu element corresponding to current page location
  highlightActiveMenu: function() {
    const pageName = window.i18n.getPageName();
    let activeId = "menu-home";
    if (pageName === 'chat') activeId = "menu-chat";
    if (pageName === 'transport') activeId = "menu-transport";
    if (pageName === 'tracking') activeId = "menu-tracking";
    if (pageName === 'dashboard') activeId = "menu-dashboard";
    if (pageName === 'login') activeId = "menu-login";
    if (pageName === 'register') activeId = "menu-register";

    const activeItem = document.getElementById(activeId);
    if (activeItem) {
      // Remove any existing active highlights
      document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
      activeItem.classList.add('active');
    }
  },

  // Dynamic Theme Toggle setup
  setupTheme: function() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!themeToggleBtn) return;

    const applyTheme = (theme) => {
      if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        document.body.classList.remove('light-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    };

    const currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  },

  // Dynamic language switcher setup
  setupLanguage: function() {
    const dropdownBtn = document.getElementById('langDropdownBtn');
    const dropdown = document.getElementById('langDropdown');

    if (!dropdownBtn || !dropdown) return;

    // Toggle dropdown open/close
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    // Handle language selection click
    const options = dropdown.querySelectorAll('.lang-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        window.i18n.setLanguage(lang);
        
        // Reload page to redraw components (necessary for resetting layouts cleanly)
        window.location.reload();
      });
    });
  },

  // Make sure notification container node exists in HTML
  ensureToastContainer: function() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
  },

  // Check and fire warning toast messages (e.g. from routing limits)
  checkSessionWarnings: function() {
    const warning = localStorage.getItem('authWarning');
    if (warning) {
      localStorage.removeItem('authWarning');
      
      // Let translations settle before displaying toast
      setTimeout(() => {
        if (warning === 'restricted-access') {
          const message = window.i18n.currentLang === 'fr' 
            ? "Accès refusé. Section réservée aux administrateurs." 
            : "الحق في الدخول مرفوض. هاذ الشغل خاص بالمديرين.";
          window.showToast(message, "danger");
        }
      }, 500);
    }
  }
};

// Global Toast utility definition (enterprise standard)
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'fa-info-circle';
  if (type === 'success') iconClass = 'fa-check-circle';
  if (type === 'danger') iconClass = 'fa-circle-exclamation';
  
  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span style="font-size: 0.9rem; font-weight: 500;">${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Transition logic
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3800);
};
