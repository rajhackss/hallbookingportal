// Data Source
const halls = [
    {
        id: 1,
        name: "Sarjerao Yadav Multipurpose Hall & Lawn",
        address: "Bahe Rd, near SONA Chemicals, MIDC, Ishwarpur, Maharashtra 415409",
        capacity: "500 Guests",
        price: "₹70,000 / Day",
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
        capacity: "500 Guests",
        price: "₹50,000 / Day",
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
        capacity: "800 Guests",
        price: "₹65,000 / Day",
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
let currentSlot = null; // Track selected slot

// Detailed Booking Records for "My Bookings"
// Structure: { id: "HB-1234", hallId: 1, date: "2026-02-14", slot: "Morning", name: "John", status: "Confirmed" }
const bookingRecords = [
    { id: "HB-9988", hallId: 1, date: "2026-02-14", slot: "Morning", name: "Demo User", status: "Confirmed" }
];

// Mock Booking Data: { "YYYY-MM-DD": ["Morning", "Evening"] }
const bookings = {
    "2026-02-14": ["Morning", "Evening"],
    "2026-02-20": ["Night"],
    "2026-03-01": ["Morning", "Evening", "Night"] // Fully booked
};
const slotsArray = ["Morning", "Evening", "Night"];

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    showHome();
});

// Routing
function showHome() {
    setNavVisibility(false); // RESTORE NAV
    currentHall = null;
    const app = document.getElementById('app-content');

    // Hide Book Now on Home (Specific override)
    const navBooking = document.getElementById('nav-booking-item');
    if (navBooking) navBooking.style.display = 'none';

    window.scrollTo(0, 0);

    let html = `
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

    html += `
            </div>
        </section>

        <!-- Global Sections -->
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

        <section id="support" class="section-container">
            <div class="section-title">
                <h2>Support & Contact</h2>
                <div class="underline"></div>
            </div>
            <div class="support-wrapper">
                <div class="support-card glass-card">
                    <i class="fas fa-headset"></i>
                    <h3>Contact Us</h3>
                    <p style="margin-bottom: 0.5rem;"><i class="fas fa-phone-alt"></i> +91 8010253647</p>
                    <p style="margin-bottom: 0.5rem;"><i class="fas fa-envelope"></i> vaishnavipatil1459@gmail.com</p>
                    <p style="color: var(--text-muted); font-size: 0.9rem;"><i class="fas fa-clock"></i> 10:00 AM - 5:00 PM</p>
                    <button class="btn btn-outline" onclick="showNotification('Calling Support...')" style="margin-top: 1rem;">Call Now</button>
                </div>
                
                <div class="glass-card complaint-form-wrapper">
                    <h3>Raise an Issue / Complaint</h3>
                    <div class="complaint-form">
                        <textarea id="complaintText" placeholder="Describe your issue..."></textarea>
                        <button class="btn btn-secondary" onclick="window.submitComplaint()">Submit Complaint</button>
                    </div>
                </div>

                <div class="location-card glass-card">
                    <i class="fas fa-map-pin"></i>
                    <h3>Manage Booking</h3>
                    <p style="margin-bottom: 1rem;">Have a booking ID? Manage it here.</p>
                    <input type="text" id="bookingIdInput" placeholder="Enter Booking ID (e.g. HB-1234)" style="padding: 0.5rem; width: 100%; border-radius: 4px; margin-bottom: 0.5rem; background: var(--secondary); border: 1px solid var(--glass-border); color: white;">
                    <button class="btn btn-outline full-width" onclick="window.cancelBooking()">Cancel Booking</button>
                    <p class="refund-policy" style="font-size: 0.8rem; margin-top: 0.5rem;">Cancellation allowed 7 days prior.</p>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faq" class="section-container alt-bg">
            <div class="section-title">
                <h2>Frequently Asked Questions</h2>
                <div class="underline"></div>
            </div>
            <div class="faq-grid" style="max-width: 800px; margin: 0 auto;">
                <div class="glass-card faq-item" onclick="this.classList.toggle('active')">
                    <div class="faq-question">
                        <h4><i class="fas fa-question-circle"></i> What is the cancellation policy?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>You can cancel your booking up to 7 days before the event date for a 50% refund. Cancellations made within 7 days are non-refundable.</p>
                    </div>
                </div>
                <div class="glass-card faq-item" onclick="this.classList.toggle('active')">
                    <div class="faq-question">
                        <h4><i class="fas fa-question-circle"></i> Is parking available at the venues?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes, all our venues come with ample parking space for guests. Specific capacity details are listed on each hall's page.</p>
                    </div>
                </div>
                <div class="glass-card faq-item" onclick="this.classList.toggle('active')">
                    <div class="faq-question">
                        <h4><i class="fas fa-question-circle"></i> Do you provide catering services?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Some venues like 'Indira Palace' offer in-house catering. For others, we can recommend trusted vendor partners.</p>
                    </div>
                </div>
                 <div class="glass-card faq-item" onclick="this.classList.toggle('active')">
                    <div class="faq-question">
                        <h4><i class="fas fa-question-circle"></i> How do I get my Booking ID?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Your unique Booking ID (e.g., HB-1234) is generated instantly after you confirm your payment. Please save it for tracking.</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    app.innerHTML = html;
    initGlobalValidators();
}

