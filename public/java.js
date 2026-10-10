
// ============================
// Contact Form
// ============================

let contactForm = document.getElementById("contactForm");

// Sends a form to Formspree (messages arrive in the owner's email)
function sendToFormspree(form, url, successMessage) {
    fetch(url, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
    }).then(function(response) {
        if (response.ok) {
            alert(successMessage);
            form.reset();
        } else {
            alert("Sorry, something went wrong. Please try again.");
        }
    }).catch(function() {
        alert("Network error. Please try again.");
    });
}

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        sendToFormspree(contactForm, contactForm.action, "Message Sent Successfully!");

    });

}

// ============================
// Booking Form (sent to Formspree)
// ============================
let bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function(event) {

        let checkin = document.getElementById("checkin").value;
        let checkout = document.getElementById("checkout").value;

        // Check-out must be after check-in
        if (checkout <= checkin) {
            event.preventDefault();
            alert("Check-out date must be after check-in date.");
            return;
        }

        event.preventDefault();

        sendToFormspree(bookingForm, bookingForm.dataset.formspree, "Room Booked Successfully!");

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
