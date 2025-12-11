const Menubar = document.getElementById("dropdown");
const MenuDropdown = document.getElementById("menu_dropdown");
const logoutbutton = document.getElementById("logoutbutton");
const logoutconfirm = document.getElementById("logoutconfirm");
const cancel = document.getElementById("cancel");
const logout = document.getElementById("logout");
let totalResidents = 0;
let totalBlotters = 0;
const blockBackNavigation = () => {
    history.pushState(null, "", location.href);
};


document.addEventListener("DOMContentLoaded", () => {
    blockBackNavigation();
    window.addEventListener("popstate", blockBackNavigation);

    renderSitioChart();
    loadResidentCount();
    loadBlotterCount();
});

Menubar.addEventListener("click", () => {
  MenuDropdown.style.display = MenuDropdown.style.display === "none" ? "block" : "none";
});

logoutbutton.addEventListener("click", () => {
  logoutconfirm.style.display = "flex";
});

cancel.addEventListener("click", () => {
  logoutconfirm.style.display = "none";
});

logout.addEventListener("click", () => {

  sessionStorage.clear();
  localStorage.clear();
  window.removeEventListener("popstate", blockBackNavigation);


  window.location.href = "/logout";
});


window.addEventListener("click", (e) => {
  if (e.target === logoutconfirm) {
    logoutconfirm.style.display = "none";
  }
});


async function loadResidentCount() {
  try {
    const response = await fetch("/api/residents");
    const residentsList = await response.json();
    totalResidents = residentsList.length;
    document.getElementById("residentsRecords").textContent = totalResidents;
  } catch (error) {
    console.error("Error loading resident count:", error);
    document.getElementById("residentsRecords").textContent = 0;
  }
}

async function loadBlotterCount() {
  try {
    const response = await fetch("/api/blotters");
    const blottersList = await response.json();
    totalBlotters = blottersList.length;
    document.getElementById("blotterRecords").textContent = totalBlotters;
  } catch (error) {
    console.error("Error loading blotter count:", error);
    document.getElementById("blotterRecords").textContent = 0;
  }
}


window.addEventListener("pageshow", function (event) {
  if (event.persisted) {

    window.location.replace("/login");
  }
});


document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey && (e.key === 'z' || e.key === 'y')) ||
      (e.metaKey && (e.key === 'z' || e.key === 'y'))) {
    e.preventDefault();
  }
});

(function() {


    history.pushState(null, "", location.href);

    window.addEventListener("popstate", function () {

        window.location.href = "/homepage";
    });

})();




const currentResidents = document.getElementById("currentResidents");
const res2 = document.getElementById("res2");
const sitioChartContainer = document.getElementById("sitioChartContainer");

let chartRendered = false;
currentResidents.addEventListener("mouseenter", () => {
    res2.style.display = "none";
    sitioChartContainer.style.display = "block";
    setTimeout(() => {
        sitioChartContainer.style.opacity = 1;
    }, 50);

    if (!chartRendered) {
        renderSitioChart();
        chartRendered = true;
    }
});
currentResidents.addEventListener("mouseleave", () => {
    sitioChartContainer.style.opacity = 0;
    setTimeout(() => {
        sitioChartContainer.style.display = "none";
        res2.style.display = "flex";
    }, 50);
});

async function renderSitioChart() {
    const ctx = document.getElementById("sitioChart");

    try {
        const res = await fetch("/api/residents/sitio-count");
        const data = await res.json();

        const sitioNames = data.map(item => item.sitio);
        const sitioCounts = data.map(item => item.count);

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: sitioNames,
                datasets: [{
                    data: sitioCounts,
                    backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#6B7280"],
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { beginAtZero: true }
                },
                plugins: { legend: { display: false } }
            }
        });

    } catch (err) {
        console.error("Error loading sitio chart:", err);
    }
}

