let blottersList = [];

async function loadBlotters() {
    try {
        const response = await fetch("/api/blotters");
        blottersList = await response.json();
        renderBlotters(blottersList);
    } catch (error) {
        console.error("Error fetching blotters:", error);
    }
}

document.querySelectorAll("input[type='text']").forEach(input => {
    input.addEventListener("input", () => {
        input.value = input.value.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    });
});

function renderBlotters(blottersData) {
    const boxInfo = document.querySelector('.blottersList');
    boxInfo.innerHTML = '';

    if (!blottersData || blottersData.length === 0) {
        boxInfo.innerHTML = '<p style="text-align:center;">No blotters found.</p>';
        return;
    }

    blottersData.forEach(blotter => {
        const card = document.createElement('div');
        card.classList.add('blottersInfo');

        const level = blotter.caseLevel ? blotter.caseLevel.trim().toLowerCase() : "";

        card.innerHTML = `
            <div class="col-caseNo">${blotter.caseNo}</div>
            <div class="col-name"><span class="col-level ${level}"></span>${blotter.blotteredFirstName} ${blotter.blotteredLastName}</div>
            <div class="col-date">${blotter.dateOfComplain || 'N/A'}</div>
            <div class="col-status">${blotter.blotterStatus}</div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `/blotterinfo?id=${blotter.id}`;
        });

        boxInfo.append(card);
    });
}

function searchBlotters() {
    const query = document.querySelector('.search').value.trim().toLowerCase();

    if (query === "") {
        renderBlotters(blottersList);
        return;
    }

    const filtered = blottersList.filter(blotter =>
        `${blotter.caseNo} ${blotter.blotteredFirstName} ${blotter.blotteredLastName} ${blotter.dateOfComplain || ''} ${blotter.blotterStatus} ${blotter.caseLevel}`.toLowerCase().includes(query)
    );

    renderBlotters(filtered);
}

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search');
    const searchButton = document.querySelector('.serbot');

    searchInput.addEventListener('input', searchBlotters);
    searchButton.addEventListener('click', searchBlotters);

    loadBlotters();
});

(function() {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", function () {
        window.location.href = "/homepage";
    });
})();
