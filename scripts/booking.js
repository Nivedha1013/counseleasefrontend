document.addEventListener("DOMContentLoaded", function () {
    const counselorSelect = document.getElementById("counselor");
    const dateInput = document.getElementById("session-date");
    const timeInput = document.getElementById("session-time");
    const sessionForm = document.getElementById("session-form");
    const successMessage = document.getElementById("success-message");

    // Fetch available counselors from backend
    fetch("/api/counselors")
        .then(response => response.json())
        .then(data => {
            data.forEach(counselor => {
                const option = document.createElement("option");
                option.value = counselor.id;
                option.textContent = counselor.name;
                counselorSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching counselors:", error));

    // Fetch available time slots when a counselor is selected
    counselorSelect.addEventListener("change", function () {
        const selectedCounselor = counselorSelect.value;
        timeInput.innerHTML = ""; // Clear existing options

        fetch(`/api/counselors/${selectedCounselor}/available-slots`)
            .then(response => response.json())
            .then(slots => {
                slots.forEach(time => {
                    const option = document.createElement("option");
                    option.value = time;
                    option.textContent = time;
                    timeInput.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching available slots:", error));
    });

    // Handle session booking
    sessionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const counselor = counselorSelect.value;
        const date = dateInput.value;
        const time = timeInput.value;

        if (!counselor || !date || !time) {
            alert("Please select all required fields.");
            return;
        }

        fetch("/api/sessions/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ counselorId: counselor, date, time })
        })
        .then(response => {
            if (response.ok) {
                successMessage.textContent = `✅ Session successfully booked with ${counselor} on ${date} at ${time}!`;
                successMessage.style.display = "block";
                setTimeout(() => successMessage.style.display = "none", 3000);
                sessionForm.reset();
            } else {
                return response.json().then(err => Promise.reject(err));
            }
        })
        .catch(error => {
            console.error("Error booking session:", error);
            alert("Failed to book session. Please try again.");
        });
    });
});
