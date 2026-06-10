// ============ INIT LUCIDE ICONS ============
lucide.createIcons();

// ============ DARK MODE ============
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme or prefer system
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  lucide.createIcons(); // re-render toggled icon
});

// ============ MOBILE MENU ============
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  menuBtn.setAttribute('aria-expanded', menuOpen.toString());
  menuIcon.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
  lucide.createIcons();
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// ============ STICKY NAVBAR SHADOW ============
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

// ============ TYPED ROLE ANIMATION ============
const roles = [
  'Full-Stack Developer',
  'AI Enthusiast',
  'Software Engineer',
  'Problem Solver',
  'Future AI Researcher'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }
    setTimeout(typeRole, 60);
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
    setTimeout(typeRole, 100);
  }
}
typeRole();

// ============ SCROLL REVEAL ============
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars inside revealed elements
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// Also animate standalone skill bars (for sections not using reveal)
const standaloneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width || '0%';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-bar').forEach(bar => {
  standaloneObserver.observe(bar);
});

// ============ PROJECT FILTERS ============
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects-grid > [data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ============ MODALS ============
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
  // Focus trap: focus first focusable element
  const modal = document.getElementById(id);
  const focusable = modal.querySelector('button, a, input, textarea');
  if (focusable) setTimeout(() => focusable.focus(), 100);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ============ CONTACT FORM ============
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !subject || !message) return;

  // Simulate sending (replace with actual API call)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<svg class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sending...';

  setTimeout(() => {
    formSuccess.classList.remove('hidden');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
    lucide.createIcons();
    setTimeout(() => formSuccess.classList.add('hidden'), 5000);
  }, 1500);
});

// ============ GITHUB CONTRIBUTION GRID ============
function generateContribGrid() {
  const container = document.querySelector('#contrib-grid > div');
  if (!container) return;
  const weeks = 52;
  const days = 7;
  const levelClasses = [
    'bg-gray-200 dark:bg-white/10',
    'bg-primary-200 dark:bg-primary-900/50',
    'bg-primary-400 dark:bg-primary-700',
    'bg-primary-600 dark:bg-primary-500',
    'bg-primary-800 dark:bg-primary-300',
  ];

  for (let w = 0; w < weeks; w++) {
    const weekCol = document.createElement('div');
    weekCol.className = 'flex flex-col gap-1';
    for (let d = 0; d < days; d++) {
      const cell = document.createElement('div');
      const rand = Math.random();
      let level = 0;
      if (rand > 0.35) level = 1;
      if (rand > 0.55) level = 2;
      if (rand > 0.72) level = 3;
      if (rand > 0.88) level = 4;
      cell.className = `w-3 h-3 rounded-sm ${levelClasses[level]}`;
      cell.setAttribute('role', 'img');
      cell.setAttribute('aria-label', `${level} contributions`);
      weekCol.appendChild(cell);
    }
    container.appendChild(weekCol);
  }
}
generateContribGrid();

// ============ ACTIVE NAV HIGHLIGHT ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => navObserver.observe(section));

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Re-init icons after DOM interactions
lucide.createIcons();
