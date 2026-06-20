/* 
========================================================================
   Centre d'Appel Intelligent IA - Request Tracking Logic (JavaScript)
   ISGMATECH - Live Milestones & Background Status Ticker
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const suiviListContainer = document.getElementById('suiviList');

  // ==========================================
  // 1. DATA RENDERING & TIMELINE COMPILATION
  // ==========================================
  
  function getRequests() {
    return JSON.parse(localStorage.getItem('transportRequests') || '[]');
  }

  function saveRequests(requests) {
    localStorage.setItem('transportRequests', JSON.stringify(requests));
  }

  // Cancel Request Action
  window.cancelRequest = function(requestId) {
    const isFr = window.i18n.currentLang === 'fr';
    const confirmMsg = isFr 
      ? `Voulez-vous vraiment annuler la demande ${requestId} ?` 
      : `هل تريد حقاً إلغاء الطلب ${requestId}؟`;
      
    if (!confirm(confirmMsg)) return;

    let requests = getRequests();
    requests = requests.filter(req => req.id !== requestId);
    saveRequests(requests);
    
    const cancelToast = isFr 
      ? `Demande ${requestId} annulée avec succès.` 
      : `تم إلغاء الطلب ${requestId} بنجاح.`;
      
    window.showToast(cancelToast, "info");
    renderTrackingList();
  };

  // Manual Trigger to simulate next step in progress
  window.simulateProgressStep = function(requestId) {
    let requests = getRequests();
    const index = requests.findIndex(req => req.id === requestId);
    
    if (index !== -1) {
      const req = requests[index];
      advanceRequestProgress(req);
      requests[index] = req;
      saveRequests(requests);
      
      const statusLabel = getLocalizedStatusText(req.status);
      const isFr = window.i18n.currentLang === 'fr';
      const toastText = isFr
        ? `Étape simulée. Nouveau statut pour #${req.id} : ${statusLabel}`
        : `تمت محاكاة المرحلة. حالة جديدة لـ #${req.id}: ${statusLabel}`;
        
      window.showToast(toastText, "success");
      renderTrackingList();
    }
  };

  // Logic mapping to advance request through its 5-stage pipeline
  function advanceRequestProgress(req) {
    if (req.status === "Refusée" || req.status === "Terminée") return;

    if (req.progress === 20) {
      req.status = "Acceptée"; // Administrative validation completed
      req.progress = 40;
    } else if (req.progress === 40) {
      req.status = "Chauffeur assigné";
      req.progress = 60;
    } else if (req.progress === 60) {
      req.status = "En route";
      req.progress = 80;
    } else if (req.progress === 80) {
      req.status = "Terminée";
      req.progress = 100;
    }
  }

  function getLocalizedStatusText(status) {
    if (status === "En attente") return window.i18n.t("suivi-status-pending");
    if (status === "Acceptée") return window.i18n.t("suivi-status-accepted");
    if (status === "Refusée") return window.i18n.t("suivi-status-refused");
    if (status === "Terminée") return window.i18n.t("suivi-status-completed");
    
    // Custom steps
    if (status === "Chauffeur assigné") {
      return window.i18n.currentLang === 'fr' ? "Chauffeur assigné" : (window.i18n.currentLang === 'ar' ? "تعيين السائق" : "تحديد الشوفر");
    }
    if (status === "En route") {
      return window.i18n.currentLang === 'fr' ? "En route" : (window.i18n.currentLang === 'ar' ? "السيارة تسير" : "شغال الطريق");
    }
    return status;
  }

  function renderTrackingList() {
    const requests = getRequests();
    const lang = window.i18n.currentLang;

    if (requests.length === 0) {
      suiviListContainer.innerHTML = `
        <div class="glass-card no-requests" style="animation: slideIn var(--transition-normal) forwards;">
          <i class="fa-solid fa-map-location-dot"></i>
          <h3 style="font-family: var(--font-title); font-size: 1.3rem; margin-bottom: 8px;" data-i18n="suivi-no-requests-title">Aucun trajet en cours</h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;" data-i18n="suivi-no-requests-desc">Vous n'avez pas de demande de transport planifiée pour le moment.</p>
          <a href="transport.html" class="btn btn-primary" data-i18n="suivi-btn-plan">Planifier un transport</a>
        </div>
      `;
      window.i18n.translatePage();
      return;
    }

    suiviListContainer.innerHTML = ""; // Clear loader

    requests.forEach(req => {
      let statusBadgeClass = "pending";
      let statusLabel = getLocalizedStatusText(req.status);

      if (req.status === "Acceptée" || req.status === "Chauffeur assigné" || req.status === "En route") {
        statusBadgeClass = "accepted";
      } else if (req.status === "Refusée") {
        statusBadgeClass = "refused";
      } else if (req.status === "Terminée") {
        statusBadgeClass = "completed";
      }

      // Timeline nodes evaluation
      const steps = [
        { progress: 20, titleKey: "timeline-step-1-title", descKey: "timeline-step-1-desc" },
        { progress: 40, titleKey: "timeline-step-2-title", descKey: "timeline-step-2-desc" },
        { progress: 60, titleKey: "timeline-step-3-title", descKey: "timeline-step-3-desc" },
        { progress: 80, titleKey: "timeline-step-4-title", descKey: "timeline-step-4-desc" },
        { progress: 100, titleKey: "timeline-step-5-title", descKey: "timeline-step-5-desc" }
      ];

      let timelineHTML = "";
      
      if (req.status === "Refusée") {
        // Draw alternate rejected timeline
        timelineHTML = `
          <div class="timeline-step completed">
            <div class="timeline-node"><i class="fa-solid fa-check"></i></div>
            <div class="timeline-content">
              <h4 data-i18n="timeline-step-1-title">${window.i18n.t('timeline-step-1-title')}</h4>
              <p data-i18n="timeline-step-1-desc">${window.i18n.t('timeline-step-1-desc')}</p>
            </div>
          </div>
          <div class="timeline-step cancelled">
            <div class="timeline-node"><i class="fa-solid fa-xmark"></i></div>
            <div class="timeline-content">
              <h4 data-i18n="suivi-status-refused">${window.i18n.t('suivi-status-refused')}</h4>
              <p data-i18n="timeline-step-2-desc">${window.i18n.t('timeline-step-2-desc')}</p>
            </div>
          </div>
        `;
      } else {
        // Draw normal sequential pipeline
        steps.forEach((step, idx) => {
          let stepClass = "";
          let nodeIconHTML = idx + 1;

          if (req.progress > step.progress) {
            stepClass = "completed";
            nodeIconHTML = `<i class="fa-solid fa-check"></i>`;
          } else if (req.progress === step.progress) {
            stepClass = "active";
            nodeIconHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`;
          }

          timelineHTML += `
            <div class="timeline-step ${stepClass}">
              <div class="timeline-node">${nodeIconHTML}</div>
              <div class="timeline-content">
                <h4 data-i18n="${step.titleKey}">${window.i18n.t(step.titleKey)}</h4>
                <p data-i18n="${step.descKey}">${window.i18n.t(step.descKey)}</p>
              </div>
            </div>
          `;
        });
      }

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

      const card = document.createElement('div');
      card.className = "glass-card suivi-card";
      card.style.animation = "slideIn var(--transition-fast) forwards";
      
      const canCancel = req.status === "En attente" || req.status === "Acceptée";
      const isOngoing = req.status !== "Refusée" && req.status !== "Terminée";

      card.innerHTML = `
        <!-- Card Header -->
        <div class="suivi-header">
          <div class="suivi-title-area">
            <h3>Demande #${req.id}</h3>
            <p><span data-i18n="suivi-submitted-on">Soumise le :</span> ${req.date}</p>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span class="status-badge ${statusBadgeClass}">${statusLabel}</span>
            <span class="priority-badge ${priorityClass}">${priorityLabel}</span>
            
            ${canCancel ? `
              <button onclick="cancelRequest('${req.id}')" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 8px; color: var(--danger); border-color: rgba(239, 68, 68, 0.2);">
                <i class="fa-solid fa-trash"></i> <span data-i18n="suivi-btn-cancel">Annuler</span>
              </button>
            ` : ''}

            ${isOngoing ? `
              <button onclick="simulateProgressStep('${req.id}')" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 8px; border-color: var(--accent-cyan); color: var(--accent-cyan);" title="Simuler étape suivante">
                <i class="fa-solid fa-forward-step"></i> <span data-i18n="nav-chat">Simuler</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Card Route details -->
        <div class="suivi-route">
          <div class="route-point">
            <span class="label" data-i18n="suivi-label-dep">Départ</span>
            <span class="val">${req.departure}</span>
          </div>
          <div class="route-arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
          <div class="route-point">
            <span class="label" data-i18n="suivi-label-arr">Arrivée</span>
            <span class="val">${req.destination}</span>
          </div>
        </div>

        <!-- Client & Trip metadata -->
        <div style="font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--border-color); padding-top: 12px; display: flex; gap: 24px; flex-wrap: wrap;">
          <span><strong data-i18n="suivi-label-passenger">Passager:</strong> ${req.fullName}</span>
          <span><strong data-i18n="suivi-label-phone">Téléphone:</strong> ${req.phone}</span>
          <span><strong>Type:</strong> ${categoryLabel}</span>
          <span><strong>Date Départ:</strong> ${req.dateTime}</span>
        </div>

        <!-- Timeline checklist -->
        <div style="border-top: 1px solid var(--border-color); padding-top: 20px; margin-top: 10px;">
          <h4 style="font-family: var(--font-title); font-size: 0.95rem; font-weight: 700; margin-bottom: 12px;" data-i18n="suivi-info-title">Statut de votre demande :</h4>
          <div class="timeline-tracker">
            ${timelineHTML}
          </div>
        </div>
      `;

      suiviListContainer.appendChild(card);
    });

    window.i18n.translatePage();
  }

  // ==========================================
  // 3. BACKGROUND LIVE SIMULATION INTERVAL
  // ==========================================
  
  // Every 15 seconds, randomly advance one of the ongoing requests
  setInterval(() => {
    let requests = getRequests();
    const ongoingRequests = requests.filter(req => req.status !== "Refusée" && req.status !== "Terminée");

    if (ongoingRequests.length > 0) {
      // Pick one randomly
      const randomIndex = Math.floor(Math.random() * ongoingRequests.length);
      const reqToAdvance = ongoingRequests[randomIndex];
      
      const reqIndexInMainList = requests.findIndex(req => req.id === reqToAdvance.id);
      
      if (reqIndexInMainList !== -1) {
        advanceRequestProgress(requests[reqIndexInMainList]);
        saveRequests(requests);

        // Notify user about status change
        const statusLabel = getLocalizedStatusText(requests[reqIndexInMainList].status);
        const isFr = window.i18n.currentLang === 'fr';
        const notificationMsg = isFr 
          ? `Le statut de votre demande #${requests[reqIndexInMainList].id} a changé : ${statusLabel}!` 
          : `تغيرت حالة طلبك #${requests[reqIndexInMainList].id} إلى: ${statusLabel}!`;
          
        window.showToast(notificationMsg, "info");
        
        renderTrackingList();
      }
    }
  }, 15000); // 15 seconds ticks

  // Initial load
  renderTrackingList();

});
