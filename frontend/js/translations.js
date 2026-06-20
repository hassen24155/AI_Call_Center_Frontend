/* 
========================================================================
   Centre d'Appel Intelligent IA - Multilingual Support Dictionary
   ISGMATECH - French (fr), Arabic (ar), Hassania (hr)
========================================================================
*/

(function() {
  const translations = {
    fr: {
      // Sidebar Navigation
      "nav-home": "Accueil",
      "nav-chat": "Chat IA",
      "nav-transport": "Transport",
      "nav-tracking": "Suivi",
      "nav-dashboard": "Dashboard",
      "nav-login": "Connexion",
      "nav-register": "Inscription",
      "nav-logout": "Déconnexion",

      // Theme toggle text in sidebar
      "theme-sombre": "Sombre",
      "theme-clair": "Clair",

      // Common Page Elements
      "page-title-home": "Accueil - Centre d'Appel Intelligent IA",
      "page-title-chat": "Chat IA - Centre d'Appel Intelligent IA",
      "page-title-transport": "Demande de Transport - Centre d'Appel Intelligent IA",
      "page-title-tracking": "Suivi de Demande - Centre d'Appel Intelligent IA",
      "page-title-dashboard": "Dashboard Administrateur - Centre d'Appel Intelligent IA",
      "page-title-login": "Connexion - ISGMATECH",
      "page-title-register": "Inscription - ISGMATECH",
      "page-title-forgot": "Mot de passe oublié - ISGMATECH",
      
      // Home Page Landing (index.html)
      "hero-badge": "Plateforme Enterprise IA 2026",
      "hero-title-1": "Centre d'Appel",
      "hero-title-2": "Intelligent IA",
      "hero-subtitle": "Une solution conversationnelle de pointe pour planifier vos demandes de transport et gérer vos interactions grâce à notre assistant virtuel intelligent. Optimisé pour l'efficacité opérationnelle.",
      "hero-cta-start": "Parler à l'IA",
      "hero-cta-transport": "Réserver un Trajet",
      
      "features-section-title": "Fonctionnalités Enterprise",
      "features-section-subtitle": "Découvrez les outils puissants intégrés à notre plateforme pour automatiser la logistique de transport et optimiser le support client.",
      "feature-chat-title": "AI Chat Assistant",
      "feature-chat-desc": "Un agent conversationnel avancé pour répondre à vos questions, enregistrer des fichiers et synthétiser des réponses audio instantanément.",
      "feature-transport-title": "Demandes de Transport",
      "feature-transport-desc": "Formulaire structuré et intelligent avec validation automatique des champs, sélection de catégories et gestion des priorités.",
      "feature-tracking-title": "Suivi des Demandes",
      "feature-tracking-desc": "Suivez vos réservations en temps réel grâce à une timeline interactive et des simulations d'événements opérationnels.",
      "feature-analytics-title": "Analytics Dashboard",
      "feature-analytics-desc": "Tableau de bord administrateur complet intégrant des graphiques interactifs Chart.js, filtres multicritères et exportation de données.",
      "feature-lang-title": "Multilingual Support",
      "feature-lang-desc": "Support natif du Français, de l'Arabe et du Hassania avec inversion complète du layout (RTL) pour une inclusivité totale.",
      
      "stats-section-title": "La plateforme en chiffres",
      "stats-conversations": "15K+",
      "stats-conversations-label": "Discussions résolues",
      "stats-requests": "3.4K+",
      "stats-requests-label": "Trajets planifiés",
      "stats-satisfaction": "99.8%",
      "stats-satisfaction-label": "Satisfaction client",
      
      "testimonials-section-title": "Ce que disent nos clients",
      "testi-quote-1": "\"L'assistant IA a planifié ma demande de transport en moins de 30 secondes. L'interface est moderne et extrêmement rapide!\"",
      "testi-author-1": "Marc Dubois",
      "testi-role-1": "Directeur Logistique, Paris",
      "testi-quote-2": "\"L'intégration du Hassania avec un layout RTL parfait montre l'attention portée aux détails. Un outil indispensable pour notre équipe.\"",
      "testi-author-2": "Fatimetou Mint Ely",
      "testi-role-2": "Responsable Support, Nouakchott",

      "footer-desc": "ISGMATECH Centre d'Appel Intelligent IA. Révolutionner les communications d'entreprise et la gestion logistique grâce à l'intelligence artificielle avancée.",
      "footer-col-company": "Entreprise",
      "footer-col-services": "Services",
      "footer-col-contact": "Contact",
      "footer-link-about": "À propos",
      "footer-link-careers": "Carrières",
      "footer-link-press": "Presse",
      "footer-link-privacy": "Confidentialité",
      "footer-link-terms": "Conditions",
      "footer-link-support": "Support Client",
      "footer-phone": "+33 1 23 45 67 89",
      "footer-email": "contact@isgmatech.com",
      "footer-address": "12 Rue de la Paix, Paris, France",
      "footer-copyright": "© 2026 ISGMATECH. Tous droits réservés.",

      // Authentication Pages
      "auth-login-title": "Bienvenue",
      "auth-login-subtitle": "Connectez-vous pour accéder à vos services et discussions",
      "auth-label-email": "Adresse Email",
      "auth-label-password": "Mot de passe",
      "auth-btn-login": "Se connecter",
      "auth-forgot-password": "Mot de passe oublié ?",
      "auth-no-account": "Pas encore de compte ?",
      "auth-link-register": "S'inscrire ici",
      
      "auth-register-title": "Créer un compte",
      "auth-register-subtitle": "Rejoignez notre plateforme de transport intelligent IA",
      "auth-label-name": "Nom Complet",
      "auth-label-phone": "Téléphone",
      "auth-label-role": "Rôle de l'utilisateur",
      "auth-role-client": "Client (Passager)",
      "auth-role-admin": "Administrateur",
      "auth-btn-register": "Créer le compte",
      "auth-has-account": "Déjà un compte ?",
      "auth-link-login": "Se connecter ici",
      
      "auth-forgot-title": "Récupération",
      "auth-forgot-subtitle": "Entrez votre email pour recevoir les instructions de réinitialisation",
      "auth-btn-reset": "Envoyer le lien de réinitialisation",
      "auth-back-login": "Retour à la connexion",
      
      // Chat Page (chat.html)
      "chat-welcome": "Bonjour ! Je suis l'assistant virtuel ISGMATECH. Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions ou me demander de planifier un transport.",
      "chat-input-placeholder": "Écrivez votre message ici...",
      "chat-mic-recording": "Enregistrement en cours... Parlez maintenant.",
      "chat-mic-success": "Audio converti en texte avec succès !",
      "chat-tts-voice": "Synthèse vocale active",
      "chat-attach-title": "Joindre un fichier",
      "chat-suggest-1": "Planifier un transport VIP",
      "chat-suggest-2": "Où en est ma demande ?",
      "chat-suggest-3": "Comment fonctionne le dashboard ?",
      "chat-suggest-4": "Contacter un agent humain",

      // Transport Form Page (transport.html)
      "trans-form-title": "Formuler une demande de trajet",
      "trans-form-subtitle": "Remplissez le formulaire ci-dessous pour soumettre une demande de réservation de transport. L'administrateur validera votre demande rapidement.",
      "trans-label-name": "Nom Complet",
      "trans-label-phone": "Numéro de Téléphone",
      "trans-label-departure": "Adresse de Départ",
      "trans-label-destination": "Destination (Arrivée)",
      "trans-label-category": "Catégorie de Transport",
      "trans-cat-standard": "Standard (Voiture classique)",
      "trans-cat-comfort": "Confort (Sedan premium)",
      "trans-cat-vip": "VIP (Berline de luxe / Limousine)",
      "trans-cat-cargo": "Cargo (Bagages volumineux / Fret)",
      "trans-cat-medical": "Médical (Non-urgence / Assistance)",
      "trans-label-priority": "Niveau de Priorité",
      "trans-priority-low": "Faible (Planifié à l'avance)",
      "trans-priority-medium": "Moyenne (Standard)",
      "trans-priority-high": "Haute (Prioritaire)",
      "trans-priority-urgent": "Urgent (Départ immédiat)",
      "trans-label-datetime": "Date & Heure de départ",
      "trans-btn-submit": "Envoyer la demande",
      "trans-loading-submit": "Traitement en cours...",

      // Tracking Page (suivi.html)
      "suivi-title": "Suivi des Demandes",
      "suivi-subtitle": "Consultez l'historique et l'état en temps réel de vos demandes de transport.",
      "suivi-no-requests-title": "Aucun trajet en cours",
      "suivi-no-requests-desc": "Vous n'avez pas de demande de transport planifiée pour le moment.",
      "suivi-btn-plan": "Planifier un transport",
      "suivi-submitted-on": "Soumise le :",
      "suivi-btn-cancel": "Annuler",
      "suivi-label-dep": "Départ",
      "suivi-label-arr": "Arrivée",
      "suivi-label-passenger": "Passager:",
      "suivi-label-phone": "Téléphone:",
      "suivi-info-title": "Statut de votre demande :",
      "suivi-status-pending": "En attente",
      "suivi-status-accepted": "Acceptée",
      "suivi-status-refused": "Refusée",
      "suivi-status-completed": "Terminée",
      
      // Tracking Timeline Steps
      "timeline-step-1-title": "Demande soumise",
      "timeline-step-1-desc": "Votre demande a été enregistrée dans notre système central.",
      "timeline-step-2-title": "Validation administrative",
      "timeline-step-2-desc": "L'administrateur examine votre demande et vérifie la disponibilité.",
      "timeline-step-3-title": "Chauffeur assigné",
      "timeline-step-3-desc": "Un chauffeur professionnel a accepté votre trajet.",
      "timeline-step-4-title": "En cours de route",
      "timeline-step-4-desc": "Le véhicule est en transit vers votre destination.",
      "timeline-step-5-title": "Trajet terminé",
      "timeline-step-5-desc": "Vous êtes arrivé à destination de manière sécurisée.",
      
      // Admin Dashboard (dashboard.html)
      "dash-title": "Tableau de Bord Administrateur",
      "dash-stat-total": "Total Demandes",
      "dash-stat-pending": "En attente",
      "dash-stat-accepted": "Acceptées",
      "dash-stat-refused": "Refusées",
      "dash-stat-users": "Utilisateurs",
      
      "dash-requests-title": "Gestion des Demandes",
      "dash-requests-subtitle": "Validez ou rejetez les demandes de transport formulées par les utilisateurs.",
      "dash-search-placeholder": "Rechercher par client ou ID...",
      "dash-filter-status": "Tous les statuts",
      "dash-filter-category": "Toutes les catégories",
      "dash-filter-priority": "Toutes les priorités",
      
      "dash-table-id": "ID",
      "dash-table-client": "Client & Tél",
      "dash-table-route": "Trajet",
      "dash-table-datetime": "Date / Priorité",
      "dash-table-status": "Statut",
      "dash-table-actions": "Actions",
      "dash-action-approve": "Accepter",
      "dash-action-reject": "Rejeter",
      "dash-action-complete": "Terminer",
      "dash-action-processed": "Traitée",
      
      "dash-analytics-title": "Analyses Graphiques",
      "dash-chart-daily": "Demandes par jour",
      "dash-chart-lang": "Répartition par langue",
      "dash-chart-cat": "Demandes par catégorie",
      "dash-chart-growth": "Croissance des utilisateurs",
      
      "dash-export-csv": "Exporter CSV",
      "dash-export-json": "Exporter JSON",
      
      "dash-users-title": "Gestion des Utilisateurs",
      "dash-users-subtitle": "Liste des comptes enregistrés sur la plateforme.",
      "dash-table-user-name": "Nom",
      "dash-table-user-email": "Email",
      "dash-table-user-role": "Rôle",
      "dash-table-user-status": "Statut Compte",
      "dash-user-status-active": "Actif",
      "dash-user-action-promote": "Passer Admin",
      "dash-user-action-demote": "Passer Client",
      
      "dash-chat-history-title": "Conversations IA",
      "dash-chat-history-subtitle": "Interaction en temps réel des clients avec le chatbot.",
      "dash-chat-clear": "Vider l'historique"
    },
    
    ar: {
      // Sidebar Navigation
      "nav-home": "الرئيسية",
      "nav-chat": "محادثة الذكاء",
      "nav-transport": "طلب نقل",
      "nav-tracking": "متابعة الطلبات",
      "nav-dashboard": "لوحة التحكم",
      "nav-login": "تسجيل الدخول",
      "nav-register": "حساب جديد",
      "nav-logout": "تسجيل الخروج",

      "theme-sombre": "مظلم",
      "theme-clair": "مضيء",

      "page-title-home": "الرئيسية - مركز الاتصال الذكي بالذكاء الاصطناعي",
      "page-title-chat": "محادثة الذكاء - مركز الاتصال الذكي",
      "page-title-transport": "طلب نقل - مركز الاتصال الذكي",
      "page-title-tracking": "تتبع الطلبات - مركز الاتصال الذكي",
      "page-title-dashboard": "لوحة تحكم المسؤول - مركز الاتصال الذكي",
      "page-title-login": "تسجيل الدخول - إيسجماتيك",
      "page-title-register": "حساب جديد - إيسجماتيك",
      "page-title-forgot": "نسيت كلمة المرور - إيسجماتيك",

      // Home Page
      "hero-badge": "منصة المؤسسات بالذكاء الاصطناعي 2026",
      "hero-title-1": "مركز الاتصال",
      "hero-title-2": "الذكي بالذكاء الاصطناعي",
      "hero-subtitle": "حل حواري متطور لتخطيط طلبات النقل الخاصة بك وإدارة تفاعلاتك بفضل مساعدنا الافتراضي الذكي. مصمم لتحقيق الكفاءة التشغيلية.",
      "hero-cta-start": "تحدث مع الذكاء",
      "hero-cta-transport": "احجز رحلة الآن",
      
      "features-section-title": "ميزات المنصة للمؤسسات",
      "features-section-subtitle": "اكتشف الأدوات القوية المدمجة في منصتنا لأتمتة لوجستيات النقل وتحسين دعم العملاء.",
      "feature-chat-title": "مساعد المحادثة الذكي",
      "feature-chat-desc": "وكيل حواري متقدم للرد على أسئلتك، ورفع الملفات وتوليف الإجابات الصوتية على الفور.",
      "feature-transport-title": "طلبات النقل المنظمة",
      "feature-transport-desc": "استمارة مهيكلة وذكية مع التحقق التلقائي من الحقول وتحديد الفئات وإدارة الأولويات.",
      "feature-tracking-title": "تتبع الرحلات المباشر",
      "feature-tracking-desc": "تابع حجوزاتك في الوقت الفعلي باستخدام مخطط تفاعلي ومحاكاة الأحداث التشغيلية.",
      "feature-analytics-title": "لوحة التحليلات المتقدمة",
      "feature-analytics-desc": "لوحة تحكم إدارية كاملة تتضمن رسومًا بيانية تفاعلية من Chart.js، وفلاتر وتصدير البيانات.",
      "feature-lang-title": "دعم اللغات المتعددة",
      "feature-lang-desc": "دعم أصلي للفرنسية، العربية والحسانية مع قلب اتجاه الواجهة بالكامل (RTL) لشمولية مطلقة.",
      
      "stats-section-title": "المنصة بالأرقام",
      "stats-conversations": "+15 ألف",
      "stats-conversations-label": "محادثة تم حلها",
      "stats-requests": "+3.4 ألف",
      "stats-requests-label": "رحلة تم تخطيطها",
      "stats-satisfaction": "99.8%",
      "stats-satisfaction-label": "نسبة رضا العملاء",
      
      "testimonials-section-title": "ماذا يقول عملاؤنا",
      "testi-quote-1": "\"قام المساعد الذكي بتخطيط طلب النقل الخاص بي في أقل من 30 ثانية. الواجهة حديثة وسريعة للغاية!\"",
      "testi-author-1": "مارك ديبوا",
      "testi-role-1": "مدير اللوجستيات، باريس",
      "testi-quote-2": "\"إن دمج اللغة الحسانية مع واجهة RTL متقنة يوضح مدى الاهتمام بالتفاصيل. أداة لا غنى عنها لفريقنا.\"",
      "testi-author-2": "فاطمة بنت اعلي",
      "testi-role-2": "مسؤولة الدعم، نواكشوط",

      "footer-desc": "إيسجماتيك - مركز الاتصال الذكي بالذكاء الاصطناعي. إحداث ثورة في اتصالات المؤسسات وإدارة الخدمات اللوجستية بفضل الذكاء الاصطناعي المتقدم.",
      "footer-col-company": "الشركة",
      "footer-col-services": "الخدمات",
      "footer-col-contact": "الاتصال",
      "footer-link-about": "من نحن",
      "footer-link-careers": "الوظائف",
      "footer-link-press": "الصحافة",
      "footer-link-privacy": "سياسة الخصوصية",
      "footer-link-terms": "الشروط والأحكام",
      "footer-link-support": "دعم العملاء",
      "footer-phone": "+33 1 23 45 67 89",
      "footer-email": "contact@isgmatech.com",
      "footer-address": "12 شارع السلام، باريس، فرنسا",
      "footer-copyright": "© 2026 إيسجماتيك. جميع الحقوق محفوظة.",

      // Authentication Pages
      "auth-login-title": "مرحباً بك",
      "auth-login-subtitle": "سجل دخولك للوصول إلى خدماتك ومحادثاتك",
      "auth-label-email": "البريد الإلكتروني",
      "auth-label-password": "كلمة المرور",
      "auth-btn-login": "تسجيل الدخول",
      "auth-forgot-password": "نسيت كلمة المرور؟",
      "auth-no-account": "ليس لديك حساب؟",
      "auth-link-register": "سجل هنا",
      
      "auth-register-title": "إنشاء حساب جديد",
      "auth-register-subtitle": "انضم إلى منصة النقل الذكي بالذكاء الاصطناعي",
      "auth-label-name": "الاسم الكامل",
      "auth-label-phone": "رقم الهاتف",
      "auth-label-role": "دور المستخدم",
      "auth-role-client": "عميل (راكب)",
      "auth-role-admin": "مسؤول النظام",
      "auth-btn-register": "إنشاء الحساب",
      "auth-has-account": "لديك حساب بالفعل؟",
      "auth-link-login": "سجل دخولك هنا",
      
      "auth-forgot-title": "استعادة الحساب",
      "auth-forgot-subtitle": "أدخل بريدك الإلكتروني لإرسال تعليمات إعادة تعيين كلمة المرور",
      "auth-btn-reset": "إرسال رابط الاستعادة",
      "auth-back-login": "العودة لتسجيل الدخول",
      
      // Chat Page
      "chat-welcome": "مرحباً! أنا المساعد الافتراضي لمنصة إيسجماتيك. كيف يمكنني مساعدتك اليوم؟ يمكنك طرح الأسئلة أو حجز رحلة مباشرة.",
      "chat-input-placeholder": "اكتب رسالتك هنا...",
      "chat-mic-recording": "جاري التسجيل... تحدث الآن.",
      "chat-mic-success": "تم تحويل الصوت إلى نص بنجاح!",
      "chat-tts-voice": "النطق الصوتي نشط",
      "chat-attach-title": "إرفاق ملف",
      "chat-suggest-1": "احجز رحلة VIP خاصة",
      "chat-suggest-2": "أين هو طلبي الحالي؟",
      "chat-suggest-3": "كيف أستخدم لوحة التحكم؟",
      "chat-suggest-4": "الاتصال بموظف خدمة العملاء",

      // Transport Form
      "trans-form-title": "تقديم طلب نقل جديد",
      "trans-form-subtitle": "يرجى ملء الاستمارة أدناه لإرسال طلب حجز النقل الخاص بك. سيقوم المسؤول بمراجعة طلبك والموافقة عليه سريعاً.",
      "trans-label-name": "الاسم الكامل",
      "trans-label-phone": "رقم الهاتف",
      "trans-label-departure": "عنوان المغادرة",
      "trans-label-destination": "وجهة الوصول",
      "trans-label-category": "فئة وسيلة النقل",
      "trans-cat-standard": "عادية (سيارة كلاسيكية)",
      "trans-cat-comfort": "مريحة (سيارة صالون فاخرة)",
      "trans-cat-vip": "VIP (سيارة ليموزين / فارهة)",
      "trans-cat-cargo": "شحن (نقل أمتعة وحقائب كبيرة)",
      "trans-cat-medical": "طبي (حالات غير طارئة / مساعدة)",
      "trans-label-priority": "مستوى الأولوية",
      "trans-priority-low": "منخفضة (تخطيط مسبق)",
      "trans-priority-medium": "متوسطة (عادية)",
      "trans-priority-high": "عالية (مقدمة على غيرها)",
      "trans-priority-urgent": "طارئة (انطلاق فوري)",
      "trans-label-datetime": "تاريخ ووقت المغادرة",
      "trans-btn-submit": "إرسال طلب الحجز",
      "trans-loading-submit": "جاري معالجة الطلب...",

      // Tracking Page
      "suivi-title": "تتبع طلبات النقل",
      "suivi-subtitle": "تحقق من سجل وحالة طلبات النقل الخاصة بك في الوقت الفعلي.",
      "suivi-no-requests-title": "لا توجد رحلات مجدولة",
      "suivi-no-requests-desc": "ليس لديك أي طلبات نقل مجدولة في الوقت الحالي.",
      "suivi-btn-plan": "خطط لرحلة جديدة",
      "suivi-submitted-on": "تاريخ التقديم:",
      "suivi-btn-cancel": "إلغاء الطلب",
      "suivi-label-dep": "نقطة الانطلاق",
      "suivi-label-arr": "نقطة الوصول",
      "suivi-label-passenger": "الراكب:",
      "suivi-label-phone": "الهاتف:",
      "suivi-info-title": "حالة طلبك الحالي:",
      "suivi-status-pending": "قيد المراجعة",
      "suivi-status-accepted": "مقبول",
      "suivi-status-refused": "مرفوض",
      "suivi-status-completed": "مكتمل",
      
      // Timeline Steps
      "timeline-step-1-title": "تم تقديم الطلب",
      "timeline-step-1-desc": "تم تسجيل طلبك بنجاح في نظامنا المركزي.",
      "timeline-step-2-title": "المراجعة الإدارية",
      "timeline-step-2-desc": "يقوم المسؤول بفحص تفاصيل الرحلة والتأكد من توفر السائقين.",
      "timeline-step-3-title": "تعيين السائق",
      "timeline-step-3-desc": "تم قبول رحلتك وتعيين سائق محترف لتنفيذها.",
      "timeline-step-4-title": "الرحلة مستمرة",
      "timeline-step-4-desc": "السيارة في طريقها حالياً إلى نقطة وصولك المحددة.",
      "timeline-step-5-title": "اكتملت الرحلة",
      "timeline-step-5-desc": "لقد وصلت إلى وجهتك بسلامة وأمان.",
      
      // Admin Dashboard
      "dash-title": "لوحة تحكم المسؤول",
      "dash-stat-total": "إجمالي الطلبات",
      "dash-stat-pending": "قيد المراجعة",
      "dash-stat-accepted": "المقبولة",
      "dash-stat-refused": "المرفوضة",
      "dash-stat-users": "المستخدمين",
      
      "dash-requests-title": "إدارة طلبات النقل",
      "dash-requests-subtitle": "الموافقة على طلبات النقل المقدمة من العملاء أو رفضها.",
      "dash-search-placeholder": "ابحث باسم العميل أو معرف الطلب...",
      "dash-filter-status": "جميع الحالات",
      "dash-filter-category": "جميع الفئات",
      "dash-filter-priority": "جميع الأولويات",
      
      "dash-table-id": "المعرف",
      "dash-table-client": "العميل والهاتف",
      "dash-table-route": "مسار الرحلة",
      "dash-table-datetime": "التاريخ / الأولوية",
      "dash-table-status": "الحالة",
      "dash-table-actions": "الإجراءات",
      "dash-action-approve": "موافقة",
      "dash-action-reject": "رفض",
      "dash-action-complete": "إنهاء",
      "dash-action-processed": "معالجة",
      
      "dash-analytics-title": "التحليلات والرسوم البيانية",
      "dash-chart-daily": "الطلبات اليومية",
      "dash-chart-lang": "توزيع لغات التفاعل",
      "dash-chart-cat": "الطلبات حسب الفئة",
      "dash-chart-growth": "نمو حسابات المستخدمين",
      
      "dash-export-csv": "تصدير CSV",
      "dash-export-json": "تصدير JSON",
      
      "dash-users-title": "إدارة الحسابات والمستخدمين",
      "dash-users-subtitle": "قائمة بجميع حسابات المستخدمين المسجلة بالمنصة.",
      "dash-table-user-name": "الاسم",
      "dash-table-user-email": "البريد الإلكتروني",
      "dash-table-user-role": "الصلاحية",
      "dash-table-user-status": "حالة الحساب",
      "dash-user-status-active": "نشط",
      "dash-user-action-promote": "ترقية لمسؤول",
      "dash-user-action-demote": "تخفيض لعميل",
      
      "dash-chat-history-title": "سجلات المحادثات مع الذكاء",
      "dash-chat-history-subtitle": "متابعة مباشرة لتفاعلات العملاء مع روبوت الدردشة.",
      "dash-chat-clear": "مسح السجلات"
    },
    
    hr: { // Hassania (Mauritanian Arabic Dialect Phrasing)
      // Sidebar Navigation
      "nav-home": "الدار",
      "nav-chat": "كلام الذكاء",
      "nav-transport": "طلب النقل",
      "nav-tracking": "تبع النقل",
      "nav-dashboard": "التابلو",
      "nav-login": "ادخيل",
      "nav-register": "اكتابة",
      "nav-logout": "اخروج",

      "theme-sombre": "كاحل",
      "theme-clair": "بيض",

      "page-title-home": "الدار - منصة النقل والاتصال بالذكاء الاصطناعي",
      "page-title-chat": "كلام الذكاء - اتكلم مع المساعد الافتراضي",
      "page-title-transport": "طلب النقل - حجز التاكسي والسيارات",
      "page-title-tracking": "تبع الطلبات - تتبع الرحلات المباشر",
      "page-title-dashboard": "لوحة تحكم المدير - إدارة المنصة",
      "page-title-login": "ادخل الحساب - إيسجماتيك",
      "page-title-register": "اكتب حساب جديد - إيسجماتيك",
      "page-title-forgot": "راحت الساروت - استعادة كلمة السر",

      // Home Page
      "hero-badge": "منصة الشركات بالذكاء الاصطناعي 2026",
      "hero-title-1": "منصة الاتصال",
      "hero-title-2": "الذكية بالذكاء الاصطناعي",
      "hero-subtitle": "شغل متطور بالكامل باش تطلب تفاصل النقل وتعدل معاملاتك مع مساعدنا الذكي الخفيف. معدل خصيصاً للتسهيل على الناس.",
      "hero-cta-start": "ادخل اهدر مع الذكاء",
      "hero-cta-transport": "اقبض تاكسي ذروك",
      
      "features-section-title": "ميزات المنصة الكبار",
      "features-section-subtitle": "شوف المسائل الكبيرة والمفيدة المدمجة عندنا باش تسهل حجز الرحلات وتعدل خدمة زبناء زينة.",
      "feature-chat-title": "كلام الذكاء الاصطناعي",
      "feature-chat-desc": "مساعد ذكي يتكلم معاك، تجاوبه ويجاوبك، وتكلاله ملفات ويقرالك الجواب بالصوت مباشرة.",
      "feature-transport-title": "حجز الرحلات الساهل",
      "feature-transport-desc": "فورم ساهل ومعدل بذكاء فيه تأكيد المعلومات وتحديد الفئة وأهمية الطلب.",
      "feature-tracking-title": "تبع الرحلة ذروك",
      "feature-tracking-desc": "تبع التاكسي وين لاحك في الوقت الحقيقي من خلال رسم بياني تفاعلي ومحاكاة الرحلة.",
      "feature-analytics-title": "تابلوه الإدارة والتحاليل",
      "feature-analytics-desc": "تابلوه كامل للمسؤولين فيه كرافات وتصاور تفاعلية من Chart.js، وفيه فلاتر لتصدير المعطيات.",
      "feature-lang-title": "مات تفوتك لغة",
      "feature-lang-desc": "المنصة تخدم بالفرنسية، العربية والحسانية بصفة كاملة مع قلب اتجاه الواجهة (RTL) باش تفهم كامل الناس.",
      
      "stats-section-title": "شغلنا بالأرقام والنتيجة",
      "stats-conversations": "+15 ألف",
      "stats-conversations-label": "كلام تم حله",
      "stats-requests": "+3.4 ألف",
      "stats-requests-label": "رحلة تعدلت",
      "stats-satisfaction": "99.8%",
      "stats-satisfaction-label": "رضا الناس عنا",
      
      "testimonials-section-title": "أقاويل الناس الي تعاملت معانا",
      "testi-quote-1": "\"مساعد الذكاء الاصطناعي قادلي رحلتي في أقل من 30 ثانية. تبارك الله منصة خفيفة وسريعة!\"",
      "testi-author-1": "سيد أحمد ولد ابراهيم",
      "testi-role-1": "تاجر لوجستيك، نواذيبو",
      "testi-quote-2": "\"تعديل الحسانية مع واجهة RTL متقنة يبين جودة الشغل. تطبيق ضروري ومفيد جداً لنا.\"",
      "testi-author-2": "خديجة بنت اعلي",
      "testi-role-2": "خدمة الزبناء، نواكشوط",

      "footer-desc": "إيسجماتيك - الدار الرقمية للاتصال الذكي بالذكاء الاصطناعي. نعدلو اتصالات الشركات وحجز النقل بذكاء وتسهيل.",
      "footer-col-company": "المؤسسة",
      "footer-col-services": "الخدمات",
      "footer-col-contact": "تواصل معانا",
      "footer-link-about": "من نحن",
      "footer-link-careers": "الخدمة عندنا",
      "footer-link-press": "الأخبار",
      "footer-link-privacy": "أمان معلوماتك",
      "footer-link-terms": "الشروط والمواثيق",
      "footer-link-support": "مساعدة الزبناء",
      "footer-phone": "+222 45 25 00 00",
      "footer-email": "support@isgmatech.mr",
      "footer-address": "شارع جمال عبد الناصر، نواكشوط، موريتانيا",
      "footer-copyright": "© 2026 إيسجماتيك. كامل الحقوق محفوظة.",

      // Authentication Pages
      "auth-login-title": "أهلاً وسهلاً",
      "auth-login-subtitle": "سجل دخولك باش تدخل لخدماتك وتهدر مع الذكاء",
      "auth-label-email": "البريد الإلكتروني (الإيميل)",
      "auth-label-password": "كلمة السر",
      "auth-btn-login": "ادخل ذروك",
      "auth-forgot-password": "راحت الساروت ؟ (نسيت كلمة السر)",
      "auth-no-account": "ما عندك حساب ؟",
      "auth-link-register": "اكتب حساب جديد هون",
      
      "auth-register-title": "عدل حساب جديد",
      "auth-register-subtitle": "ادخل معانا في منصة النقل الذكي بالذكاء الاصطناعي",
      "auth-label-name": "الاسم الكامل",
      "auth-label-phone": "نيمرو التلفون",
      "auth-label-role": "نوع الحساب",
      "auth-role-client": "راكب (عميل)",
      "auth-role-admin": "مدير المنصة (مسؤول)",
      "auth-btn-register": "تثبيت الحساب",
      "auth-has-account": "عندك حساب من قبل ؟",
      "auth-link-login": "سجل دخولك هون",
      
      "auth-forgot-title": "استرجاع الساروت",
      "auth-forgot-subtitle": "اكتب إيميلك باش نرسلولك رابط تعديل كلمة السر الجديدة",
      "auth-btn-reset": "ارسل رابط التعديل",
      "auth-back-login": "ارجع لصفحة الدخول",
      
      // Chat Page
      "chat-welcome": "مرحباً بك! أنا المساعد الافتراضي لمنصة إيسجماتيك. كاش طاري نقد نعاونك فيه اليوم؟ سولني عن أي شي ولا اطلب حجز تاكسي.",
      "chat-input-placeholder": "اكتب كلامك هون...",
      "chat-mic-recording": "نسجلو في كلامك ذروك... اتكلم.",
      "chat-mic-success": "كلامك تسجل وتحول لكتيبة بنجاح!",
      "chat-tts-voice": "النطق بالصوت خدام",
      "chat-attach-title": "حط ملف",
      "chat-suggest-1": "احجزلي تاكسي VIP ذروك",
      "chat-suggest-2": "وين لحق طلبي ذروك؟",
      "chat-suggest-3": "كيفاش نخدم بتابلوه الإدارة؟",
      "chat-suggest-4": "نتكلم مع بنادم من الدعم",

      // Transport Form
      "trans-form-title": "عدل طلب رحلة جديدة",
      "trans-form-subtitle": "عمر الخانات الي تحت باش ترسل طلب حجز النقل. المدير لا يجاوبك ويقبل طلبك في أسرع وقت.",
      "trans-label-name": "الاسم الكامل",
      "trans-label-phone": "رقم الهاتف (التلفون)",
      "trans-label-departure": "بلاصة المغادرة (منين)",
      "trans-label-destination": "بلاصة الوصول (لوين)",
      "trans-label-category": "فئة النقل",
      "trans-cat-standard": "عادي (سيارة كلاسيكية)",
      "trans-cat-comfort": "زين (سيارة صالون فاخرة)",
      "trans-cat-vip": "VIP (سيارة ليموزين / غالية)",
      "trans-cat-cargo": "شحن (نقل أمتعة وحقائب كبار)",
      "trans-cat-medical": "اسعاف طبي (حالات باردة / مساعدة)",
      "trans-label-priority": "أهمية الطلب (الأولوية)",
      "trans-priority-low": "بارد (مخطط على اتساع)",
      "trans-priority-medium": "عادي (متوسط)",
      "trans-priority-high": "حامي (مقدم)",
      "trans-priority-urgent": "عجلان حيل (انطلاق ذروك)",
      "trans-label-datetime": "وقت وتاريخ التيسير (المغادرة)",
      "trans-btn-submit": "ارسل طلب الحجز",
      "trans-loading-submit": "نجربو نرسلو الطلب...",

      // Tracking Page
      "suivi-title": "تبع طلبات النقل",
      "suivi-subtitle": "شوف تفاصل وتتبع حالة رحلاتك في الوقت الحقيقي.",
      "suivi-no-requests-title": "ما عندك أي رحلة ذروك",
      "suivi-no-requests-desc": "ما خططت لأي رحلة في هاذ الوقت.",
      "suivi-btn-plan": "عدل حجز رحلة جديدة",
      "suivi-submitted-on": "ترسلت في تاريخ:",
      "suivi-btn-cancel": "الغ الطلب",
      "suivi-label-dep": "منين قلعت",
      "suivi-label-arr": "وين لحقت",
      "suivi-label-passenger": "المسافر:",
      "suivi-label-phone": "التلفون:",
      "suivi-info-title": "حالة طلبك ذروك :",
      "suivi-status-pending": "تحت المراجعة",
      "suivi-status-accepted": "مقبول",
      "suivi-status-refused": "مرفوض",
      "suivi-status-completed": "خالص (مكتمل)",
      
      // Timeline Steps
      "timeline-step-1-title": "الطلب ترسل",
      "timeline-step-1-desc": "طلبك تسجل بنجاح في سيستيم الدار.",
      "timeline-step-2-title": "مراجعة المدير",
      "timeline-step-2-desc": "المدير يقرا في تفاصل طلبك ويشوف الكراوات المتاحين.",
      "timeline-step-3-title": "تحديد الشوفر",
      "timeline-step-3-desc": "طلبك تقبل وتحدد لك شوفر محترف باش يقبض بيك الطريق.",
      "timeline-step-4-title": "شغال الطريق",
      "timeline-step-4-desc": "السيارة ذروك في طريقها لبلاصة وصولك المحددة.",
      "timeline-step-5-title": "الرحلة خلطت بسلام",
      "timeline-step-5-desc": "تبارك الله لحقت لوجهتك بخير وعلى خير.",
      
      // Admin Dashboard
      "dash-title": "لوحة تحكم المسؤول (التابلو)",
      "dash-stat-total": "كامل الطلبات",
      "dash-stat-pending": "تحت المراجعة",
      "dash-stat-accepted": "المقبولين",
      "dash-stat-refused": "المرفوضين",
      "dash-stat-users": "المقيدين (المستخدمين)",
      
      "dash-requests-title": "إدارة حجز النقل",
      "dash-requests-subtitle": "اقبل ولا ارفض طلبات النقل الي يعدلوها الزبناء.",
      "dash-search-placeholder": "لوذ باسم الزبون ولا كود الطلب...",
      "dash-filter-status": "كامل الحالات",
      "dash-filter-category": "كامل الفئات",
      "dash-filter-priority": "كامل الأولويات",
      
      "dash-table-id": "الكود",
      "dash-table-client": "الزبون وتلفونه",
      "dash-table-route": "مسار الرحلة",
      "dash-table-datetime": "الوقت / الأولوية",
      "dash-table-status": "الحالة",
      "dash-table-actions": "المعاملات",
      "dash-action-approve": "اقبل",
      "dash-action-reject": "ارفض",
      "dash-action-complete": "خلص",
      "dash-action-processed": "معدلة",
      
      "dash-analytics-title": "كرافات الإحصائيات والتحاليل",
      "dash-chart-daily": "الطلبات بالنهار",
      "dash-chart-lang": "لغة المعاملات",
      "dash-chart-cat": "الطلبات بالفئة",
      "dash-chart-growth": "نمو المقيدين في الدار",
      
      "dash-export-csv": "خرّج ملف CSV",
      "dash-export-json": "خرّج ملف JSON",
      
      "dash-users-title": "إدارة حسابات المستخدمين",
      "dash-users-subtitle": "أسماء وحسابات كامل الناس المقيدة في السيستيم هون.",
      "dash-table-user-name": "الاسم",
      "dash-table-user-email": "الإيميل",
      "dash-table-user-role": "الصلاحية",
      "dash-table-user-status": "الحالة",
      "dash-user-status-active": "خدام",
      "dash-user-action-promote": "رقي لمدير",
      "dash-user-action-demote": "رده لزبون",
      
      "dash-chat-history-title": "سجلات كلام الذكاء",
      "dash-chat-history-subtitle": "تبع ذروك وشوف كلام الزبناء مع روبوت الدردشة.",
      "dash-chat-clear": "امسح التاريخ"
    }
  };

  // Expose global translation API
  window.i18n = {
    currentLang: localStorage.getItem('lang') || 'fr',
    translations: translations,
    
    setLanguage: function(lang) {
      if (!translations[lang]) return;
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
      this.translatePage();
      
      // Mirror direction for Arabic (ar) and Hassania (hr)
      if (lang === 'ar' || lang === 'hr') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl-active');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl-active');
      }
      
      // Dispatch custom event so pages can react if they need (e.g. Chart.js translation adjustments)
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    },
    
    t: function(key) {
      const lang = this.currentLang;
      if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
      }
      // Fallback to French
      if (translations['fr'] && translations['fr'][key]) {
        return translations['fr'][key];
      }
      return key;
    },
    
    translatePage: function() {
      // Find all elements with data-i18n attribute
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedText = this.t(key);
        
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', translatedText);
          } else {
            el.value = translatedText;
          }
        } else {
          // If the element has children icons, preserve them
          const icon = el.querySelector('i');
          if (icon) {
            // Keep the icon html, replace the text around it
            const spanText = el.querySelector('span');
            if (spanText) {
              spanText.innerHTML = translatedText;
            } else {
              // Simple text replacement after icon
              el.innerHTML = icon.outerHTML + ' ' + translatedText;
            }
          } else {
            el.innerHTML = translatedText;
          }
        }
      });
      
      // Update dynamic document headers
      const titleKey = `page-title-${this.getPageName()}`;
      if (translations[this.currentLang][titleKey]) {
        document.title = this.t(titleKey);
      }
    },
    
    getPageName: function() {
      const path = window.location.pathname;
      const file = path.substring(path.lastIndexOf('/') + 1);
      if (!file || file === 'index.html') return 'home';
      if (file.includes('chat')) return 'chat';
      if (file.includes('transport')) return 'transport';
      if (file.includes('suivi')) return 'tracking';
      if (file.includes('dashboard')) return 'dashboard';
      if (file.includes('login')) return 'login';
      if (file.includes('register')) return 'register';
      if (file.includes('forgot')) return 'forgot';
      return 'home';
    }
  };
  
})();
