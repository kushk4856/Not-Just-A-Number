
const payButtons = document.querySelectorAll('.pay-btn');
payButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = "https://rzp.io/rzp/09Birzra";
    });
});

// Handle click for the 'first-right' container
document.querySelector('.first-right').addEventListener('click', function() {
    window.location.href = "https://rzp.io/rzp/09Birzra";
});

// Handle click for the 'register_mobile' container
document.querySelector('.register_mobile').addEventListener('click', function() {
    window.location.href = "https://rzp.io/rzp/09Birzra";
});