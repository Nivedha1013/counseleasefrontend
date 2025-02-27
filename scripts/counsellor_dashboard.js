document.addEventListener("DOMContentLoaded", function () {
    // WebSocket for real-time chat
    const chatSocket = new WebSocket("ws://yourserver.com/chat"); // Replace with actual server URL
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-message");
    const messagesContainer = document.querySelector(".messages");

    chatSocket.onmessage = function (event) {
        const message = document.createElement("div");
        message.classList.add("message", "received");
        message.textContent = event.data;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    sendButton.addEventListener("click", function () {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            chatSocket.send(messageText);
            
            // Display sent message
            const message = document.createElement("div");
            message.classList.add("message", "sent");
            message.textContent = messageText;
            messagesContainer.appendChild(message);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            messageInput.value = "";
        }
    });

    // Profile Management - Update Profile
    document.getElementById("profile-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        
        if (name && email && phone) {
            localStorage.setItem("counselorName", name);
            localStorage.setItem("counselorEmail", email);
            localStorage.setItem("counselorPhone", phone);
            
            alert("Profile updated successfully!");
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Load Profile Data from Local Storage
    document.getElementById("name").value = localStorage.getItem("counselorName") || "";
    document.getElementById("email").value = localStorage.getItem("counselorEmail") || "";
    document.getElementById("phone").value = localStorage.getItem("counselorPhone") || "";

    // Load Earnings & Payments Data (Simulated API call)
    const earningsTable = document.getElementById("earnings-table");
    const earningsData = [
        { date: "2025-02-20", amount: "$200", status: "Paid" },
        { date: "2025-02-15", amount: "$150", status: "Pending" },
        { date: "2025-02-10", amount: "$300", status: "Paid" }
    ];

    earningsData.forEach(entry => {
        let row = earningsTable.insertRow();
        row.innerHTML = `<td>${entry.date}</td><td>${entry.amount}</td><td>${entry.status}</td>`;
    });

    // Video Call Feature
    document.getElementById("start-video-call").addEventListener("click", function () {
        alert("Starting video call... (Feature under development)");
    });

});
