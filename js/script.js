/* ============================================================
   SCRIPT DU PORTFOLIO
   - Les textes et les listes sont dans data.js
   - Ici, il y a seulement les fonctions qui font vivre le site
   ============================================================ */


/* ------------------------------------------------------------
   1. PETITS OUTILS
   ------------------------------------------------------------ */

// Raccourcis : $('#id') trouve un élément, $$('.classe') en trouve plusieurs
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// Vrai si le visiteur a demandé moins d'animations (réglage du téléphone / PC)
const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;

// Empêche un texte de casser le HTML
function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}


/* ------------------------------------------------------------
   2. LANGUE (français / anglais)
   ------------------------------------------------------------ */

// La langue de départ : celle enregistrée, sinon celle du navigateur
function getStartLanguage() {
  let saved = null;
  try {
    saved = localStorage.getItem('lang');
  } catch (error) {}

  if (saved) {
    return saved;
  }
  return (navigator.language || 'fr').slice(0, 2) === 'fr' ? 'fr' : 'en';
}

let language = getStartLanguage();

// Choisit le bon texte dans un objet { fr: "...", en: "..." }
function translate(text) {
  return text[language];
}

// Garde le texte français des éléments qui ont un attribut data-en
function saveFrenchTexts() {
  $$('[data-en]').forEach(function (element) {
    element.dataset.fr = element.innerHTML;
  });
}

function setLanguage(newLanguage, save) {
  language = newLanguage;
  document.documentElement.lang = newLanguage;

  // Textes écrits directement dans index.html
  $$('[data-en]').forEach(function (element) {
    element.innerHTML = newLanguage === 'en' ? element.dataset.en : element.dataset.fr;
  });

  // Le bouton montre la langue vers laquelle on peut changer
  $('#language-button').textContent = newLanguage === 'fr' ? 'EN' : 'FR';

  // Textes construits par le JavaScript (menu, projets, compétences...)
  showAll();
  watchReveals();

  if (save) {
    try {
      localStorage.setItem('lang', newLanguage);
    } catch (error) {}
  }
}

function toggleLanguage() {
  setLanguage(language === 'fr' ? 'en' : 'fr', true);
}


/* ------------------------------------------------------------
   3. THÈME (sombre / clair) ET MENU MOBILE
   ------------------------------------------------------------ */

// Le site démarre toujours en mode sombre (voir <html data-theme="dark">)
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
}

function toggleMenu() {
  $('.site-header').classList.toggle('open');
}

function closeMenu() {
  $('.site-header').classList.remove('open');
}


/* ------------------------------------------------------------
   4. AFFICHAGE DES LISTES (données de data.js)
   ------------------------------------------------------------ */

function showMenu() {
  $('#nav').innerHTML = menuLinks.map(function (link) {
    return '<a href="#' + link.id + '">' + translate(link.text) + '</a>';
  }).join('');
  markActiveLink();
}

function showEducation() {
  $('#education-list').innerHTML = education.map(function (item) {
    return '<div class="timeline-item">'
      + '<span class="date">' + translate(item.date) + '</span>'
      + '<b>' + translate(item.title) + '</b>'
      + '<span class="muted">' + translate(item.school) + '</span>'
      + '</div>';
  }).join('');
}

function showProjects() {
  $('#projects-list').innerHTML = projects.map(function (project, index) {
    // Sur la carte, on montre seulement les 5 premières technologies
    const tools = project.tools.slice(0, 5).map(function (tool) {
      return '<span>' + tool + '</span>';
    }).join('');

    // Adresse complète de l'image : le CSS est dans un autre dossier, donc le chemin court ne marcherait pas
    const imageUrl = new URL(project.image, document.baseURI).href;

    return '<article class="project-card reveal visible" style="--image:url(' + imageUrl + ');--image-y:' + project.imagePosition + '">'
      + '<div class="project-type">' + translate(project.type) + '</div>'
      + '<h3>' + project.name + '</h3>'
      + '<p>' + translate(project.summary) + '</p>'
      + '<div class="tags">' + tools + '</div>'
      + '<div class="project-buttons">'
      + '<button class="btn btn-solid" onclick="openProject(' + index + ')">' + translate(labels.details) + '</button>'
      + '<a class="btn" href="' + project.github + '" target="_blank" rel="noopener">GitHub</a>'
      + '</div>'
      + '</article>';
  }).join('');
}

