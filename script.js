/* ============================================================
   Portfolio – Ibtihel Gritli
   script.js
   ------------------------------------------------------------
   1. Helpers & settings        6. Contact form & CV
   2. Content data (FR / EN)    7. Hero ID card
   3. Page rendering            8. Scroll effects
   4. Modals                    9. Page loader
   5. Language & theme         10. Scroll progress & active menu
   ============================================================ */


/* ---------- 1. Helpers & settings ---------- */
const qs = (selector) => document.querySelector(selector);
const qsAll = (selector) => Array.from(document.querySelectorAll(selector));
const prefersReducedMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;

// The portfolio always opens in dark mode; the language comes from the last visit or the browser.
document.documentElement.setAttribute('data-theme', 'dark');
let savedLang = null;
try { savedLang = localStorage.getItem('lang'); } catch (error) {}
let currentLang = savedLang || ((navigator.language || 'fr').slice(0, 2) === 'fr' ? 'fr' : 'en');

// Picks the French or English text from a [fr, en] pair.
const translate = (pair) => pair[currentLang === 'fr' ? 0 : 1];

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');


/* ---------- 2. Content data (each text is a [French, English] pair) ---------- */
const CV_FILE = 'assets/cv/Gritli-Ibtihel-CV.pdf';

const CERTIFICATE_IMAGES = {
  nvidia: 'assets/images/certificates/nvidia-deep-learning.jpg',
  cisco: 'assets/images/certificates/cisco-linux-unhatched.jpg',
  cyber: 'assets/images/certificates/workshop-cyber-security.jpg',
  linkedin: 'assets/images/certificates/workshop-linkedin-cv.jpg',
  attest: 'assets/images/certificates/internship-certificate.jpg'
};

const PROJECT_IMAGES = {
  'Codify': 'assets/images/projects/codify.webp',
  'ShopFlow': 'assets/images/projects/shopflow.webp',
  'EduInsight': 'assets/images/projects/eduinsight.webp',
  'Golden Service': 'assets/images/projects/golden-service.webp'
};

// Vertical position of the screenshot inside a project card (default: top).
const PROJECT_IMAGE_POSITION = { 'ShopFlow': '10%' };

const NAV_LINKS = [
  ['about', ['À propos', 'About']],
  ['education', ['Parcours', 'Education']],
  ['experience', ['Expérience', 'Experience']],
  ['projects', ['Projets', 'Projects']],
  ['skills', ['Compétences', 'Skills']],
  ['certifications', ['Certifications', 'Certifications']],
  ['contact', ['Contact', 'Contact']]
];

const TIMELINE = [
  ['2026 → en cours', '2026 → ongoing', '3ème année Licence GLSI', '3rd Year GLSI Student', 'Faculté des Sciences de Monastir', 'Faculty of Sciences of Monastir'],
  ['2025 – 2026', '2025 – 2026', '2ème année Licence LGLSI', '2nd Year LGLSI Student', 'Faculté des Sciences de Monastir', 'Faculty of Sciences of Monastir'],
  ['2024 – 2025', '2024 – 2025', '1ère année Licence LSI', '1st Year LSI Student', 'Faculté des Sciences de Monastir', 'Faculty of Sciences of Monastir'],
  ['2024', '2024', 'Baccalauréat Informatique, mention Bien', 'Computer Science Baccalaureate, with honours', 'Lycée El Bosten, Kélibia', 'El Bosten high school, Kélibia']
];

