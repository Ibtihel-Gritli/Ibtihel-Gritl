/* ============================================================
   DONNÉES DU PORTFOLIO
   Pour modifier un texte, change-le ici : le site se met à jour.
   Chaque texte a deux versions : fr (français) et en (anglais).
   ============================================================ */

/* ----- Menu de navigation (id = id de la section dans index.html) ----- */
const menuLinks = [
  { id: "about", text: { fr: "À propos", en: "About" } },
  { id: "education", text: { fr: "Parcours", en: "Education" } },
  { id: "experience", text: { fr: "Expérience", en: "Experience" } },
  { id: "projects", text: { fr: "Projets", en: "Projects" } },
  { id: "skills", text: { fr: "Compétences", en: "Skills" } },
  { id: "certificates", text: { fr: "Certifications", en: "Certifications" } },
  { id: "contact", text: { fr: "Contact", en: "Contact" } }
];

/* ----- Parcours (formation) ----- */
const education = [
  {
    date: { fr: "2026 → en cours", en: "2026 → ongoing" },
    title: { fr: "3ème année Licence GLSI", en: "3rd Year GLSI Student" },
    school: { fr: "Faculté des Sciences de Monastir", en: "Faculty of Sciences of Monastir" }
  },
  {
    date: { fr: "2025 – 2026", en: "2025 – 2026" },
    title: { fr: "2ème année Licence LGLSI", en: "2nd Year LGLSI Student" },
    school: { fr: "Faculté des Sciences de Monastir", en: "Faculty of Sciences of Monastir" }
  },
  {
    date: { fr: "2024 – 2025", en: "2024 – 2025" },
    title: { fr: "1ère année Licence LSI", en: "1st Year LSI Student" },
    school: { fr: "Faculté des Sciences de Monastir", en: "Faculty of Sciences of Monastir" }
  },
  {
    date: { fr: "2024", en: "2024" },
    title: { fr: "Baccalauréat Informatique, mention Bien", en: "Computer Science Baccalaureate, with honours" },
    school: { fr: "Lycée El Bosten, Kélibia", en: "El Bosten high school, Kélibia" }
  }
];