function showSkills() {
  $('#skills-list').innerHTML = skills.map(function (group) {
    const tags = group.items.map(function (item, index) {
      // Un item peut être un simple mot ou un texte { fr, en }
      const name = typeof item === 'string' ? item : translate(item);
      return '<span class="skill-tag" style="--index:' + index + '">' + name + '</span>';
    }).join('');

    return '<div class="skill-group">'
      + '<div class="skill-header">'
      + '<span class="skill-icon"><svg viewBox="0 0 24 24">' + group.icon + '</svg></span>'
      + '<h3>' + translate(group.title) + '</h3>'
      + '<span class="skill-count">' + group.items.length + '</span>'
      + '</div>'
      + '<div>' + tags + '</div>'
      + '</div>';
  }).join('');
}

function showCertificates() {
  $('#certificates-list').innerHTML = certificates.map(function (certificate) {
    const open = 'openCertificate(\'' + certificate.id + '\')';

    return '<article class="cert-card">'
      + '<button class="cert-thumb" onclick="' + open + '" aria-label="' + translate(labels.view) + ' ' + certificate.title + '">'
      + '<img src="' + certificate.image + '" alt="" loading="lazy">'
      + '<span class="cert-type">' + certificate.type + '</span>'
      + '</button>'
      + '<div class="cert-info">'
      + '<b>' + certificate.title + '</b>'
      + '<span class="cert-organization">' + escapeHtml(certificate.organization) + '</span>'
      + '<span class="cert-date">' + translate(certificate.date) + '</span>'
      + '</div>'
      + '<button class="btn" onclick="' + open + '">' + translate(labels.view) + '</button>'
      + '</article>';
  }).join('');
}

function showAll() {
  showMenu();
  showEducation();
  showProjects();
  showSkills();
  showCertificates();
}


/* ------------------------------------------------------------
   5. POPUPS (détails d'un projet, image d'un certificat)
   ------------------------------------------------------------ */

// Fabrique une liste à puces à partir d'une liste de textes { fr, en }
function makeBulletList(texts) {
  return '<ul class="bullet-list">' + texts.map(function (text) {
    return '<li>' + translate(text) + '</li>';
  }).join('') + '</ul>';
}

function openProject(index) {
  const project = projects[index];

  let content = '<h3>' + project.name + '</h3>'
    + '<p class="muted">' + translate(project.type) + '</p>'
    + '<p>' + translate(project.description) + '</p>'
    + makeBulletList(project.tasks);

  if (project.features.length > 0) {
    content += '<h4>' + translate(labels.features) + '</h4>' + makeBulletList(project.features);
  }

  const tools = project.tools.map(function (tool) {
    return '<span>' + tool + '</span>';
  }).join('');

  content += '<h4>' + translate(labels.skills) + '</h4>'
    + '<div class="tags">' + tools + '</div>'
    + '<div class="popup-link"><a class="btn btn-solid" href="' + project.github + '" target="_blank" rel="noopener">GitHub</a></div>';

  $('#project-popup-content').innerHTML = content;
  $('#project-popup').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openCertificate(id) {
  // Si l'id n'est pas dans la liste, c'est l'attestation de stage
  const certificate = certificates.find(function (item) {
    return item.id === id;
  });

  $('#certificate-title').textContent = certificate ? certificate.title : translate(internshipCertificate.title);
  $('#certificate-image').src = certificate ? certificate.image : internshipCertificate.image;
  $('#certificate-popup').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePopups() {
  $$('.popup').forEach(function (popup) {
    popup.classList.remove('open');
  });
  document.body.style.overflow = '';
}

// Ferme le popup quand on clique sur le fond sombre (pas sur la boîte blanche)
function closeOnBackground(event) {
  if (event.target === event.currentTarget) {
    closePopups();
  }
}


/* ------------------------------------------------------------
   6. ANIMATIONS : chiffres, mots qui défilent, apparition
   ------------------------------------------------------------ */

// Fait monter un chiffre de 0 jusqu'à sa valeur (data-count)
function countUp(element) {
  const target = Number(element.dataset.count);

  if (reduceMotion) {
    element.textContent = target;
    return;
  }

  const duration = 1800;
  let startTime = null;

  function step(time) {
    startTime = startTime || time;
    const progress = Math.min((time - startTime) / duration, 1);
    const easing = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * easing);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  step(performance.now());
}

// Lance le compteur quand le chiffre devient visible
const counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      counterObserver.unobserve(entry.target);
      countUp(entry.target);
    }
  });
}, { threshold: 0.6 });