function showHallDetails(id) {
    setNavVisibility(false); // RESTORE NAV
    const hall = halls.find(h => h.id === id);
    if (!hall) return;
    currentHall = hall;
    currentSlot = null; // Reset slot

    // Show Book Now on Details
    const navBooking = document.getElementById('nav-booking-item');
    if (navBooking) navBooking.style.display = 'block';

    const app = document.getElementById('app-content');
    window.scrollTo(0, 0);

    const facilitiesHtml = hall.facilities.map(f => `
        <div class="facility-item"><i class="fas fa-check-circle"></i> ${f}</div>
    `).join('');

    const galleryHtml = hall.images.map(img => `
        <div class="gallery-item" style="background-image: url('${img}');" onclick="window.open('${img}', '_blank')"></div>
    `).join('');

    const reviewsHtml = hall.reviews.map(r => `
        <div class="review-card glass-card">
            <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
            <p class="review-text">${r.text}</p>
            <div class="reviewer">- ${r.author}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <header class="hero-section" style="background-image: url('${hall.images[0]}'); height: 60vh;">
            <div class="hero-overlay"></div>
            <div class="hero-content fade-in">
                <h1>${hall.name}</h1>
                <p><i class="fas fa-map-marker-alt"></i> ${hall.address}</p>
                <button onclick="showHome()" class="btn btn-outline"><i class="fas fa-arrow-left"></i> Back to Halls</button>
            </div>
        </header>

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

        <section id="booking" class="section-container booking-section" style="background-image: url('${hall.images[1] || hall.images[0]}');">
             <div class="section-title">
                <h2>Book ${hall.name}</h2>
                <div class="underline"></div>
            </div>
            <div class="booking-wrapper glass-panel">
                <div class="availability-check">
                    <h3>Select Date & Slot</h3>
                    <div class="check-form">
                        <input type="date" id="checkDate">
                        <button id="checkBtn" class="btn btn-secondary">Show Slots</button>
                    </div>
                    
                    <!-- Slot Grid -->
                    <div id="slotSelection" class="slots-grid hidden">
                        <!-- Slots injected here -->
                    </div>
                    <div id="slotMessage" class="result-message" style="margin-top: 1rem;"></div>
                </div>

                <div id="bookingFormContainer" class="booking-form-container hidden">
                    <h3>Confirm Booking</h3>
                    <div class="selected-slot-info" style="margin-bottom: 1rem; color: var(--primary); font-weight: bold;"></div>
                    <form id="bookingForm">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="fullName" required placeholder="Alphabets only">
                        </div>
                        <div class="form-group">
                            <label>Contact</label>
                            <input type="tel" id="contact" required placeholder="Numbers only">
                        </div>




                        <button type="submit" class="btn btn-primary full-width" style="margin-top: 1rem;">Pay Now</button>
                    </form>
                </div>
            </div>
        </section>

        <section class="section-container alt-bg">
            <div class="section-title">
                <h2>Reviews</h2>
                <div class="underline"></div>
            </div>
            <div class="reviews-grid">
                ${reviewsHtml}
            </div>
        </section>

         <section class="section-container" style="text-align: center;">
            <p><strong>Address:</strong> ${hall.address}</p>
            <p class="refund-policy" style="margin-top: 1rem; color: #8892b0;">Cancellation Policy: 50% refund if cancelled 7 days prior.</p>
         </section>
    `;

    initAvailabilityCheck();
    initBookingForm();
}

// Logic: Validators
function initGlobalValidators() {
    const bookingId = document.getElementById('bookingIdInput');
    if (bookingId) {
        bookingId.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
}

// Logic: Slot Booking
function initAvailabilityCheck() {
    const checkBtn = document.getElementById('checkBtn');
    if (!checkBtn) return;

    // Set Min Date to Tomorrow
    const dateInput = document.getElementById('checkDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    checkBtn.addEventListener('click', () => {
        // existing logic...
        const slotGrid = document.getElementById('slotSelection');
        const formContainer = document.getElementById('bookingFormContainer');
        const msgDiv = document.getElementById('slotMessage');
        const date = dateInput.value;

        if (!date) {
            msgDiv.textContent = "Please select a date first.";
            msgDiv.className = "result-message error";
            return;
        }

        checkBtn.textContent = "Loading Slots...";
        checkBtn.disabled = true;

        setTimeout(() => {
            checkBtn.textContent = "Update Slots";
            checkBtn.disabled = false;
            slotGrid.innerHTML = '';
            slotGrid.classList.remove('hidden');
            formContainer.classList.add('hidden');
            currentSlot = null;

            const bookedSlots = bookings[date] || [];

            slotsArray.forEach(slot => {
                const isBooked = bookedSlots.includes(slot);
                const btn = document.createElement('div');
                btn.className = `slot-card ${isBooked ? 'booked' : 'available'}`;
                btn.innerHTML = `<i class="fas ${getSlotIcon(slot)}"></i><br>${slot}`;

                if (isBooked) {
                    btn.title = "Already Booked";
                } else {
                    btn.onclick = () => selectSlot(btn, slot, date);
                }

                slotGrid.appendChild(btn);
            });

            msgDiv.textContent = "Select an available slot.";
            msgDiv.className = "result-message";
        }, 500);
    });
}

function getSlotIcon(slot) {
    if (slot === 'Morning') return 'fa-sun';
    if (slot === 'Evening') return 'fa-cloud-sun';
    return 'fa-moon';
}

function selectSlot(element, slot, date) {
    document.querySelectorAll('.slot-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    currentSlot = slot;

    const formContainer = document.getElementById('bookingFormContainer');
    formContainer.classList.remove('hidden');

    const info = formContainer.querySelector('.selected-slot-info');
    info.textContent = `Booking for: ${date} (${slot})`;

    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Handle Payment Method Toggle


function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const nameInput = document.getElementById('fullName');
    const contactInput = document.getElementById('contact');

    if (nameInput) {
        nameInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
    }

    if (contactInput) {
        contactInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const date = document.getElementById('checkDate').value;
        const name = nameInput.value;
        const contact = contactInput.value;
        // Redirect to Razorpay Link
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = "Redirecting...";
        btn.disabled = true;

        // Open link in new tab
        window.open("https://rzp.io/rzp/kDgTqsL", "_blank");

        // Mark as booked locally (Optimistic update)
        handleOfflineBooking(date, name, contact, "Online - Razorpay Link");
    });
}

function handleOfflineBooking(date, name, contact, type, refId = null) {
    // Register booking
    if (!bindings) var bindings = bookings; // Safety handling if variable name matches
    if (!bookings[date]) bookings[date] = [];
    bookings[date].push(currentSlot);

    // Generate ID and Save Record
    const bookingId = "HB-" + Math.floor(1000 + Math.random() * 9000);
    bookingRecords.push({
        id: bookingId,
        hallId: currentHall.id,
        date: date,
        slot: currentSlot,
        name: name,
        status: "Confirmed",
        paymentType: type,
        refId: refId
    });

    showNotification(`Booking Confirmed! ID: ${bookingId}`);

    // Show Success Modal / Details
    const formContainer = document.getElementById('bookingFormContainer');
    formContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem;">
              <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
              <h3>Booking Successful!</h3>
              <p style="font-size: 1.2rem; margin: 1rem 0;">Your Booking ID: <strong style="color: var(--primary);">${bookingId}</strong></p>
               <p>${type} ${refId ? `<br><span style="font-size:0.8rem">Ref: ${refId}</span>` : ''}</p>
              <div style="background: rgba(255, 107, 107, 0.1); border: 1px solid #ff6b6b; padding: 0.5rem; border-radius: 4px; margin: 1rem 0;">
                  <p style="color: #ff6b6b; font-size: 0.9rem; margin: 0;"><strong>⚠️ IMPORTANT:</strong> Copy this Booking ID now.<br>You valid need it to <strong>Track Status</strong> or <strong>Cancel Booking</strong>.</p>
              </div>
              <button class="btn btn-secondary" onclick="showMyBookingsView()">Track Booking</button>
          </div>
      `;

    // Reset UI
    const form = document.getElementById('bookingForm');
    if (form) form.reset();

    // Reset Payment UI
    if (window.togglePaymentDetails) window.togglePaymentDetails();

    document.getElementById('bookingFormContainer').classList.add('hidden');
    document.getElementById('slotSelection').innerHTML = '';
    document.getElementById('slotSelection').classList.add('hidden');
    document.getElementById('checkDate').value = '';
    document.getElementById('slotMessage').textContent = '';

    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) {
        checkBtn.textContent = "Check Availability";
        checkBtn.disabled = false;
    }
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
                nav.style.zIndex = '1000';
            }
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = link.getAttribute('href').substring(1);

            // Close mobile menu if open
            if (window.innerWidth <= 768 && nav.style.display === 'flex') {
                nav.style.display = 'none';
            }

            if (targetId === 'home') {
                showHome();
                return;
            }

            // Logic: If on Details Page, and target is Global (Reviews, Support, Halls) -> Go Home first
            if (currentHall) {
                // If clicking Booking or Details on Details page, scroll if element exists
                if ((targetId === 'booking' || targetId === 'details') && document.getElementById(targetId)) {
                    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                    return;
                }

                // Otherwise switch to Home
                showHome();

                // Then scroll after render
                setTimeout(() => {
                    const section = document.getElementById(targetId) || document.getElementById('halls-list'); // Fallback to halls list
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                // On Home Page
                if (targetId === 'details' || targetId === 'booking') {
                    // "The Hall" or "Book Now" on Home page -> Go to Halls List
                    const list = document.getElementById('halls-list');
                    if (list) list.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Reviews, Support, etc.
                    const section = document.getElementById(targetId);
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function showNotification(msg, type = 'success') {
    const notif = document.getElementById('notification');
    if (!notif) return;
    const content = document.getElementById('notificationMessage');
    const icon = notif.querySelector('i');

    content.textContent = msg;

    if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#ff6b6b';
    } else {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#64ffda';
    }

    notif.classList.remove('hidden');
    setTimeout(() => notif.classList.add('hidden'), 4000);
}

// Global Exports
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
    const id = document.getElementById('bookingIdInput').value;
    if (!id) {
        showNotification("Please enter a Booking ID.", "error");
        return;
    }
    showNotification(`Booking ${id} Cancelled. Refund processed.`);
    document.getElementById('bookingIdInput').value = '';
};

// Helper: Control Nav Visibility
function setNavVisibility(restricted) {
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        const parent = link.parentElement;

        if (restricted) {
            // In My Bookings: Hide everything except Home (and logically My Bookings active state)
            if (href === '#home') {
                parent.style.display = 'block';
            } else {
                parent.style.display = 'none';
            }
        } else {
            // Restore: Show all standard links
            // Note: Book Now (#booking) is handled separately by showHome/showDetails logic
            if (href !== '#booking') {
                parent.style.display = 'block';
            }
        }
    });
}

function showMyBookingsView() {
    currentHall = null;
    setNavVisibility(true); // RESTRICT NAV

    const app = document.getElementById('app-content');
    window.scrollTo(0, 0);

    app.innerHTML = `
        <header class="hero-section" style="background-image: url('hall4.jpg'); height: 50vh;">
            <div class="hero-overlay"></div>
            <div class="hero-content fade-in">
                <h1>My Bookings</h1>
                <p>Manage your events and track status.</p>
            </div>
        </header>

        <section class="section-container">
            <div class="glass-panel" style="max-width: 600px; margin: 0 auto; padding: 2rem; text-align: center;">
                <h3>Find Your Booking</h3>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <input type="text" id="searchBookingId" placeholder="Enter Booking ID (e.g., HB-1234)" 
                           style="flex: 1; padding: 0.8rem; border-radius: 4px; border: 1px solid var(--glass-border); background: var(--secondary); color: white;">
                    <button class="btn btn-primary" onclick="searchBooking()">Search</button>
                </div>
                <div id="bookingResult" style="margin-top: 2rem;"></div>
            </div>
        </section>
    `;
}

window.searchBooking = function () {
    const id = document.getElementById('searchBookingId').value.trim();
    const resultDiv = document.getElementById('bookingResult');

    if (!id) {
        showNotification("Please enter a Booking ID.", "error");
        return;
    }

    const record = bookingRecords.find(r => r.id === id);

    if (!record) {
        resultDiv.innerHTML = `<p style="color: #ff6b6b;">No booking found with ID: ${id}</p>`;
        return;
    }

    const hall = halls.find(h => h.id === record.hallId);

    // Status Badge Color
    const statusColor = record.status === 'Confirmed' ? '#64ffda' : '#ff6b6b';

    resultDiv.innerHTML = `
        <div class="glass-card" style="text-align: left; animation: fadeIn 0.5s;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                <h3 style="margin: 0;">${record.id}</h3>
                <span style="background: ${statusColor}20; color: ${statusColor}; padding: 0.2rem 0.8rem; border-radius: 12px; font-size: 0.8rem;">${record.status}</span>
            </div>
            <p><strong>Hall:</strong> ${hall ? hall.name : 'Unknown Hall'}</p>
            <p><strong>Date:</strong> ${record.date}</p>
            <p><strong>Slot:</strong> ${record.slot}</p>
            <p><strong>Booked By:</strong> ${record.name}</p>
            
            ${record.status === 'Confirmed' ?
            `<button onclick="window.cancelBookingById('${record.id}')" class="btn btn-outline full-width" style="margin-top: 1.5rem; border-color: #ff6b6b; color: #ff6b6b;">Cancel Booking</button>
                 <p class="refund-policy" style="font-size: 0.8rem; margin-top: 0.5rem; text-align: center;">Cancellation valid 7 days before event.</p>`
            :
            `<p style="margin-top: 1rem; color: #8892b0; font-style: italic;">This booking has been cancelled.</p>`
        }
        </div>
    `;
};

window.cancelBookingById = function (id) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    const record = bookingRecords.find(r => r.id === id);
    if (record) {
        record.status = "Cancelled";

        // Free up slot in main database
        if (bookings[record.date]) {
            bookings[record.date] = bookings[record.date].filter(s => s !== record.slot);
        }

        showNotification(`Booking ${id} Cancelled Successfully.`);
        window.searchBooking(); // Refresh view
    }
};

window.showHome = showHome;
window.showHallDetails = showHallDetails;
window.showNotification = showNotification;
window.showMyBookingsView = showMyBookingsView;