const PROJECTS = [{
  name: 'Codify',
  github: 'https://github.com/Ibtihel-Gritli/Codify',
  category: ['PFA 2026', 'PFA 2026'],
  summary: ['Plateforme d’apprentissage de la programmation assistée par IA.', 'Programming learning platform assisted by AI.'],
  description: ['Conception et développement d’une plateforme d’apprentissage Full-Stack assistée par IA avec Spring Boot, Thymeleaf, JavaScript et MySQL.', 'Design and development of a Full-Stack, AI-assisted learning platform built with Spring Boot, Thymeleaf, JavaScript and MySQL.'],
  bullets: [
    ['Gestion des utilisateurs, exécution de code et fonctionnalités d’apprentissage personnalisé.', 'User management, code execution and personalised learning features.'],
    ['Intégration de l’API Groq pour analyser, corriger et optimiser le code, et générer des retours adaptés au niveau de l’utilisateur.', 'Integration of the Groq API to analyse, correct and optimise code and to generate feedback adapted to the user’s level.'],
    ['Assistant IA interactif et transformation de code entre différents langages.', 'Interactive AI assistant and code translation between programming languages.'],
    ['Hackathons de programmation en temps réel avec WebSocket/STOMP, chronomètres synchronisés et gamification.', 'Real-time programming hackathons with WebSocket/STOMP, synchronised timers and gamification.'],
    ['Développement selon Scrum : 5 sprints et 21 user stories.', 'Built with Scrum: 5 sprints and 21 user stories.']
  ],
  features: [
    ['Analyse, correction et transformation de code par IA', 'AI-powered code analysis, correction and transformation'],
    ['Chatbot pédagogique (Groq API / Llama 3.3-70B)', 'Educational chatbot (Groq API / Llama 3.3-70B)'],
    ['Hackathons en temps réel via WebSocket', 'Real-time hackathons over WebSocket'],
    ['Exercices personnalisés et leaderboard', 'Personalised exercises and leaderboard'],
    ['Architecture Spring Boot 3 modulaire', 'Modular Spring Boot 3 architecture']
  ],
  keywords: ['Spring Boot 3', 'Java 17', 'Thymeleaf', 'MySQL', 'WebSocket', 'Groq API', 'Bootstrap 5']
}, {
  name: 'ShopFlow',
  github: 'https://github.com/Ibtihel-Gritli/ShopFlow-',
  category: ['Académique · 2026', 'Academic · 2026'],
  summary: ['Plateforme e-commerce Full-Stack avec rôles Admin, Vendeur et Client.', 'Full-Stack e-commerce platform with Admin, Seller and Customer roles.'],
  description: ['Développement d’une plateforme e-commerce Full-Stack avec Spring Boot et Next.js : produits, panier, commandes, avis et promotions par coupons.', 'Development of a Full-Stack e-commerce platform with Spring Boot and Next.js: products, cart, orders, reviews and coupon promotions.'],
  bullets: [
    ['Architecture backend en couches : API REST, Spring Data JPA, DTO et services transactionnels.', 'Layered backend architecture: REST API, Spring Data JPA, DTOs and transactional services.'],
    ['Authentification sécurisée avec JWT et Spring Security, et autorisations par rôles.', 'Secure authentication with JWT and Spring Security, with role-based authorisation.'],
    ['Gestion des access tokens et des refresh tokens pour protéger les endpoints.', 'Access and refresh token handling to protect the endpoints.'],
    ['Frontend et backend reliés par une communication REST sécurisée, avec Axios Interceptors et des composants Next.js réutilisables.', 'Frontend and backend connected through secure REST calls, using Axios interceptors and reusable Next.js components.']
  ],
  features: [
    ['Rôles Admin / Vendeur / Client', 'Admin / Seller / Customer roles'],
    ['Catalogue, panier, commandes et coupons', 'Catalogue, cart, orders and coupons'],
    ['Authentification JWT (Spring Security 6)', 'JWT authentication (Spring Security 6)'],
    ['Documentation de l’API avec Swagger', 'API documentation with Swagger'],
    ['Architecture en couches (service / repository)', 'Layered architecture (service / repository)']
  ],
  keywords: ['Spring Boot 3', 'Next.js', 'Spring Data JPA', 'JWT', 'Lombok', 'H2', 'Swagger']
}, {
  name: 'EduInsight',
  github: 'https://github.com/Ibtihel-Gritli/EduInsight',
  category: ['Stage IT HOUSE · 2026', 'IT HOUSE internship · 2026'],
  summary: ['Plateforme éducative Full-Stack en architecture MERN.', 'Full-Stack educational platform on the MERN architecture.'],
  description: ['Développement d’une plateforme éducative web Full-Stack basée sur l’architecture MERN (MongoDB, Express.js, React.js, Node.js).', 'Development of a Full-Stack educational web platform based on the MERN architecture (MongoDB, Express.js, React.js, Node.js).'],
  bullets: [
    ['API REST avec Node.js et Express.js, avec structuration des routes et des middlewares.', 'REST APIs with Node.js and Express.js, with structured routes and middlewares.'],
    ['Interfaces web dynamiques avec React.js : composants, hooks et JSX.', 'Dynamic web interfaces with React.js: components, hooks and JSX.'],
    ['Intégration de MongoDB pour la gestion des données et la communication avec le backend.', 'MongoDB integration for data management and communication with the backend.'],
    ['Contribution à la solution, de l’API jusqu’aux interfaces utilisateur.', 'Contribution to the solution, from the API to the user interfaces.']
  ],
  features: [],
  keywords: ['MongoDB', 'Express.js', 'React.js', 'Node.js']
}, {
  name: 'Golden Service',
  github: 'https://github.com/Ibtihel-Gritli/Golden-Service',
  category: ['Académique · 2026', 'Academic · 2026'],
  summary: ['Plateforme web responsive d’achat et de vente de services en ligne.', 'Responsive web platform for buying and selling online services.'],
  description: ['Développement d’une plateforme web responsive dédiée à l’achat et à la vente de services en ligne.', 'Development of a responsive web platform dedicated to buying and selling online services.'],
  bullets: [
    ['Interfaces interactives avec HTML5, CSS et Bootstrap.', 'Interactive interfaces with HTML5, CSS and Bootstrap.'],
    ['Mise en page responsive pour mobiles, tablettes et ordinateurs.', 'Responsive layout for phones, tablets and computers.'],
    ['Interactions JavaScript : validation des formulaires, contenu dynamique, effets de navigation et retours personnalisés à l’utilisateur.', 'JavaScript interactions: form validation, dynamic content, navigation effects and personalised user feedback.']
  ],
  features: [
    ['Catalogue de services avec navigation intuitive', 'Service catalogue with intuitive navigation'],
    ['Chatbot intégré pour l’assistance client', 'Built-in chatbot for customer support'],
    ['Interface responsive (Bootstrap)', 'Responsive interface (Bootstrap)'],
    ['Design moderne et épuré', 'Clean, modern design']
  ],
  keywords: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Chatbot']
}];
var PI = {
  "Codify": "DATA",
  "ShopFlow": "DATA",
  "EduInsight": "DATA",
  "Golden Service": "DATA"
};

