/**
 * ============================================
 * SOHBAH - Islamic Mentorship Platform
 * ============================================
 */

const SUPABASE_URL = "https://ehynuqzwxwwuqbmjyymr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoeW51cXp3eHd3dXFibWp5eW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NTMwMDgsImV4cCI6MjA5MDUyOTAwOH0.EeV9z1A8M0j19ilam5iOft0ZQ2tC03o6WsfqO6Kfwuo";

var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let selectedMentor = null;

// ============================================
// DATA
// ============================================
const mentorsData = [
    {
        id: 1,
        name: "Sheikh Ahmad Hassan",
        bio: "Experienced Arabic teacher with 15+ years of teaching Quranic Arabic, Tajweed, and classical Arabic grammar.",
        topics: ["Arabic", "Tajweed", "Quran"],
        avatar: "👳"
    },
    {
        id: 2,
        name: "Ustadha Fatima Rahman",
        bio: "Islamic studies scholar specializing in Fiqh, Islamic history, and women's issues in Islam.",
        topics: ["Fiqh", "Islamic History", "Women in Islam"],
        avatar: "🧕"
    },
    {
        id: 3,
        name: "Imam Yusuf Abdullah",
        bio: "Community imam and counselor focused on spirituality and youth mentorship.",
        topics: ["Aqeedah", "Spirituality", "Youth Mentorship"],
        avatar: "🧔"
    },
    {
        id: 4,
        name: "Dr. Amina Khalil",
        bio: "PhD in Islamic Studies teaching Tafsir, Seerah, and comparative religion.",
        topics: ["Tafsir", "Seerah", "Comparative Religion"],
        avatar: "👩‍🎓"
    }
];

// ============================================
// STATE
// ============================================
const state = {
    currentView: 'home'
};

// ============================================
// APP
// ============================================
const app = {

    init() {
        this.renderHome();
    },

    goHome() {
        state.currentView = 'home';
        selectedMentor = null;
        this.renderHome();
    },

    viewProfile(mentorId) {
        const mentor = mentorsData.find(m => m.id === mentorId);
        if (!mentor) return;

        selectedMentor = mentor;
        state.currentView = 'profile';
        this.renderProfile(mentor);
    },

    showBookingForm() {
        const section = document.getElementById('booking-section');
        if (section) {
            section.hidden = false;
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },

    renderHome() {
        document.getElementById('app').innerHTML = `
            <section class="hero">
                <h1 class="hero-title">Learn from Islamic Mentors</h1>
                <p class="hero-subtitle">Connect with teachers for Arabic, Quran, Fiqh and more.</p>
            </section>

            <div class="mentors-grid">
                ${mentorsData.map(m => `
                    <div class="mentor-card">
                        <div class="mentor-avatar">${m.avatar}</div>
                        <h3 class="mentor-name">${m.name}</h3>
                        <p class="mentor-bio">${m.bio}</p>
                        <div class="mentor-topics">
                            ${m.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                        </div>
                        <button class="btn btn-primary" onclick="app.viewProfile(${m.id})">
                            View Profile
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderProfile(mentor) {
        document.getElementById('app').innerHTML = `
            <div class="profile-container">

                <button class="back-btn" onclick="app.goHome()">← Back to Mentors</button>

                <div class="profile-card">

                    <div class="profile-header">
                        <div class="profile-avatar">${mentor.avatar}</div>
                        <div class="profile-info">
                            <h2>${mentor.name}</h2>
                            <div class="profile-topics">
                                ${mentor.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h3>About</h3>
                        <p>${mentor.bio}</p>
                    </div>

                    <div class="profile-actions">
                        <button class="btn btn-outline btn-large" onclick="app.showBookingForm()">Book a Session</button>
                    </div>

                    <div id="booking-section" hidden>
                        <div class="booking-section">
                            <h3>Request a Session</h3>

                            <form id="booking-form" onsubmit="handleBookingSubmit(event)">

                                <div class="form-group">
                                    <label class="form-label" for="name">Your Name</label>
                                    <input id="name" class="form-input" type="text" placeholder="Enter your full name" required />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="topic">What do you want to learn?</label>
                                    <textarea id="topic" class="form-textarea" placeholder="Describe the topic or questions you'd like to explore..." required></textarea>
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="time">Preferred Time</label>
                                    <input id="time" class="form-input" type="text" placeholder="e.g. Weekday evenings, Saturday mornings" required />
                                    <span class="form-hint">Let the mentor know your general availability.</span>
                                </div>

                                <button id="submit-btn" class="btn btn-primary btn-large" type="submit">Submit Request</button>

                            </form>

                            <div id="error" class="booking-feedback booking-feedback-error" hidden></div>

                            <div id="success" class="booking-feedback booking-feedback-success" hidden>
                                <p class="booking-feedback-title">Request Sent!</p>
                                <p class="booking-feedback-text">Your session request has been submitted. The mentor will be in touch with you soon.</p>
                                <button class="btn btn-outline" onclick="app.goHome()">Back to Home</button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        `;
    }
};

// ============================================
// BOOKING
// ============================================
async function handleBookingSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const error = document.getElementById('error');
    const success = document.getElementById('success');
    const form = document.getElementById('booking-form');

    btn.disabled = true;
    btn.textContent = "Sending...";
    error.hidden = true;

    const data = {
        name: document.getElementById('name').value,
        topic: document.getElementById('topic').value,
        preferred_time: document.getElementById('time').value,
        mentor_id: selectedMentor.id
    };

    const { error: err } = await supabase.from("bookings").insert([data]);

    if (err) {
        error.hidden = false;
        error.textContent = "Something went wrong. Please try again.";
        btn.disabled = false;
        btn.textContent = "Submit Request";
        return;
    }

    form.hidden = true;
    success.hidden = false;
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
