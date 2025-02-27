document.addEventListener("DOMContentLoaded", function () {
    renderUsers();
    renderCounselors();
    renderSubscriptions();
});

// ========================== Manage Users ==========================
const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Blocked" }
];

function renderUsers() {
    const userTable = document.getElementById("user-list");
    userTable.innerHTML = "";

    users.forEach(user => {
        userTable.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.status}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                    <button class="block-btn" onclick="toggleUserStatus(${user.id})">${user.status === "Active" ? "Block" : "Unblock"}</button>
                </td>
            </tr>
        `;
    });
}

function editUser(userId) {
    alert(`Edit User ID: ${userId}`);
}

function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        alert(`User ID ${userId} deleted.`);
    }
}

function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    user.status = user.status === "Active" ? "Blocked" : "Active";
    renderUsers();
}
document.addEventListener("DOMContentLoaded", renderUsers);

// ========================== Manage Counselors ==========================
const counselors = [
    { id: 1, name: "Dr. Alice", speciality: "Anxiety", status: "Pending" },
    { id: 2, name: "Dr. Bob", speciality: "Depression", status: "Approved" }
];

function renderCounselors() {
    const counselorTable = document.getElementById("counselor-list");
    counselorTable.innerHTML = "";

    counselors.forEach(counselor => {
        counselorTable.innerHTML += `
            <tr>
                <td>${counselor.name}</td>
                <td>${counselor.speciality}</td>
                <td>${counselor.status}</td>
                <td>
                    <button class="approve-btn" onclick="approveCounselor(${counselor.id})">Approve</button>
                    <button class="reject-btn" onclick="rejectCounselor(${counselor.id})">Reject</button>
                </td>
            </tr>
        `;
    });
}

function approveCounselor(id) {
    const counselor = counselors.find(c => c.id === id);
    counselor.status = "Approved";
    renderCounselors();
}

function rejectCounselor(id) {
    const counselor = counselors.find(c => c.id === id);
    counselor.status = "Rejected";
    renderCounselors();
}
document.addEventListener("DOMContentLoaded", renderCounselors);
// ========================== Subscription Management ==========================
const subscriptions = [
    { id: 1, user: "John Doe", plan: "Basic", start: "2025-02-01", expiry: "2025-03-01", status: "Paid" },
    { id: 2, user: "Jane Smith", plan: "Premium", start: "2025-01-15", expiry: "2025-02-15", status: "Pending" }
];

function renderSubscriptions() {
    const subscriptionTable = document.getElementById("subscription-list");
    subscriptionTable.innerHTML = "";

    subscriptions.forEach(subscription => {
        subscriptionTable.innerHTML += `
            <tr>
                <td>${subscription.user}</td>
                <td>${subscription.plan}</td>
                <td>${subscription.start}</td>
                <td>${subscription.expiry}</td>
                <td>${subscription.status}</td>
                <td>
                    <button class="pay-btn" onclick="processPayment(${subscription.id})">${subscription.status === "Pending" ? "Mark Paid" : "Paid"}</button>
                    <button class="cancel-btn" onclick="cancelSubscription(${subscription.id})">Cancel</button>
                </td>
            </tr>
        `;
    });
}

function processPayment(subscriptionId) {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (subscription.status === "Pending") {
        subscription.status = "Paid";
        alert(`Subscription ID ${subscriptionId} marked as Paid.`);
        renderSubscriptions();
    }
}

function cancelSubscription(subscriptionId) {
    if (confirm("Are you sure you want to cancel this subscription?")) {
        alert(`Subscription ID ${subscriptionId} has been canceled.`);
    }
}
document.addEventListener("DOMContentLoaded", renderSubscriptions);
// ========================== Settings ==========================
function updateSettings() {
    const name = document.getElementById("admin-name").value;
    const email = document.getElementById("admin-email").value;
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword && newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
    }

    alert("Settings updated successfully!");
}
