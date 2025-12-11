document.getElementById("backBtn").addEventListener("click", function() {
  window.history.back();
});

(function() {


    history.pushState(null, "", location.href);

    window.addEventListener("popstate", function () {

        window.location.href = "/homepage";
    });

})();