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
        title: "Arabic & Tajweed Specialist",
        location: "Cairo, Egypt",
        bio: "Experienced Arabic teacher with 15+ years of teaching Quranic Arabic, Tajweed, and classical Arabic grammar. Trained hundreds of students worldwide.",
        topics: ["Arabic", "Tajweed", "Quran"],
        languages: ["Arabic", "English", "French"],
        avatar: "👳",
        sessionsCompleted: 240,
        studentsHelped: 150,
        yearsExperience: 15
    },
    {
        id: 2,
        name: "Ustadha Fatima Rahman",
        title: "Islamic Studies Scholar",
        location: "London, UK",
        bio: "PhD-level Islamic studies scholar specializing in Fiqh, Islamic history, and contemporary Islamic issues. Passionate about empowering women in Islamic learning.",
        topics: ["Fiqh", "Islamic History", "Women in Islam"],
        languages: ["English", "Arabic", "Urdu"],
        avatar: "🧕",
        sessionsCompleted: 185,
        studentsHelped: 120,
        yearsExperience: 12
    },
    {
        id: 3,
        name: "Imam Yusuf Abdullah",
        title: "Community Imam & Counselor",
        location: "New York, USA",
        bio: "Community imam with expertise in spirituality, personal development, and youth mentorship. Known for creating welcoming learning environments.",
        topics: ["Aqeedah", "Spirituality", "Youth Mentorship"],
        languages: ["English", "Arabic"],
        avatar: "🧔",
        sessionsCompleted: 310,
        studentsHelped: 200,
        yearsExperience: 18
    },
    {
        id: 4,
        name: "Dr. Amina Khalil",
        title: "Islamic Studies Researcher",
        location: "Istanbul, Turkey",
        bio: "PhD in Islamic Studies with focus on Quranic exegesis and Islamic jurisprudence. Conducts research and offers comparative religion perspectives.",
        topics: ["Tafsir", "Seerah", "Comparative Religion"],
        languages: ["English", "Turkish", "Arabic"],
        avatar: "👩‍🎓",
        sessionsCompleted: 156,
        studentsHelped: 95,
        yearsExperience: 10
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

                    <div class="profile-header-section">
                        <div class="profile-avatar-large">${mentor.avatar}</div>
                        <div class="profile-header-info">
                            <h1 class="profile-name">${mentor.name}</h1>
                            <p class="profile-title">${mentor.title}</p>
                            <p class="profile-location">📍 ${mentor.location}</p>
                        </div>
                    </div>

                    <div class="profile-stats">
                        <div class="stat-item">
                            <span class="stat-number">${mentor.sessionsCompleted}</span>
                            <span class="stat-label">Sessions</span>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat-item">
                            <span class="stat-number">${mentor.studentsHelped}</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat-item">
                            <span class="stat-number">${mentor.yearsExperience}+</span>
                            <span class="stat-label">Years</span>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h3>About</h3>
                        <p>${mentor.bio}</p>
                    </div>

                    <div class="profile-section">
                        <h3>Areas of Expertise</h3>
                        <div class="profile-topics">
                            ${mentor.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                        </div>
                    </div>

                    <div class="profile-section">
                        <h3>Languages</h3>
                        <div class="profile-languages">
                            ${mentor.languages.map(l => `<span class="language-badge">${l}</span>`).join('')}
                        </div>
                    </div>

                </div>

                <div class="booking-card" id="booking-card">
                    <h2>Request a Session</h2>

                    <form id="booking-form" onsubmit="handleBookingSubmit(event)">

                        <div class="form-group">
                            <label class="form-label" for="name">Your Name</label>
                            <input id="name" class="form-input" type="text" placeholder="Enter your full name" required />
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="topic">What would you like to learn?</label>
                            <textarea id="topic" class="form-textarea" placeholder="Describe the topic, questions, or goals you'd like to explore..." required></textarea>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="time">When are you available?</label>
                            <input id="time" class="form-input" type="text" placeholder="e.g., Weekday evenings, Saturday mornings" required />
                            <span class="form-hint">Share your general availability.</span>
                        </div>

                        <button id="submit-btn" class="btn btn-primary btn-large" type="submit">Send Request to ${mentor.name}</button>

                    </form>

                    <div id="error" class="booking-feedback booking-feedback-error" hidden></div>

                    <div id="success" class="booking-feedback booking-feedback-success" hidden>
                        <p class="booking-feedback-title">✓ Request Sent!</p>
                        <p class="booking-feedback-text">${mentor.name} will review your request and get back to you shortly.</p>
                        <button class="btn btn-primary" onclick="app.goHome()">Back to Mentors</button>
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
