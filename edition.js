// ============================================================
// PAGE DÉTAIL - ARBRE BINAIRE DE TOURNOI
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    const params = new URLSearchParams(window.location.search);
    const editionParam = parseInt(params.get('edition'), 10);
    // URL uses 1-based index: ?edition=1 → EDITIONS[0]
    const editionIndex = editionParam - 1;

    function getTeamById(teamId, teams) {
        if (!teamId) return null;
        return teams.find(t => t.id === teamId) || null;
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function hasWinner(match) {
        return match && match.winnerId !== null && match.winnerId !== undefined;
    }

    function getScore(score) {
        return score !== null && score !== undefined ? score : '-';
    }

    function getRoundWeight(roundName) {
        const normalized = String(roundName || '').toLowerCase();
        if (normalized.includes('finale') && !normalized.includes('demi')) return 100;
        if (normalized.includes('demi')) return 80;
        if (normalized.includes('quart')) return 60;
        if (normalized.includes('huit')) return 40;
        if (normalized.includes('seizi')) return 20;
        return 10;
    }

    function getRoundLabel(roundName) {
        return roundName || 'Tour';
    }

    function groupMatchesByRound(matches) {
        return matches.reduce((rounds, match, index) => {
            const round = match.round || 'Tour';
            if (!rounds[round]) {
                rounds[round] = [];
            }
            rounds[round].push({ match, originalIndex: index });
            return rounds;
        }, {});
    }

    function createEmptyNode(roundName, slotIndex, roundIndex) {
        return {
            match: null,
            matchIndex: null,
            roundName,
            slotIndex,
            roundIndex,
            children: []
        };
    }

    function buildBinaryBracket(roundOrder, rounds, roundIndex, slotIndex) {
        const roundName = roundOrder[roundIndex];
        const entry = rounds[roundName] ? rounds[roundName][slotIndex] : null;
        const node = entry
            ? {
                match: entry.match,
                matchIndex: entry.originalIndex,
                roundName,
                slotIndex,
                roundIndex,
                children: []
            }
            : createEmptyNode(roundName, slotIndex, roundIndex);

        if (roundIndex > 0) {
            node.children = [
                buildBinaryBracket(roundOrder, rounds, roundIndex - 1, slotIndex * 2),
                buildBinaryBracket(roundOrder, rounds, roundIndex - 1, slotIndex * 2 + 1)
            ];
        }

        return node;
    }

    function renderTeamLine(match, teamId, score, teams) {
        const team = getTeamById(teamId, teams);
        const isWinner = hasWinner(match) && match.winnerId === teamId;
        const logo = team
            ? `<img src="${LOGO_PATH + escapeHtml(team.logo)}" alt="${escapeHtml(team.name)}" class="team-logo">`
            : '<span class="team-logo team-logo-empty" aria-hidden="true"></span>';

        const nameEl = team
            ? `<a href="team.html?team=${escapeHtml(team.id)}" class="name team-name-link" title="Voir la fiche de ${escapeHtml(team.name)}" onclick="event.stopPropagation()">${escapeHtml(team.name)}</a>`
            : '<span class="name">\u00c0 d\u00e9finir</span>';

        return `
            <div class="match-team ${isWinner ? 'winner' : ''} ${team ? '' : 'is-empty'}">
                ${team ? `<a href="team.html?team=${escapeHtml(team.id)}" class="team-logo-link" onclick="event.stopPropagation()" tabindex="-1">${logo}</a>` : logo}
                ${nameEl}
                <span class="score">${escapeHtml(getScore(score))}</span>
            </div>
        `;
    }

    function renderMatchBox(node, teams) {
        const roundLabel = escapeHtml(getRoundLabel(node.roundName));

        if (!node.match) {
            return `
                <div class="match-box match-box-empty" aria-label="${roundLabel} à définir">
                    <div class="match-round">${roundLabel}</div>
                    <div class="match-team is-empty">
                        <span class="team-logo team-logo-empty" aria-hidden="true"></span>
                        <span class="name">À définir</span>
                        <span class="score">-</span>
                    </div>
                    <div class="match-team is-empty">
                        <span class="team-logo team-logo-empty" aria-hidden="true"></span>
                        <span class="name">À définir</span>
                        <span class="score">-</span>
                    </div>
                </div>
            `;
        }

        const statusClass = hasWinner(node.match) ? 'is-played' : 'is-upcoming';

        return `
            <button class="match-box ${statusClass}" type="button" data-match-index="${node.matchIndex}" aria-label="Voir le détail du match ${roundLabel}">
                <div class="match-round">${roundLabel}</div>
                ${renderTeamLine(node.match, node.match.team1Id, node.match.score1, teams)}
                ${renderTeamLine(node.match, node.match.team2Id, node.match.score2, teams)}
            </button>
        `;
    }

    function renderTreeNode(node, teams) {
        const children = node.children && node.children.length > 0
            ? `<ul>${node.children.map(child => renderTreeNode(child, teams)).join('')}</ul>`
            : '';

        return `
            <li>
                ${renderMatchBox(node, teams)}
                ${children}
            </li>
        `;
    }

    function renderEdition(edition) {
        const title = document.getElementById('editionTitle');
        const container = document.getElementById('bracketContainer');

        if (!edition) {
            title.textContent = 'Édition introuvable';
            container.innerHTML = '<p class="no-matches">Cette édition n\'existe pas.</p>';
            return;
        }

        title.textContent = `Flop Pro League - ${edition.name}`;
        const teams = edition.teams || [];
        const matches = edition.matches || [];

        if (matches.length === 0) {
            container.innerHTML = '<p class="no-matches">Aucun match programmé pour cette édition.</p>';
            return;
        }

        const rounds = groupMatchesByRound(matches);
        const roundOrder = Object.keys(rounds).sort((a, b) => getRoundWeight(a) - getRoundWeight(b));
        const rootRound = roundOrder[roundOrder.length - 1];
        const rootCount = Math.max(1, rounds[rootRound].length);
        const roots = Array.from({ length: rootCount }, (_, slotIndex) => buildBinaryBracket(roundOrder, rounds, roundOrder.length - 1, slotIndex));

        container.innerHTML = `
            <div class="bracket-tree" role="tree" aria-label="Arbre de tournoi">
                <ul>${roots.map(root => renderTreeNode(root, teams)).join('')}</ul>
            </div>
        `;

        container.querySelectorAll('.match-box[data-match-index]').forEach(matchBox => {
            matchBox.addEventListener('click', () => {
                const match = matches[Number(matchBox.dataset.matchIndex)];
                openMatchModal(match, teams);
            });
        });
    }

    // ============================================================
    // MODALE - Détail du BO3
    // ============================================================
    function renderModalTeam(team, score) {
        const logo = team
            ? `<img src="${LOGO_PATH + escapeHtml(team.logo)}" alt="${escapeHtml(team.name)}" />`
            : '<span class="modal-logo-empty" aria-hidden="true"></span>';

        const teamContent = team
            ? `<a href="team.html?team=${escapeHtml(team.id)}" class="modal-team-link" title="Voir la fiche ${escapeHtml(team.name)}">${logo} ${escapeHtml(team.name)}</a>`
            : `<span>${logo} \u00c0 d\u00e9finir</span>`;

        return `
            <div class="match-summary">
                <div class="team">
                    ${teamContent}
                </div>
                <div class="score">${escapeHtml(getScore(score))}</div>
            </div>
        `;
    }

    function openMatchModal(match, teams) {
        const modal = document.getElementById('matchModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        const team1 = getTeamById(match.team1Id, teams);
        const team2 = getTeamById(match.team2Id, teams);
        const isPlayed = hasWinner(match);
        const winner = isPlayed ? getTeamById(match.winnerId, teams) : null;

        title.textContent = `Détail du BO3 - ${getRoundLabel(match.round)}`;

        let html = '';
        html += renderModalTeam(team1, match.score1);
        html += renderModalTeam(team2, match.score2);

        if (match.maps && match.maps.length > 0) {
            html += '<div class="maps-detail"><h3>Maps jouées</h3>';
            match.maps.forEach(map => {
                html += `
                    <div class="map-row">
                        <span class="map-name">${escapeHtml(map.name)}</span>
                        <span class="map-score">${escapeHtml(map.score1)} - ${escapeHtml(map.score2)}</span>
                    </div>
                `;
            });
            html += '</div>';
        } else if (isPlayed) {
            html += '<div class="modal-muted">Aucune map détaillée disponible.</div>';
        }

        if (winner) {
            html += `<div class="winner-banner">🏆 Vainqueur : ${escapeHtml(winner.name)}</div>`;
        } else {
            html += '<div class="modal-muted modal-centered">Match à venir</div>';
        }

        html += '<div class="players-section">';
        [team1, team2].forEach(team => {
            if (team && team.players && team.players.length > 0) {
                html += `
                    <div class="team-players">
                        <strong>${escapeHtml(team.name)}</strong> :
                        ${team.players.map(player => `<span class="player-tag">${escapeHtml(player)}</span>`).join(' ')}
                    </div>
                `;
            }
        });
        html += '</div>';

        if (match.youtube) {
            html += `
                <div class="modal-actions">
                    <a href="${escapeHtml(match.youtube)}" target="_blank" class="youtube-link" rel="noopener">Regarder sur YouTube</a>
                </div>
            `;
        } else if (isPlayed) {
            html += '<div class="modal-muted modal-centered">Replay non disponible</div>';
        }

        body.innerHTML = html;
        modal.classList.add('active');
    }

    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('matchModal');

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modalOverlay.classList.remove('active');
        }
    });

    // ============================================================
    // INITIALISATION
    // ============================================================

    if (typeof EDITIONS === 'undefined' || isNaN(editionIndex) || editionIndex < 0 || editionIndex >= EDITIONS.length) {
        document.getElementById('editionTitle').textContent = 'Édition introuvable';
        document.getElementById('bracketContainer').innerHTML = '<p class="no-matches">Cette édition n\'existe pas.</p>';
    } else {
        renderEdition(EDITIONS[editionIndex]);
    }

});