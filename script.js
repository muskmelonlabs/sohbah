/**
 * ============================================
 * SOHBAH - Islamic Mentorship Platform
 * Single Page Application (SPA)
 * ============================================
 */

// ============================================
// MENTOR DATA
// Stored directly in JavaScript (no fetch)
// ============================================
const mentorsData = [
    {
        id: 1,
        name: "Sheikh Ahmad Hassan",
        bio: "Experienced Arabic teacher with 15+ years of teaching Quranic Arabic, Tajweed, and classical Arabic grammar. Holds Ijazah in Hafs recitation.",
        topics: ["Arabic", "Tajweed", "Quran"],
        avatar: "👳"
    },
    {
        id: 2,
        name: "Ustadha Fatima Rahman",
        bio: "Islamic studies scholar specializing in Fiqh, Islamic history, and women's issues in Islam. Passionate about making Islamic knowledge accessible.",
        topics: ["Fiqh", "Islamic History", "Women in Islam"],
        avatar: "🧕"
    },
    {
        id: 3,
        name: "Imam Yusuf Abdullah",
        bio: "Community imam and counselor with expertise in Islamic ethics, spiritual development, and mentoring youth. Known for compassionate guidance.",
        topics: ["Aqeedah", "Spirituality", "Youth Mentorship"],
        avatar: "🧔"
    },
    {
        id: 4,
        name: "Dr. Amina Khalil",
        bio: "PhD in Islamic Studies with focus on comparative religion. Teaches Tafsir, Seerah, and contemporary Islamic thought. Published author and lecturer.",
        topics: ["Tafsir", "Seerah", "Comparative Religion"],
        avatar: "👩‍🎓"
    }
];

// ============================================
// STATE MANAGEMENT
// Simple variables to track app state
// ============================================
const state = {
    currentView: 'home',    // 'home' or 'profile'
    selectedMentor: null,   // Currently viewed mentor object
    bookingSubmitted: false // Track if booking form was submitted
};

