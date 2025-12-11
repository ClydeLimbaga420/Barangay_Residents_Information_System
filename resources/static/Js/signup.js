document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.getElementById("signupForm");
    const gmailInput = document.getElementById("gmail_account");
    const passwordInput = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");

    signUpForm.addEventListener("submit", function (event) {
        const gmail = gmailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirm = confirmPassword ? confirmPassword.value.trim() : "";

        if (gmail === "" || password === "" || confirm === "") {
            alert("Please fill in all required fields.");
            event.preventDefault();
            return;
        }

        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailPattern.test(gmail)) {
            alert("Please use a valid Gmail address.");
            event.preventDefault();
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            event.preventDefault();
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match.");
            event.preventDefault();
            return;
        }

        const button = signUpForm.querySelector("button");
        button.disabled = true;
        button.textContent = "Signing up...";

        setTimeout(() => {
            button.disabled = false;
            button.textContent = "Sign Up";
        }, 2000);
    });
});
