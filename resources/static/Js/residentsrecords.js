let residentsList = [];

async function loadResidents() {
  try {
    const response = await fetch("/api/residents");
    residentsList = await response.json();
    renderResidents(residentsList);
  } catch (error) {
    console.error("Error fetching residents:", error);
  }
}

document.querySelectorAll("input[type='text']").forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        });
    });

function renderResidents(residentsData) {
  const boxInfo = document.querySelector('.residentsList');
  boxInfo.innerHTML = '';

  if (!residentsData || residentsData.length === 0) {
    boxInfo.innerHTML = '<p style="text-align:center;">No residents found.</p>';
    return;
  }

  residentsData.forEach(resident => {
    const card = document.createElement('div');
    card.classList.add('residentsInfo');

    card.innerHTML = `
      <div class="col-name">${resident.firstname} ${resident.lastname} ${resident.suffix && resident.suffix.toLowerCase() !== 'none' ? ' ' + resident.suffix : ''}</div>
      <div class="col-sitio">${resident.sitio}</div>
      <div class="col-age">${resident.age}</div>
      <div class="col-id">${resident.id}</div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `/residentsinfo?id=${resident.id}`;
    });

    boxInfo.append(card);
  });
}

function searchResidents() {
  const query = document.querySelector('.search').value.trim().toLowerCase();

  if (query === "") {
    renderResidents(residentsList);
    return;
  }

  const filtered = residentsList.filter(resident => {
    const seniorText = resident.senior ? "senior" : "";
    const pwdText = resident.pwd ? "pwd" : "";


    const searchString = `
      ${resident.firstname || ""} ${resident.middlename || ""} ${resident.lastname || ""} ${resident.sitio || ""}
      ${resident.condition || ""} ${resident.id || ""} ${resident.sex || ""} ${resident.civilstatus || ""}
      ${resident.religion || ""} ${seniorText} ${pwdText} ${resident.firstname || ""} ${resident.lastname || ""}
      ${resident.lastname || ""} ${resident.firstname || ""} ${resident.lastname || ""} ${resident.middlename || ""} ${resident.firstname || ""}
      ${resident.voterstatus || ""} ${resident.education || ""} ${resident.age || ""}
    `.toLowerCase();


    return searchString.includes(query);
  });

  renderResidents(filtered);
}


window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search');
  const searchButton = document.querySelector('.serbot');

  searchInput.addEventListener('input', searchResidents);
  searchButton.addEventListener('click', searchResidents);

  loadResidents();
});

(function() {


    history.pushState(null, "", location.href);

    window.addEventListener("popstate", function () {

        window.location.href = "/homepage";
    });

})();