const SKILL_ICONS = ['<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>', '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>', '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>', '<path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3"/>', '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z"/>', '<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" opacity=".6"/>', '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><path d="M10 12h4"/>'];

const SKILLS = [
  ['Frontend', 'Frontend', ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React.js', 'Next.js', 'PHP']],
  ['Backend', 'Backend', ['Node.js', 'Express.js', 'Java SE/EE', 'Spring Boot 3', 'Python']],
  ['Bases de données', 'Databases', ['MySQL', 'Oracle', 'H2', 'JPA', 'MongoDB']],
  ['Langages', 'Languages', ['Java', 'Python', 'JavaScript', 'C', 'C++', 'C#']],
  ['Outils', 'Tools', ['Git', 'GitHub', 'Postman', 'Linux', 'REST API', 'Swagger', 'Scrum']],
  ['Architecture', 'Architecture', ['UML', 'MVC', ['POO', 'OOP'],
    ['Architecture en couches', 'Layered architecture']
  ]],
  ['Intelligence artificielle', 'Artificial intelligence', ['API Groq', 'WebSocket / STOMP', 'Deep Learning']]
];

const CERTIFICATES = [
  ['nvidia', 'Fundamentals of Deep Learning', 'NVIDIA · Certificate of Competency', ['Mars 2026', 'March 2026']],
  ['cisco', 'NDG Linux Unhatched', 'Cisco Networking Academy / FSM', ['30 oct. 2024', '30 Oct 2024']],
  ['cyber', 'Workshop Cyber Security', 'IEEE CS Chapter FSM SB & CPU ISIMM', ['21–22 fév. 2026', '21–22 Feb 2026']],
  ['linkedin', 'Workshop LinkedIn & CV Creation', 'IEEE FSM', ['Fév. 2026', 'Feb 2026']]
];

const LABELS = {
  view: ['Voir', 'View'],
  details: ['Détails', 'Details'],
  keyFeatures: ['Fonctionnalités clés', 'Key features'],
  skills: ['Compétences', 'Skills'],
  internshipCertificate: ['Attestation de stage · IT HOUSE, Tunis', 'Internship certificate · IT HOUSE, Tunis']
};

const MARQUEE_ITEMS = ['React.js', 'Node.js', 'Spring Boot', 'Next.js', 'MongoDB', 'MySQL', 'Express.js', 'Groq API', 'Git', 'Postman'];

const HEADLINE = 'Computer Science Student | Full-Stack Developer | Node.js • Spring Boot • React.js • Next.js • Express.js • Python | AI Integration | Building Scalable & High-Performance Web Applications';
const PAGE_META = {
  fr: { title: 'Ibtihel Gritli — Computer Science Student | Full-Stack Developer', description: HEADLINE },
  en: { title: 'Ibtihel Gritli — Computer Science Student | Full-Stack Developer', description: HEADLINE }
};


/* ---------- 3. Page rendering ---------- */
const listOf = (items, tag) => items.map((item) => `<${tag}>${item}</${tag}>`).join('');

function renderContent() {
  // Main navigation
  qs('#main-nav').innerHTML = NAV_LINKS
    .map(([sectionId, label]) => `<a href="#${sectionId}">${translate(label)}</a>`)
    .join('');

  // Education timeline
  qs('#education-timeline').innerHTML = TIMELINE
    .map(([dateFr, dateEn, titleFr, titleEn, placeFr, placeEn]) =>
      '<div class="timeline-item">' +
        `<span class="timeline-date">${translate([dateFr, dateEn])}</span>` +
        `<b>${translate([titleFr, titleEn])}</b>` +
        `<span class="muted">${translate([placeFr, placeEn])}</span>` +
      '</div>')
    .join('');

  // Project cards
  qs('#project-grid').innerHTML = PROJECTS
    .map((project, index) => {
      const imageY = PROJECT_IMAGE_POSITION[project.name] || '0%';
      return `<article class="project-card reveal is-visible" style="--image:url(${PROJECT_IMAGES[project.name]});--image-y:${imageY}">` +
        `<div class="card-category">${translate(project.category)}</div>` +
        `<h3>${project.name}</h3>` +
        `<p>${translate(project.summary)}</p>` +
        `<div class="tech-tags">${listOf(project.keywords.slice(0, 5), 'span')}</div>` +
        '<div class="card-actions">' +
          `<button class="btn btn-solid" onclick="openProject(${index})">${translate(LABELS.details)}</button>` +
          `<a class="btn" href="${project.github}" target="_blank" rel="noopener">GitHub</a>` +
        '</div>' +
      '</article>';
    })
    .join('');

  // Skill cards
  qs('#skills-grid').innerHTML = SKILLS
    .map(([titleFr, titleEn, skills], index) => {
      const chips = skills
        .map((skill, position) =>
          `<span class="skill-chip" style="--index:${position}">${Array.isArray(skill) ? translate(skill) : skill}</span>`)
        .join('');
      return '<div class="skill-card">' +
        '<div class="skill-header">' +
          `<span class="skill-icon"><svg viewBox="0 0 24 24">${SKILL_ICONS[index]}</svg></span>` +
          `<h3>${translate([titleFr, titleEn])}</h3>` +
          `<span class="skill-count">${skills.length}</span>` +
        '</div>' +
        `<div>${chips}</div>` +
      '</div>';
    })
    .join('');

  // Certification & workshop cards
  qs('#certification-list').innerHTML = CERTIFICATES
    .map(([key, title, organisation, date]) => {
      const type = (key === 'nvidia' || key === 'cisco') ? 'Certification' : 'Workshop';
      return '<article class="certificate-card">' +
        `<button class="certificate-thumb" onclick="openCertificate('${key}')" aria-label="${translate(LABELS.view)} ${title}">` +
          `<img src="${CERTIFICATE_IMAGES[key]}" alt="" loading="lazy">` +
          `<span class="certificate-type">${type}</span>` +
        '</button>' +
        '<div class="certificate-info">' +
          `<b>${title}</b>` +
          `<span class="certificate-org">${escapeHtml(organisation)}</span>` +
          `<span class="certificate-date">${translate(date)}</span>` +
        '</div>' +
        `<button class="btn" onclick="openCertificate('${key}')">${translate(LABELS.view)}</button>` +
      '</article>';
    })
    .join('');
}


/* ---------- 4. Modals ---------- */
function openProject(index) {
  const project = PROJECTS[index];
  let html = `<h3>${project.name}</h3>` +
    `<p class="muted">${translate(project.category)}</p>` +
    `<p style="margin-top:14px">${translate(project.description)}</p>` +
    `<ul class="bullet-list">${listOf(project.bullets.map(translate), 'li')}</ul>`;
  if (project.features.length) {
    html += `<h4>${translate(LABELS.keyFeatures)}</h4>` +
      `<ul class="bullet-list">${listOf(project.features.map(translate), 'li')}</ul>`;
  }
  html += `<h4>${translate(LABELS.skills)}</h4>` +
    `<div class="tech-tags">${listOf(project.keywords, 'span')}</div>` +
    '<div style="margin-top:24px">' +
      `<a class="btn btn-solid" href="${project.github}" target="_blank" rel="noopener">GitHub</a>` +
    '</div>';
  qs('#project-modal-body').innerHTML = html;
  qs('#project-modal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function openCertificate(key) {
  const certificate = CERTIFICATES.find((item) => item[0] === key);
  qs('#certificate-title').textContent = certificate ? certificate[1] : translate(LABELS.internshipCertificate);
  qs('#certificate-image').src = CERTIFICATE_IMAGES[key];
  qs('#certificate-modal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModals() {
  qsAll('.modal').forEach((modal) => modal.classList.remove('is-open'));
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModals();
});


/* ---------- 5. Language & theme ---------- */
// Remember the original French text of every translatable element.
qsAll('[data-en]').forEach((element) => { element.dataset.fr = element.innerHTML; });

function setLanguage(lang, save) {
  currentLang = lang;
  document.documentElement.lang = lang;
  qsAll('[data-en]').forEach((element) => {
    element.innerHTML = lang === 'en' ? element.dataset.en : element.dataset.fr;
  });
  document.title = PAGE_META[lang].title;
  qs('meta[name=description]').content = PAGE_META[lang].description;
  qs('#language-toggle').textContent = lang === 'fr' ? 'EN' : 'FR';
  qs('#contact-email').previousElementSibling.textContent = 'Email';
  renderContent();
  observeRevealElements();
  if (save) {
    try { localStorage.setItem('lang', lang); } catch (error) {}
  }
}

qs('#language-toggle').onclick = () => setLanguage(currentLang === 'fr' ? 'en' : 'fr', true);

qs('#theme-toggle').onclick = () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (error) {}
};

qs('#menu-toggle').onclick = () => qs('#site-header').classList.toggle('is-open');
qs('#main-nav').onclick = () => qs('#site-header').classList.remove('is-open');


/* ---------- 6. Contact form & CV ---------- */
function viewCv() {
  window.open(CV_FILE, '_blank');
}

function downloadCv() {
  const link = document.createElement('a');
  link.href = CV_FILE;
  link.download = 'Gritli-Ibtihel-CV.pdf';
  link.click();
}

// Opens the visitor's mail app with the form content.
function sendContactForm(event) {
  event.preventDefault();
  const isFrench = currentLang === 'fr';
  const name = qs('#contact-name').value;
  const body = (isFrench ? 'Nom : ' : 'Name: ') + name +
    '\nEmail : ' + qs('#contact-email').value +
    '\n' + (isFrench ? 'Téléphone : ' : 'Phone: ') + qs('#contact-phone').value +
    '\n\n' + qs('#contact-message').value;
  location.href = 'mailto:gritliibtihelle@gmail.com' +
    '?subject=' + encodeURIComponent('Contact portfolio — ' + name) +
    '&body=' + encodeURIComponent(body);
  return false;
}


/* ---------- 7. Hero ID card ---------- */
// Draw the fake barcode on both sides of the card.
qsAll('.barcode').forEach((barcode) => {
  for (let i = 0; i < 34; i++) {
    const stripe = document.createElement('b');
    stripe.style.width = (1 + (i * 7 % 3)) + 'px';
    barcode.appendChild(stripe);
  }
});

const idCard = qs('#id-card');
let autoFlipTimer;

function startAutoFlip() {
  clearInterval(autoFlipTimer);
  autoFlipTimer = setInterval(() => idCard.classList.toggle('is-flipped'), 3600);
}

idCard.addEventListener('click', () => {
  idCard.classList.toggle('is-flipped');
  startAutoFlip();
});
idCard.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') idCard.click();
});


