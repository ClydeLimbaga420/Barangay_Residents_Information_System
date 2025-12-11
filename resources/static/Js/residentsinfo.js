document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    try {
        const response = await fetch(`/api/residents/${id}`);
        if (!response.ok) throw new Error("Resident not found");

        const resident = await response.json();

        sessionStorage.setItem('residentData', JSON.stringify(resident));

        displayResidentHeaderInfo(resident);
        displayResidentDetails(resident);
        setEditButton(resident.id);
    } catch (error) {
        console.error("Error loading resident:", error);
    }
});

function displayResidentHeaderInfo(resident) {
    const photo = document.getElementById('residentPhoto');
    if (photo) {
        photo.src = `/api/residents/${resident.id}/photo`;
        photo.onerror = () => (photo.src = '/Img/default-profile.jpg');
    }

    const headerContainer = document.querySelector('.residentHeaderInfo');
    if (!headerContainer) return;

    headerContainer.innerHTML = '';

    const name = document.createElement('div');
    name.classList.add('residentName');
    name.textContent = `${resident.firstname ?? ''} ${resident.middlename ?? ''} ${resident.lastname ?? ''} ${resident.suffix && resident.suffix.toLowerCase() !== 'none' ? ' ' + resident.suffix : ''}`.trim();;

    const age = document.createElement('div');
    age.classList.add('residentAge');
    age.textContent = `Age: ${resident.age ?? 'N/A'} yrs old`;

    headerContainer.append(name, age);
}


function displayResidentDetails(resident) {
    const setText = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.textContent = value ?? "";
    };

    setText("#residentSex", resident.sex);
    setText("#residentOccupation", resident.occupation);
    setText("#residentSitio", resident.sitio);
    setText("#residentVoterStatus", resident.voterstatus);
    setText("#residentBirthDate", resident.birthdate);
    setText("#residentCivilStatus", resident.civilstatus);
    setText("#residentHouseholdMembers", resident.household);
    setText("#residentContact", resident.contactnumber);
    setText("#residentBloodType", resident.bloodtype);
    setText("#residentEmail", resident.email);
    setText("#residentEducationalAttainment", resident.education);
    setText("#residentReligion", resident.religion);
    setText("#residentPWD", resident.pwd ? "Yes" : "No");
    setText("#residentSuffix", resident.suffix);
    setText("#residentSenior", resident.senior ? "Yes" : "No");
    setText("#residentCondition", resident.condition);
}


function setEditButton(id) {
    const editBtn = document.getElementById('residentEditPage');
    if (!editBtn) return;

    editBtn.dataset.residentId = id;

    editBtn.onclick = () => {
        window.location.href = `/editresident?id=${id}`;
    };
}

(function() {


    history.pushState(null, "", location.href);

    window.addEventListener("popstate", function () {

        window.location.href = "/residentsrecords";
    });

})();