/* ----- Projets ----- */
const projects = [
  {
    name: "Codify",
    github: "https://github.com/Ibtihel-Gritli/Codify",
    image: "images/projects/codify.webp",
    imagePosition: "0%",
    type: { fr: "PFA 2026", en: "PFA 2026" },
    summary: { fr: "Plateforme d’apprentissage de la programmation assistée par IA.", en: "Programming learning platform assisted by AI." },
    description: { fr: "Conception et développement d’une plateforme d’apprentissage Full-Stack assistée par IA avec Spring Boot, Thymeleaf, JavaScript et MySQL.", en: "Design and development of a Full-Stack, AI-assisted learning platform built with Spring Boot, Thymeleaf, JavaScript and MySQL." },
    tasks: [
      { fr: "Gestion des utilisateurs, exécution de code et fonctionnalités d’apprentissage personnalisé.", en: "User management, code execution and personalised learning features." },
      { fr: "Intégration de l’API Groq pour analyser, corriger et optimiser le code, et générer des retours adaptés au niveau de l’utilisateur.", en: "Integration of the Groq API to analyse, correct and optimise code and to generate feedback adapted to the user’s level." },
      { fr: "Assistant IA interactif et transformation de code entre différents langages.", en: "Interactive AI assistant and code translation between programming languages." },
      { fr: "Hackathons de programmation en temps réel avec WebSocket/STOMP, chronomètres synchronisés et gamification.", en: "Real-time programming hackathons with WebSocket/STOMP, synchronised timers and gamification." },
      { fr: "Développement selon Scrum : 5 sprints et 21 user stories.", en: "Built with Scrum: 5 sprints and 21 user stories." }
    ],
    features: [
      { fr: "Analyse, correction et transformation de code par IA", en: "AI-powered code analysis, correction and transformation" },
      { fr: "Chatbot pédagogique (Groq API / Llama 3.3-70B)", en: "Educational chatbot (Groq API / Llama 3.3-70B)" },
      { fr: "Hackathons en temps réel via WebSocket", en: "Real-time hackathons over WebSocket" },
      { fr: "Exercices personnalisés et leaderboard", en: "Personalised exercises and leaderboard" },
      { fr: "Architecture Spring Boot 3 modulaire", en: "Modular Spring Boot 3 architecture" }
    ],
    tools: ["Spring Boot 3", "Java 17", "Thymeleaf", "MySQL", "WebSocket", "Groq API", "Bootstrap 5"]
  },
  {
    name: "ShopFlow",
    github: "https://github.com/Ibtihel-Gritli/ShopFlow-",
    image: "images/projects/shopflow.webp",
    imagePosition: "10%",
    type: { fr: "Académique · 2026", en: "Academic · 2026" },
    summary: { fr: "Plateforme e-commerce Full-Stack avec rôles Admin, Vendeur et Client.", en: "Full-Stack e-commerce platform with Admin, Seller and Customer roles." },
    description: { fr: "Développement d’une plateforme e-commerce Full-Stack avec Spring Boot et Next.js : produits, panier, commandes, avis et promotions par coupons.", en: "Development of a Full-Stack e-commerce platform with Spring Boot and Next.js: products, cart, orders, reviews and coupon promotions." },
    tasks: [
      { fr: "Architecture backend en couches : API REST, Spring Data JPA, DTO et services transactionnels.", en: "Layered backend architecture: REST API, Spring Data JPA, DTOs and transactional services." },
      { fr: "Authentification sécurisée avec JWT et Spring Security, et autorisations par rôles.", en: "Secure authentication with JWT and Spring Security, with role-based authorisation." },
      { fr: "Gestion des access tokens et des refresh tokens pour protéger les endpoints.", en: "Access and refresh token handling to protect the endpoints." },
      { fr: "Frontend et backend reliés par une communication REST sécurisée, avec Axios Interceptors et des composants Next.js réutilisables.", en: "Frontend and backend connected through secure REST calls, using Axios interceptors and reusable Next.js components." }
    ],
    features: [
      { fr: "Rôles Admin / Vendeur / Client", en: "Admin / Seller / Customer roles" },
      { fr: "Catalogue, panier, commandes et coupons", en: "Catalogue, cart, orders and coupons" },
      { fr: "Authentification JWT (Spring Security 6)", en: "JWT authentication (Spring Security 6)" },
      { fr: "Documentation de l’API avec Swagger", en: "API documentation with Swagger" },
      { fr: "Architecture en couches (service / repository)", en: "Layered architecture (service / repository)" }
    ],
    tools: ["Spring Boot 3", "Next.js", "Spring Data JPA", "JWT", "Lombok", "H2", "Swagger"]
  },
  {
    name: "EduInsight",
    github: "https://github.com/Ibtihel-Gritli/EduInsight",
    image: "images/projects/eduinsight.webp",
    imagePosition: "0%",
    type: { fr: "Stage IT HOUSE · 2026", en: "IT HOUSE internship · 2026" },
    summary: { fr: "Plateforme éducative Full-Stack en architecture MERN.", en: "Full-Stack educational platform on the MERN architecture." },
    description: { fr: "Développement d’une plateforme éducative web Full-Stack basée sur l’architecture MERN (MongoDB, Express.js, React.js, Node.js).", en: "Development of a Full-Stack educational web platform based on the MERN architecture (MongoDB, Express.js, React.js, Node.js)." },
    tasks: [
      { fr: "API REST avec Node.js et Express.js, avec structuration des routes et des middlewares.", en: "REST APIs with Node.js and Express.js, with structured routes and middlewares." },
      { fr: "Interfaces web dynamiques avec React.js : composants, hooks et JSX.", en: "Dynamic web interfaces with React.js: components, hooks and JSX." },
      { fr: "Intégration de MongoDB pour la gestion des données et la communication avec le backend.", en: "MongoDB integration for data management and communication with the backend." },
      { fr: "Contribution à la solution, de l’API jusqu’aux interfaces utilisateur.", en: "Contribution to the solution, from the API to the user interfaces." }
    ],
    features: [],
    tools: ["MongoDB", "Express.js", "React.js", "Node.js"]
  },
  {
    name: "Golden Service",
    github: "https://github.com/Ibtihel-Gritli/Golden-Service",
    image: "images/projects/golden-service.webp",
    imagePosition: "0%",
    type: { fr: "Académique · 2026", en: "Academic · 2026" },
    summary: { fr: "Plateforme web responsive d’achat et de vente de services en ligne.", en: "Responsive web platform for buying and selling online services." },
    description: { fr: "Développement d’une plateforme web responsive dédiée à l’achat et à la vente de services en ligne.", en: "Development of a responsive web platform dedicated to buying and selling online services." },
    tasks: [
      { fr: "Interfaces interactives avec HTML5, CSS et Bootstrap.", en: "Interactive interfaces with HTML5, CSS and Bootstrap." },
      { fr: "Mise en page responsive pour mobiles, tablettes et ordinateurs.", en: "Responsive layout for phones, tablets and computers." },
      { fr: "Interactions JavaScript : validation des formulaires, contenu dynamique, effets de navigation et retours personnalisés à l’utilisateur.", en: "JavaScript interactions: form validation, dynamic content, navigation effects and personalised user feedback." }
    ],
    features: [
      { fr: "Catalogue de services avec navigation intuitive", en: "Service catalogue with intuitive navigation" },
      { fr: "Chatbot intégré pour l’assistance client", en: "Built-in chatbot for customer support" },
      { fr: "Interface responsive (Bootstrap)", en: "Responsive interface (Bootstrap)" },
      { fr: "Design moderne et épuré", en: "Clean, modern design" }
    ],
    tools: ["HTML", "CSS", "JavaScript", "Bootstrap", "Chatbot"]
  }
];

