let selectedPlan = "";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    });

    document.getElementById("paymentFormSubmit").addEventListener("submit", function (event) {
        event.preventDefault();
        processPayment();
    });
});

function subscribe(plan) {
    selectedPlan = plan;
    document.getElementById("paymentForm").style.display = "block";
}

function processPayment() {
    let cardNumber = document.getElementById("cardNumber").value;
    let expiry = document.getElementById("expiry").value;
    let cvv = document.getElementById("cvv").value;

    if (!cardNumber || !expiry || !cvv) {
        alert("Please fill in all payment details.");
        return;
    }

    fetch("http://localhost:8080/api/payments/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken")
        },
        body: JSON.stringify({
            plan: selectedPlan,
            cardNumber: cardNumber,
            expiry: expiry,
            cvv: cvv
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("paymentForm").style.display = "none";
            document.getElementById("confirmationMessage").style.display = "block";
        } else {
            alert("Payment failed. Please try again.");
        }
    })
    .catch(error => console.error("Error processing payment:", error));
}
