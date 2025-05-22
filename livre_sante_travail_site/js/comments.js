/* Script pour le système de commentaires */

function initComments() {
    // Vérifier si nous sommes sur une page de chapitre
    const isChapterPage = window.location.pathname.includes('/chapitres/');
    
    // Si nous ne sommes pas sur une page de chapitre, ne pas initialiser les commentaires
    if (!isChapterPage) return;
    
    // Créer la section de commentaires
    createCommentsSection();
    
    // Initialiser Giscus (système de commentaires basé sur GitHub Discussions)
    loadGiscus();
}

// Fonction pour créer la section de commentaires
function createCommentsSection() {
    // Trouver l'élément main ou le body si main n'existe pas
    const mainElement = document.querySelector('main') || document.body;
    
    // Vérifier si la section de commentaires existe déjà
    if (document.getElementById('comments-section')) return;
    
    // Créer la section de commentaires
    const commentsSection = document.createElement('section');
    commentsSection.id = 'comments-section';
    commentsSection.className = 'comments-section';
    
    // Ajouter un titre
    const commentsTitle = document.createElement('h2');
    commentsTitle.textContent = 'Commentaires';
    commentsSection.appendChild(commentsTitle);
    
    // Ajouter un paragraphe d'introduction
    const commentsIntro = document.createElement('p');
    commentsIntro.textContent = 'Partagez vos réflexions, questions ou suggestions sur ce chapitre.';
    commentsSection.appendChild(commentsIntro);
    
    // Créer un conteneur pour Giscus
    const giscusContainer = document.createElement('div');
    giscusContainer.id = 'giscus-container';
    commentsSection.appendChild(giscusContainer);
    
    // Ajouter la section à la page
    mainElement.appendChild(commentsSection);
}

// Fonction pour charger Giscus
function loadGiscus() {
    // Créer le script Giscus
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'manus-health/livre-sante-travail');
    script.setAttribute('data-repo-id', 'R_kgDOLXYZ12');
    script.setAttribute('data-category', 'Commentaires');
    script.setAttribute('data-category-id', 'DIC_kwDOLXYZ12oCBXYZ');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'fr');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    // Ajouter le script au conteneur
    const giscusContainer = document.getElementById('giscus-container');
    if (giscusContainer) {
        giscusContainer.appendChild(script);
    }
}

// Initialiser les commentaires quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initComments);
