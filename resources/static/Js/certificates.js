const nameInput = document.getElementById("citizenName");
const addressInput = document.getElementById("citizenAddress");
const ageInput = document.getElementById("age");
const purposeInput = document.getElementById("purpose");
const dateInput = document.getElementById("issuedDate");
const officerNameInput = document.getElementById("officerNameInput");
const officerTitleInput = document.getElementById("officerTitleInput");
const municipalityInput = document.getElementById("municipalityInput");
const barangayInput = document.getElementById("barangayInput");
const certBody = document.getElementById("certBody");
const issueDateEl = document.getElementById("issueDate");
const purposeText = document.getElementById("purposeText");
const officerNameEl = document.getElementById("officerName");
const officerTitleEl = document.getElementById("officerTitle");
const provinceEl = document.getElementById("Province");
const municipalityEl = document.getElementById("municipality");
const barangayEl = document.getElementById("barangay");
const photoFile = document.getElementById("photoFile");
const photoPreview = document.getElementById("photoPreview");
const printBtn = document.getElementById("printBtn");
const savePdfBtn = document.getElementById("savePdfBtn");
const certificateEl = document.getElementById("certificate");
  document.querySelectorAll("input[type='text']").forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        });
    });
function updateCert() {
    const name = nameInput.value || "[Full Name]";
    const address = addressInput.value || "[Address]";
    const age = ageInput.value || "[Age]";
    const purpose = purposeInput.value || "[Purpose]";
    const date = dateInput.value || new Date().toISOString().split('T')[0];
    const officer = officerNameInput.value || "Punong Barangay";
    const title = officerTitleInput.value || "Barangay Captain";

    const province = provinceInput.value || "[Province]";
    const municipality = municipalityInput.value || "[Municipality]";
    const barangay = barangayInput.value || "[Barangay]";

    provinceEl.textContent = province;
    municipalityEl.textContent = municipality;
    barangayEl.textContent = barangay;

    certBody.innerHTML = `
        <p style="text-indent:40px;">This is to certify that <b>${name}</b>, age <b>${age}</b>, Filipino citizen residing at <b>${address}</b>.</p>
        <p style="text-indent:40px;">This Certification is being issued upon the request of the interested party in connection with any legal purpose that may serve them best.</p><br>
    `;

    issueDateEl.textContent = date;
    purposeText.textContent = purpose;
    officerNameEl.textContent = officer;
    officerTitleEl.textContent = title;
}
[
    nameInput, addressInput, ageInput, purposeInput, dateInput,
    officerNameInput, officerTitleInput,
    provinceInput, municipalityInput, barangayInput
].forEach(el => el.addEventListener("input", updateCert));
photoFile.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => photoPreview.innerHTML = `<img src="${reader.result}" style="max-width: 100px;">`;
    reader.readAsDataURL(file);
});

dateInput.value = new Date().toISOString().split('T')[0];
updateCert();

savePdfBtn.addEventListener("click", () => {
    if (certificateEl.innerHTML.trim() === "") {
        alert("Please fill in all the details before saving the PDF.");
        return;
    }

    const opt = {
        margin: 0.5,
        filename: 'Certificate.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };


    html2pdf().set(opt).from(certificateEl).save();
});

(function() {


    history.pushState(null, "", location.href);

    window.addEventListener("popstate", function () {

        window.location.href = "/homepage";
    });

})();
document.getElementById("certType").addEventListener("change", function () {
    const title = document.getElementById("certificateTitle");
    const certBody = document.getElementById("certBody");

    if (this.value === "residency") {
        title.textContent = "CERTIFICATE OF RESIDENCY";

    } else if (this.value === "residency"){
        title.textContent = "CERTIFICATE OF INDIGENCY";
    } else if (this.value === "clearance"){
      title.textContent = "BARANGAY CLEARANCE";
    } else if (this.value === "business"){
      title.textContent = "BUSINESS CLEARANCE";
    }
});

const printPdfBtn = document.getElementById("printPdfBtn");
printPdfBtn.addEventListener("click", () => {
    if (certificateEl.innerHTML.trim() === "") {
        alert("Please fill in all the details before printing.");
        return;
    }

    const opt = {
        margin: 0.5,
        filename: 'Certificate.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(certificateEl).toPdf().get('pdf').then(function (pdf) {
        window.open(pdf.output('bloburl'), '_blank');
    });
});
