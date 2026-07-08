document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Typed role text
const roles = [
  'Penetration Tester',
  'Vulnerability Assessor',
  'Cloud Security Reviewer',
  'Bug Bounty Hunter',
  'Red Teamer'
];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

// Animate skill bars when in view
const fills = document.querySelectorAll('.fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
fills.forEach(f => observer.observe(f));

// Active nav highlight
const sections = document.querySelectorAll('section[id], header[id]');
const navA = document.querySelectorAll('#navLinks a[href^="#"]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navA.forEach(a => a.style.color = '');
      const match = document.querySelector(`#navLinks a[href="#${entry.target.id}"]`);
      if (match) match.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => navObserver.observe(s));
