document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;
    const paymentStatus = document.getElementById("payment-status");
    
    if (cardName && cardNumber.length === 16 && expiry.length === 5 && cvv.length === 3) {
        paymentStatus.style.color = "green";
        paymentStatus.textContent = "Payment Successful!";
    } else {
        paymentStatus.style.color = "red";
        paymentStatus.textContent = "Invalid Payment Details. Please check your input.";
    }
});
