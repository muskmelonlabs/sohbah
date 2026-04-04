/**
 * ============================================
 * SOHBAH - Islamic Mentorship Platform
 * Single Page Application (SPA)
 * ============================================
 */
const SUPABASE_URL = "https://ehynuqzwxwwuqbmjyymr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoeW51cXp3eHd3dXFibWp5eW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NTMwMDgsImV4cCI6MjA5MDUyOTAwOH0.EeV9z1A8M0j19ilam5iOft0ZQ2tC03o6WsfqO6Kfwuo";
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let selectedMentor = null;

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
    currentView: 'home'    // 'home' or 'profile'
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
        selectedMentor = null;
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
            selectedMentor = mentor;
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
                        <form id="booking-form" onsubmit="handleBookingSubmit(event)">
                            <div class="form-group">
                                <label class="form-label" for="name">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    class="form-input" 
                                    placeholder="Enter your full name"
                                    required
                                >
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="topic">What do you want to learn?</label>
                                <textarea 
                                    id="topic" 
                                    class="form-textarea" 
                                    placeholder="Describe what you'd like to learn or discuss..."
                                    required
                                ></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="time">Preferred Time</label>
                                <input 
                                    type="text" 
                                    id="time" 
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

                    </div>
                </article>
            </div>
        `;

        appContainer.innerHTML = html;
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

async function handleBookingSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const topic = document.getElementById("topic").value;
    const preferredTime = document.getElementById("time").value;

    const bookingData = {
        name,
        topic,
        preferred_time: preferredTime,
        mentor_id: selectedMentor ? selectedMentor.id : null
    };

    const { error } = await supabase.from("bookings").insert([bookingData]);

    if (error) {
        alert("There was an error submitting your booking request. Please try again.");
        return;
    }

    alert("Your request has been sent. The mentor will reach out soon.");
    document.getElementById("booking-form").reset();
}

// ============================================
// INITIALIZE APP WHEN DOM IS READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