function startCounters() {
  $$('[data-count]').forEach(function (element) {
    counterObserver.observe(element);
  });
}

// Bande de mots qui défile (la liste est écrite 2 fois pour boucler sans coupure)
function buildMarquee() {
  const words = marqueeWords.map(function (word) {
    return '<span>' + word + '</span><span>✦</span>';
  }).join('');
  $('#marquee-words').innerHTML = words + words;
}

// Ajoute la classe "visible" quand un bloc .reveal entre dans l'écran
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function watchReveals() {
  $$('.reveal:not(.visible)').forEach(function (element) {
    revealObserver.observe(element);
  });
}


/* ------------------------------------------------------------
   7. CV ET FORMULAIRE DE CONTACT
   ------------------------------------------------------------ */

// Le formulaire ouvre l'application mail avec le message prêt à envoyer
function sendMessage(event) {
  event.preventDefault();

  const name = $('#contact-name').value;
  const email = $('#contact-email').value;
  const phone = $('#contact-phone').value;
  const message = $('#contact-message').value;
  const french = language === 'fr';

  const body = (french ? 'Nom : ' : 'Name: ') + name + '\n'
    + 'Email : ' + email + '\n'
    + (french ? 'Téléphone : ' : 'Phone: ') + phone + '\n\n'
    + message;

  location.href = 'mailto:gritliibtihelle@gmail.com'
    + '?subject=' + encodeURIComponent('Contact portfolio — ' + name)
    + '&body=' + encodeURIComponent(body);

  return false;
}


/* ------------------------------------------------------------
   8. CARTE BADGE DE L'ACCUEIL (elle se retourne)
   ------------------------------------------------------------ */

const flipCard = $('.flip-card');
let autoFlipTimer;

// Dessine les petites barres du code-barres sur la carte
function buildBarcodes() {
  $$('.barcode').forEach(function (barcode) {
    for (let i = 0; i < 34; i++) {
      const bar = document.createElement('b');
      bar.style.width = (1 + (i * 7 % 3)) + 'px';
      barcode.appendChild(bar);
    }
  });
}

// La carte se retourne toute seule toutes les 3,6 secondes
function startAutoFlip() {
  clearInterval(autoFlipTimer);
  autoFlipTimer = setInterval(function () {
    flipCard.classList.toggle('flipped');
  }, 3600);
}

function flipByClick() {
  flipCard.classList.toggle('flipped');
  startAutoFlip();
}


/* ------------------------------------------------------------
   9. SCROLL : barre du haut, mots de l'accueil, progression, menu actif
   ------------------------------------------------------------ */

const header = $('.site-header');
const heroWords = $('.hero-words');
const progressBar = $('#scroll-progress');
let scrollWaiting = false;