// ============================================
// APP CONTROLLER
// Main application object
// ============================================
const app = {
    /**
     * Initialize the application
     */
    init() {
        this.renderHome();
    },

    /**
     * Navigate to Home view (Mentor Discovery)
     */
    goHome() {
        state.currentView = 'home';
        state.selectedMentor = null;
        state.bookingSubmitted = false;
        this.renderHome();
    },

    /**
     * Navigate to Profile view
     * @param {number} mentorId - ID of the mentor to display
     */
    viewProfile(mentorId) {
        const mentor = mentorsData.find(m => m.id === mentorId);
        if (mentor) {
            state.currentView = 'profile';
            state.selectedMentor = mentor;
            state.bookingSubmitted = false;
            this.renderProfile(mentor);
        }
    },

    /**
     * Show booking form
     */
    showBookingForm() {
        const bookingSection = document.getElementById('booking-section');
        if (bookingSection) {
            bookingSection.style.display = 'block';
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    },

    /**
     * Handle booking form submission
     * @param {Event} event - Form submit event
     */
    handleBookingSubmit(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
            mentorId: state.selectedMentor.id,
            mentorName: state.selectedMentor.name,
            studentName: document.getElementById('student-name').value,
            learningTopic: document.getElementById('learning-topic').value,
            preferredTime: document.getElementById('preferred-time').value,
            submittedAt: new Date().toISOString()
        };

        // Store in localStorage
        const bookings = JSON.parse(localStorage.getItem('sohbah_bookings') || '[]');
        bookings.push(formData);
        localStorage.setItem('sohbah_bookings', JSON.stringify(bookings));

        // Also log to console
        console.log('New Booking Request:', formData);

        // Show success message
        state.bookingSubmitted = true;
        this.renderSuccessMessage();

        // Clear form
        document.getElementById('booking-form').reset();
    },

    // ============================================
    // RENDER FUNCTIONS
    // ============================================

    /**
     * Render the Home view (Mentor Discovery)
     */
    renderHome() {
        const appContainer = document.getElementById('app');
        
        const html = `
            <!-- Hero Section -->
            <section class="hero">
                <h1 class="hero-title">Learn from Experienced Mentors</h1>
                <p class="hero-subtitle">
                    Connect with knowledgeable Islamic teachers for personalized 1:1 sessions 
                    in Arabic, Quran, Fiqh, and more.
                </p>
            </section>

            <!-- Mentors Section -->
            <section class="mentors-section">
                <h2 class="section-title">Our Mentors</h2>
                <div class="mentors-grid">
                    ${mentorsData.map(mentor => this.createMentorCard(mentor)).join('')}
                </div>
            </section>
        `;

        appContainer.innerHTML = html;
    },

    /**
     * Create HTML for a mentor card
     * @param {Object} mentor - Mentor data object
     * @returns {string} HTML string
     */
    createMentorCard(mentor) {
        return `
            <article class="mentor-card">
                <div class="mentor-avatar">${mentor.avatar}</div>
                <h3 class="mentor-name">${mentor.name}</h3>
                <p class="mentor-bio">${this.truncateBio(mentor.bio, 100)}</p>
                <div class="mentor-topics">
                    ${mentor.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="app.viewProfile(${mentor.id})">
                    View Profile
                </button>
            </article>
        `;
    },

    /**
     * Render the Profile view
     * @param {Object} mentor - Mentor data object
     */
    renderProfile(mentor) {
        const appContainer = document.getElementById('app');
        
        const html = `
            <div class="profile-container">
                <!-- Back Button -->
                <a class="back-btn" onclick="app.goHome()">
                    <span>←</span> Back to Mentors
                </a>

                <!-- Profile Card -->
                <article class="profile-card">
                    <!-- Profile Header -->
                    <div class="profile-header">
                        <div class="profile-avatar">${mentor.avatar}</div>
                        <div class="profile-info">
                            <h2>${mentor.name}</h2>
                            <div class="profile-topics">
                                ${mentor.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Bio Section -->
                    <div class="profile-section">
                        <h3>About</h3>
                        <p>${mentor.bio}</p>
                    </div>

                    <!-- Topics Section -->
                    <div class="profile-section">
                        <h3>Teaching Topics</h3>
                        <p>${mentor.topics.join(', ')}</p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="profile-actions">
                        <button class="btn btn-outline btn-large" onclick="app.goHome()">
                            Back
                        </button>
                        <button class="btn btn-primary btn-large" onclick="app.showBookingForm()">
                            Book Session
                        </button>
                    </div>

                    <!-- Booking Form Section (Hidden by default) -->
                    <div id="booking-section" class="booking-section" style="display: none;">
                        <h3>Request a Session</h3>
                        <form id="booking-form" onsubmit="app.handleBookingSubmit(event)">
                            <div class="form-group">
                                <label class="form-label" for="student-name">Your Name</label>
                                <input 
                                    type="text" 
                                    id="student-name" 
                                    class="form-input" 
                                    placeholder="Enter your full name"
                                    required
                                >
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="learning-topic">What do you want to learn?</label>
                                <textarea 
                                    id="learning-topic" 
                                    class="form-textarea" 
                                    placeholder="Describe what you'd like to learn or discuss..."
                                    required
                                ></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="preferred-time">Preferred Time</label>
                                <input 
                                    type="text" 
                                    id="preferred-time" 
                                    class="form-input" 
                                    placeholder="e.g., Weekdays after 5 PM, Saturday mornings"
                                    required
                                >
                                <p class="form-hint">Let us know your availability and timezone</p>
                            </div>

                            <button type="submit" class="btn btn-primary btn-large">
                                Submit Request
                            </button>
                        </form>

                        <!-- Success Message Container -->
                        <div id="success-message-container"></div>
                    </div>
                </article>
            </div>
        `;

        appContainer.innerHTML = html;
    },

    /**
     * Render success message after form submission
     */
    renderSuccessMessage() {
        const container = document.getElementById('success-message-container');
        if (container) {
            container.innerHTML = `
                <div class="success-message">
                    <span class="success-icon">✓</span>
                    <span class="success-text">
                        Your request has been sent. The mentor will reach out soon.
                    </span>
                </div>
            `;
        }
    },

    /**
     * Utility: Truncate bio text to specified length
     * @param {string} bio - Full bio text
     * @param {number} maxLength - Maximum character length
     * @returns {string} Truncated text with ellipsis
     */
    truncateBio(bio, maxLength) {
        if (bio.length <= maxLength) return bio;
        return bio.substring(0, maxLength).trim() + '...';
    }
};

// ============================================
// INITIALIZE APP WHEN DOM IS READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
