document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const forgotForm = document.getElementById("forgot-form");
    const messageBox = document.getElementById("message-box");

    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const forgotLink = document.getElementById("forgot-link");
    const backToLoginLinks = document.querySelectorAll(".back-to-login");

     // Update if deployed

    // Switch to Signup Form
    signupLink.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.classList.add("hidden");
        forgotForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
    });

    // Switch to Login Form
    loginLink.addEventListener("click", function (e) {
        e.preventDefault();
        signupForm.classList.add("hidden");
        forgotForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // Switch to Forgot Password Form
    forgotLink.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
        forgotForm.classList.remove("hidden");
    });

    // Back to Login from Forgot Password
    backToLoginLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            forgotForm.classList.add("hidden");
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        });
    });

    function showMessage(message, type) {
        messageBox.innerText = message;
        messageBox.classList.remove("hidden");
        messageBox.className = type === "success" ? "message success" : "message error";

        // Hide message after 3 seconds
        setTimeout(() => {
            messageBox.classList.add("hidden");
        }, 3000);
    }

    // Handle Login Form Submission
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = loginForm.querySelector("input[type='email']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        try {
            const response = await fetch("https://counselease27-backend.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                showMessage("Login Successful! Redirecting...", "success");
                localStorage.setItem("token", data.token); // Store JWT
                setTimeout(() => {
                    window.location.href = "dashboard.html"; // Redirect after login
                }, 2000);
            } else {
                showMessage(data.message, "error");
            }
        } catch (error) {
            showMessage("Login failed. Please try again.", "error");
        }
    });

    // Handle Signup Form Submission
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = signupForm.querySelector("input[type='text']").value;
        const email = signupForm.querySelector("input[type='email']").value;
        const password = signupForm.querySelector("input[type='password']").value;

        try {
            const response = await fetch("https://counselease27-backend.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                showMessage("Account created successfully! You can now log in.", "success");
                setTimeout(() => {
                    document.getElementById("login-link").click(); // Switch to login form
                }, 2000);
            } else {
                showMessage(data.message, "error");
            }
        } catch (error) {
            showMessage("Signup failed. Please try again.", "error");
        }
    });
});