function updateOnScroll() {
  const scrolled = window.scrollY;
  const screenHeight = window.innerHeight;

  // La barre du haut prend un fond après un petit scroll
  header.classList.toggle('scrolled', scrolled > 40);

  // Les mots de l'accueil descendent doucement et disparaissent
  if (!reduceMotion && scrolled < screenHeight * 1.2) {
    heroWords.style.transform = 'translateY(' + scrolled * 0.18 + 'px)';
    heroWords.style.opacity = Math.max(0, 1 - scrolled / (screenHeight * 0.9));
  }

  // Barre de progression en haut de la page
  const maxScroll = document.documentElement.scrollHeight - screenHeight;
  progressBar.style.transform = 'scaleX(' + (maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0) + ')';

  scrollWaiting = false;
}

// On limite le calcul à une fois par image (plus fluide)
function onScroll() {
  if (!scrollWaiting) {
    scrollWaiting = true;
    requestAnimationFrame(updateOnScroll);
  }
}

// L'id de la section qu'on est en train de regarder
let activeSectionId = '';

// Met en couleur le lien du menu qui correspond à cette section
function markActiveLink() {
  $$('#nav a').forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + activeSectionId);
  });
}

// Repère la section visible au milieu de l'écran
function highlightMenu() {
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activeSectionId = entry.target.id;
        markActiveLink();
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  menuLinks.forEach(function (link) {
    const section = document.getElementById(link.id);
    if (section) {
      sectionObserver.observe(section);
    }
  });
}


/* ------------------------------------------------------------
   10. ÉCRAN DE CHARGEMENT
   ------------------------------------------------------------ */

function runLoader() {
  const loader = $('#loader');
  const fill = $('.loader-fill');
  const percentText = $('.loader-percent');
  const startTime = performance.now();
  const duration = 2200;
  let pageReady = document.readyState === 'complete';
  let finished = false;

  if (!pageReady) {
    addEventListener('load', function () {
      pageReady = true;
    });
  }

  // Fin du chargement : le rideau monte et le site apparaît
  function finish() {
    if (finished) {
      return;
    }
    finished = true;

    loader.classList.add('done');
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    setTimeout(function () {
      loader.remove();
    }, 900);

    // Après l'animation d'entrée, la carte badge se retourne
    if (!reduceMotion) {
      setTimeout(function () {
        flipCard.classList.add('flipped');
        startAutoFlip();
      }, 3100);
    }
  }

  if (reduceMotion) {
    finish();
    return;
  }

  // Le pourcentage monte de 0 à 100
  function step(time) {
    let progress = Math.min((time - startTime) / duration, 1);
    progress = 1 - Math.pow(1 - progress, 2.2);
    let percent = Math.round(progress * 100);

    // On attend que la page soit vraiment chargée avant d'afficher 100%
    if (!pageReady && percent > 99) {
      percent = 99;
    }

    fill.style.width = percent + '%';
    percentText.textContent = percent + '%';

    if (percent >= 100) {
      setTimeout(finish, 300);
    } else {
      requestAnimationFrame(step);
    }
  }
  step(startTime);
}


/* ------------------------------------------------------------
   11. DÉMARRAGE : on branche tout
   ------------------------------------------------------------ */

// Boutons de la barre du haut
$('#language-button').onclick = toggleLanguage;
$('#theme-button').onclick = toggleTheme;
$('#menu-button').onclick = toggleMenu;
$('#nav').onclick = closeMenu;

// Touche Échap : ferme les popups
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closePopups();
  }
});

// Carte badge : clic ou touche Entrée pour la retourner
flipCard.addEventListener('click', flipByClick);
flipCard.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    flipCard.click();
  }
});

// Scroll
addEventListener('scroll', onScroll, { passive: true });

// Mise en route
saveFrenchTexts();
startCounters();
buildMarquee();
buildBarcodes();
setLanguage(language, false);
updateOnScroll();
highlightMenu();
runLoader();
