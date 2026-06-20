/* 
========================================================================
   Centre d'Appel Intelligent IA - Admin Dashboard Logic (JavaScript)
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
  // 2. SEED MOCK DATA (For initial display)
  // ==========================================
  const mockRequestsSeed = [
    {
      id: "TR-87241",
      fullName: "Alice Martin",
      phone: "06 99 88 77 66",
      departure: "Place de la Bastille, Paris",
      destination: "Gare Montparnasse, Paris",
      status: "En attente",
      progress: 33,
      date: new Date(Date.now() - 1000 * 60 * 15).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) // 15 mins ago
    },
    {
      id: "TR-95481",
      fullName: "Bernard Mercier",
      phone: "07 11 22 33 44",
      departure: "Gare de Lyon, Paris",
      destination: "Aéroport Charles de Gaulle, Roissy",
      status: "Acceptée",
      progress: 100,
      date: new Date(Date.now() - 1000 * 60 * 120).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) // 2 hours ago
    },
    {
      id: "TR-43289",
      fullName: "Chloé Petit",
      phone: "06 44 55 66 77",
      departure: "12 Rue de Rivoli, Paris",
      destination: "Palais de Versailles, Versailles",
      status: "Refusée",
      progress: 100,
      date: new Date(Date.now() - 1000 * 60 * 360).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) // 6 hours ago
    }
  ];

  const mockChatSeed = [
    {
      timestamp: "21:30",
      user: "Bonjour, je voudrais réserver un trajet pour demain matin.",
      ai: "Je peux tout à fait vous aider pour cela ! Vous pouvez soumettre une demande de transport officielle directement sur notre <a href='transport.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>page dédiée au Transport</a>."
    },
    {
      timestamp: "21:32",
      user: "Où se trouve l'écran de suivi des demandes ?",
      ai: "Pour voir l'évolution de vos demandes de transport en temps réel (En attente, Acceptée ou Refusée), veuillez visiter la page de <a href='suivi.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>Suivi de Demande</a>."
    }
  ];

  // Initialize data stores
  if (!localStorage.getItem('transportRequests')) {
    localStorage.setItem('transportRequests', JSON.stringify(mockRequestsSeed));
  }
  if (!localStorage.getItem('chatHistory')) {
    localStorage.setItem('chatHistory', JSON.stringify(mockChatSeed));
  }

  // ==========================================
  // 3. DASHBOARD RENDER & EVENT HANDLERS
  // ==========================================
  const statTotal = document.getElementById('statTotal');
  const statPending = document.getElementById('statPending');
  const statAccepted = document.getElementById('statAccepted');
  const statRefused = document.getElementById('statRefused');
  
  const adminTableBody = document.getElementById('adminTableBody');
  const chatHistoryList = document.getElementById('chatHistoryList');
  const clearLogsBtn = document.getElementById('clearLogsBtn');

  // Handle Approve Request
  window.approveRequest = function(requestId) {
    let requests = JSON.parse(localStorage.getItem('transportRequests') || '[]');
    const index = requests.findIndex(req => req.id === requestId);
    
    if (index !== -1) {
      requests[index].status = "Acceptée";
      requests[index].progress = 100;
      localStorage.setItem('transportRequests', JSON.stringify(requests));
      showToast(`Demande ${requestId} acceptée !`, "success");
      updateDashboardData();
    }
  };

  // Handle Reject Request
  window.rejectRequest = function(requestId) {
    let requests = JSON.parse(localStorage.getItem('transportRequests') || '[]');
    const index = requests.findIndex(req => req.id === requestId);
    
    if (index !== -1) {
      requests[index].status = "Refusée";
      requests[index].progress = 100;
      localStorage.setItem('transportRequests', JSON.stringify(requests));
      showToast(`Demande ${requestId} refusée.`, "danger");
      updateDashboardData();
    }
  };

  // Clear Logs
  clearLogsBtn.addEventListener('click', () => {
    if (confirm("Voulez-vous vraiment vider tout l'historique des conversations avec l'IA ?")) {
      localStorage.removeItem('chatHistory');
      showToast("Historique de conversations vidé.", "info");
      updateDashboardData();
    }
  });

  // Calculate stats & render dashboard widgets
  function updateDashboardData() {
    const requests = JSON.parse(localStorage.getItem('transportRequests') || '[]');
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '[]');

    // 1. Calculate and update stats counters
    const total = requests.length;
    const pending = requests.filter(req => req.status === "En attente").length;
    const accepted = requests.filter(req => req.status === "Acceptée").length;
    const refused = requests.filter(req => req.status === "Refusée").length;

    statTotal.textContent = total;
    statPending.textContent = pending;
    statAccepted.textContent = accepted;
    statRefused.textContent = refused;

    // 2. Render Requests Table
    if (requests.length === 0) {
      adminTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px 0;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
            Aucune demande de trajet enregistrée.
          </td>
        </tr>
      `;
    } else {
      adminTableBody.innerHTML = "";
      requests.forEach(req => {
        let statusBadgeClass = "pending";
        if (req.status === "Acceptée") statusBadgeClass = "accepted";
        if (req.status === "Refusée") statusBadgeClass = "refused";

        const row = document.createElement('tr');
        row.style.animation = "messageEntrance 0.25s ease forwards";
        row.innerHTML = `
          <td><strong>#${req.id}</strong></td>
          <td>
            <div style="font-weight: 600;">${req.fullName}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-phone" style="font-size: 0.75rem;"></i> ${req.phone}</div>
          </td>
          <td>
            <div style="font-size: 0.85rem;"><span style="color: var(--text-muted);">De:</span> ${req.departure}</div>
            <div style="font-size: 0.85rem;"><span style="color: var(--text-muted);">À:</span> ${req.destination}</div>
          </td>
          <td style="font-size: 0.85rem; color: var(--text-muted);">${req.date}</td>
          <td><span class="status-badge ${statusBadgeClass}">${req.status}</span></td>
          <td style="text-align: right;">
            ${req.status === "En attente" ? `
              <div class="btn-action-group" style="justify-content: flex-end;">
                <button onclick="approveRequest('${req.id}')" class="btn-action btn-action-approve" title="Accepter la demande">
                  <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="rejectRequest('${req.id}')" class="btn-action btn-action-reject" title="Refuser la demande">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            ` : `
              <span style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">Traitée</span>
            `}
          </td>
        `;
        adminTableBody.appendChild(row);
      });
    }

    // 3. Render Conversations History
    if (chats.length === 0) {
      chatHistoryList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
          <i class="fa-solid fa-message-slash" style="font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
          Aucun historique de conversation disponible.
        </div>
      `;
    } else {
      chatHistoryList.innerHTML = "";
      chats.forEach(chat => {
        const item = document.createElement('div');
        item.className = "history-item";
        item.style.animation = "messageEntrance 0.3s ease forwards";
        item.innerHTML = `
          <div class="history-item-header">
            <span><i class="fa-solid fa-clock"></i> ${chat.timestamp}</span>
            <span style="color: var(--accent-cyan); font-weight: 600;">Discussion IA</span>
          </div>
          <div style="margin-top: 4px; display: flex; flex-direction: column; gap: 4px;">
            <div style="font-size: 0.85rem; line-height: 1.4;">
              <strong style="color: var(--text-primary);">Utilisateur:</strong> "${chat.user}"
            </div>
            <div style="font-size: 0.85rem; line-height: 1.4; border-left: 2px solid var(--border-color); padding-left: 8px; margin-top: 2px;">
              <strong style="color: var(--accent-primary);">IA:</strong> ${chat.ai}
            </div>
          </div>
        `;
        chatHistoryList.appendChild(item);
      });
    }
  }

  // Initial load
  updateDashboardData();

});
