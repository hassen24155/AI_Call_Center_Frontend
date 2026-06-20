/* 
========================================================================
   Centre d'Appel Intelligent IA - Transport Form Logic (JavaScript)
   ISGMATECH - Form validations, User pre-filling, Local Database
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transportForm');
  const submitBtn = document.getElementById('submitFormBtn');
  
  const fullNameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phone');
  const departureInput = document.getElementById('departure');
  const destinationInput = document.getElementById('destination');
  const categorySelect = document.getElementById('category');
  const prioritySelect = document.getElementById('priority');
  const dateTimeInput = document.getElementById('dateTime');

  // ==========================================
  // 1. AUTO PRE-FILL LOGGED IN USER DATA
  // ==========================================
  if (window.auth) {
    const user = window.auth.getCurrentUser();
    if (user) {
      fullNameInput.value = user.name || "";
      phoneInput.value = user.phone || "";
    }
  }

  // ==========================================
  // 2. FORM ACTION SUBMIT & VALIDATIONS
  // ==========================================
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const departure = departureInput.value.trim();
    const destination = destinationInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const dateTime = dateTimeInput.value;

    const lang = window.i18n.currentLang;

    // Check basic validations
    if (!fullName || !phone || !departure || !destination || !dateTime) {
      const emptyErr = lang === 'fr' 
        ? "Veuillez remplir tous les champs du formulaire." 
        : "يرجى ملء جميع الحقول المطلوبة في الاستمارة.";
      window.showToast(emptyErr, "danger");
      return;
    }

    // Phone format validation
    if (phone.replace(/\D/g, '').length < 6) {
      const phoneErr = lang === 'fr'
        ? "Veuillez saisir un numéro de téléphone valide."
        : "يرجى كتابة رقم هاتف صحيح.";
      window.showToast(phoneErr, "danger");
      return;
    }

    // Date/Time validation (cannot be in the past)
    const selectedDate = new Date(dateTime);
    const currentDate = new Date();
    // Allow a tiny window of 2 minutes for latency
    currentDate.setMinutes(currentDate.getMinutes() - 2);

    if (selectedDate < currentDate) {
      const dateErr = lang === 'fr'
        ? "La date de départ ne peut pas être dans le passé."
        : "تاريخ المغادرة لا يمكن أن يكون في الماضي.";
      window.showToast(dateErr, "danger");
      return;
    }

    // Disable button to prevent double submits
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    const loadingText = window.i18n.t("trans-loading-submit");
    submitBtn.innerHTML = `<span>${loadingText}</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    // Compile record object
    const requestID = `TR-${Math.floor(Math.random() * 90000 + 10000)}`;
    
    // Formatting date creation time
    const createdDateString = new Date().toLocaleDateString('fr-FR') + ' ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const formattedTravelDate = new Date(dateTime).toLocaleString(lang === 'fr' ? 'fr-FR' : 'ar-SA', { dateStyle: 'short', timeStyle: 'short' });

    const newRequest = {
      id: requestID,
      fullName: fullName,
      phone: phone,
      departure: departure,
      destination: destination,
      category: category,      // Standard, Comfort, VIP, Cargo, Medical
      priority: priority,      // Low, Medium, High, Urgent
      dateTime: formattedTravelDate, // Formatted travel date
      rawDateTime: dateTime,  // Raw input datetime
      status: "En attente",    // Active state default
      progress: 20,            // First checkpoint: Demand submitted (20%)
      date: createdDateString // Submitted timestamp
    };

    try {
      // Simulate API submit latency
      await new Promise((resolve) => setTimeout(resolve, 1200));

      let requests = JSON.parse(localStorage.getItem('transportRequests') || '[]');
      requests.unshift(newRequest);
      localStorage.setItem('transportRequests', JSON.stringify(requests));

      // Display dynamic success toast
      const successMsg = lang === 'fr'
        ? `Demande ${requestID} créée avec succès !`
        : `تم إنشاء الطلب بنجاح ${requestID}!`;
        
      window.showToast(successMsg, "success");

      // Redirect client to tracking view
      setTimeout(() => {
        window.location.href = "suivi.html";
      }, 1500);

    } catch (err) {
      window.showToast("Erreur lors de la soumission de la demande.", "danger");
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = `<span data-i18n="trans-btn-submit">Envoyer la demande</span> <i class="fa-solid fa-paper-plane"></i>`;
    }
  });

});
