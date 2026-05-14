document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Simple validation dummy
      if (email && password) {
        // Simulate an API call delay
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Authenticating...';
        btn.disabled = true;
        
        setTimeout(() => {
          localStorage.setItem('isAuthenticated', 'true');
          window.location.href = 'dashboard.html';
        }, 800);
      }
    });
  }

  // Dashboard protection (simple client-side check)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    if (!localStorage.getItem('isAuthenticated')) {
      window.location.href = 'index.html';
    }
    
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isAuthenticated');
      window.location.href = 'index.html';
    });
  }
});
