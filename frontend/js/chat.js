/* 
========================================================================
   Centre d'Appel Intelligent IA - Chat Interface Logic (JavaScript)
   ISGMATECH - Advanced Interactive Features (TTS, Speech Simulation)
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chatBox');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const micBtn = document.getElementById('micBtn');
  
  const attachBtn = document.getElementById('attachBtn');
  const fileInput = document.getElementById('fileInput');
  const attachmentPreview = document.getElementById('attachmentPreview');
  const suggestionChips = document.getElementById('suggestionChips');

  let isRecording = false;
  let selectedFile = null;

  // ==========================================
  // 1. DYNAMIC COMPONENT MOUNTING & INITIAL GREETINGS
  // ==========================================
  
  // Set default placeholder translation on chatInput
  chatInput.placeholder = window.i18n.t("chat-input-placeholder");

  // ==========================================
  // 2. SUGGESTION CHIPS EVENT BINDING
  // ==========================================
  if (suggestionChips) {
    suggestionChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-btn');
      if (!chip) return;
      
      const promptKey = chip.getAttribute('data-prompt-key');
      const translatedPrompt = window.i18n.t(promptKey);
      
      chatInput.value = translatedPrompt;
      chatInput.focus();
      
      // Auto send the suggestion
      handleSend();
    });
  }

  // ==========================================
  // 3. FILE ATTACHMENT AND PREVIEW HANDLERS
  // ==========================================
  if (attachBtn && fileInput) {
    attachBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Limit file size to 5MB
      if (file.size > 5 * 1024 * 1024) {
        const sizeErr = window.i18n.currentLang === 'fr' 
          ? "Le fichier est trop volumineux. Taille maximum : 5 Mo." 
          : "الملف كبير جداً. الحد الأقصى للملف هو 5 ميغابايت.";
        window.showToast(sizeErr, "danger");
        fileInput.value = "";
        return;
      }

      selectedFile = file;
      renderFilePreview();
    });
  }

  function renderFilePreview() {
    if (!selectedFile) {
      attachmentPreview.style.display = 'none';
      attachmentPreview.innerHTML = "";
      return;
    }

    const fileSizeKB = (selectedFile.size / 1024).toFixed(1);
    let thumbnailHTML = `<i class="fa-solid fa-file-lines"></i>`;

    // If file is an image, display preview
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const previewImg = document.getElementById('previewImgElement');
        if (previewImg) previewImg.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
      thumbnailHTML = `<img id="previewImgElement" src="" alt="Thumbnail" class="preview-thumbnail" style="object-fit: cover;">`;
    }

    attachmentPreview.style.display = 'flex';
    attachmentPreview.innerHTML = `
      <div class="file-upload-preview">
        <div class="preview-thumbnail">${thumbnailHTML}</div>
        <div class="preview-info">
          <span class="preview-name">${selectedFile.name}</span>
          <span class="preview-size">${fileSizeKB} KB</span>
        </div>
        <button type="button" class="preview-remove" id="removeFileBtn" title="Supprimer">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;

    // Bind remove button
    document.getElementById('removeFileBtn').addEventListener('click', () => {
      selectedFile = null;
      fileInput.value = "";
      renderFilePreview();
    });
  }

  // ==========================================
  // 4. SPEECH SYNTHESIS (VOICE OUTPUT) SYSTEM
  // ==========================================
  window.speakMessage = function(btn) {
    e = window.event;
    if (e) e.stopPropagation();

    // Get the parent bubble text, removing the button markup
    const bubble = btn.parentElement;
    // Clone node to manipulate text without altering visual DOM
    const clone = bubble.cloneNode(true);
    const btnToRemove = clone.querySelector('button');
    if (btnToRemove) btnToRemove.remove();
    
    const textToSpeak = clone.textContent.trim();

    if (!('speechSynthesis' in window)) {
      window.showToast("La synthèse vocale n'est pas supportée par votre navigateur.", "danger");
      return;
    }

    // Toggle active speaking representation
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure voice language matching active UI language selection
    const activeLang = window.i18n.currentLang;
    if (activeLang === 'fr') {
      utterance.lang = 'fr-FR';
    } else {
      // Arabic voice mapping for ar and Hassania (hr)
      utterance.lang = 'ar-SA';
    }

    // Try selecting native OS voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(voice => voice.lang.startsWith(utterance.lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    btn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    
    utterance.onend = () => {
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    };
    utterance.onerror = () => {
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    };

    window.speechSynthesis.speak(utterance);
  };

  // Necessary on Chrome where voices load asynchronously
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }

  // ==========================================
  // 5. SIMULATED SPEECH TO TEXT (VOICE INPUT)
  // ==========================================
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if (isRecording) return;

      isRecording = true;
      micBtn.classList.add('recording');
      
      // Inject waveform animation container inside chat controls
      const waveVisualizer = document.createElement('div');
      waveVisualizer.className = "voice-visualizer";
      waveVisualizer.id = "voiceWaveVisualizer";
      waveVisualizer.innerHTML = `
        <div class="voice-wave"></div>
        <div class="voice-wave"></div>
        <div class="voice-wave"></div>
        <div class="voice-wave"></div>
        <div class="voice-wave"></div>
      `;
      micBtn.parentElement.insertBefore(waveVisualizer, micBtn);

      const recordPrompt = window.i18n.t("chat-mic-recording");
      window.showToast(recordPrompt, "info");
      chatInput.disabled = true;

      // Simulate Speech conversion timeout
      setTimeout(() => {
        // Remove waveform elements
        const wave = document.getElementById('voiceWaveVisualizer');
        if (wave) wave.remove();
        
        micBtn.classList.remove('recording');
        isRecording = false;
        chatInput.disabled = false;

        const successPrompt = window.i18n.t("chat-mic-success");
        window.showToast(successPrompt, "success");

        // Seed randomized text options based on language
        const lang = window.i18n.currentLang;
        const voicePrompts = {
          fr: [
            "Je voudrais réserver un trajet VIP pour demain matin.",
            "Bonjour, où en est ma demande de transport ?",
            "Pouvez-vous m'ouvrir la page de suivi des dossiers ?",
            "Je souhaite contacter le support client."
          ],
          ar: [
            "أريد حجز رحلة VIP لصباح الغد.",
            "مرحباً، أين هو طلبي الحالي للنقل؟",
            "هل يمكنك فتح صفحة تتبع الطلبات؟",
            "أريد التحدث مع موظف خدمة العملاء."
          ],
          hr: [
            "نبغي نقبض تاكسي VIP لصباح اعل اتساع.",
            "وين لحق طلبي ذروك؟",
            "عتلي التباعة من فضلك.",
            "نبغي نتكلم مع بنادم من الدعم."
          ]
        };

        const list = voicePrompts[lang] || voicePrompts['fr'];
        const randomIndex = Math.floor(Math.random() * list.length);
        chatInput.value = list[randomIndex];
        chatInput.focus();

      }, 2500); // 2.5s recording latency simulation
    });
  }

  // ==========================================
  // 6. MAIN CHAT DISPATCH AND SIMULATOR
  // ==========================================
  
  // Custom bubble appending
  function appendBubble(text, sender, attachment = null) {
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const msgElement = document.createElement('div');
    msgElement.className = `chat-message ${sender}`;

    let attachmentHTML = "";
    if (attachment) {
      attachmentHTML = `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; background: rgba(255,255,255,0.08); padding: 6px 12px; border-radius: 8px; margin-bottom: 6px;">
          <i class="fa-solid fa-paperclip"></i>
          <span>${attachment.name}</span>
        </div>
      `;
    }

    let ttsButtonHTML = "";
    if (sender === 'ai') {
      ttsButtonHTML = `
        <button class="ai-message-tts" onclick="speakMessage(this)" title="${window.i18n.t('chat-tts-voice')}">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      `;
    }

    msgElement.innerHTML = `
      <div class="chat-bubble">
        ${attachmentHTML}
        <span>${text}</span>
        ${ttsButtonHTML}
      </div>
      <div class="chat-meta">${sender === 'user' ? 'Vous' : 'IA'} • ${time}</div>
    `;

    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Typing state loaders
  function showTypingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'typing-indicator';
    loader.id = 'typingIndicator';
    loader.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatBox.appendChild(loader);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function hideTypingIndicator() {
    const loader = document.getElementById('typingIndicator');
    if (loader) loader.remove();
  }

  // Simulated AI response compilation (includes language adaptation)
  function simulateAIResponse(userMsg) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const text = userMsg.toLowerCase().trim();
        const activeLang = window.i18n.currentLang;
        let reply = "";

        // Seed translations based on matching active language
        if (activeLang === 'fr') {
          if (text.includes('bonjour') || text.includes('salut') || text.includes('hello')) {
            reply = "Bonjour ! Je suis ravi de vous aider. Vous pouvez me poser des questions sur vos trajets ou de support.";
          } else if (text.includes('transport') || text.includes('taxi') || text.includes('vip') || text.includes('réserver')) {
            reply = "Je peux planifier votre trajet immédiatement. Veuillez soumettre vos informations sur notre <a href='transport.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>Page de Transport</a>.";
          } else if (text.includes('suivi') || text.includes('statut') || text.includes('demande') || text.includes('où en est')) {
            reply = "Vous pouvez suivre toutes vos demandes de transport en temps réel sur la <a href='suivi.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>Page de Suivi</a>.";
          } else if (text.includes('dashboard') || text.includes('analytics') || text.includes('admin')) {
            reply = "Le tableau de bord administrateur contient tous vos graphiques. Accédez-y sur la <a href='dashboard.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>Page Dashboard</a>.";
          } else {
            reply = `J'ai bien reçu votre message : "${userMsg}". Notre IA est en train d'analyser vos besoins. Pour réserver un trajet, veuillez utiliser l'onglet Transport.`;
          }
        } 
        else if (activeLang === 'ar') {
          if (text.includes('مرحبا') || text.includes('سلام') || text.includes('أهلا')) {
            reply = "أهلاً بك! أنا هنا لمساعدتك. يمكنك طرح أي سؤال بخصوص حجز سيارات الأجرة أو لوحة التحكم.";
          } else if (text.includes('نقل') || text.includes('حجز') || text.includes('سيارة') || text.includes('رحلة')) {
            reply = "يمكنني تنظيم رحلتك فوراً. يرجى تقديم التفاصيل في <a href='transport.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>صفحة طلب النقل</a>.";
          } else if (text.includes('تتبع') || text.includes('حالة') || text.includes('طلب') || text.includes('أين طلبي')) {
            reply = "تتبع مسار طلبك وموافقات الإدارة مباشرة في <a href='suivi.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>صفحة التتبع</a>.";
          } else if (text.includes('لوحة') || text.includes('إحصائيات') || text.includes('مسؤول')) {
            reply = "لوحة التحكم تحتوي على الرسوم البيانية. يمكنك استعراضها في <a href='dashboard.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>صفحة لوحة التحكم</a>.";
          } else {
            reply = `لقد استلمت رسالتك: "${userMsg}". الذكاء الاصطناعي يقوم بتحليل طلبك الآن لتسجيل رحلة، استخدم استمارة النقل.`;
          }
        } 
        else { // Hassania (hr)
          if (text.includes('مرحبا') || text.includes('سلام') || text.includes('أهلا') || text.includes('شحالك')) {
            reply = "مرحباً بك معاي! نقد نعاونك في أي شي تسولني عنه هون، بخصوص النقل ولا التابلو.";
          } else if (text.includes('نقل') || text.includes('تاكسي') || text.includes('حجز') || text.includes('سيارة') || text.includes('رحلة')) {
            reply = "نقد نعدلك حجز رحلة ذروك. عمر الخانات كاملين في <a href='transport.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>صفحة طلب النقل</a>.";
          } else if (text.includes('تتبع') || text.includes('تبع') || text.includes('طلب') || text.includes('وين طلبي')) {
            reply = "شوف رحلتك وين لحقت مباشرة من <a href='suivi.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>صفحة تبع الطلب</a>.";
          } else if (text.includes('لوحة') || text.includes('تابلو') || text.includes('مدير') || text.includes('إحصائيات')) {
            reply = "تابلو الإدارة فيه كامل كرافات الخدمة. ادخله من <a href='dashboard.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>صفحة التابلو</a>.";
          } else {
            reply = `لحقتني رسالتك: "${userMsg}". الذكاء الاصطناعي لا يدرس طلبك ذروك. لحجز تاكسي، يرجى ملء فورم النقل.`;
          }
        }

        // Save interaction logs to localStorage for dashboard history
        saveChatToLocalStorage(userMsg, reply);

        resolve(reply);
      }, 1500); // 1.5 seconds mock latency
    });
  }

  function saveChatToLocalStorage(userMsg, aiMsg) {
    let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    history.push({
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      user: userMsg,
      ai: aiMsg
    });
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }

  // Handle messages dispatch trigger
  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text && !selectedFile) return;

    const attachment = selectedFile; // Reference file object
    
    // Clear attachment state visually
    selectedFile = null;
    fileInput.value = "";
    renderFilePreview();
    chatInput.value = "";

    // Render user speech bubble in box
    appendBubble(text || "Fichier joint", 'user', attachment);

    // Render loading status
    showTypingIndicator();

    try {
      const promptText = text || (attachment ? `Fichier analysé : ${attachment.name}` : "");
      const responseText = await simulateAIResponse(promptText);
      hideTypingIndicator();
      appendBubble(responseText, 'ai');
    } catch (err) {
      hideTypingIndicator();
      appendBubble("Une erreur de communication est survenue.", 'ai');
      window.showToast("Erreur API", "danger");
    }
  }

  // Send action triggers
  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });

});
