document.addEventListener('DOMContentLoaded', function () {

    // ----- HEADER EN DUR -----
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header class="site-header">
                <div class="logo">
                    FPL <small>| Flop Pro League</small>
                </div>
                <nav class="nav-links">
                    <a href="index.html">Accueil</a>
                    <a href="ranking.html">Classement des équipes</a>
                    <a href="about.html">À propos</a>
                </nav>
            </header>
        `;
    }

    // ----- FOOTER EN DUR -----
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="site-footer">
                <div class="footer-links">
                    <a href="index.html">Accueil</a>
                    <a href="about.html">À propos</a>
                    <a href="contact.html">Contact</a>
                    <a href="https://www.youtube.com/" target="_blank">YouTube</a>
                </div>
                <p>© 2026 Flop Pro League</p>
                <p style="font-size:0.75rem; color:#4a5a5a; margin-top:4px;">
                    Site parodique – à but humoristique et divertissant
                </p>
            </footer>
        `;
    }

});