/* 
========================================================================
   Centre d'Appel Intelligent IA - Chat Interface Logic (JavaScript)
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

    // Close sidebar clicking outside on mobile
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
  // 2. CHAT SPECIFIC LOGIC
  // ==========================================
  const chatBox = document.getElementById('chatBox');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const micBtn = document.getElementById('micBtn');

  let isRecording = false;

  // Add Message to DOM helper
  function addMessage(text, sender) {
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    const msgElement = document.createElement('div');
    msgElement.className = `chat-message ${sender}`;
    
    msgElement.innerHTML = `
      <div class="chat-bubble">
        ${text}
      </div>
      <div class="chat-meta">${sender === 'user' ? 'Vous' : 'IA'} • ${time}</div>
    `;
    
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Show/Hide Typing Indicators
  function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-indicator';
    typingElement.id = 'typingIndicator';
    typingElement.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatBox.appendChild(typingElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Simulated API fetch function with latency (Pretend network call to backend)
  function simulateAPICall(userMsg) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const text = userMsg.toLowerCase().trim();
        let reply = "";

        if (text.includes('bonjour') || text.includes('salut') || text.includes('hello')) {
          reply = "Bonjour ! Je suis ravi de discuter avec vous. En quoi puis-je vous aider pour vos demandes de transport ou de support ?";
        } else if (text.includes('transport') || text.includes('taxi') || text.includes('déplacement') || text.includes('réserver')) {
          reply = "Je peux tout à fait vous aider pour cela ! Vous pouvez soumettre une demande de transport officielle directement sur notre <a href='transport.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>page dédiée au Transport</a>.";
        } else if (text.includes('suivi') || text.includes('statut') || text.includes('où en est') || text.includes('ma demande')) {
          reply = "Pour voir l'évolution de vos demandes de transport en temps réel (En attente, Acceptée ou Refusée), veuillez visiter la page de <a href='suivi.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>Suivi de Demande</a>.";
        } else if (text.includes('dashboard') || text.includes('admin') || text.includes('tableau de bord') || text.includes('statistiques')) {
          reply = "Les informations globales de gestion, les statistiques de demandes ainsi que l'historique se trouvent sur le <a href='dashboard.html' style='color: var(--accent-cyan); text-decoration: underline; font-weight: 600;'>Tableau de bord Administrateur</a>.";
        } else if (text.includes('aide') || text.includes('help') || text.includes('fonctionne')) {
          reply = "Je suis une IA conversationnelle connectée au centre de transport ISGMATECH. Dites-moi ce que vous souhaitez faire: réserver un trajet, suivre votre dossier, ou voir l'interface admin.";
        } else {
          reply = `J'ai bien reçu votre message : "${userMsg}". Notre IA est en train d'analyser vos besoins. Pour réserver un taxi ou un transport, veuillez utiliser notre onglet Transport.`;
        }

        // Save conversation log to localStorage for dashboard history
        saveConversationToHistory(userMsg, reply);

        resolve(reply);
      }, 1200); // 1.2s delay to simulate backend response latency
    });
  }

  // Save conversation log helper
  function saveConversationToHistory(userMsg, aiMsg) {
    let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    history.push({
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      user: userMsg,
      ai: aiMsg
    });
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }

  // Handle message sending action
  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Clear input & Add user bubble
    chatInput.value = "";
    addMessage(text, 'user');

    // Simulate thinking state
    showTypingIndicator();

    try {
      const response = await simulateAPICall(text);
      hideTypingIndicator();
      addMessage(response, 'ai');
    } catch (err) {
      hideTypingIndicator();
      addMessage("Désolé, une erreur de communication est survenue avec le serveur.", 'ai');
      showToast("Erreur de simulation d'API", "danger");
    }
  }

  // Send action triggers
  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });

  // Voice Microphone button simulator
  micBtn.addEventListener('click', () => {
    if (isRecording) return;

    isRecording = true;
    micBtn.classList.add('recording');
    showToast("Enregistrement audio en cours... Parlez maintenant.", "info");

    // Simulate speech detection delay
    setTimeout(() => {
      micBtn.classList.remove('recording');
      isRecording = false;
      showToast("Audio capturé et converti en texte !", "success");
      
      const simulatedVoicePrompts = [
        "Je voudrais commander un transport pour demain matin.",
        "Bonjour, pouvez-vous me dire comment faire le suivi de ma demande ?",
        "Bonjour l'IA, affichez-moi le tableau de bord de l'administrateur s'il vous plaît.",
        "Est-ce que ma demande de taxi a été validée par l'admin ?"
      ];
      
      // Select a random prompt
      const randomIndex = Math.floor(Math.random() * simulatedVoicePrompts.length);
      chatInput.value = simulatedVoicePrompts[randomIndex];
      chatInput.focus();
    }, 3000); // 3 seconds recording phase simulation
  });

});
