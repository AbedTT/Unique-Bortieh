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
 * Open or close the mobile menu, its overlay and the page scroll lock together,
 * so the page can never be left unscrollable after the menu closes.
 */
function setMobileMenu(open) {
  hamburger.classList.toggle('open', open);
  navLinks.classList.toggle('open', open);
  navOverlay.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

function toggleMobileMenu() {
  setMobileMenu(!navLinks.classList.contains('open'));
}

function closeMobileMenu() {
  setMobileMenu(false);
}

hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-controls', 'navLinks');

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

// Close the mobile menu if the window grows to desktop size (e.g. phone rotated)
window.addEventListener('resize', () => {
  if (window.innerWidth > 992 && navLinks.classList.contains('open')) closeMobileMenu();
});

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
    if (targetId.length < 2) return; // bare "#" placeholder links
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

// ===== CONTACT FORM =====
// Enquiries are emailed to the firm through Web3Forms (web3forms.com) and protected by an hCaptcha check.
//
// One-time setup:
//   1. Go to https://web3forms.com, enter the firm's email address and copy the access key they send to it.
//   2. Paste the key below. It is meant to be public: it only allows messages to be emailed to the
//      address it was created for.
//   3. In the Web3Forms dashboard, switch hCaptcha on for this key so the check is enforced.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '320d1466-6b20-4f24-9ddc-ad5278241528';
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'; // hCaptcha key provided by Web3Forms

const MIN_GAP_BETWEEN_SENDS_MS = 60000; // one enquiry per minute per browser
const LAST_SENT_KEY = 'ubfcLastEnquiry';

const readLastSent = () => { try { return Number(localStorage.getItem(LAST_SENT_KEY)) || 0; } catch (err) { return 0; } };
const writeLastSent = () => { try { localStorage.setItem(LAST_SENT_KEY, String(Date.now())); } catch (err) { /* storage unavailable */ } };

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const formErrorBox = document.getElementById('formError');
  const formErrorText = formErrorBox.querySelector('span');
  const DEFAULT_FORM_ERROR = formErrorText.textContent;
  const captchaErr = document.getElementById('captchaErr');
  const showFormError = message => {
    formErrorText.textContent = message || DEFAULT_FORM_ERROR;
    formErrorBox.classList.add('visible');
  };

  if (location.protocol === 'file:') {
    console.warn('This page was opened as a file (file:///...). The "I am human" check and the contact form need the site to be ' +
      'served from a web address: use VS Code "Live Server" (http://127.0.0.1:5500) while testing, or the real domain once it is online.');
  }

  // ---- hCaptcha: only loaded when a visitor gets near the form, so it never runs for people who don't need it
  let captchaWidgetId = null;
  let captchaRequested = false;

  window.onCaptchaLoaded = () => {
    captchaWidgetId = window.hcaptcha.render('captcha', {
      sitekey: HCAPTCHA_SITEKEY,
      size: window.innerWidth < 400 ? 'compact' : 'normal',
      callback: () => captchaErr.classList.remove('visible'),
      'expired-callback': () => {},
      'error-callback': code => console.error('hCaptcha reported an error:', code)
    });
  };

  const loadCaptcha = () => {
    if (captchaRequested) return;
    captchaRequested = true;
    const s = document.createElement('script');
    s.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&onload=onCaptchaLoaded';
    s.async = true;
    s.defer = true;
    s.onerror = () => { captchaRequested = false; }; // e.g. offline or blocked; retried on the next attempt
    document.head.appendChild(s);
  };

  if ('IntersectionObserver' in window) {
    const captchaObserver = new IntersectionObserver(entries => {
      if (entries.some(en => en.isIntersecting)) {
        loadCaptcha();
        captchaObserver.disconnect();
      }
    }, { rootMargin: '600px 0px' });
    captchaObserver.observe(contactForm);
  } else {
    loadCaptcha();
  }
  contactForm.addEventListener('focusin', loadCaptcha);

  const getCaptchaToken = () => (captchaWidgetId !== null && window.hcaptcha) ? window.hcaptcha.getResponse(captchaWidgetId) : '';
  const resetCaptcha = () => { if (captchaWidgetId !== null && window.hcaptcha) window.hcaptcha.reset(captchaWidgetId); };

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

    // Validate the captcha
    const captchaToken = getCaptchaToken();
    if (!captchaToken) {
      captchaErr.classList.add('visible');
      loadCaptcha();
      valid = false;
    } else {
      captchaErr.classList.remove('visible');
    }

    if (!valid) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formSuccess = document.getElementById('formSuccess');

    // Ignore repeat clicks while a message is already being sent
    if (submitBtn.disabled) return;

    formErrorBox.classList.remove('visible');

    if (WEB3FORMS_ACCESS_KEY.startsWith('PASTE-')) {
      console.error('Contact form is not set up yet: add your Web3Forms access key to WEB3FORMS_ACCESS_KEY in script.js.');
      showFormError();
      return;
    }

    if (Date.now() - readLastSent() < MIN_GAP_BETWEEN_SENDS_MS) {
      showFormError('Your message has just been sent. Please wait a minute before sending another.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span><i class="ph ph-spinner" style="animation: spin 1s linear infinite"></i>';

    if (!document.getElementById('spinStyle')) {
      const s = document.createElement('style');
      s.id = 'spinStyle';
      s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(s);
    }

    const resetButton = () => {
      submitBtn.style.display = '';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span><i class="ph ph-paper-plane-tilt"></i>';
    };

    const showSuccess = () => {
      submitBtn.style.display = 'none';
      formSuccess.classList.add('visible');
      contactForm.reset();

      // Reset after 5 seconds
      setTimeout(() => {
        resetButton();
        formSuccess.classList.remove('visible');
      }, 5000);
    };

    const fields = Object.fromEntries(new FormData(contactForm));

    // Hidden spam trap: real visitors never see or tick this box
    if (fields.botcheck) {
      showSuccess();
      return;
    }

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New website enquiry from ${fields.name.trim()}`,
      from_name: 'Unique-Bortieh Website',
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim() || 'Not provided',
      service: fields.service || 'Not specified',
      message: fields.message.trim(),
      'h-captcha-response': captchaToken
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
      .then(res => res.json().catch(() => ({})).then(data => {
        if (!res.ok || data.success !== true) {
          throw new Error(data.message || 'Request failed');
        }
        writeLastSent();
        showSuccess();
      }))
      .catch(err => {
        // Shown in the browser console for whoever maintains the site
        console.error('Contact form could not be sent:', err && err.message ? err.message : err);
        // Keep what the visitor typed so they can retry or copy it
        resetButton();
        showFormError();
      })
      .finally(() => {
        clearTimeout(timeout);
        resetCaptcha(); // a captcha answer can only be used once
      });
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

// ===== FAQ ACCORDION =====
function setFaqItem(item, open) {
  const button = item.querySelector('.faq-question');
  const icon = button.querySelector('i');
  item.classList.toggle('active', open);
  icon.classList.toggle('ph-minus', open);
  icon.classList.toggle('ph-plus', !open);
  button.setAttribute('aria-expanded', String(open));
}

document.querySelectorAll('.faq-question').forEach(button => {
  const item = button.parentElement;
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const willOpen = !item.classList.contains('active');
    // Only one answer is open at a time
    document.querySelectorAll('.faq-item').forEach(other => setFaqItem(other, other === item && willOpen));
  });
});

// ===== INIT =====
updateBackToTop();
updateActiveNavLink();
