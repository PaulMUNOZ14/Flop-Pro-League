# FPL - Flop Pro League

> ⚠️ **Avertissement :** Ce projet est une **parodie assumée** à but purement humoristique. Il n'est en aucun cas affilié à Valve Corporation, Counter-Strike 2, ESL, ou les véritables structures esportives mentionnées (Virtus.Pro, Fnatic, Karmine Corp, Natus Vincere, etc.).

Bienvenue sur le dépôt officiel du site de la **Flop Pro League (FPL)**. 
La league de la contre-performance sur Counter-Strike 2. Bienvenue dans la ligue où chaque tir raté écrit l'histoire, et où le bottom-fragger est roi.

Ce projet web a pour but de présenter la ligue, ses équipes parodiques, et d'afficher les résultats des tournois.

## Fonctionnalités

*   **Page d'accueil** : Présentation de la ligue et redirection vers les éditions en cours et passées.
*   **Page à propos** : Présentation de la ligue plus en détails et précisions sur le fait que ce soit une parodie.
*   **Page des edition** : Affichage des différentes éditions et informations sur les différents matchs
*   **Page des equipes** : Présentation des équipes ayant participer à la league avec quelques statistiques
*   **Intégration d'équipes parodiques** : Affichage personnalisé des pires (ou meilleures) équipes du circuit : *Virtus.Prof, Fnatoc, Karmine Flop, Vitiligo, Na'Visibles...*

## Technologies Utilisées

*   **HTML5** : Pour la forme de base du site web
*   **CSS3** : Pour le style du site web
*   **JS** : Pour le header/footer, les données des tournois et les fonctionnalités avancées du site

## Arborescence du Projet

Le projet est structuré de la manière suivante :

```text
📁 Site WEB/
├── 📄 about.html          # Page à propos
├── 📄 contact.html        # Page affichant les contacts
├── 📄 data.js             # Script js contenant les données de toutes les éditions
├── 📄 edition.html        # Page affichant le résultats des matchs de chaque éditions
├── 📄 edition.js          # script pour remplir la page editon.html en fonction du numéro de l'édition
├── 📄 index.html          # Page de présentation de la ligue
├── 📄 ranking.html        # Page affichant le classement des meilleurs équipes 
├── 📄 raking.js           # Script pour remplir la page ranking.html
├── 📄 script.js           # Fichier de script avec le header et footer
├── 📄 styles.css          # Feuille de style globale
├── 📄 team.html           # Page de présentation des équipes
└── 📁 Equipes/            # Dossier contenant les logos des équipes
    ├── 📁 Fond Blanc/     # Logos originaux
        ├── 🖼️ Astral-BOF.png
        ├── 🖼️ Fnatoc.png
        ├── 🖼️ Froze_Clan.png
        ├── 🖼️ G3_Esport.png
        ├── 🖼️ Karmine_Flop.png
        ├── 🖼️ Liquide_Vaisselle.png
        ├── 🖼️ Mouzquitto.png
        ├── 🖼️ Na_Visibles.png
        ├── 🖼️ Virtus_Prof.png
        └── 🖼️ Vitiligo.png
    └── 📁 Fond transparent/ # Logos intégrés au site sombre
        ├── 🖼️ Astral-BOF-t.png
        ├── 🖼️ Fnatoc-t.png
        ├── 🖼️ Froze_Clan-t.png
        ├── 🖼️ G3_Esport-t.png
        ├── 🖼️ Karmine_Flop-t.png
        ├── 🖼️ Liquide_Vaisselle-t.png
        ├── 🖼️ Mouzquitto-t.png
        ├── 🖼️ Na_Visibles-t.png
        ├── 🖼️ Virtus_Prof-t.png
        └── 🖼️ Vitiligo-t.png
└── 📁 assets/            # Dossier contenant les assets
        └── 🖼️ fpl-background.mp4  # Vidéo de fond sur la page index.html
