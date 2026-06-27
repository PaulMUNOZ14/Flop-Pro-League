document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.getElementById('rankingBody');
    if (!tbody) return;

    if (typeof EDITIONS === 'undefined') {
        tbody.innerHTML = '<tr><td colspan="7">Données indisponibles.</td></tr>';
        return;
    }

    const teamStats = {};

    // Collect all data
    EDITIONS.forEach(edition => {
        const teams = edition.teams || [];
        const matches = edition.matches || [];

        // Initialize teams if not exists
        teams.forEach(t => {
            if (!teamStats[t.id]) {
                teamStats[t.id] = {
                    id: t.id,
                    name: t.name,
                    logo: t.logo,
                    played: 0,
                    wins: 0,
                    losses: 0,
                    titles: 0
                };
            }
        });

        // Compute matches
        matches.forEach(match => {
            if (match.winnerId) {
                // Ensure team objects exist (in case a team is in match but not in teams array)
                [match.team1Id, match.team2Id].forEach(tid => {
                    if (tid && !teamStats[tid]) {
                        teamStats[tid] = { id: tid, name: tid, logo: null, played: 0, wins: 0, losses: 0, titles: 0 };
                    }
                });

                if (match.team1Id) teamStats[match.team1Id].played++;
                if (match.team2Id) teamStats[match.team2Id].played++;

                if (teamStats[match.winnerId]) {
                    teamStats[match.winnerId].wins++;
                }

                const loserId = match.winnerId === match.team1Id ? match.team2Id : match.team1Id;
                if (loserId && teamStats[loserId]) {
                    teamStats[loserId].losses++;
                }

                if (match.round === 'Finale') {
                    if (teamStats[match.winnerId]) {
                        teamStats[match.winnerId].titles++;
                    }
                }
            }
        });
    });

    // Calculate derived stats and format array
    let rankingArray = Object.values(teamStats).map(team => {
        team.winRate = team.played > 0 ? (team.wins / team.played) * 100 : 0;
        return team;
    });

    // Setup state
    let currentSort = 'rank';
    let isAscending = true; // default rank ascending (1 to N)

    const LOGO_PATH = './Equipes/Fond transparent/';

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function renderTable() {
        rankingArray.sort((a, b) => {
            let valA = a[currentSort];
            let valB = b[currentSort];
            
            // Special handling for 'rank' (default order)
            if (currentSort === 'rank') {
                valA = a.originalIndex;
                valB = b.originalIndex;
            } else if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (valA < valB) return isAscending ? -1 : 1;
            if (valA > valB) return isAscending ? 1 : -1;
            
            // Tie breaker: always use original index (wins/winRate logic)
            return a.originalIndex - b.originalIndex;
        });

        if (rankingArray.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">Aucune équipe classée.</td></tr>';
            return;
        }

        tbody.innerHTML = rankingArray.map((team, index) => {
            // We keep the top 3 medals based on original rank, not sorted rank
            const rankClass = team.originalIndex < 3 ? `rank-${team.originalIndex + 1}` : '';
            const winRateDisplay = team.played > 0 ? team.winRate.toFixed(1) + '%' : '-';
            const titlesDisplay = team.titles > 0 ? `🏆 ${team.titles}` : '-';
            
            const logoHtml = team.logo 
                ? `<img src="${LOGO_PATH + escapeHtml(team.logo)}" alt="${escapeHtml(team.name)}" class="team-logo-small">` 
                : `<div style="width:32px; height:32px; background:#1a2626; border-radius:4px;"></div>`;

            return `
                <tr class="${rankClass}">
                    <td><span class="rank-number">${team.originalIndex + 1}</span></td>
                    <td>
                        <div class="team-col">
                            ${logoHtml}
                            <a href="team.html?team=${escapeHtml(team.id)}" class="team-name">${escapeHtml(team.name)}</a>
                        </div>
                    </td>
                    <td>${team.played}</td>
                    <td>${team.wins}</td>
                    <td>${team.losses}</td>
                    <td>${winRateDisplay}</td>
                    <td><span style="color:#f5a623; font-weight:600;">${titlesDisplay}</span></td>
                </tr>
            `;
        }).join('');

        // Update headers icons
        document.querySelectorAll('th[data-sort]').forEach(th => {
            const icon = th.querySelector('.sort-icon');
            if (icon) {
                if (th.getAttribute('data-sort') === currentSort) {
                    icon.textContent = isAscending ? ' ▲' : ' ▼';
                } else {
                    icon.textContent = '';
                }
            }
        });
    }

    // Default sort to get original rank
    rankingArray.sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.winRate !== a.winRate) return b.winRate - a.winRate;
        if (b.titles !== a.titles) return b.titles - a.titles;
        return b.played - a.played;
    });

    // Save original index for default sorting and rank display
    rankingArray.forEach((team, index) => {
        team.originalIndex = index;
    });

    // Handle clicks
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const sortKey = th.getAttribute('data-sort');
            if (currentSort === sortKey) {
                isAscending = !isAscending;
            } else {
                currentSort = sortKey;
                // Default to descending for numbers, ascending for text/rank
                isAscending = (sortKey === 'name' || sortKey === 'rank');
            }
            renderTable();
        });
    });

    renderTable();
});
