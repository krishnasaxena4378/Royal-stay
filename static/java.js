
// ============================
// Contact Form
// ============================

let contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Message Sent Successfully!");

        contactForm.reset();

    });

}

// ============================
// Mobile Menu Toggle
// ============================
let menuBtn = document.querySelector(".menu-btn");
let navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// ============================
// Booking Date Validation
// ============================
let checkinInput = document.getElementById("checkin");
let checkoutInput = document.getElementById("checkout");

if (checkinInput && checkoutInput) {
    // Helper function to get local YYYY-MM-DD format
    function getLocalDateString(date) {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 1. Set minimum check-in date to today
    let today = new Date();
    let todayStr = getLocalDateString(today);
    checkinInput.setAttribute("min", todayStr);

    // 2. Initially set minimum check-out date to tomorrow
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkoutInput.setAttribute("min", getLocalDateString(tomorrow));

    // 3. Update check-out min date when check-in changes
    checkinInput.addEventListener("change", function() {
        if (this.value) {
            let checkinDate = new Date(this.value);
            // Add 1 day for minimum stay
            checkinDate.setDate(checkinDate.getDate() + 1);
            let nextDayStr = getLocalDateString(checkinDate);
            
            checkoutInput.setAttribute("min", nextDayStr);
            
            // If the selected check-out is now invalid, clear it
            if (checkoutInput.value && checkoutInput.value < nextDayStr) {
                checkoutInput.value = "";
            }
        }
    });
}
