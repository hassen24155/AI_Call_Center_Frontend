/* 
========================================================================
   Centre d'Appel Intelligent IA - User Session & Role Manager
   ISGMATECH - Admin & Client Auth Flows
========================================================================
*/

(function() {
  
  // Seed initial users if they do not exist
  const defaultUsers = [
    {
      name: "Admin ISGMATECH",
      email: "admin@isgmatech.com",
      phone: "+33 1 23 45 67 89",
      role: "Administrator",
      password: "admin123",
      status: "active"
    },
    {
      name: "Client ISGMATECH",
      email: "client@isgmatech.com",
      phone: "+33 6 12 34 56 78",
      role: "Client",
      password: "client123",
      status: "active"
    }
  ];

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }

  window.auth = {
    // Get all registered users
    getUsers: function() {
      return JSON.parse(localStorage.getItem('users') || '[]');
    },

    // Save users list
    saveUsers: function(users) {
      localStorage.setItem('users', JSON.stringify(users));
    },

    // Get current logged-in user
    getCurrentUser: function() {
      const userJSON = localStorage.getItem('currentUser');
      return userJSON ? JSON.parse(userJSON) : null;
    },

    // Register a new account
    register: function(name, email, phone, role, password) {
      const users = this.getUsers();
      
      // Email format check
      if (!email.includes('@') || !email.includes('.')) {
        return { success: false, message: "Adresse email invalide." };
      }

      // Check if user already exists
      const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { success: false, message: "Un utilisateur avec cette adresse email existe déjà." };
      }

      const newUser = {
        name: name,
        email: email.toLowerCase(),
        phone: phone,
        role: role, // 'Client' or 'Administrator'
        password: password,
        status: "active"
      };

      users.push(newUser);
      this.saveUsers(users);
      
      return { success: true, user: newUser };
    },

    // Login session
    login: function(email, password) {
      const users = this.getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password);
      
      if (!user) {
        return { success: false, message: "Email ou mot de passe incorrect." };
      }

      if (user.status !== 'active') {
        return { success: false, message: "Ce compte a été suspendu." };
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user: user };
    },

    // Logout session
    logout: function() {
      localStorage.removeItem('currentUser');
      window.location.href = "login.html";
    },

    // Manage Page Guards and Redirect Rules
    checkSession: function() {
      const user = this.getCurrentUser();
      const path = window.location.pathname;
      const file = path.substring(path.lastIndexOf('/') + 1);

      // Define page categorization
      const authPages = ['login.html', 'register.html', 'forgot-password.html'];
      const protectedPages = ['chat.html', 'transport.html', 'suivi.html'];
      const adminPages = ['dashboard.html'];

      // Case 1: Active User trying to access login/register screens -> Redirect home
      if (user && authPages.includes(file)) {
        if (user.role === 'Administrator') {
          window.location.href = "dashboard.html";
        } else {
          window.location.href = "index.html";
        }
        return;
      }

      // Case 2: Guest trying to access protected screens -> Redirect to login
      if (!user && (protectedPages.includes(file) || adminPages.includes(file))) {
        window.location.href = "login.html";
        return;
      }

      // Case 3: Non-Admin client trying to access admin dashboard -> Redirect index with warning
      if (user && adminPages.includes(file) && user.role !== 'Administrator') {
        // Redirect client to home and save warning inside localstorage to trigger toast notification in main.js
        localStorage.setItem('authWarning', 'restricted-access');
        window.location.href = "index.html";
        return;
      }
    }
  };

  // Run routing validation automatically when the script loads
  window.auth.checkSession();

})();
