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
        authority: "Trained under classical scholars of Al-Azhar, Cairo",
        location: "Cairo, Egypt",
        bio: "Experienced Arabic teacher with 15+ years of teaching Quranic Arabic, Tajweed, and classical Arabic grammar. Trained hundreds of students worldwide.",
        topics: ["Arabic", "Tajweed", "Quran"],
        languages: ["Arabic", "English", "French"],
        avatar: "👳",
        sessionsCompleted: 240,
        studentsHelped: 150,
        yearsExperience: 15,
        beginner: true,
        achievements: [
            "Improve Quran recitation with proper Tajweed",
            "Master Arabic letters and pronunciation",
            "Gain confidence reading the Quran independently"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 2,
        name: "Ustadha Fatima Rahman",
        title: "Islamic Studies Scholar",
        authority: "PhD in Islamic Law · Specializes in Fiqh and women's jurisprudence",
        location: "London, UK",
        bio: "PhD-level Islamic studies scholar specializing in Fiqh, Islamic history, and contemporary Islamic issues. Passionate about empowering women in Islamic learning.",
        topics: ["Fiqh", "Islamic History", "Women in Islam"],
        languages: ["English", "Arabic", "Urdu"],
        avatar: "🧕",
        sessionsCompleted: 185,
        studentsHelped: 120,
        yearsExperience: 12,
        achievements: [
            "Understand Islamic rulings with clear explanations",
            "Learn Islamic history from primary sources",
            "Develop a grounded Islamic worldview"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "All Levels Welcome" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 3,
        name: "Imam Yusuf Abdullah",
        title: "Community Imam & Counselor",
        authority: "Serves as lead Imam · 18+ years of community guidance",
        location: "New York, USA",
        bio: "Community imam with expertise in spirituality, personal development, and youth mentorship. Known for creating welcoming learning environments.",
        topics: ["Aqeedah", "Spirituality", "Youth Mentorship"],
        languages: ["English", "Arabic"],
        avatar: "🧔",
        sessionsCompleted: 310,
        studentsHelped: 200,
        yearsExperience: 18,
        beginner: true,
        achievements: [
            "Strengthen your connection to Islam",
            "Build a consistent daily worship routine",
            "Develop clarity in faith and Aqeedah"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "30–60 Minutes" }
        ]
    },
    {
        id: 4,
        name: "Dr. Amina Khalil",
        title: "Islamic Studies Researcher",
        authority: "Published researcher · Specializes in Quranic Tafsir and Seerah",
        location: "Istanbul, Turkey",
        bio: "PhD in Islamic Studies with focus on Quranic exegesis and Islamic jurisprudence. Conducts research and offers comparative religion perspectives.",
        topics: ["Tafsir", "Seerah", "Comparative Religion"],
        languages: ["English", "Turkish", "Arabic"],
        avatar: "👩‍🎓",
        sessionsCompleted: 156,
        studentsHelped: 95,
        yearsExperience: 10,
        achievements: [
            "Understand Quran with in-depth Tafsir",
            "Learn the life and legacy of the Prophet ﷺ",
            "Explore Islam's relationship with other traditions"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📚", label: "Research-Based Teaching" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    }
];

// ============================================
// STATE
// ============================================
const state = {
    currentView: 'home',
    activeFilter: 'all',
    searchQuery: ''
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
        state.activeFilter = 'all';
        state.searchQuery = '';
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

    setFilter(category) {
        state.activeFilter = category;
        this.renderHome();
    },

    handleSearch(value) {
        state.searchQuery = value;
        this.renderHome();
        const input = document.getElementById('mentor-search');
        if (input) {
            input.focus();
            input.setSelectionRange(value.length, value.length);
        }
    },

    clearSearch() {
        state.searchQuery = '';
        state.activeFilter = 'all';
        this.renderHome();
    },

    renderMentorCard(mentor) {
        return `
            <div class="mentor-card">
                <div class="mentor-card-top">
                    <div class="mentor-avatar">${mentor.avatar}</div>
                    <span class="mentor-avail-badge">
                        <span class="mentor-avail-dot"></span> Available
                    </span>
                </div>
                <h3 class="mentor-name">${mentor.name}</h3>
                <p class="mentor-title-small">${mentor.title}</p>
                <div class="mentor-card-stats">
                    <span class="mentor-stat">📚 ${mentor.sessionsCompleted} sessions</span>
                    <span class="mentor-stat-divider">·</span>
                    <span class="mentor-stat">⭐ ${mentor.yearsExperience}+ yrs</span>
                </div>
                <div class="mentor-topics">
                    ${mentor.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="app.viewProfile(${mentor.id})">
                    View Profile
                </button>
            </div>
        `;
    },

    renderHome() {
        const activeFilter = state.activeFilter;
        const searchQuery = state.searchQuery;

        const filters = [
            { id: 'all', label: 'All Mentors' },
            { id: 'Arabic', label: 'Arabic' },
            { id: 'Quran', label: 'Quran' },
            { id: 'Tajweed', label: 'Tajweed' },
            { id: 'Fiqh', label: 'Fiqh' },
            { id: 'women', label: 'Women-only' }
        ];

        const filtered = mentorsData.filter(m => {
            const q = searchQuery.toLowerCase();
            const matchesSearch = !q ||
                m.name.toLowerCase().includes(q) ||
                m.title.toLowerCase().includes(q) ||
                m.topics.some(t => t.toLowerCase().includes(q));

            let matchesFilter = true;
            if (activeFilter !== 'all') {
                if (activeFilter === 'women') {
                    matchesFilter = m.topics.includes('Women in Islam');
                } else {
                    matchesFilter = m.topics.some(t => t.toLowerCase() === activeFilter.toLowerCase());
                }
            }

            return matchesSearch && matchesFilter;
        });

        const isFiltered = activeFilter !== 'all' || searchQuery.trim() !== '';

        const topMentors = [...mentorsData].sort((a, b) => b.sessionsCompleted - a.sessionsCompleted).slice(0, 2);
        const beginnerMentors = mentorsData.filter(m => m.beginner);
        const arabicMentors = mentorsData.filter(m => m.topics.includes('Arabic'));

        document.getElementById('app').innerHTML = `
            <section class="hero">
                <h1 class="hero-title">Find Your Islamic Mentor</h1>
                <p class="hero-subtitle">Connect with expert teachers for Arabic, Quran, Fiqh and more.</p>
            </section>

            <div class="discovery-container">

                <div class="discovery-controls">
                    <div class="search-wrapper">
                        <span class="search-icon">🔍</span>
                        <input
                            id="mentor-search"
                            class="search-input"
                            type="text"
                            placeholder="Search by name or topic..."
                            value="${searchQuery}"
                            oninput="app.handleSearch(this.value)"
                        />
                        ${searchQuery ? `<button class="search-clear" onclick="app.clearSearch()">✕</button>` : ''}
                    </div>
                    <div class="filter-pills">
                        ${filters.map(f => `
                            <button
                                class="filter-pill ${activeFilter === f.id ? 'filter-pill-active' : ''}"
                                onclick="app.setFilter('${f.id}')"
                            >${f.label}</button>
                        `).join('')}
                    </div>
                </div>

                ${isFiltered ? `
                    <div class="discovery-section">
                        ${filtered.length === 0 ? `
                            <div class="empty-state">
                                <p class="empty-icon">🔍</p>
                                <p class="empty-title">No mentors found</p>
                                <p class="empty-text">Try a different search term or filter.</p>
                                <button class="btn btn-outline" onclick="app.clearSearch()">Clear Search</button>
                            </div>
                        ` : `
                            <p class="results-count">${filtered.length} mentor${filtered.length !== 1 ? 's' : ''} found</p>
                            <div class="mentors-grid">
                                ${filtered.map(m => this.renderMentorCard(m)).join('')}
                            </div>
                        `}
                    </div>
                ` : `
                    <div class="discovery-section">
                        <div class="discovery-section-header">
                            <h2 class="discovery-section-title">⭐ Top Mentors</h2>
                            <p class="discovery-section-sub">Most experienced and active on the platform</p>
                        </div>
                        <div class="mentors-grid">
                            ${topMentors.map(m => this.renderMentorCard(m)).join('')}
                        </div>
                    </div>

                    <div class="discovery-section">
                        <div class="discovery-section-header">
                            <h2 class="discovery-section-title">🌱 For Beginners</h2>
                            <p class="discovery-section-sub">Welcoming mentors for those just starting their journey</p>
                        </div>
                        <div class="mentors-grid">
                            ${beginnerMentors.map(m => this.renderMentorCard(m)).join('')}
                        </div>
                    </div>

                    <div class="discovery-section">
                        <div class="discovery-section-header">
                            <h2 class="discovery-section-title">🔤 Arabic Specialists</h2>
                            <p class="discovery-section-sub">Expert teachers in Arabic language and Quranic sciences</p>
                        </div>
                        <div class="mentors-grid">
                            ${arabicMentors.map(m => this.renderMentorCard(m)).join('')}
                        </div>
                    </div>
                `}

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
                            <p class="profile-authority">${mentor.authority}</p>
                            <p class="profile-location">📍 ${mentor.location}</p>
                            <div class="availability-indicators">
                                <span class="availability-badge">
                                    <span class="availability-dot"></span>
                                    Available this week
                                </span>
                                <span class="availability-badge">
                                    ⚡ Responds within 24 hours
                                </span>
                            </div>
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
                        <h3>What You'll Achieve</h3>
                        <ul class="achieve-list">
                            ${mentor.achievements.map(a => `
                                <li class="achieve-item">
                                    <span class="achieve-check">✔</span>
                                    <span>${a}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="profile-section">
                        <h3>Session Format</h3>
                        <div class="session-format-grid">
                            ${mentor.sessionFormat.map(f => `
                                <div class="format-item">
                                    <span class="format-icon">${f.icon}</span>
                                    <span class="format-label">${f.label}</span>
                                </div>
                            `).join('')}
                        </div>
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
                    <div class="booking-card-header">
                        <h2>Request a Session</h2>
                        <p class="booking-card-sub">with ${mentor.name}</p>
                    </div>

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
                            <span class="form-hint">Share your general availability and timezone if helpful.</span>
                        </div>

                        <button id="submit-btn" class="btn btn-primary btn-large" type="submit">Send Session Request</button>

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
