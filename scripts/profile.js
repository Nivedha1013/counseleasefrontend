document.addEventListener("DOMContentLoaded", function () {
    fetchProfile();

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    });
});

function fetchProfile() {
    fetch("http://localhost:8080/api/user/profile", {
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("profileName").textContent = data.name;
        document.getElementById("profileEmail").textContent = data.email;
    })
    .catch(error => console.error("Error fetching profile:", error));
}

function editProfile() {
    alert("Edit Profile feature coming soon!");
}
