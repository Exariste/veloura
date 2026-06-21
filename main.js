/* LUXELLE & FAIR — Main JS */

// Page Loader — hides as soon as page is ready
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }
});
document.body.classList.add('loading');

// Sticky Header
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile Nav Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    navMenu.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translate(4px,4px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translate(4px,-4px)')
      : (spans[0].style.transform = '',
         spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

// Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
}

// Newsletter Submit
function handleNewsletterSubmit(e) {
  e.preventDefault();
  showToast('Thank you for joining the Luxury Circle!');
  e.target.reset();
}

// Inquiry Form Submit
function handleInquirySubmit(e) {
  e.preventDefault();
  showToast('Your inquiry has been received. We will contact you shortly.');
  e.target.reset();
}

function showToast(msg) {
  let toast = document.querySelector('.success-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'success-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Active nav link
const navLinks = document.querySelectorAll('.nav-menu a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.split('#')[0] === currentPage) {
    link.classList.add('active');
  }
});
