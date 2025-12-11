document.getElementById("back").addEventListener("click", function() {
    window.history.back();
});

document.querySelectorAll("input[type='text']").forEach(input => {
    input.addEventListener("input", () => {
        input.value = input.value.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    });
});

document.getElementById("reportForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const reportData = {
        case_no: document.getElementById("case_no").value,
        complainant: document.getElementById("c_fname").value + " " + document.getElementById("c_mname").value + " " + document.getElementById("c_lname").value,
        respondent: document.getElementById("r_fname").value + " " + document.getElementById("r_mname").value + " " + document.getElementById("r_lname").value,
        c_contact: document.getElementById("c_contact").value,
        c_age: document.getElementById("c_age").value,
        c_address: document.getElementById("c_address").value,
        r_contact: document.getElementById("r_contact").value,
        r_age: document.getElementById("r_age").value,
        r_address: document.getElementById("r_address").value,
        case_desc: document.getElementById("case_desc").value,
        date_complain: document.getElementById("date_complain").value,
        status: document.getElementById("status").value,
        officer: document.getElementById("officer").value,
        location: document.getElementById("location").value,
        action_taken: document.getElementById("action_taken").value,
        caselevel: document.getElementById("caselevel").value
    };

    let reports = JSON.parse(localStorage.getItem("reports") || "[]");
    reports.push(reportData);
    localStorage.setItem("reports", JSON.stringify(reports));

    const formData = new FormData();
    formData.append("caseno", reportData.case_no);
    formData.append("casedescription", reportData.case_desc);
    formData.append("complaindate", reportData.date_complain);
    formData.append("status", reportData.status);
    formData.append("official", reportData.officer);
    formData.append("location", reportData.location);
    formData.append("action", reportData.action_taken);
    formData.append("caselevel", reportData.caselevel);
    formData.append("Comfirstname", document.getElementById("c_fname").value);
    formData.append("Commiddlename", document.getElementById("c_mname").value);
    formData.append("Comlastname", document.getElementById("c_lname").value);
    formData.append("Ccontact", document.getElementById("c_contact").value);
    formData.append("Cage", document.getElementById("c_age").value);
    formData.append("Caddress", document.getElementById("c_address").value);
    formData.append("Resfirstname", document.getElementById("r_fname").value);
    formData.append("Resmiddlename", document.getElementById("r_mname").value);
    formData.append("Reslastname", document.getElementById("r_lname").value);
    formData.append("Rcontact", document.getElementById("r_contact").value);
    formData.append("Rage", document.getElementById("r_age").value);
    formData.append("Raddress", document.getElementById("r_address").value);

    try {
        const response = await fetch("/blotter/add", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Report added successfully!");
            form.reset();
        } else {
            alert("Failed to save report. Check console for errors.");
            console.error("Error response:", response);
        }
    } catch (err) {
        console.error("Error saving to backend:", err);
        alert("Error saving report. See console.");
    }
});

(function() {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", function () {
        window.location.href = "/homepage";
    });
})();