/* ----- Compétences (icon = dessin SVG de l'icône) ----- */
const skills = [
  {
    title: { fr: "Frontend", en: "Frontend" },
    icon: "<rect x=\"3\" y=\"4\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/>",
    items: ["HTML", "CSS", "JavaScript", "Bootstrap", "React.js", "Next.js", "PHP"]
  },
  {
    title: { fr: "Backend", en: "Backend" },
    icon: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"7\" rx=\"2\"/><rect x=\"3\" y=\"14\" width=\"18\" height=\"7\" rx=\"2\"/><path d=\"M7 6.5h.01M7 17.5h.01\"/>",
    items: ["Node.js", "Express.js", "Java SE/EE", "Spring Boot 3", "Python"]
  },
  {
    title: { fr: "Bases de données", en: "Databases" },
    icon: "<ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"3\"/><path d=\"M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3\"/>",
    items: ["MySQL", "Oracle", "H2", "JPA", "MongoDB"]
  },
  {
    title: { fr: "Langages", en: "Languages" },
    icon: "<path d=\"M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3\"/>",
    items: ["Java", "Python", "JavaScript", "C", "C++", "C#"]
  },
  {
    title: { fr: "Outils", en: "Tools" },
    icon: "<path d=\"M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z\"/>",
    items: ["Git", "GitHub", "Postman", "Linux", "REST API", "Swagger", "Scrum"]
  },
  {
    title: { fr: "Architecture", en: "Architecture" },
    icon: "<path d=\"M12 3 3 8l9 5 9-5z\"/><path d=\"M3 13l9 5 9-5M3 17.5l9 5 9-5\" opacity=\".6\"/>",
    items: ["UML", "MVC", { fr: "POO", en: "OOP" }, { fr: "Architecture en couches", en: "Layered architecture" }]
  },
  {
    title: { fr: "Intelligence artificielle", en: "Artificial intelligence" },
    icon: "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4\"/><path d=\"M10 12h4\"/>",
    items: ["API Groq", "WebSocket / STOMP", "Deep Learning"]
  }
];

/* ----- Certifications et workshops ----- */
const certificates = [
  {
    id: "nvidia",
    title: "Fundamentals of Deep Learning",
    organization: "NVIDIA · Certificate of Competency",
    date: { fr: "Mars 2026", en: "March 2026" },
    type: "Certification",
    image: "images/certificates/nvidia.jpg"
  },
  {
    id: "cisco",
    title: "NDG Linux Unhatched",
    organization: "Cisco Networking Academy / FSM",
    date: { fr: "30 oct. 2024", en: "30 Oct 2024" },
    type: "Certification",
    image: "images/certificates/cisco.jpg"
  },
  {
    id: "aws-ec2",
    title: "Introduction to Amazon EC2 (Français)",
    organization: "AWS Training & Certification",
    date: { fr: "26 oct. 2026", en: "26 Oct 2026" },
    type: "Certification",
    image: "images/certificates/aws-ec2.jpg"
  },
  {
    id: "aws-s3",
    title: "Introduction to Amazon S3 (Français)",
    organization: "AWS Training & Certification",
    date: { fr: "28 oct. 2026", en: "28 Oct 2026" },
    type: "Certification",
    image: "images/certificates/aws-s3.jpg"
  },
  {
    id: "cyber-security",
    title: "Workshop Cyber Security",
    organization: "IEEE CS Chapter FSM SB & CPU ISIMM",
    date: { fr: "21–22 fév. 2026", en: "21–22 Feb 2026" },
    type: "Workshop",
    image: "images/certificates/cyber-security.jpg"
  },
  {
    id: "linkedin-cv",
    title: "Workshop LinkedIn & CV Creation",
    organization: "IEEE FSM",
    date: { fr: "Fév. 2026", en: "Feb 2026" },
    type: "Workshop",
    image: "images/certificates/linkedin-cv.jpg"
  }
];

/* ----- Attestation de stage ----- */
const internshipCertificate = {
  id: "internship",
  title: { fr: "Attestation de stage · IT HOUSE, Tunis", en: "Internship certificate · IT HOUSE, Tunis" },
  image: "images/certificates/internship.jpg"
};

/* ----- Petits textes de l'interface ----- */
const labels = {
  view: { fr: "Voir", en: "View" },
  details: { fr: "Détails", en: "Details" },
  features: { fr: "Fonctionnalités clés", en: "Key features" },
  skills: { fr: "Compétences", en: "Skills" }
};

/* ----- Mots qui défilent sous les statistiques ----- */
const marqueeWords = ['React.js', 'Node.js', 'Spring Boot', 'Next.js', 'MongoDB', 'MySQL', 'Express.js', 'Groq API', 'Git', 'Postman'];
