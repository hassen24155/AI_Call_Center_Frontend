/* 
========================================================================
   Centre d'Appel Intelligent IA - Transport Form Logic (JavaScript)
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
  // 2. TRANSPORT FORM LOGIC
  // ==========================================
  const form = document.getElementById('transportForm');
  const submitBtn = document.getElementById('submitFormBtn');

  // Simulated API fetch POST handler
  function simulateAPIFormSubmit(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Get existing requests from localStorage
          let requests = JSON.parse(localStorage.getItem('transportRequests') || '[]');
          
          // Append new request
          requests.unshift(formData); // Add to the top of list
          
          // Save back
          localStorage.setItem('transportRequests', JSON.stringify(requests));
          resolve({ success: true, data: formData });
        } catch (error) {
          reject(error);
        }
      }, 1000); // 1 second network latency simulation
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Fetch field inputs
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const departure = document.getElementById('departure').value.trim();
    const destination = document.getElementById('destination').value.trim();

    // Check basic validations
    if (!fullName || !phone || !departure || !destination) {
      showToast("Veuillez remplir tous les champs du formulaire.", "danger");
      return;
    }

    // Phone format check (must be at least some numbers)
    if (phone.length < 8) {
      showToast("Veuillez saisir un numéro de téléphone valide.", "danger");
      return;
    }

    // Disable button to prevent double-submit
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.innerHTML = `<span>Traitement en cours...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    const requestID = `TR-${Math.floor(Math.random() * 90000 + 10000)}`;
    const newRequest = {
      id: requestID,
      fullName: fullName,
      phone: phone,
      departure: departure,
      destination: destination,
      status: "En attente",
      progress: 33, // Pending progress (33%)
      date: new Date().toLocaleDateString('fr-FR') + ' ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    try {
      // Execute the simulated API request
      const response = await simulateAPIFormSubmit(newRequest);
      
      if (response.success) {
        showToast(`Demande ${requestID} créée avec succès !`, "success");
        form.reset();
        
        // Wait 1.5 seconds and redirect to tracking page
        setTimeout(() => {
          window.location.href = "suivi.html";
        }, 1500);
      }
    } catch (err) {
      showToast("Une erreur s'est produite lors de l'envoi de la demande.", "danger");
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = `<span>Envoyer la demande</span> <i class="fa-solid fa-paper-plane"></i>`;
    }
  });

});
