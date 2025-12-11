document.addEventListener("DOMContentLoaded", loadHistory);

function formatDate(dateString) {
const date = new Date(dateString);
return date.toLocaleString();
}
async function loadHistory() {
    try {
        const response = await fetch("/api/history");
        const historyList = await response.json();
        const boxInfo = document.querySelector('.historyList');
        boxInfo.innerHTML = '';

        if (historyList.length === 0) {
            const noData = document.createElement('p');
            noData.textContent = "No History";
            noData.classList.add("noHistory");
            boxInfo.append(noData);
            return;
        }

        historyList.forEach(entry => {
            const info = document.createElement('div');
            info.classList.add('historyInfo');

            const dateText = entry.date ? formatDate(entry.date) : "No date";

            const textSpan = document.createElement('span');
            textSpan.classList.add('historyText');
            textSpan.textContent = entry.historyTable;

            const dateSpan = document.createElement('span');
            dateSpan.classList.add('historyDate');
            dateSpan.textContent = dateText;

            info.append(textSpan, dateSpan);
            boxInfo.append(info);
        });


    }catch (error) {
        console.error("Error", error);
    }

}

(function() {


    history.pushState(null, "", location.href);

    window.addEventListener("popstate", function () {

        window.location.href = "/homepage";
    });

})();