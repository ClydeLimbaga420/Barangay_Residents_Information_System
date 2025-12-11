document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fileInput = document.getElementById('fileUpload');
    const photoPreview = document.getElementById('photoPreview');
    const birthInput = document.getElementById("input_birthdate");
    const ageInput = document.getElementById("input-age");
    const seniorInput = document.getElementById("seniorStatus");
    const conditionSelect = document.getElementById("select_condition");

    var errorMessage = /*[[${errorMessage}]]*/ null;
    var successMessage = /*[[${successMessage}]]*/ null;

    if (errorMessage) {
        alert(errorMessage);
        if (!photoPreview.querySelector("img")) {
            photoPreview.innerHTML = "<span>No Image</span>";
        }
    } else if (successMessage) {
        alert(successMessage);
    }
    form.addEventListener("submit", (event) => {
        const firstname = form.querySelector("input[name='firstname']").value.trim();
        const lastname = form.querySelector("input[name='lastname']").value.trim();
        const age = form.querySelector("input[name='age']").value.trim();

        if (!firstname || !lastname || !age) {
            event.preventDefault();
            alert("Please fill out all required fields!");
            return;
        }

        if (isNaN(age) || age < 0) {
            event.preventDefault();
            alert("Age must be a positive number");
            return;
        }

        if (!photoPreview.querySelector("img") && (!fileInput.files || fileInput.files.length === 0)) {
            event.preventDefault();
            alert("Please insert an image!");
            return;
        }
    });
    if (birthInput) {
        birthInput.addEventListener("change", () => {
            const birthdate = new Date(birthInput.value);
            const today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();
            const monthDiff = today.getMonth() - birthdate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) age--;
            ageInput.value = age;
            seniorInput.value = age >= 60 ? "true" : "false";

            if (conditionSelect) {
                conditionSelect.value = age >= 120 ? "Deceased" : "Alive";
            }
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Profile Preview';
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '5px';
                    photoPreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            } else {
                photoPreview.innerHTML = "<span>No Image</span>";
            }
        });
    }
    const handleOtherSelect = (selectId, inputName) => {
        const select = document.getElementById(selectId);
        if (!select) return;
        select.addEventListener('change', () => {
            if (select.value === "Other") {
                const input = document.createElement("input");
                input.type = "text";
                input.name = inputName;
                input.id = selectId;
                input.required = true;
                input.placeholder = "Specify " + inputName;

                const style = window.getComputedStyle(select);
                Object.assign(input.style, {
                    width: style.width,
                    height: style.height,
                    padding: style.padding,
                    margin: style.margin,
                    fontSize: style.fontSize,
                    fontFamily: style.fontFamily,
                    border: style.border,
                    boxSizing: style.boxSizing,
                    display: style.display
                });

                select.parentNode.replaceChild(input, select);
                input.focus();

                input.addEventListener('blur', () => {
                    if (input.value.trim() === "") {
                        select.value = "Select";
                        input.parentNode.replaceChild(select, input);
                    }
                });
            }
        });
    };

    document.querySelectorAll("input[type='text']").forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        });
    });

    document.getElementById("select_educationalattainment").addEventListener("input", function () {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    });

    document.getElementById("select_religion").addEventListener("input", function () {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    });

    document.getElementById("select_suffix").addEventListener("input", function () {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    });



    handleOtherSelect("select_suffix", "suffix");
    handleOtherSelect("select_religion", "religion");
    handleOtherSelect("select_educationalattainment", "education");

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", () => {
        window.location.href = "/homepage";
    });
});