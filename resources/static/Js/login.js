document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const gmail = document.getElementById("gmail_account");
    const password = document.getElementById("password");

    const blockBackNavigation = () => {
        history.pushState(null, "", location.href);
    };

    blockBackNavigation();
    window.onpopstate = function () {
        history.pushState(null, "", location.href);
        history.go(1);
    };

    gmail.addEventListener("focus", () => gmail.placeholder = "");
    password.addEventListener("focus", () => password.placeholder = "");

    gmail.addEventListener("blur", () => {
        if (gmail.value === "") gmail.placeholder = "Enter your gmail account";
    });

    password.addEventListener("blur", () => {
        if (password.value === "") password.placeholder = "Enter your password";
    });

    loginForm.addEventListener("submit", (event) => {
        if (gmail.value.trim() === "" || password.value.trim() === "") {
            event.preventDefault();
            alert("Please fill in both gmail account and password");
        } else {
            const button = loginForm.querySelector("button") || loginForm.querySelector('input[type="submit"]');
            if (button) {
                button.disabled = true;
                button.textContent = "Logging in...";
            }
            window.removeEventListener("popstate", window.onpopstate);
        }
    });
});
