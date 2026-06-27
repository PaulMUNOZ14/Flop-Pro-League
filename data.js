// ============================================================
// DONNÉES POUR LA FPL — scores format Wingman CS2
// (premier à 9 rounds ; 8-8 = prolongation → 9-8)
// ============================================================

const EDITIONS = [

    // ============================================================
    // ÉDITION 1 — L'Inauguration (Demi + Finale uniquement)
    // ============================================================
    {
        name: 'Édition 1 – L\'Inauguration',
        teams: [
            { id: 'Vitiligo',     name: 'Vitiligo',      logo: 'Vitiligo-t.png',      players: ['Phyruse', 'Enzo'] },
            { id: 'Na_Visibles',  name: "Na'Visibles",   logo: 'Na_Visibles-t.png',   players: ['Green', 'YoshiGamerFR'] },
            { id: 'Froze_Clan',   name: 'Froze Clan',    logo: 'Froze_Clan-t.png',    players: ['Jocho', 'Tenki'] },
            { id: 'Virtus_Prof',  name: 'Virtus.Prof',   logo: 'Virtus_Prof-t.png',   players: ['Caradhriel', 'Scorpio'] }
        ],
        matches: [
            // ---- DEMI-FINALES ----
            {
                round: 'Demi',
                team1Id: null,
                team2Id: null,
                winnerId: null,
                score1: null,
                score2: null,
                youtube: null,
                maps: []
            },
            {
                round: 'Demi',
                team1Id: null,
                team2Id: null,
                winnerId: null,
                score1: null,
                score2: null,
                youtube: null,
                maps: []
            },
            // ---- FINALE ----
            {
                round: 'Finale',
                team1Id: null,
                team2Id: null,
                winnerId: null,
                score1: null,
                score2: null,
                youtube: null,
                maps: []
            }
        ]
    },

    // ============================================================
    // Template d'édition
    // ============================================================
    /*
    {
        name: 'Édition 2 – La Revanche',
        teams: [
            { id: 'Vitiligo',      name: 'Vitiligo',       logo: 'Vitiligo-t.png',       players: ['Phyruse', 'Enzo'] },
            { id: 'Na_Visibles',   name: "Na'Visibles",    logo: 'Na_Visibles-t.png',    players: ['Green', 'YoshiGamerFR'] },
            { id: 'Froze_Clan',    name: 'Froze Clan',     logo: 'Froze_Clan-t.png',     players: ['Jocho', 'Tenki'] },
            { id: 'Virtus_Prof',   name: 'Virtus.Prof',    logo: 'Virtus_Prof-t.png',    players: ['Caradhriel', 'Scorpio'] },
            { id: 'Astral_BOF',    name: 'Astral BOF',     logo: 'Astral-BOF-t.png',     players: ['Nebula', 'CosmicFrag'] },
            { id: 'Fnatoc',        name: 'Fnatoc',         logo: 'Fnatoc-t.png',         players: ['Rojo', 'SpeedRunCS'] },
            { id: 'G3_Esport',     name: 'G3 Esport',      logo: 'G3_Esport-t.png',      players: ['Triforce', 'WinRateZero'] },
            { id: 'Karmine_Flop',  name: 'Karmine Flop',   logo: 'Karmine_Flop-t.png',   players: ['KFC', 'DoubleKill'] }
        ],
        matches: [
            // ---- QUARTS DE FINALE ----
            {
                round: 'Quarts',
                team1Id: 'Vitiligo',
                team2Id: 'Astral_BOF',
                winnerId: 'Vitiligo',
                score1: 2,
                score2: 0,
                youtube: null,
                maps: [
                    { name: 'Cobblestone', score1: 9, score2: 3 },
                    { name: 'Shortdust',   score1: 9, score2: 5 }
                ]
            },
            {
                round: 'Quarts',
                team1Id: 'Na_Visibles',
                team2Id: 'Froze_Clan',
                winnerId: 'Froze_Clan',
                score1: 1,
                score2: 2,
                youtube: null,
                maps: [
                    { name: 'Lake',        score1: 9, score2: 7 },   // Na'Visibles
                    { name: 'Cobblestone', score1: 4, score2: 9 },   // Froze Clan
                    { name: 'Shortdust',   score1: 8, score2: 9 }    // OT → Froze Clan
                ]
            },
            {
                round: 'Quarts',
                team1Id: 'Fnatoc',
                team2Id: 'G3_Esport',
                winnerId: 'G3_Esport',
                score1: 0,
                score2: 2,
                youtube: null,
                maps: [
                    { name: 'Iris',        score1: 3, score2: 9 },
                    { name: 'Lake',        score1: 6, score2: 9 }
                ]
            },
            {
                round: 'Quarts',
                team1Id: 'Virtus_Prof',
                team2Id: 'Karmine_Flop',
                winnerId: 'Karmine_Flop',
                score1: 1,
                score2: 2,
                youtube: null,
                maps: [
                    { name: 'Shortdust',   score1: 9, score2: 6 },   // Virtus.Prof
                    { name: 'Cobblestone', score1: 7, score2: 9 },   // Karmine Flop
                    { name: 'Iris',        score1: 4, score2: 9 }    // Karmine Flop
                ]
            },
            // ---- DEMI-FINALES ----
            {
                round: 'Demi',
                team1Id: 'Vitiligo',
                team2Id: 'Froze_Clan',
                winnerId: 'Vitiligo',
                score1: 2,
                score2: 1,
                youtube: null,
                maps: [
                    { name: 'Cobblestone', score1: 9, score2: 5 },
                    { name: 'Lake',        score1: 6, score2: 9 },
                    { name: 'Shortdust',   score1: 9, score2: 8 }    // OT
                ]
            },
            {
                round: 'Demi',
                team1Id: 'G3_Esport',
                team2Id: 'Karmine_Flop',
                winnerId: 'Karmine_Flop',
                score1: 0,
                score2: 2,
                youtube: null,
                maps: [
                    { name: 'Iris',        score1: 2, score2: 9 },
                    { name: 'Lake',        score1: 5, score2: 9 }
                ]
            },
            // ---- FINALE ----
            {
                round: 'Finale',
                team1Id: 'Vitiligo',
                team2Id: 'Karmine_Flop',
                winnerId: 'Karmine_Flop',
                score1: 1,
                score2: 2,
                youtube: null,
                maps: [
                    { name: 'Cobblestone', score1: 9, score2: 7 },   // Vitiligo
                    { name: 'Shortdust',   score1: 8, score2: 9 },   // OT → Karmine Flop
                    { name: 'Lake',        score1: 6, score2: 9 }    // Karmine Flop 🏆
                ]
            }
        ]
    },
    */

    // ============================================================
    // 2e Template d'edition
    // ============================================================
    /*
    {
        name: 'Édition 3 – La Domination',
        teams: [
            { id: 'Vitiligo',          name: 'Vitiligo',          logo: 'Vitiligo-t.png',          players: ['Phyruse', 'Enzo'] },
            { id: 'Na_Visibles',       name: "Na'Visibles",       logo: 'Na_Visibles-t.png',       players: ['Green', 'NewPlayerFR'] },
            { id: 'Froze_Clan',        name: 'Froze Clan',        logo: 'Froze_Clan-t.png',        players: ['Jocho', 'Tenki'] },
            { id: 'Virtus_Prof',       name: 'Virtus.Prof',       logo: 'Virtus_Prof-t.png',       players: ['Caradhriel', 'Scorpio'] },
            { id: 'Liquide_Vaisselle', name: 'Liquide Vaisselle', logo: 'Liquide_Vaisselle-t.png', players: ['WashOut', 'BubbleRift'] },
            { id: 'Mouzquitto',        name: 'Mouzquitto',        logo: 'Mouzquitto-t.png',        players: ['BugByte', 'MosquitoKill'] },
            { id: 'Karmine_Flop',      name: 'Karmine Flop',      logo: 'Karmine_Flop-t.png',      players: ['KFC', 'DoubleKill'] },
            { id: 'G3_Esport',         name: 'G3 Esport',         logo: 'G3_Esport-t.png',         players: ['Triforce', 'WinRateZero'] }
        ],
        matches: [
            // ---- QUARTS DE FINALE ----
            {
                round: 'Quarts',
                team1Id: 'Vitiligo',
                team2Id: 'Mouzquitto',
                winnerId: 'Vitiligo',
                score1: 2,
                score2: 0,
                youtube: null,
                maps: [
                    { name: 'Cobblestone', score1: 9, score2: 2 },
                    { name: 'Shortdust',   score1: 9, score2: 4 }
                ]
            },
            {
                round: 'Quarts',
                team1Id: 'Na_Visibles',
                team2Id: 'G3_Esport',
                winnerId: 'Na_Visibles',
                score1: 2,
                score2: 1,
                youtube: null,
                maps: [
                    { name: 'Iris',        score1: 9, score2: 6 },
                    { name: 'Lake',        score1: 7, score2: 9 },
                    { name: 'Cobblestone', score1: 9, score2: 8 }    // OT
                ]
            },
            {
                round: 'Quarts',
                team1Id: 'Froze_Clan',
                team2Id: 'Karmine_Flop',
                winnerId: 'Froze_Clan',
                score1: 2,
                score2: 0,
                youtube: null,
                maps: [
                    { name: 'Shortdust',   score1: 9, score2: 5 },
                    { name: 'Lake',        score1: 9, score2: 7 }
                ]
            },
            {
                round: 'Quarts',
                team1Id: 'Virtus_Prof',
                team2Id: 'Liquide_Vaisselle',
                winnerId: 'Liquide_Vaisselle',
                score1: 1,
                score2: 2,
                youtube: null,
                maps: [
                    { name: 'Iris',        score1: 9, score2: 3 },   // Virtus.Prof
                    { name: 'Cobblestone', score1: 8, score2: 9 },   // OT → Liquide Vaisselle
                    { name: 'Shortdust',   score1: 5, score2: 9 }    // Liquide Vaisselle
                ]
            },
            // ---- DEMI-FINALES ----
            {
                round: 'Demi',
                team1Id: 'Vitiligo',
                team2Id: 'Na_Visibles',
                winnerId: 'Vitiligo',
                score1: 2,
                score2: 0,
                youtube: null,
                maps: [
                    { name: 'Cobblestone', score1: 9, score2: 5 },
                    { name: 'Shortdust',   score1: 9, score2: 7 }
                ]
            },
            {
                round: 'Demi',
                team1Id: 'Froze_Clan',
                team2Id: 'Liquide_Vaisselle',
                winnerId: 'Froze_Clan',
                score1: 2,
                score2: 1,
                youtube: null,
                maps: [
                    { name: 'Lake',        score1: 9, score2: 4 },
                    { name: 'Iris',        score1: 7, score2: 9 },
                    { name: 'Cobblestone', score1: 9, score2: 8 }    // OT
                ]
            },
            // ---- FINALE ----
            {
                round: 'Finale',
                team1Id: 'Vitiligo',
                team2Id: 'Froze_Clan',
                winnerId: 'Vitiligo',
                score1: 2,
                score2: 1,
                youtube: null,
                maps: [
                    { name: 'Shortdust',   score1: 9, score2: 6 },
                    { name: 'Lake',        score1: 8, score2: 9 },   // OT → Froze Clan
                    { name: 'Cobblestone', score1: 9, score2: 7 }    // Vitiligo 🏆
                ]
            }
        ]
    }
    */
];

const FPL_STATS = {
    memorableMoments: '∞'
};

const LOGO_PATH = './Equipes/Fond transparent/';