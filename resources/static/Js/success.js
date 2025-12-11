document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.warn("No resident ID provided in URL");
        return;
    }

    try {
        const response = await fetch(`/api/residents/${id}`);
        if (!response.ok) throw new Error("Resident not found");

        const resident = await response.json();
        displayResidentHeaderInfo(resident);

        displayResidentDetails(resident);
    } catch (err) {
        console.error("Error fetching resident:", err);
        alert("Failed to load resident info. Check console for details.");
    }
});

function displayResidentHeaderInfo(resident) {
    const photo = document.getElementById('residentPhoto');
    photo.src = `/api/residents/${resident.id}/photo`;
    photo.onerror = () => (photo.src = '/Img/default-profile.jpg');
    photo.alt = `${resident.firstname ?? ''} ${resident.lastname ?? ''}`;

    const residentsHeader = document.querySelector('.residentHeaderInfo');
    residentsHeader.innerHTML = '';

    const name = document.createElement('div');
    name.classList.add('residentName');
    name.textContent = `${resident.firstname ?? ''} ${resident.middlename ?? ''} ${resident.lastname ?? ''} ${resident.suffix && resident.suffix.toLowerCase() !== 'none' ? ' ' + resident.suffix : ''}`.trim();

    const age = document.createElement('div');
    age.classList.add('residentAge');
    age.textContent = `Age: ${resident.age ?? 'N/A'} yrs`;

    const sitio = document.createElement('div');
    sitio.classList.add('residentSitio');
    sitio.textContent = `Sitio: ${resident.sitio ?? 'N/A'}`;

    residentsHeader.append(name, age, sitio);
}

function displayResidentDetails(resident) {
    const fields = {
        residentSex: resident.sex,
        residentOccupation: resident.occupation,
        residentSitio: resident.sitio,
        residentVoterStatus: resident.voterstatus,
        residentBirthDate: resident.birthdate,
        residentCivilStatus: resident.civilstatus,
        residentHouseholdMembers: resident.household,
        residentContact: resident.contactnumber,
        residentBloodType: resident.bloodtype,
        residentEmail: resident.email,
        residentEducationalAttainment: resident.education,
        residentReligion: resident.religion,
        residentPWD: resident.pwd ? "Yes" : "No",
        residentSuffix: resident.suffix,
        residentSenior: resident.senior ? "Yes" : "No",
        residentCondition: resident.condition
    };

    for (const [id, value] of Object.entries(fields)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value ?? "";
    }
}

const backBtn = document.getElementById("back");
if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.history.back();
    });
}


(function() {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", function () {
        window.location.href = "/newresident";
    });
})();
