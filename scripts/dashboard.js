document.addEventListener("DOMContentLoaded", function () {
    // Display user name from localStorage
    const username = localStorage.getItem("username") || "User";
    document.getElementById("dashboard-username").innerText = username;
    document.getElementById("user-name").innerText = username;

    // Fake session data
    const sessions = [
        { date: "2025-02-20", time: "10:00 AM", counselor: "Dr. John Doe", duration: "45 mins", summary: "Coping strategies discussed." },
        { date: "2025-02-25", time: "02:30 PM", counselor: "Dr. Emily Smith", duration: "50 mins", summary: "Mindfulness techniques practiced." }
    ];

    // Populate session table
    const sessionList = document.getElementById("session-list");
    sessionList.innerHTML = sessions.map(session => `
        <tr>
            <td>${session.date}</td>
            <td>${session.time}</td>
            <td>${session.counselor}</td>
            <td>${session.duration}</td>
            <td>${session.summary}</td>
        </tr>
    `).join("");

    // Fake MSE status
    document.getElementById("mse-score").innerText = "85/100";
    document.getElementById("mse-status").innerText = "Stable";

    // Sidebar navigation
    function showSection(sectionId) {
        document.querySelectorAll(".content-section").forEach(section => section.classList.add("hidden"));
        document.getElementById(sectionId).classList.remove("hidden");
        document.getElementById(sectionId).classList.add("fade-in");
    }

    window.showSection = showSection;


    async function fetchUserProfile() {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "login.html"; // Redirect if not logged in
            return;
        }
    
        try {
            const response = await fetch("https://counselease27-backend.onrender.com/api/auth/profile", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
    
            const user = await response.json();
            document.getElementById("user-name").innerText = user.name; // Update UI
        } catch (error) {
            console.error("Profile Fetch Error:", error);
            window.location.href = "login.html"; // Redirect if error occurs
        }
    }
    
    // Logout Function
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("token"); // Clear token
        window.location.href = "login.html"; // Redirect to login
    });
    
    fetchUserProfile();
    
});
