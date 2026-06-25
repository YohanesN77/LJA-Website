// ---- Mobile menu toggle ----
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// ---- Navbar scroll effect ----
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-2xl');
    } else {
      navbar.classList.remove('shadow-2xl');
    }
  }
});

// Bind to window for inline HTML access
window.toggleMenu = toggleMenu;
