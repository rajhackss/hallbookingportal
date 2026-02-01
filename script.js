// Data Source
const halls = [
    {
        id: 1,
        name: "Sarjerao Yadav Multipurpose Hall & Lawn",
        address: "Bahe Rd, near SONA Chemicals, MIDC, Ishwarpur, Maharashtra 415409",
        capacity: "500 Guests",
        price: "₹80,000 / Day",
        description: "A grand multipurpose hall with an expansive lawn, perfect for massive wedding receptions and public gatherings.",
        images: ["hall1.jpg", "hall11.jpg", "hall111.jpg"],
        facilities: ["Expansive Lawn", "Large Stage", "Ample Parking", "Dining Hall"],
        reviews: [
            { text: "Huge lawn, perfect for our 1000+ guest wedding.", author: "Amit P.", rating: 5 },
            { text: "Good location in MIDC, very spacious.", author: "Suresh K.", rating: 4 }
        ]
    },
    {
        id: 2,
        name: "Indira Palace & Lawns",
        address: "Waghwadi, Phata, Ishwarpur, Maharashtra 415407",
        capacity: "600 Guests",
        price: "₹90,000 / Day",
        description: "An elegant palace-style venue featuring regal architecture and diverse layout options for medium to large events.",
        images: ["hall2.jpg", "hall22.jpg", "hall222.jpg"],
        facilities: ["Palace Architecture", "Decorative Lighting", "Bridal Rooms", "Generator Backup", "Catering Service"],
        reviews: [
            { text: "Felt like a royal wedding. Beautiful architecture.", author: "Neha S.", rating: 5 }
        ]
    },
    {
        id: 3,
        name: "Mankeshwar Multi-purpose Hall & Lawns",
        address: "Kore Appa Nagar, Kreshar Road, Shastri Nagar, Kisannagar, Ishwarpur, Maharashtra 415409",
        capacity: "400 Guests",
        price: "₹45,000 / Day",
        description: "A modern facility located in a prime residential area, offering a blend of indoor comfort and outdoor freshness.",
        images: ["hall3.jpg", "hall33.jpg", "hall333.jpg"],
        facilities: ["Modern Acoustics", "Central Location", "AC Rooms", "Garden Area", "Valet Parking"],
        reviews: [
            { text: "Very convenient location for guests.", author: "Rohan D.", rating: 4 },
            { text: "Clean and well maintained.", author: "Priya M.", rating: 5 }
        ]
    },
    {
        id: 4,
        name: "Akshay Multipurpose Hall",
        address: "Waghwadi Phata, Ishwarpur, Maharashtra 415409",
        capacity: "700 Guests",
        price: "₹60000 / Day",
        description: "A cozy and budget-friendly hall ideal for intimate weddings, birthday parties, and corporate functions.",
        images: ["hall4.jpg", "hall44.jpg", "hall444.jpg"],
        facilities: ["Budget Friendly", "Intimate Setting", "Stage Decor", "Sound System", "Changing Rooms"],
        reviews: [
            { text: "Great value for money.", author: "Vikram S.", rating: 5 }
        ]
    }
];

// State
let currentHall = null;
const bookedDates = ["2026-02-14", "2026-02-20", "2026-03-01"];

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    showHome(); // Initial View
});

