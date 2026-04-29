/* ── NAV SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target) {
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.childNodes[0].textContent = Math.floor(current);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const statNums = document.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
statsObserver.observe(document.getElementById('stats'));

/* ── TESTIMONIAL SLIDER ── */
const track = document.getElementById('testiTrack');
const cards = track.querySelectorAll('.testi-card');
const dots = document.querySelectorAll('.testi-dot');
let currentSlide = 0;

function goToSlide(index) {
  const maxSlide = Math.max(0, cards.length - (window.innerWidth < 768 ? 1 : 3));
  index = Math.max(0, Math.min(index, maxSlide));
  currentSlide = index;
  const cardWidth = cards[0].offsetWidth + 28;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  cards.forEach((c, i) => c.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

document.getElementById('testiNext').addEventListener('click', () => goToSlide(currentSlide + 1));
document.getElementById('testiPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
dots.forEach(dot => dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index))));

setInterval(() => {
  const maxSlide = Math.max(0, cards.length - (window.innerWidth < 768 ? 1 : 3));
  goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
}, 5000);

/* ── FORM SUBMIT ── */
document.querySelector('.form-submit').addEventListener('click', function () {
  this.textContent = '✓ Message Sent!';
  this.style.background = '#2A7A4B';
  setTimeout(() => {
    this.textContent = 'Send Message →';
    this.style.background = '';
  }, 3000);
});

/* ── SMOOTH ANCHOR ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
