document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("messageInput");
    const sendMessage = document.getElementById("sendMessage");

    // Function to send a message
    function sendMessageToChat() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return; // Prevent empty messages

        // Create User Message
        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "sent"); // Add "sent" class for styling
        userMessage.innerHTML = `<span class="text">${messageText}</span>`;
        chatMessages.appendChild(userMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to latest message
        messageInput.value = ""; // Clear input field

        // Simulate Counselor Reply after 1.5 seconds
        setTimeout(() => {
            const replyMessage = document.createElement("div");
            replyMessage.classList.add("message", "received"); // Add "received" class for styling
            replyMessage.innerHTML = `<span class="text">Thank you for your message! How can I assist you today?</span>`;
            chatMessages.appendChild(replyMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
        }, 1500);
    }

    // Send Message on Button Click
    sendMessage.addEventListener("click", sendMessageToChat);

    // Send Message on "Enter" Key Press
    messageInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessageToChat();
        }
    });

    // Audio Call Button
    document.getElementById("audioCall").addEventListener("click", function () {
        alert("🔊 Starting an audio call with your counselor...");
    });

    // Video Call Button
    document.getElementById("videoCall").addEventListener("click", function () {
        alert("📹 Starting a video call with your counselor...");
    });
});
