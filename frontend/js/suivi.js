/* 
========================================================================
   Centre d'Appel Intelligent IA - Tracking Logic (JavaScript)
   ISGMATECH - Vanilla Script
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. GLOBAL LAYOUT LOGIC (Sidebar & Theme)
  // ==========================================
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

  // Theme Toggle Control
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    const applyTheme = (theme) => {
      if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Clair</span>';
      } else {
        document.body.classList.remove('light-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Sombre</span>';
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
  }

  // Toast Utility
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
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  };

  // ==========================================
  // 2. TRACKING VIEW RENDER LOGIC
  // ==========================================
  const suiviListContainer = document.getElementById('suiviList');

  // Simulated fetch of transport requests
  function fetchTransportRequests() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requests = JSON.parse(localStorage.getItem('transportRequests') || '[]');
        resolve(requests);
      }, 600); // 0.6s simulation delay
    });
  }

  // Cancel Request Action
  window.cancelRequest = function(requestId) {
    if (!confirm(`Voulez-vous vraiment annuler la demande ${requestId} ?`)) return;

    let requests = JSON.parse(localStorage.getItem('transportRequests') || '[]');
    // Filter out the request
    requests = requests.filter(req => req.id !== requestId);
    localStorage.setItem('transportRequests', JSON.stringify(requests));
    
    showToast(`Demande ${requestId} annulée avec succès.`, "info");
    renderTrackingList(); // Reload view
  };

  async function renderTrackingList() {
    suiviListContainer.innerHTML = `
      <div style="text-align: center; padding: 48px;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--text-muted);"></i>
        <p style="margin-top: 12px; color: var(--text-muted);">Mise à jour des demandes...</p>
      </div>
    `;

    const requests = await fetchTransportRequests();

    if (requests.length === 0) {
      suiviListContainer.innerHTML = `
        <div class="glass-card no-requests" style="animation: messageEntrance 0.4s ease forwards;">
          <i class="fa-solid fa-map-location-dot"></i>
          <h3 style="font-family: var(--font-title); font-size: 1.3rem; margin-bottom: 8px;">Aucun trajet en cours</h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">Vous n'avez pas de demande de transport planifiée pour le moment.</p>
          <a href="transport.html" class="btn btn-primary">Planifier un transport</a>
        </div>
      `;
      return;
    }

    suiviListContainer.innerHTML = ""; // Clear loader

    requests.forEach(req => {
      let statusClass = "pending";
      let statusText = "En attente";
      let statusDesc = "Votre demande est en cours d'analyse par l'administrateur.";
      let progressWidth = "33%";
      let fillClass = "";

      if (req.status === "Acceptée") {
        statusClass = "accepted";
        statusText = "Acceptée";
        statusDesc = "Demande validée ! Votre chauffeur a été notifié et se prépare pour le départ.";
        progressWidth = "100%";
      } else if (req.status === "Refusée") {
        statusClass = "refused";
        statusText = "Refusée";
        statusDesc = "Cette demande a été refusée par l'administrateur. Veuillez contacter l'accueil.";
        progressWidth = "100%";
        fillClass = "refused";
      }

      const card = document.createElement('div');
      card.className = "glass-card suivi-card";
      card.style.animation = "messageEntrance 0.3s ease forwards";
      
      card.innerHTML = `
        <!-- Card Header -->
        <div class="suivi-header">
          <div class="suivi-title-area">
            <h3>Demande #${req.id}</h3>
            <p>Soumise le : ${req.date}</p>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span class="status-badge ${statusClass}">${statusText}</span>
            ${req.status === "En attente" ? `
              <button onclick="cancelRequest('${req.id}')" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 8px; color: var(--danger); border-color: rgba(239, 68, 68, 0.2);">
                <i class="fa-solid fa-trash"></i> Annuler
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Card Route details -->
        <div class="suivi-route">
          <div class="route-point">
            <span class="label">Départ</span>
            <span class="val">${req.departure}</span>
          </div>
          <div class="route-arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
          <div class="route-point">
            <span class="label">Arrivée</span>
            <span class="val">${req.destination}</span>
          </div>
        </div>

        <!-- Client info -->
        <div style="font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--border-color); padding-top: 12px; display: flex; gap: 20px; flex-wrap: wrap;">
          <span><strong>Passager:</strong> ${req.fullName}</span>
          <span><strong>Téléphone:</strong> ${req.phone}</span>
        </div>

        <!-- Progress bar Section -->
        <div class="progress-container">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${fillClass}" style="width: ${progressWidth};"></div>
          </div>
          <div class="progress-labels">
            <span>En attente</span>
            <span>Chauffeur assigné</span>
            <span>En route / Terminé</span>
          </div>
          <p style="font-size: 0.85rem; margin-top: 8px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-circle-info" style="color: var(--accent-primary);"></i>
            ${statusDesc}
          </p>
        </div>
      `;

      suiviListContainer.appendChild(card);
    });
  }

  // Load and render
  renderTrackingList();

});