/* ---------- 8. Scroll effects ---------- */
// Counters (animated when they enter the screen)
function animateCounter(element) {
  const target = +element.dataset.count;
  if (prefersReducedMotion) {
    element.textContent = target;
    return;
  }
  let startTime = null;
  (function step(now) {
    startTime = startTime || now;
    const progress = Math.min((now - startTime) / 1800, 1);
    element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(step);
  })(performance.now());
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      counterObserver.unobserve(entry.target);
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.6 });
qsAll('[data-count]').forEach((element) => counterObserver.observe(element));

// Technology marquee (the list is doubled for a seamless loop)
const marqueeHtml = MARQUEE_ITEMS.map((item) => `<span>${item}</span><span>✦</span>`).join('');
qs('#marquee-track').innerHTML = marqueeHtml + marqueeHtml;

// Reveal-on-scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeRevealElements() {
  qsAll('.reveal:not(.is-visible)').forEach((element) => revealObserver.observe(element));
}

// Header style + hero words parallax
const heroWords = qs('#hero-words');
const siteHeader = qs('#site-header');
let scrollTicking = false;

function updateOnScroll() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  siteHeader.classList.toggle('is-scrolled', scrollY > 40);
  if (!prefersReducedMotion && scrollY < viewportHeight * 1.2) {
    heroWords.style.transform = `translateY(${scrollY * 0.18}px)`;
    heroWords.style.opacity = Math.max(0, 1 - scrollY / (viewportHeight * 0.9));
  }
  scrollTicking = false;
}

addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(updateOnScroll);
  }
}, { passive: true });

updateOnScroll();
setLanguage(currentLang, false);


/* ---------- 9. Page loader ---------- */
(function runLoader() {
  const loader = qs('#page-loader');
  const loaderBar = qs('#loader-bar');
  const loaderPercent = qs('#loader-percent');
  const startTime = performance.now();
  const DURATION = 2200;
  let pageLoaded = document.readyState === 'complete';
  let finished = false;

  if (!pageLoaded) addEventListener('load', () => { pageLoaded = true; });

  function finish() {
    if (finished) return;
    finished = true;
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    setTimeout(() => loader.remove(), 900);
    if (!prefersReducedMotion) {
      setTimeout(() => {
        idCard.classList.add('is-flipped');
        startAutoFlip();
      }, 3100);
    }
  }

  if (prefersReducedMotion) {
    finish();
    return;
  }

  (function step(now) {
    let progress = Math.min((now - startTime) / DURATION, 1);
    progress = 1 - Math.pow(1 - progress, 2.2);
    let percent = Math.round(progress * 100);
    if (!pageLoaded && percent > 99) percent = 99;   // wait for the page to finish loading
    loaderBar.style.width = percent + '%';
    loaderPercent.textContent = percent + '%';
    if (percent >= 100) setTimeout(finish, 300);
    else requestAnimationFrame(step);
  })(startTime);
})();


/* ---------- 10. Scroll progress bar & active menu link ---------- */
(function initScrollIndicators() {
  const progressBar = qs('#scroll-progress');
  let ticking = false;

  function updateProgress() {
    ticking = false;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
  }

  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  updateProgress();

  const menuLinks = qsAll('#main-nav a[href^="#"]');
  if (menuLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        menuLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    menuLinks.forEach((link) => {
      const section = qs(link.getAttribute('href'));
      if (section) sectionObserver.observe(section);
    });
  }
})();
