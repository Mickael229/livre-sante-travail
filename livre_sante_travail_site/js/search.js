/* Script de recherche pour le site web */

let searchIndex;
let chaptersContent = {};

// Fonction pour initialiser la recherche
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const searchResultsSection = document.getElementById('search-results');
    
    // Cacher la section de résultats par défaut
    if (searchResultsSection) {
        searchResultsSection.style.display = 'none';
    }
    
    // Charger le contenu des chapitres pour la recherche
    loadChaptersContent();
    
    // Ajouter les écouteurs d'événements
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

// Fonction pour charger le contenu des chapitres
async function loadChaptersContent() {
    const chapters = [
        { id: 'chapitre_01_introduction', title: 'Introduction à la Santé au Travail' },
        { id: 'chapitre_02_role_responsabilites', title: 'Rôle et Responsabilités de l\'Infirmier en Entreprise' },
        { id: 'chapitre_03_evaluation_risques', title: 'Évaluation des Risques Professionnels' },
        { id: 'chapitre_04_prevention_risques', title: 'Prévention des Risques Professionnels' },
        { id: 'chapitre_05_gestion_at_mp', title: 'Gestion des Accidents du Travail et Maladies Professionnelles' },
        { id: 'chapitre_06_promotion_sante_bienetre', title: 'Promotion de la Santé et du Bien-être en Entreprise' },
        { id: 'chapitre_07_cadre_legal', title: 'Cadre Réglementaire et Légal de la Santé au Travail' },
        { id: 'chapitre_08_aspects_psychosociaux', title: 'Aspects Psychosociaux du Travail et Rôle de l\'Infirmier' },
        { id: 'chapitre_09_ergonomie', title: 'Ergonomie et Aménagement des Postes de Travail' },
        { id: 'chapitre_10_veille_sanitaire', title: 'Veille Sanitaire et Épidémiologique en Entreprise' }
    ];
    
    try {
        // Créer un tableau pour stocker les promesses de fetch
        const fetchPromises = chapters.map(chapter => {
            return fetch(`chapitres/${chapter.id}.html`)
                .then(response => response.text())
                .then(html => {
                    // Extraire le contenu textuel du HTML
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const content = tempDiv.textContent || tempDiv.innerText || '';
                    
                    // Stocker le contenu avec les métadonnées
                    chaptersContent[chapter.id] = {
                        id: chapter.id,
                        title: chapter.title,
                        content: content,
                        url: `chapitres/${chapter.id}.html`
                    };
                })
                .catch(error => {
                    console.error(`Erreur lors du chargement du chapitre ${chapter.id}:`, error);
                });
        });
        
        // Attendre que tous les chapitres soient chargés
        await Promise.all(fetchPromises);
        
        // Créer l'index de recherche
        createSearchIndex();
    } catch (error) {
        console.error('Erreur lors du chargement des chapitres:', error);
    }
}

// Fonction pour créer l'index de recherche avec Lunr.js
function createSearchIndex() {
    searchIndex = lunr(function() {
        this.field('title', { boost: 10 });
        this.field('content');
        this.ref('id');
        
        // Ajouter chaque chapitre à l'index
        Object.values(chaptersContent).forEach(chapter => {
            this.add({
                id: chapter.id,
                title: chapter.title,
                content: chapter.content
            });
        });
    });
}

// Fonction pour effectuer la recherche
function performSearch(query) {
    if (!query || query.trim() === '') {
        alert('Veuillez entrer un terme de recherche.');
        return;
    }
    
    if (!searchIndex) {
        alert('L\'index de recherche n\'est pas encore prêt. Veuillez réessayer dans quelques instants.');
        return;
    }
    
    const resultsContainer = document.getElementById('results-container');
    const searchResultsSection = document.getElementById('search-results');
    
    if (!resultsContainer || !searchResultsSection) {
        return;
    }
    
    // Effectuer la recherche
    const results = searchIndex.search(query);
    
    // Afficher les résultats
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Aucun résultat trouvé pour votre recherche.</p>';
    } else {
        const resultsList = document.createElement('ul');
        
        results.forEach(result => {
            const chapter = chaptersContent[result.ref];
            if (chapter) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = chapter.url;
                link.textContent = chapter.title;
                
                // Extraire un extrait du contenu autour du terme recherché
                const contentLowerCase = chapter.content.toLowerCase();
                const queryLowerCase = query.toLowerCase();
                const index = contentLowerCase.indexOf(queryLowerCase);
                
                if (index !== -1) {
                    const start = Math.max(0, index - 50);
                    const end = Math.min(chapter.content.length, index + query.length + 50);
                    let excerpt = chapter.content.substring(start, end);
                    
                    if (start > 0) excerpt = '...' + excerpt;
                    if (end < chapter.content.length) excerpt = excerpt + '...';
                    
                    const excerptElement = document.createElement('p');
                    excerptElement.textContent = excerpt;
                    
                    listItem.appendChild(link);
                    listItem.appendChild(excerptElement);
                    resultsList.appendChild(listItem);
                } else {
                    listItem.appendChild(link);
                    resultsList.appendChild(listItem);
                }
            }
        });
        
        resultsContainer.appendChild(resultsList);
    }
    
    // Afficher la section de résultats
    searchResultsSection.style.display = 'block';
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialiser la recherche quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initSearch);
