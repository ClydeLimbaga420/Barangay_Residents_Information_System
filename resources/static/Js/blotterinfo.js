const recordIdUrl = new URLSearchParams(window.location.search);
const recordId = recordIdUrl.get('id');

async function filterId(record) {
  try {
    const response = await fetch(`/api/blotters/${record}`);
    if (!response.ok) throw new Error('Record not found');
    const blotterRecord = await response.json();
    renderInfo(blotterRecord);
  } catch(error) {
    console.error(error);
    alert("Record Not Found");
    if(document.referrer){
      history.back();
    } else {
      window.location.href="blotterrecords";
    }
  }
}

function renderInfo(record) {
  const complianantNameParts = [record.complainantFirstName, record.complainantMiddleName, record.complainantLastName].filter(Boolean);
  const respondentNameParts = [record.blotteredFirstName, record.blotteredMiddleName, record.blotteredLastName].filter(Boolean);

  const info = {
    caseNum: record.caseNo,
    dateFiled: record.dateOfComplain,
    complianant: complianantNameParts.join(' '),
    respondent: respondentNameParts.join(' '),
    officerInCharge: record.officerInCharge,
    status: record.blotterStatus,
    caseDescription: record.statementOfComplain,
    complianantName: complianantNameParts.join(' '),
    complianantAge: record.complainantAge,
    complianantContact: record.complainantContact,
    complianantAddress: record.complainantAddress,
    respondentName: respondentNameParts.join(' '),
    respondentAge: record.complainedAge || record.blotteredAge,
    respondentContact: record.complainedContact || record.blotteredContact,
    respondentAddress: record.complainedAddress || record.blotteredAddress,
    locationIncident: record.locationOfIncidence,
    actionTaken: record.actionTaken,
    caseLevel: record.caseLevel,
  };

  Object.entries(info).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "—";
  });

  const statusEl = document.getElementById('status');
  let statusValue = record.blotterStatus ? record.blotterStatus.trim().toLowerCase() : "";
  statusEl.classList.remove("pending", "resolved", "active");
  if (statusValue === "pending") statusEl.classList.add("pending");
  if (statusValue === "resolved") statusEl.classList.add("resolved");
  if (statusValue === "active") statusEl.classList.add("active");

  const statusLvl = document.getElementById('caselevel');
  let statusLevl = record.caseLevel ? record.caseLevel.trim().toLowerCase() : "";
  statusLvl.textContent = record.caseLevel || "—";
  statusLvl.classList.remove("normal","average","critical");
  if (statusLevl === "normal") statusLvl.classList.add("normal");
  if (statusLevl === "average") statusLvl.classList.add("average");
  if (statusLevl === "critical") statusLvl.classList.add("critical");

  const viewMore = document.getElementById('viewMore');
  const back = document.getElementById('back');
  const box1 = document.getElementById('box1');
  const box2 = document.getElementById('box2');

  viewMore.addEventListener('click', () => {
    box1.style.display = "none";
    box2.style.display = "block";
  });

  back.addEventListener('click', () => {
    box2.style.display = "none";
    box1.style.display = "block";
  });

  const markResolvedButtons = document.querySelectorAll(".mark");
  markResolvedButtons.forEach(markSettledBtn => {
    markSettledBtn.addEventListener("click", async () => {
      const confirmAction = confirm("Mark this case as resolved?");
      if (!confirmAction) return;
      try {
        const response = await fetch(`/blotter/${recordId}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Resolved" })
        });
        if (!response.ok) throw new Error("Failed to update record");

        const updated = await response.json();
        let updatedStatus = updated.status || updated.blotterStatus || "—";
        statusEl.textContent = updatedStatus;

        statusEl.classList.remove("pending", "active", "resolved");
        if (updatedStatus.toLowerCase() === "pending") statusEl.classList.add("pending");
        if (updatedStatus.toLowerCase() === "resolved") statusEl.classList.add("resolved");
        if (updatedStatus.toLowerCase() === "active") statusEl.classList.add("active");

        alert("Case marked as resolved");
      } catch (error) {
        console.error(error);
        alert("Error");
      }
    });
  });

  const markActiveButtons = document.querySelectorAll(".markactive");
  markActiveButtons.forEach(markSettledBtn => {
    markSettledBtn.addEventListener("click", async () => {
      const confirmAction = confirm("Mark this case as active?");
      if (!confirmAction) return;
      try {
        const response = await fetch(`/blotter/${recordId}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Active" })
        });
        if (!response.ok) throw new Error("Failed to update record");

        const updated = await response.json();
        let updatedStatus = updated.status || updated.blotterStatus || "—";
        statusEl.textContent = updatedStatus;

        statusEl.classList.remove("pending", "active", "resolved");
        if (updatedStatus.toLowerCase() === "pending") statusEl.classList.add("pending");
        if (updatedStatus.toLowerCase() === "resolved") statusEl.classList.add("resolved");
        if (updatedStatus.toLowerCase() === "active") statusEl.classList.add("active");

        alert("Case marked as active");
      } catch (error) {
        console.error(error);
        alert("Error");
      }
    });
  });

  const backb = document.getElementById("backb");
  backb.addEventListener('click', () => {
    if (document.referrer) {
      history.back();
    } else {
      window.location.href = "/blotterrecords";
    }
  });

  const backc = document.querySelector('.back');
  backc.addEventListener('click', () => {
    if (document.referrer) {
      history.back();
    } else {
      window.location.href = "/blotterrecords";
    }
  });

  const backd = document.querySelector('.backd');
  backd.addEventListener('click', () => {
    if (document.referrer) {
      history.back();
    } else {
      window.location.href = "/blotterrecords";
    }
  });
}

filterId(recordId);

(function() {
  history.pushState(null, "", location.href);

  window.addEventListener("popstate", function () {
    window.location.href = "/blotterrecords";
  });
})();
