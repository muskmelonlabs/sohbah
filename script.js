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
            section.style.display = 'block';
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

            <div id="booking-section" style="display:none;">
                <form id="booking-form" onsubmit="handleBookingSubmit(event)">
                    
                    <input id="name" placeholder="Your Name" required />
                    
                    <textarea id="topic" placeholder="What do you want to learn?" required></textarea>
                    
                    <input id="time" placeholder="Preferred time" required />

                    <button id="submit-btn">Submit</button>
                </form>

                <p id="error" style="color:red; display:none;"></p>

                <div id="success" style="display:none;">
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
        error.style.display = "block";
        error.textContent = "Something went wrong";
        btn.disabled = false;
        btn.textContent = "Submit";
        return;
    }

    form.style.display = "none";
    success.style.display = "block";
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
