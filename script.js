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
                <h1>Learn from Islamic Mentors</h1>
                <p>Connect with teachers for Arabic, Quran, Fiqh and more.</p>
            </section>

            <div class="mentors-grid">
                ${mentorsData.map(m => `
                    <div class="mentor-card">
                        <div>${m.avatar}</div>
                        <h3>${m.name}</h3>
                        <p>${m.bio}</p>
                        <button onclick="app.viewProfile(${m.id})">
                            View Profile
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderProfile(mentor) {
        document.getElementById('app').innerHTML = `
            <button onclick="app.goHome()">← Back</button>

            <h2>${mentor.name}</h2>
            <p>${mentor.bio}</p>

            <button onclick="app.showBookingForm()">Book Session</button>

            <div id="booking-section" hidden>
                <form id="booking-form" class="booking-form" onsubmit="handleBookingSubmit(event)">
    
                    <div class="form-group">
                        <input id="name" class="form-input" placeholder="Your Name" required />
                    </div>
    
                    <div class="form-group">
                        <textarea id="topic" class="form-textarea" placeholder="What do you want to learn?" required></textarea>
                    </div>
    
                    <div class="form-group">
                        <input id="time" class="form-input" placeholder="Preferred time" required />
                    </div>

                    <button id="submit-btn" class="primary-btn">Submit Request</button>
                </form>

                <p id="error" hidden></p>

                <div id="success" hidden>
                    <p>Request sent successfully</p>
                    <button onclick="app.goHome()">Back to Home</button>
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

    const data = {
        name: document.getElementById('name').value,
        topic: document.getElementById('topic').value,
        preferred_time: document.getElementById('time').value,
        mentor_id: selectedMentor.id
    };

    const { error: err } = await supabase.from("bookings").insert([data]);

    if (err) {
        error.hidden = false;
        error.textContent = "Something went wrong";
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
