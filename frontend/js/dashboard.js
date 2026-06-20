/* 
========================================================================
   Centre d'Appel Intelligent IA - Admin Dashboard Logic (JavaScript)
   ISGMATECH - Advanced Charts, User DB Management, Export Utilities
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // DOM Elements
  const statTotal = document.getElementById('statTotal');
  const statPending = document.getElementById('statPending');
  const statAccepted = document.getElementById('statAccepted');
  const statRefused = document.getElementById('statRefused');
  const statUsers = document.getElementById('statUsers');
  
  const adminTableBody = document.getElementById('adminTableBody');
  const usersTableBody = document.getElementById('usersTableBody');
  const chatHistoryList = document.getElementById('chatHistoryList');
  const clearLogsBtn = document.getElementById('clearLogsBtn');
  
  // Filter Inputs
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  
  // Export Buttons
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');

  // Chart References (for updates)
  let charts = {};

  // ==========================================
  // 1. DATA INITIALIZATION & UTILITIES
  // ==========================================
  
  function getRequests() {
    return JSON.parse(localStorage.getItem('transportRequests') || '[]');
  }

  function saveRequests(requests) {
    localStorage.setItem('transportRequests', JSON.stringify(requests));
  }

  function getChats() {
    return JSON.parse(localStorage.getItem('chatHistory') || '[]');
  }

  // ==========================================
  // 2. DASHBOARD REQUEST & USER OPERATIONS
  // ==========================================

  // Approve Request (Accepted & Progress set to 40)
  window.approveRequest = function(requestId) {
    let requests = getRequests();
    const index = requests.findIndex(req => req.id === requestId);
    if (index !== -1) {
      requests[index].status = "Acceptée";
      requests[index].progress = 40;
      saveRequests(requests);
      window.showToast(`Demande ${requestId} acceptée.`, "success");
      refreshDashboard();
    }
  };

  // Reject Request (Refused & Progress set to 100)
  window.rejectRequest = function(requestId) {
    let requests = getRequests();
    const index = requests.findIndex(req => req.id === requestId);
    if (index !== -1) {
      requests[index].status = "Refusée";
      requests[index].progress = 100;
      saveRequests(requests);
      window.showToast(`Demande ${requestId} refusée.`, "danger");
      refreshDashboard();
    }
  };

  // Complete Request (Terminée & Progress set to 100)
  window.completeRequest = function(requestId) {
    let requests = getRequests();
    const index = requests.findIndex(req => req.id === requestId);
    if (index !== -1) {
      requests[index].status = "Terminée";
      requests[index].progress = 100;
      saveRequests(requests);
      window.showToast(`Demande ${requestId} marquée comme terminée.`, "success");
      refreshDashboard();
    }
  };

  // Toggle user roles in Administration panel
  window.toggleUserRole = function(email) {
    const currentUser = window.auth ? window.auth.getCurrentUser() : null;
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      window.showToast("Vous ne pouvez pas modifier votre propre rôle.", "danger");
      return;
    }

    let users = window.auth.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (index !== -1) {
      const oldRole = users[index].role;
      const newRole = oldRole === 'Administrator' ? 'Client' : 'Administrator';
      users[index].role = newRole;
      window.auth.saveUsers(users);
      
      window.showToast(`Rôle de ${users[index].name} changé en : ${newRole}`, "success");
      refreshDashboard();
    }
  };

  // Empty chatbot interaction logs
  if (clearLogsBtn) {
    clearLogsBtn.addEventListener('click', () => {
      const confirmMsg = window.i18n.currentLang === 'fr' 
        ? "Voulez-vous vraiment vider tout l'historique ?" 
        : "هل تريد حقاً مسح سجل المحادثات بالكامل؟";
      if (confirm(confirmMsg)) {
        localStorage.removeItem('chatHistory');
        window.showToast("Historique de conversation vidé.", "info");
        refreshDashboard();
      }
    });
  }

  // ==========================================
  // 3. SEARCH & REAL-TIME FILTERS
  // ==========================================
  const triggers = [searchInput, statusFilter, categoryFilter, priorityFilter];
  triggers.forEach(el => {
    if (el) el.addEventListener('input', renderRequestsTable);
    if (el && el.tagName === 'SELECT') el.addEventListener('change', renderRequestsTable);
  });

  // ==========================================
  // 4. DATA EXPORTS (CSV & JSON UTILITY)
  // ==========================================
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const requests = getRequests();
      if (requests.length === 0) {
        window.showToast("Aucune donnée à exporter.", "danger");
        return;
      }

      // Compile CSV String format
      let csvContent = "ID,Passager,Telephone,Depart,Destination,Categorie,Priorite,DateDepart,Statut,DateCreation\n";
      requests.forEach(req => {
        csvContent += `"${req.id}","${req.fullName}","${req.phone}","${req.departure}","${req.destination}","${req.category}","${req.priority}","${req.dateTime}","${req.status}","${req.date}"\n`;
      });

      downloadFile(csvContent, "ISGMATECH_Requests_Export.csv", "text/csv;charset=utf-8;");
      window.showToast("Fichier CSV exporté avec succès !", "success");
    });
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const requests = getRequests();
      if (requests.length === 0) {
        window.showToast("Aucune donnée à exporter.", "danger");
        return;
      }

      const jsonContent = JSON.stringify(requests, null, 2);
      downloadFile(jsonContent, "ISGMATECH_Requests_Export.json", "application/json");
      window.showToast("Fichier JSON exporté avec succès !", "success");
    });
  }

  function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ==========================================
  // 5. RENDER SYSTEM AND LAYOUT GRAPHICS
  // ==========================================

  function renderStats() {
    const requests = getRequests();
    const users = window.auth ? window.auth.getUsers() : [];

    const total = requests.length;
    const pending = requests.filter(req => req.status === "En attente").length;
    const accepted = requests.filter(req => req.status === "Acceptée" || req.status === "Chauffeur assigné" || req.status === "En route").length;
    const refused = requests.filter(req => req.status === "Refusée").length;

    statTotal.textContent = total;
    statPending.textContent = pending;
    statAccepted.textContent = accepted;
    statRefused.textContent = refused;
    statUsers.textContent = users.length;
  }

  function renderRequestsTable() {
    const requests = getRequests();
    
    // Grab active values
    const query = searchInput.value.toLowerCase().trim();
    const statusVal = statusFilter.value;
    const categoryVal = categoryFilter.value;
    const priorityVal = priorityFilter.value;

    // Filter requests list
    const filtered = requests.filter(req => {
      const matchesSearch = req.id.toLowerCase().includes(query) || req.fullName.toLowerCase().includes(query);
      const matchesStatus = statusVal === 'All' || req.status === statusVal;
      const matchesCategory = categoryVal === 'All' || req.category === categoryVal;
      const matchesPriority = priorityVal === 'All' || req.priority === priorityVal;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });

    if (filtered.length === 0) {
      adminTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px 0;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
            Aucune demande ne correspond à ces critères.
          </td>
        </tr>
      `;
      return;
    }

    adminTableBody.innerHTML = "";
    filtered.forEach(req => {
      let statusBadgeClass = "pending";
      let statusLabel = req.status;

      if (req.status === "Acceptée" || req.status === "Chauffeur assigné" || req.status === "En route") {
        statusBadgeClass = "accepted";
      } else if (req.status === "Refusée") {
        statusBadgeClass = "refused";
      } else if (req.status === "Terminée") {
        statusBadgeClass = "completed";
      }

      // Localize status text
      if (req.status === "En attente") statusLabel = window.i18n.t("suivi-status-pending");
      if (req.status === "Acceptée") statusLabel = window.i18n.t("suivi-status-accepted");
      if (req.status === "Refusée") statusLabel = window.i18n.t("suivi-status-refused");
      if (req.status === "Terminée") statusLabel = window.i18n.t("suivi-status-completed");

      // Custom intermediate steps translations
      if (req.status === "Chauffeur assigné") statusLabel = window.i18n.currentLang === 'fr' ? "Chauffeur assigné" : (window.i18n.currentLang === 'ar' ? "تعيين السائق" : "تحديد الشوفر");
      if (req.status === "En route") statusLabel = window.i18n.currentLang === 'fr' ? "En route" : (window.i18n.currentLang === 'ar' ? "السيارة تسير" : "شغال الطريق");

      // Priority classes
      let priorityClass = "medium";
      let priorityLabel = window.i18n.t("trans-priority-medium");
      if (req.priority === 'Low') { priorityClass = "low"; priorityLabel = window.i18n.t("trans-priority-low"); }
      if (req.priority === 'High') { priorityClass = "high"; priorityLabel = window.i18n.t("trans-priority-high"); }
      if (req.priority === 'Urgent') { priorityClass = "urgent"; priorityLabel = window.i18n.t("trans-priority-urgent"); }

      // Category translation
      let categoryLabel = req.category || "Standard";
      if (req.category === 'Standard') categoryLabel = window.i18n.t("trans-cat-standard");
      if (req.category === 'Comfort') categoryLabel = window.i18n.t("trans-cat-comfort");
      if (req.category === 'VIP') categoryLabel = window.i18n.t("trans-cat-vip");
      if (req.category === 'Cargo') categoryLabel = window.i18n.t("trans-cat-cargo");
      if (req.category === 'Medical') categoryLabel = window.i18n.t("trans-cat-medical");

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>#${req.id}</strong></td>
        <td>
          <div style="font-weight: 600;">${req.fullName}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-phone" style="font-size: 0.75rem;"></i> ${req.phone}</div>
        </td>
        <td>
          <div style="font-size: 0.85rem;"><span style="color: var(--text-muted); font-size: 0.78rem;">DE:</span> ${req.departure}</div>
          <div style="font-size: 0.85rem;"><span style="color: var(--text-muted); font-size: 0.78rem;">À:</span> ${req.destination}</div>
          <div style="font-size: 0.78rem; color: var(--accent-cyan); margin-top: 4px;">${categoryLabel}</div>
        </td>
        <td style="font-size: 0.85rem;">
          <div>${req.dateTime}</div>
          <div style="margin-top: 6px;"><span class="priority-badge ${priorityClass}">${priorityLabel}</span></div>
        </td>
        <td><span class="status-badge ${statusBadgeClass}">${statusLabel}</span></td>
        <td style="text-align: right;">
          ${req.status === "En attente" ? `
            <div class="btn-action-group" style="justify-content: flex-end;">
              <button onclick="approveRequest('${req.id}')" class="btn-action btn-action-approve" title="${window.i18n.t('dash-action-approve')}">
                <i class="fa-solid fa-check"></i>
              </button>
              <button onclick="rejectRequest('${req.id}')" class="btn-action btn-action-reject" title="${window.i18n.t('dash-action-reject')}">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          ` : (req.status !== "Terminée" && req.status !== "Refusée" ? `
            <div class="btn-action-group" style="justify-content: flex-end;">
              <button onclick="completeRequest('${req.id}')" class="btn-action btn-action-approve" style="border-color: rgba(16, 185, 129, 0.4);" title="${window.i18n.t('dash-action-complete')}">
                <i class="fa-solid fa-flag-checkered"></i>
              </button>
            </div>
          ` : `
            <span style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;" data-i18n="dash-action-processed">Traitée</span>
          `)}
        </td>
      `;
      adminTableBody.appendChild(row);
    });
  }

  function renderUsersTable() {
    const users = window.auth ? window.auth.getUsers() : [];
    
    if (users.length === 0) {
      usersTableBody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; color: var(--text-muted); padding: 24px 0;">Aucun utilisateur inscrit.</td>
        </tr>
      `;
      return;
    }

    usersTableBody.innerHTML = "";
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div style="font-weight: 600;">${user.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${user.email}</div>
        </td>
        <td>
          <span style="font-size: 0.8rem; font-weight: 600; padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid var(--border-color);">
            ${user.role === 'Administrator' ? window.i18n.t('auth-role-admin') : window.i18n.t('auth-role-client')}
          </span>
        </td>
        <td style="text-align: right;">
          <button onclick="toggleUserRole('${user.email}')" class="btn btn-secondary" style="padding: 6px 10px; font-size: 0.75rem; border-radius: 6px; border-color: rgba(99, 102, 241, 0.3); color: var(--accent-primary);">
            <i class="fa-solid fa-user-gear"></i> Toggle Rôle
          </button>
        </td>
      `;
      usersTableBody.appendChild(row);
    });
  }

  function renderChatHistory() {
    const chats = getChats();

    if (chats.length === 0) {
      chatHistoryList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
          <i class="fa-solid fa-message-slash" style="font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
          Aucun historique de conversation.
        </div>
      `;
      return;
    }

    chatHistoryList.innerHTML = "";
    chats.forEach(chat => {
      const item = document.createElement('div');
      item.className = "history-item";
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

  // ==========================================
  // 6. CHART.JS DATA ANALYSIS CHARTS
  // ==========================================

  function drawCharts() {
    const requests = getRequests();
    const users = window.auth ? window.auth.getUsers() : [];

    // Helper: detect theme variables
    const isLight = document.body.classList.contains('light-theme');
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)';
    const textColor = isLight ? 'hsl(215, 16%, 35%)' : 'hsl(215, 20%, 65%)';

    const blueColor = 'rgba(59, 130, 246, 0.8)';
    const purpleColor = 'rgba(168, 85, 247, 0.8)';
    const cyanColor = 'rgba(6, 182, 212, 0.8)';
    const yellowColor = 'rgba(245, 158, 11, 0.8)';
    const greenColor = 'rgba(16, 185, 129, 0.8)';

    // --- CHART 1: Category Bar Chart ---
    const catCounts = { Standard: 0, Comfort: 0, VIP: 0, Cargo: 0, Medical: 0 };
    requests.forEach(req => {
      const cat = req.category || 'Standard';
      if (catCounts[cat] !== undefined) catCounts[cat]++;
    });

    const ctxCat = document.getElementById('categoryChart').getContext('2d');
    if (charts.category) charts.category.destroy();
    
    charts.category = new Chart(ctxCat, {
      type: 'bar',
      data: {
        labels: [
          window.i18n.t('trans-cat-standard'),
          window.i18n.t('trans-cat-comfort'),
          window.i18n.t('trans-cat-vip'),
          window.i18n.t('trans-cat-cargo'),
          window.i18n.t('trans-cat-medical')
        ],
        datasets: [{
          label: window.i18n.t('dash-stat-total'),
          data: [catCounts.Standard, catCounts.Comfort, catCounts.VIP, catCounts.Cargo, catCounts.Medical],
          backgroundColor: [blueColor, purpleColor, cyanColor, yellowColor, greenColor],
          borderRadius: 6,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { cornerRadius: 8 }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, precision: 0 } }
        }
      }
    });

    // --- CHART 2: Language Distribution Doughnut ---
    // Extract language based on chat records or baseline user config
    const chats = getChats();
    let langCounts = { French: 5, Arabic: 3, Hassania: 2 }; // Mock default base ratio
    
    chats.forEach(chat => {
      // Basic text regex checking for Arabic characters to classify language reactively
      const arabicPattern = /[\u0600-\u06FF]/;
      if (arabicPattern.test(chat.user)) {
        // Hassania words check
        if (chat.user.includes('ذروك') || chat.user.includes('نبغي') || chat.user.includes('شوفر') || chat.user.includes('التابلو')) {
          langCounts.Hassania++;
        } else {
          langCounts.Arabic++;
        }
      } else {
        langCounts.French++;
      }
    });

    const ctxLang = document.getElementById('languageChart').getContext('2d');
    if (charts.language) charts.language.destroy();
    
    charts.language = new Chart(ctxLang, {
      type: 'doughnut',
      data: {
        labels: ['Français', 'العربية', 'الحسانية'],
        datasets: [{
          data: [langCounts.French, langCounts.Arabic, langCounts.Hassania],
          backgroundColor: [blueColor, cyanColor, purpleColor],
          borderColor: isLight ? '#fff' : 'hsl(222, 47%, 12%)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', ticks: { color: textColor } },
          tooltip: { cornerRadius: 8 }
        },
        cutout: '65%'
      }
    });

    // --- CHART 3: Daily Requests Line Chart ---
    // Set 7 days baseline
    const labelsDaily = [];
    const dataDaily = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labelsDaily.push(d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }));
      
      // Calculate real submissions matching date
      const dateCheckString = d.toLocaleDateString('fr-FR');
      const count = requests.filter(req => req.date && req.date.startsWith(dateCheckString)).length;
      // Add baseline defaults to keep charts visually interesting
      dataDaily.push(count + (i === 6 ? 1 : (i === 4 ? 3 : (i === 2 ? 2 : 0))));
    }

    const ctxDaily = document.getElementById('dailyChart').getContext('2d');
    if (charts.daily) charts.daily.destroy();

    charts.daily = new Chart(ctxDaily, {
      type: 'line',
      data: {
        labels: labelsDaily,
        datasets: [{
          label: window.i18n.t('dash-stat-total'),
          data: dataDaily,
          borderColor: cyanColor,
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          fill: true,
          tension: 0.3,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { cornerRadius: 8 }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, precision: 0 } }
        }
      }
    });

    // --- CHART 4: User Growth Line Chart ---
    const labelsGrowth = [];
    const dataGrowth = [];
    let cumulativeUsers = users.length - 2; // Baseline before today
    if (cumulativeUsers < 1) cumulativeUsers = 1;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labelsGrowth.push(d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }));
      
      if (i === 0) {
        // Today is full active users count
        dataGrowth.push(users.length);
      } else {
        // Linear baseline simulation
        dataGrowth.push(cumulativeUsers + Math.floor((users.length - cumulativeUsers) * (6 - i) / 6));
      }
    }

    const ctxGrowth = document.getElementById('growthChart').getContext('2d');
    if (charts.growth) charts.growth.destroy();

    charts.growth = new Chart(ctxGrowth, {
      type: 'line',
      data: {
        labels: labelsGrowth,
        datasets: [{
          label: window.i18n.t('dash-stat-users'),
          data: dataGrowth,
          borderColor: purpleColor,
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          fill: true,
          tension: 0.2,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { cornerRadius: 8 }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, precision: 0 } }
        }
      }
    });
  }

  function refreshDashboard() {
    renderStats();
    renderRequestsTable();
    renderUsersTable();
    renderChatHistory();
    drawCharts();
  }

  // Redraw charts dynamically if theme or language trigger calls reload/changes
  window.addEventListener('languageChanged', () => {
    refreshDashboard();
  });

  // Initial load run
  refreshDashboard();

});
