document.getElementById('signupForm').addEventListener('submit', function(e) {
    const pw = document.getElementById('password').value;
    const confirmPw = document.getElementById('confirm_password').value;

    if (pw !== confirmPw) {
        e.preventDefault();
        alert('Passwords do not match!');
    }
});