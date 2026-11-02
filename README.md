# Portfolio d'Ibtihel Gritli

**Mon portfolio personnel : développeuse full-stack, étudiante en Licence GLSI à la Faculté des Sciences de Monastir.**

Ce site présente mon parcours, mes projets, mes compétences, mes certifications et mes workshops. Il est disponible en **français et en anglais**, en **mode sombre et clair**, et s'adapte aux mobiles, aux tablettes et aux ordinateurs.

**Voir le site : [ibtihel-gritli.github.io/Mon_Portflio](https://ibtihel-gritli.github.io/Mon_Portflio/)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Hébergé%20sur-GitHub%20Pages-181717?logo=github&logoColor=white)

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Sections du site](#sections-du-site)
3. [Technologies](#technologies)
4. [Structure du projet](#structure-du-projet)
5. [Modifier le contenu](#modifier-le-contenu)
6. [Conventions de code](#conventions-de-code)
7. [Auteure](#auteure)

---

## Fonctionnalités

- **Deux langues** : un bouton FR / EN traduit tout le site.
- **Mode sombre et mode clair** : un bouton change le thème. Le site démarre en mode sombre.
- **Responsive** : mise en page adaptée aux mobiles, aux tablettes et aux ordinateurs, avec un menu mobile.
- **Carte badge interactive** sur la page d'accueil : elle se retourne toute seule, ou au clic.
- **Détails des projets** : chaque projet s'ouvre dans une fenêtre (ce que j'ai fait, fonctionnalités, technologies, lien GitHub).
- **Certificats consultables** : chaque certificat et workshop s'affiche en grand dans une fenêtre.
- **CV** : le CV s'ouvre dans le navigateur ou se télécharge en PDF.
- **Formulaire de contact** : il ouvre l'application mail du visiteur avec le message prêt à envoyer.
- **Animations discrètes** : chargement, apparition des blocs au scroll, chiffres animés. Elles sont réduites automatiquement pour les personnes qui ont demandé moins d'animations.
- **Clavier** : la touche Échap ferme les fenêtres, la touche Entrée retourne la carte badge.
- **Référencement** : balises de titre, de description et d'aperçu de partage (Open Graph).

---

## Sections du site

| Section | Contenu |
|---|---|
| Accueil | Nom, titre, carte badge, chiffres clés, technologies qui défilent |
| À propos | Présentation, informations clés, liens (LinkedIn, GitHub, email, CV) |
| Parcours | Formation, du baccalauréat à la Licence 3 GLSI |
| Expérience | Stage d'été chez IT HOUSE (Tunis), juillet à août 2026 |
| Projets | Codify, ShopFlow, EduInsight, Golden Service |
| Compétences | Frontend, backend, bases de données, IA, outils et conception |
| Certifications et workshops | NVIDIA, Cisco, AWS (EC2 et S3), Cyber Security, LinkedIn et création de CV |
| Contact | Formulaire, email, téléphone, WhatsApp, réseaux |

---

## Technologies

Le site est écrit **sans framework** : seulement du HTML, du CSS et du JavaScript.

| Technologie | Rôle |
|---|---|
| HTML5 | Structure des pages |
| CSS3 | Design, thème sombre et clair, animations, responsive |
| JavaScript | Langues, thème, popups, animations, formulaire |
| Google Fonts | Polices Unbounded, Plus Jakarta Sans et Mrs Saint Delafield |
| GitHub Pages | Hébergement |

---

## Structure du projet

```
Mon_Portflio/
├── index.html            la page (structure du site)
├── css/
│   └── style.css         le design
├── js/
│   ├── data.js           les textes : projets, compétences, certificats
│   └── script.js         les fonctions
├── images/
│   ├── photo.jpg         ma photo
│   ├── projects/         images des projets
│   └── certificates/     images des certificats
└── cv/
    └── Gritli-Ibtihel-CV.pdf
```

| Fichier | Rôle |
|---|---|
| `index.html` | Contient les sections et les textes fixes, en français avec leur version anglaise dans l'attribut `data-en` |
| `css/style.css` | Rangé en sections numérotées (base, chargement, barre du haut, accueil, projets, certificats, contact...) |
| `js/data.js` | Toutes les listes du site, avec un texte `fr` et un texte `en` pour chaque élément |
| `js/script.js` | Les fonctions, avec un commentaire pour chacune |

---

## Modifier le contenu

**Ajouter ou changer un projet, une compétence ou un certificat**
Ouvrir `js/data.js`, puis copier un élément existant de la liste et changer ses textes. Le site se met à jour tout seul.

**Ajouter un certificat**
1. Mettre l'image dans `images/certificates/`.
2. Ajouter un bloc dans la liste `certificates` de `js/data.js`, avec le nom de l'image dans `image`.

**Changer le CV**
Remplacer le fichier dans `cv/` en gardant le même nom : `Gritli-Ibtihel-CV.pdf`.

**Changer la photo**
Remplacer `images/photo.jpg` en gardant le même nom.

**Modifier un texte fixe** (par exemple le paragraphe « À propos »)
Dans `index.html`, changer le texte français, puis son équivalent dans l'attribut `data-en` du même élément.

---

## Conventions de code

Le code est écrit pour être simple à lire et à modifier :

- **Noms clairs** pour les classes et les identifiants : `project-card`, `cert-card`, `skill-tag`, `#language-button`, `#projects-list`.
- **Fonctions courtes**, avec un nom qui dit ce qu'elles font : `toggleLanguage()`, `toggleTheme()`, `showProjects()`, `openProject()`, `openCertificate()`, `closePopups()`, `sendMessage()`.
- **Textes séparés du code** : tout le contenu des listes est dans `js/data.js`.
- **Commentaires en français** pour expliquer chaque partie.

---

## Auteure

**Ibtihel Gritli**, étudiante en Licence GLSI à la Faculté des Sciences de Monastir.
À la recherche d'un stage PFE en développement Full-Stack et intégration de l'IA.

- Portfolio : [ibtihel-gritli.github.io/Mon_Portflio](https://ibtihel-gritli.github.io/Mon_Portflio/)
- GitHub : [Ibtihel-Gritli](https://github.com/Ibtihel-Gritli)
- LinkedIn : [ibtihelle-gritli](https://www.linkedin.com/in/ibtihelle-gritli)
- Email : gritliibtihelle@gmail.com