// Routing / Navigation Logic
function showHome() {
    currentHall = null;
    const app = document.getElementById('app-content');
    window.scrollTo(0, 0);

    let html = `
        <!-- Hero Section -->
        <header id="home" class="hero-section" style="background-image: url('hall1.jpg');">
            <div class="hero-overlay"></div>
            <div class="hero-content fade-in">
                <h1>Find Your Perfect Venue</h1>
                <p>Explore Ishwarpur's finest multipurpose halls and lawns.</p>
                <a href="#halls-list" class="btn btn-primary">View Halls</a>
            </div>
        </header>

        <section id="halls-list" class="section-container">
            <div class="section-title">
                <h2>Our Venues</h2>
                <div class="underline"></div>
            </div>
            
            <div class="halls-grid">
    `;

    halls.forEach(hall => {
        html += `
            <div class="hall-preview-card glass-card fade-in" onclick="showHallDetails(${hall.id})">
                <div class="card-image" style="background-image: url('${hall.images[0]}');"></div>
                <div class="card-content">
                    <h3>${hall.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${hall.address}</p>
                    <div class="card-meta">
                        <span><i class="fas fa-users"></i> ${hall.capacity}</span>
                        <span><i class="fas fa-tag"></i> ${hall.price}</span>
                    </div>
                    <button class="btn btn-secondary full-width" style="margin-top: 1rem;">View Details</button>
                </div>
            </div>
        `;
    });

    // Add Global Sections (Usage: User can browse general info here, or click hall for specific info)
    html += `
            </div>
        </section>

        <!-- Global Reviews Preview -->
        <section id="reviews" class="section-container alt-bg">
            <div class="section-title">
                <h2>What Guests Say</h2>
                <div class="underline"></div>
            </div>
            <div class="reviews-grid">
                <div class="review-card glass-card">
                    <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p class="review-text">"The entire booking process was seamless. Highly recommended!"</p>
                    <div class="reviewer">- Anjali K.</div>
                </div>
                 <div class="review-card glass-card">
                    <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                    <p class="review-text">"Great platform to compare halls. Saved me so much time."</p>
                    <div class="reviewer">- Rajesh M.</div>
                </div>
            </div>
        </section>

        <!-- Support Section -->
        <section id="support" class="section-container">
            <div class="section-title">
                <h2>Support & Contact</h2>
                <div class="underline"></div>
            </div>
            <div class="support-wrapper">
                <div class="support-card glass-card">
                    <i class="fas fa-headset"></i>
                    <h3>Live Assistance</h3>
                    <p>Issues with booking? Let us help.</p>
                    <button class="btn btn-outline" id="liveChatBtn" onclick="showNotification('Live Chat Connected (Demo)')">Start Chat</button>
                </div>
                
                <!-- Complaint Form -->
                <div class="glass-card complaint-form-wrapper">
                    <h3>Raise an Issue / Complaint</h3>
                    <div class="complaint-form">
                        <textarea id="complaintText" placeholder="Describe your issue..."></textarea>
                        <button class="btn btn-secondary" onclick="submitComplaint()">Submit Complaint</button>
                    </div>
                </div>

                <div class="location-card glass-card">
                    <i class="fas fa-map-pin"></i>
                    <h3>Location</h3>
                    <p>Ishwarpur</p>
                    <div style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                        <h4>Manage Booking</h4>
                        <input type="text" placeholder="Booking ID" style="padding: 0.5rem; width: 100%; border-radius: 4px; margin-bottom: 0.5rem; background: var(--secondary); border: 1px solid var(--glass-border); color: white;">
                        <button class="btn btn-outline full-width" onclick="cancelBooking()">Cancel Booking</button>
                        <p class="refund-policy" style="font-size: 0.8rem; margin-top: 0.5rem;">See Refund Policy below.</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    app.innerHTML = html;
}

function showHallDetails(id) {
    const hall = halls.find(h => h.id === id);
    if (!hall) return;
    currentHall = hall;

    const app = document.getElementById('app-content');
    window.scrollTo(0, 0);

    // Facilities HTML
    const facilitiesHtml = hall.facilities.map(f => `
        <div class="facility-item"><i class="fas fa-check-circle"></i> ${f}</div>
    `).join('');

    // Gallery HTML
    const galleryHtml = hall.images.map(img => `
        <div class="gallery-item" style="background-image: url('${img}');" onclick="window.open('${img}', '_blank')"></div>
    `).join('');

    // Reviews HTML
    const reviewsHtml = hall.reviews.map(r => `
        <div class="review-card glass-card">
            <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
            <p class="review-text">${r.text}</p>
            <div class="reviewer">- ${r.author}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <!-- Hall Hero -->
        <header class="hero-section" style="background-image: url('${hall.images[0]}'); height: 60vh;">
            <div class="hero-overlay"></div>
            <div class="hero-content fade-in">
                <h1>${hall.name}</h1>
                <p><i class="fas fa-map-marker-alt"></i> ${hall.address}</p>
                <button onclick="showHome()" class="btn btn-outline"><i class="fas fa-arrow-left"></i> Back to Halls</button>
            </div>
        </header>

        <!-- Details -->
        <section class="section-container">
            <div class="details-grid">
                <div class="detail-card glass-card">
                    <i class="fas fa-users"></i>
                    <h3>Capacity</h3>
                    <p>${hall.capacity}</p>
                </div>
                <div class="detail-card glass-card">
                    <i class="fas fa-money-bill-wave"></i>
                    <h3>Price</h3>
                    <p>${hall.price}</p>
                </div>
                <div class="detail-card glass-card">
                    <i class="fas fa-info-circle"></i>
                    <h3>About</h3>
                    <p style="font-size: 0.9rem;">${hall.description}</p>
                </div>
            </div>

            <!-- Gallery -->
            <div class="glass-panel" style="padding: 2rem; border-radius: 8px;">
                <h3>Photo Gallery</h3>
                <div class="gallery-grid">
                    ${galleryHtml}
                </div>
            </div>

            <div class="facilities-container" style="margin-top: 3rem;">
                <h3>Facilities</h3>
                <div class="facilities-list">
                    ${facilitiesHtml}
                </div>
            </div>
        </section>

        <!-- Booking Section -->
        <section id="booking" class="section-container booking-section" style="background-image: url('${hall.images[1] || hall.images[0]}');">
             <div class="section-title">
                <h2>Book ${hall.name}</h2>
                <div class="underline"></div>
            </div>
            <div class="booking-wrapper glass-panel">
                <div class="availability-check">
                    <h3>Check Availability</h3>
                    <div class="check-form">
                        <input type="date" id="checkDate">
                        <button id="checkBtn" class="btn btn-secondary">Check Status</button>
                    </div>
                    <div id="availabilityResult" class="result-message"></div>
                </div>

                <div id="bookingFormContainer" class="booking-form-container hidden">
                    <h3>Confirm Booking</h3>
                    <form id="bookingForm">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="fullName" required>
                        </div>
                        <div class="form-group">
                            <label>Contact</label>
                            <input type="tel" id="contact" required>
                        </div>
                         <div class="payment-selection">
                            <h4>Payment Method</h4>
                            <div class="payment-options">
                                <label class="radio-container">UPI
                                    <input type="radio" name="payment" value="upi" checked><span class="checkmark"></span>
                                </label>
                                <label class="radio-container">Card
                                    <input type="radio" name="payment" value="card"><span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary full-width">Pay & Book</button>
                    </form>
                </div>
            </div>
        </section>

        <!-- Reviews -->
        <section class="section-container alt-bg">
            <div class="section-title">
                <h2>Reviews</h2>
                <div class="underline"></div>
            </div>
            <div class="reviews-grid">
                ${reviewsHtml}
            </div>
        </section>

         <!-- Footer info -->
         <section class="section-container" style="text-align: center;">
            <p><strong>Address:</strong> ${hall.address}</p>
            <p class="refund-policy" style="margin-top: 1rem; color: #8892b0;">Cancellation Policy: 50% refund if cancelled 7 days prior.</p>
         </section>
    `;

    // Re-attach listeners for the new DOM elements
    initAvailabilityCheck();
    initBookingForm();
}

// Logic Functions
function initAvailabilityCheck() {
    const checkBtn = document.getElementById('checkBtn');
    if (!checkBtn) return;

    checkBtn.addEventListener('click', () => {
        const dateInput = document.getElementById('checkDate');
        const resultDiv = document.getElementById('availabilityResult');
        const bookingForm = document.getElementById('bookingFormContainer');
        const date = dateInput.value;

        if (!date) {
            resultDiv.textContent = "Please select a date.";
            resultDiv.className = "result-message error";
            return;
        }

        checkBtn.textContent = "Checking...";
        checkBtn.disabled = true;

        setTimeout(() => {
            checkBtn.textContent = "Check Status";
            checkBtn.disabled = false;

            if (bookedDates.includes(date)) {
                resultDiv.textContent = `Unavailable on ${date}.`;
                resultDiv.className = "result-message error";
                bookingForm.classList.add('hidden');
            } else {
                resultDiv.textContent = `Available! Proceed to book.`;
                resultDiv.className = "result-message success";
                bookingForm.classList.remove('hidden');
            }
        }, 800);
    });
}

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('checkDate').value;
        const name = document.getElementById('fullName').value;
        const contact = document.getElementById('contact').value;

        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = "Processing...";
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = "Pay & Book";
            btn.disabled = false;

            bookedDates.push(date);
            showNotification(`Booking Confirmed! Confirmation sent to ${contact}.`);

            // Go back home or reset
            form.reset();
            document.getElementById('bookingFormContainer').classList.add('hidden');
            document.getElementById('availabilityResult').textContent = '';
            document.getElementById('checkDate').value = '';
        }, 1500);
    });
}

function initNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if (nav.style.display === 'flex') {
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.right = '0';
                nav.style.background = 'rgba(10, 25, 47, 0.95)';
                nav.style.width = '100%';
                nav.style.padding = '2rem';
            }
        });
    }

    // Nav Links Handling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (currentHall) {
                // If in details view, some links like #support might strictly mean the global support?
                // For now, let's allow jumping to Home if clicking "Home"
                if (link.getAttribute('href') === '#home') {
                    showHome();
                }
            }
        });
    });
}

function showNotification(msg, type = 'success') {
    const notif = document.getElementById('notification');
    if (!notif) return;
    const content = document.getElementById('notificationMessage');
    content.textContent = msg;
    notif.classList.remove('hidden');
    setTimeout(() => notif.classList.add('hidden'), 4000);
}

// Global Actions (Exposed to Global Scope for HTML onclick)
window.submitComplaint = function () {
    const text = document.getElementById('complaintText').value;
    if (!text.trim()) {
        showNotification("Please enter details.", "error");
        return;
    }
    showNotification("Complaint ID #8829 created. Support will contact you.");
    document.getElementById('complaintText').value = '';
};

window.cancelBooking = function () {
    showNotification("Booking Cancelled. Refund processed (if eligible).");
};

window.showHome = showHome;
window.showHallDetails = showHallDetails;
window.showNotification = showNotification;
