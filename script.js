/* =============================================
   UNIQUE-BORTIEH FINANCIAL CONSULT
   Main JavaScript
   ============================================= */

'use strict';

// ===== NAVBAR - RESPONSIVE MOBILE MENU =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

/**
 * Toggle mobile menu and overlay
 * Handles hamburger animation and drawer slide-in
 */
function toggleMobileMenu() {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  navOverlay.classList.toggle('active');
}

/**
 * Close mobile menu and overlay
 * Used when clicking on a link or overlay
 */
function closeMobileMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('active');
}

// Hamburger button click handler
hamburger.addEventListener('click', toggleMobileMenu);

// Overlay click handler - close menu when overlay is clicked
navOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when a navigation link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMobileMenu();
  }
});

// Prevent body scroll when mobile menu is open
function updateBodyScroll() {
  if (navLinks.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Update body scroll on menu toggle
hamburger.addEventListener('click', updateBodyScroll);

// Scroll handler — sticky + solid nav
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button
  updateBackToTop();

  // Update active nav link
  updateActiveNavLink();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navH = 80;

  sections.forEach(section => {
    const top = section.offsetTop - navH - 20;
    const bottom = top + section.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally stop observing once visible
      // revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000; // ms
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOut(progress);
    const current = Math.round(easedProgress * target);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counterElements = document.querySelectorAll('.stat-num[data-target]');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counterElements.forEach(el => animateCounter(el));
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats');
if (statsSection) counterObserver.observe(statsSection);

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      width: 8px;
      height: 8px;
      left: ${x - 4}px;
      top: ${y - 4}px;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
      pointer-events: none;
    `;

    if (!document.getElementById('rippleStyle')) {
      const style = document.createElement('style');
      style.id = 'rippleStyle';
      style.textContent = `
        @keyframes rippleAnim {
          to { transform: scale(30); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Validate name
    const nameInput = document.getElementById('name');
    const nameErr = document.getElementById('nameErr');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('error');
      nameErr.classList.add('visible');
      valid = false;
    } else {
      nameInput.classList.remove('error');
      nameErr.classList.remove('visible');
    }

    // Validate email
    const emailInput = document.getElementById('email');
    const emailErr = document.getElementById('emailErr');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailErr.classList.add('visible');
      valid = false;
    } else {
      emailInput.classList.remove('error');
      emailErr.classList.remove('visible');
    }

    // Validate message
    const messageInput = document.getElementById('message');
    const messageErr = document.getElementById('messageErr');
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('error');
      messageErr.classList.add('visible');
      valid = false;
    } else {
      messageInput.classList.remove('error');
      messageErr.classList.remove('visible');
    }

    if (valid) {
      // Show success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const formSuccess = document.getElementById('formSuccess');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span><i class="ph ph-spinner" style="animation: spin 1s linear infinite"></i>';

      if (!document.getElementById('spinStyle')) {
        const s = document.createElement('style');
        s.id = 'spinStyle';
        s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(s);
      }

      setTimeout(() => {
        submitBtn.style.display = 'none';
        formSuccess.classList.add('visible');
        contactForm.reset();

        // Reset after 5 seconds
        setTimeout(() => {
          submitBtn.style.display = '';
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span><i class="ph ph-paper-plane-tilt"></i>';
          formSuccess.classList.remove('visible');
        }, 5000);
      }, 1500);
    }
  });

  // Live validation
  ['name', 'email', 'message'].forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const err = document.getElementById(fieldId + 'Err');
        if (err) err.classList.remove('visible');
      });
    }
  });
}

// ===== PARALLAX EFFECT (subtle) =====
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Hero orbs parallax
      const orb1 = document.querySelector('.hero-orb-1');
      const orb2 = document.querySelector('.hero-orb-2');
      if (orb1) orb1.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (orb2) orb2.style.transform = `translateY(${scrollY * 0.1}px)`;

      ticking = false;
    });
    ticking = true;
  }
});

// ===== TICKER PAUSE ON HOVER =====
const ticker = document.querySelector('.ticker');
if (ticker) {
  ticker.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  ticker.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });
}

// ===== HERO STAGGER INIT =====
// Trigger hero elements with staggered entrance on page load
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero .reveal-up, .hero .reveal-right');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 150 + 200);
  });
});

// ===== SERVICE CARD GLOW =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// Add glow style for service cards
const glowStyle = document.createElement('style');
glowStyle.textContent = `
  .service-card:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(76,175,80,0.08) 0%, transparent 60%);
    pointer-events: none;
    border-radius: inherit;
  }
`;
document.head.appendChild(glowStyle);

// ===== INIT =====
updateBackToTop();
updateActiveNavLink();
