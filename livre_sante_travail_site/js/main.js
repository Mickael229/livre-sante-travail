/* Script principal pour le site web */

document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu pour mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.querySelector('.nav-content');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navContent.classList.toggle('active');
        });
    }
    
    // Toggle formulaire de contact
    const toggleContact = document.getElementById('toggle-contact');
    const contactForm = document.querySelector('.contact-form');
    
    if (toggleContact && contactForm) {
        // Cacher le formulaire par défaut
        contactForm.style.display = 'none';
        
        toggleContact.addEventListener('click', function(e) {
            e.preventDefault();
            if (contactForm.style.display === 'none') {
                contactForm.style.display = 'block';
                // Scroll jusqu'au formulaire
                contactForm.scrollIntoView({ behavior: 'smooth' });
            } else {
                contactForm.style.display = 'none';
            }
        });
    }
    
    // Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Formspree gère l'envoi, mais nous pouvons ajouter une validation ici
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs du formulaire.');
                return false;
            }
            
            // Validation basique de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Veuillez entrer une adresse email valide.');
                return false;
            }
        });
    }
    
    // Initialisation des commentaires (sera défini dans comments.js)
    if (typeof initComments === 'function') {
        initComments();
    }
    
    // Initialisation de la recherche (sera défini dans search.js)
    if (typeof initSearch === 'function') {
        initSearch();
    }
});
