// ClawFit — Main JS

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ---- Demo Tab Switcher ----
  const tabs = document.querySelectorAll('.demo-tab');
  const panes = document.querySelectorAll('.demo-tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      // Deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      // Activate clicked
      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
        // Re-trigger animation
        targetPane.style.animation = 'none';
        targetPane.offsetHeight; // force reflow
        targetPane.style.animation = '';
      }
    });
  });

  // ---- Intersection Observer for animations ----
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.pain-card, .feature-card, .arch-layer, .tech-item, .report-card, .demo-tabs, .chat-window').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

  // Add visible class styles
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Stagger animation for grid items
  document.querySelectorAll('.pain-grid, .feature-cards, .arch-layer-content, .tech-items, .report-overview').forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.1}s`;
    });
  });
});
