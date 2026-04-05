/**
 * ============================================
 * SOHBAH - Islamic Mentorship Platform
 * ============================================
 */

const SUPABASE_URL = "https://ehynuqzwxwwuqbmjyymr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoeW51cXp3eHd3dXFibWp5eW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NTMwMDgsImV4cCI6MjA5MDUyOTAwOH0.EeV9z1A8M0j19ilam5iOft0ZQ2tC03o6WsfqO6Kfwuo";

var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let selectedMentor = null;
let currentUser = null;

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
    },
    {
        id: 5,
        name: "Ustadh Bilal Siddiqui",
        title: "Quran Memorization Coach",
        authority: "Hafiz ul Quran · Certified by Dar ul Uloom Karachi",
        location: "Karachi, Pakistan",
        bio: "Specialized Hifz coach who has guided over 200 students to complete Quran memorization. Uses proven memory techniques adapted for modern learners.",
        topics: ["Quran", "Memorization", "Tajweed"],
        languages: ["Urdu", "Arabic", "English"],
        avatar: "🧔",
        sessionsCompleted: 420,
        studentsHelped: 210,
        yearsExperience: 14,
        beginner: true,
        achievements: [
            "Start and complete your Hifz journey",
            "Strengthen Quran retention with tested methods",
            "Correct Tajweed while memorizing"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 6,
        name: "Sheikh Omar Farouq",
        title: "Hadith & Sunnah Scholar",
        authority: "Graduate of Islamic University of Madinah",
        location: "Madinah, Saudi Arabia",
        bio: "Expert in the science of Hadith with a focus on authenticity, chain of narration, and practical application of the Sunnah in daily life.",
        topics: ["Hadith", "Sunnah", "Aqeedah"],
        languages: ["Arabic", "English"],
        avatar: "👳",
        sessionsCompleted: 195,
        studentsHelped: 130,
        yearsExperience: 11,
        achievements: [
            "Understand how to evaluate Hadith authenticity",
            "Apply the Sunnah practically in modern life",
            "Build a deeper love for the Prophet ﷺ"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📚", label: "Text-Based Study" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 7,
        name: "Ustadha Khadijah Williams",
        title: "Muslim Family & Marriage Counselor",
        authority: "Certified Islamic counselor · 10+ years in family guidance",
        location: "Toronto, Canada",
        bio: "Helping Muslim families build strong, faith-centered homes. Specializes in pre-marital guidance, conflict resolution, and parenting from an Islamic lens.",
        topics: ["Marriage", "Parenting", "Spirituality"],
        languages: ["English", "French"],
        avatar: "🧕",
        sessionsCompleted: 340,
        studentsHelped: 175,
        yearsExperience: 10,
        beginner: true,
        achievements: [
            "Build healthier relationships grounded in Islamic values",
            "Navigate family challenges with patience and wisdom",
            "Prepare for marriage with confidence"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "All Levels Welcome" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 8,
        name: "Dr. Hassan Al-Turki",
        title: "Islamic Finance & Economics Expert",
        authority: "PhD in Islamic Economics · Consultant to GCC banks",
        location: "Dubai, UAE",
        bio: "Former investment banker turned Islamic finance educator. Helps Muslims understand halal investments, mortgages, and financial planning.",
        topics: ["Islamic Finance", "Fiqh", "Halal Business"],
        languages: ["Arabic", "English"],
        avatar: "👨‍💼",
        sessionsCompleted: 165,
        studentsHelped: 110,
        yearsExperience: 13,
        achievements: [
            "Understand halal vs haram financial products",
            "Plan your finances according to Islamic principles",
            "Learn about Islamic mortgages and investments"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📊", label: "Case-Study Based" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 9,
        name: "Ustadha Maryam Saleh",
        title: "Women's Fiqh Specialist",
        authority: "Trained at Zaytuna College · Specializes in Hanafi women's jurisprudence",
        location: "Berkeley, USA",
        bio: "Dedicated to making Islamic rulings accessible for Muslim women in the West. Covers topics rarely discussed openly in traditional settings.",
        topics: ["Fiqh", "Women in Islam", "Islamic History"],
        languages: ["English", "Arabic"],
        avatar: "🧕",
        sessionsCompleted: 275,
        studentsHelped: 160,
        yearsExperience: 9,
        beginner: true,
        achievements: [
            "Understand your rights and obligations as a Muslim woman",
            "Navigate fiqh questions with clarity and confidence",
            "Learn about the great women scholars of Islamic history"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 10,
        name: "Imam Tariq Al-Rasheed",
        title: "Khutbah & Public Speaking Coach",
        authority: "Lead Imam at East London Mosque · 20+ years dawah experience",
        location: "London, UK",
        bio: "Trains imams and Muslim speakers in effective public communication, khutbah delivery, and dawah methods for Western contexts.",
        topics: ["Dawah", "Public Speaking", "Aqeedah"],
        languages: ["English", "Arabic"],
        avatar: "🧔",
        sessionsCompleted: 390,
        studentsHelped: 230,
        yearsExperience: 20,
        achievements: [
            "Deliver compelling and structured khutbahs",
            "Engage non-Muslims confidently in conversation",
            "Overcome fear of public speaking in Islamic contexts"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🎤", label: "Practice-Based" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 11,
        name: "Dr. Nadia Osman",
        title: "Islamic Psychology & Mental Health",
        authority: "PhD in Psychology · Integrates Islamic and therapeutic frameworks",
        location: "Amsterdam, Netherlands",
        bio: "Bridges the gap between modern psychology and Islamic spirituality. Helps Muslims navigate anxiety, depression, and identity challenges from a faith perspective.",
        topics: ["Spirituality", "Mental Health", "Youth Mentorship"],
        languages: ["English", "Dutch", "Arabic"],
        avatar: "👩‍⚕️",
        sessionsCompleted: 285,
        studentsHelped: 190,
        yearsExperience: 8,
        beginner: true,
        achievements: [
            "Find peace and clarity through Islamic mindfulness",
            "Address mental health challenges with faith-based tools",
            "Build resilience grounded in Tawakkul"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌿", label: "Compassionate Approach" },
            { icon: "⏱️", label: "50–60 Minutes" }
        ]
    },
    {
        id: 12,
        name: "Ustadh Abdurrahman Malik",
        title: "Classical Arabic Grammar Teacher",
        authority: "Specializes in Ajrumiyyah, Alfiyyah, and classical Nahw",
        location: "Fez, Morocco",
        bio: "Expert in classical Arabic grammar texts. Teaches from traditional matn-based curriculum, helping students read classical Islamic literature.",
        topics: ["Arabic", "Arabic Grammar", "Classical Arabic"],
        languages: ["Arabic", "French", "English"],
        avatar: "👳",
        sessionsCompleted: 210,
        studentsHelped: 140,
        yearsExperience: 16,
        achievements: [
            "Read classical Islamic texts without translation",
            "Master Nahw and Sarf systematically",
            "Build a foundation for advanced Arabic study"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📖", label: "Text-Based Learning" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 13,
        name: "Ustadha Zainab Idris",
        title: "Seerah & Islamic History Educator",
        authority: "Author of two books on the life of the Prophet ﷺ",
        location: "Kuala Lumpur, Malaysia",
        bio: "Passionate teacher of the Prophet's biography and early Islamic history. Makes Seerah accessible, relevant, and deeply moving for modern audiences.",
        topics: ["Seerah", "Islamic History", "Tafsir"],
        languages: ["English", "Malay", "Arabic"],
        avatar: "🧕",
        sessionsCompleted: 175,
        studentsHelped: 115,
        yearsExperience: 9,
        beginner: true,
        achievements: [
            "Fall in love with the story of the Prophet ﷺ",
            "Understand the historical context of early Islam",
            "Draw timeless lessons from prophetic events"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "45 Minutes" }
        ]
    },
    {
        id: 14,
        name: "Sheikh Yaqub Fontaine",
        title: "New Muslim Support Specialist",
        authority: "Revert for 22 years · Trained under Sheikh Hamza Yusuf",
        location: "Cape Town, South Africa",
        bio: "Dedicated to supporting new Muslims through the early stages of their journey. Covers foundations of faith, practice, and community belonging.",
        topics: ["Aqeedah", "Spirituality", "New Muslims"],
        languages: ["English", "Afrikaans"],
        avatar: "🧔",
        sessionsCompleted: 460,
        studentsHelped: 280,
        yearsExperience: 22,
        beginner: true,
        achievements: [
            "Learn the essentials of Islamic belief and practice",
            "Navigate common challenges as a new Muslim",
            "Build a sustainable and joyful relationship with Islam"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Specialist" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 15,
        name: "Dr. Ibrahim Qadri",
        title: "Aqeedah & Theology Scholar",
        authority: "PhD in Islamic Theology · Trained in Ashari and Maturidi schools",
        location: "Lahore, Pakistan",
        bio: "Systematic theologian helping students understand Islamic creed with clarity. Addresses doubts and strengthens faith through rigorous scholarly inquiry.",
        topics: ["Aqeedah", "Theology", "Comparative Religion"],
        languages: ["Urdu", "Arabic", "English"],
        avatar: "👨‍🎓",
        sessionsCompleted: 145,
        studentsHelped: 90,
        yearsExperience: 12,
        achievements: [
            "Understand Islamic creed with intellectual clarity",
            "Address theological doubts confidently",
            "Compare Islamic and Western philosophical traditions"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "💡", label: "Socratic Method" },
            { icon: "⏱️", label: "60 Minutes" }
        ]
    },
    {
        id: 16,
        name: "Ustadha Safiya Hassan",
        title: "Tajweed Instructor & Quran Reciter",
        authority: "Ijazah in Hafs recitation · Certified by Al-Azhar",
        location: "Alexandria, Egypt",
        bio: "Holds Ijazah in Quranic recitation and teaches Tajweed through traditional oral transmission. Specializes in beautifying recitation.",
        topics: ["Tajweed", "Quran", "Memorization"],
        languages: ["Arabic", "English"],
        avatar: "🧕",
        sessionsCompleted: 330,
        studentsHelped: 185,
        yearsExperience: 13,
        beginner: true,
        achievements: [
            "Correct your Makharij and Tajweed rules",
            "Beautify your Quran recitation",
            "Prepare for Ijazah or Hifz programs"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 17,
        name: "Ustadh Khalid Jamil",
        title: "Youth Islam & Identity Coach",
        authority: "Youth director at ISNA · 15+ years with Muslim youth",
        location: "Chicago, USA",
        bio: "Works with Muslim teens and young adults struggling with identity, peer pressure, and staying connected to Islam in secular environments.",
        topics: ["Youth Mentorship", "Spirituality", "Aqeedah"],
        languages: ["English", "Urdu"],
        avatar: "🧔",
        sessionsCompleted: 510,
        studentsHelped: 320,
        yearsExperience: 15,
        beginner: true,
        achievements: [
            "Build a strong Muslim identity in a secular world",
            "Find answers to the questions you were afraid to ask",
            "Connect your faith to real, everyday life"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Youth Focused" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 18,
        name: "Dr. Layla Boumediene",
        title: "Quran Tafsir Scholar",
        authority: "PhD in Quranic Sciences · Researcher at IIIT",
        location: "Paris, France",
        bio: "Contextual Quran scholar who brings classical Tafsir to life with historical, linguistic, and thematic analysis for contemporary readers.",
        topics: ["Tafsir", "Quran", "Arabic"],
        languages: ["French", "Arabic", "English"],
        avatar: "👩‍🎓",
        sessionsCompleted: 190,
        studentsHelped: 120,
        yearsExperience: 11,
        achievements: [
            "Understand Quranic verses in their full context",
            "Learn to engage with classical Tafsir books",
            "Connect the Quran's message to your daily life"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📚", label: "Thematic Study" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 19,
        name: "Sheikh Mustafa Al-Azhari",
        title: "Maliki Fiqh Specialist",
        authority: "Ijazah in Maliki jurisprudence from Al-Azhar University",
        location: "Cairo, Egypt",
        bio: "Teaches practical Maliki Fiqh covering worship, transactions, and family law. Skilled at making rulings applicable to Muslims living in the West.",
        topics: ["Fiqh", "Islamic Law", "Aqeedah"],
        languages: ["Arabic", "English"],
        avatar: "👳",
        sessionsCompleted: 230,
        studentsHelped: 150,
        yearsExperience: 17,
        achievements: [
            "Learn Maliki rulings for everyday worship",
            "Understand Islamic family and transaction law",
            "Navigate complex fiqh questions with confidence"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📖", label: "Text-Based Learning" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 20,
        name: "Ustadha Ruqayyah Thompson",
        title: "Islamic Parenting Educator",
        authority: "Certified parent coach · Author of 'Raising Muslims'",
        location: "Manchester, UK",
        bio: "Helps Muslim parents raise confident, faith-grounded children in a modern world. Covers discipline, Quran education at home, and identity building.",
        topics: ["Parenting", "Women in Islam", "Youth Mentorship"],
        languages: ["English"],
        avatar: "🧕",
        sessionsCompleted: 295,
        studentsHelped: 200,
        yearsExperience: 8,
        beginner: true,
        achievements: [
            "Raise children who love their faith",
            "Navigate screens, schools, and peer pressure Islamically",
            "Create a home environment filled with deen"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "All Levels Welcome" },
            { icon: "⏱️", label: "45 Minutes" }
        ]
    },
    {
        id: 21,
        name: "Ustadh Dawud Al-Maghribi",
        title: "Conversational Arabic Tutor",
        authority: "Native Moroccan Arabic speaker · 12 years of teaching",
        location: "Casablanca, Morocco",
        bio: "Focuses on spoken Modern Standard Arabic and Levantine dialect for practical communication. Great for travelers, converts, and heritage speakers.",
        topics: ["Arabic", "Conversational Arabic"],
        languages: ["Arabic", "French", "English"],
        avatar: "🧔",
        sessionsCompleted: 380,
        studentsHelped: 245,
        yearsExperience: 12,
        beginner: true,
        achievements: [
            "Hold basic conversations in Arabic within weeks",
            "Understand Arabic speakers in real contexts",
            "Build vocabulary for travel and daily life"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Absolute Beginners Welcome" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 22,
        name: "Dr. Aminata Diallo",
        title: "Islam in Africa Scholar",
        authority: "Researcher at SOAS · Expert in West African Islamic traditions",
        location: "Dakar, Senegal",
        bio: "Explores the rich Islamic heritage of Sub-Saharan Africa. Teaches Islamic history through a global lens, recovering often-overlooked African scholarly traditions.",
        topics: ["Islamic History", "Seerah", "Comparative Religion"],
        languages: ["French", "Wolof", "Arabic", "English"],
        avatar: "👩‍🎓",
        sessionsCompleted: 110,
        studentsHelped: 75,
        yearsExperience: 9,
        achievements: [
            "Discover the rich Islamic scholarship of Africa",
            "Understand Islam's diversity across cultures",
            "Explore Sufi orders and their historical role"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📚", label: "Historical Deep Dives" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 23,
        name: "Sheikh Ramadan Al-Bouti",
        title: "Shafi'i Fiqh & Worship Guide",
        authority: "Trained in Damascus · 25+ years of teaching Islamic sciences",
        location: "Istanbul, Turkey",
        bio: "Senior scholar in Shafi'i jurisprudence and Islamic spirituality. Known for his gentle teaching style and accessible explanations of worship rulings.",
        topics: ["Fiqh", "Spirituality", "Aqeedah"],
        languages: ["Arabic", "Turkish"],
        avatar: "👳",
        sessionsCompleted: 540,
        studentsHelped: 310,
        yearsExperience: 25,
        achievements: [
            "Perfect your Salah and purification according to Shafi'i fiqh",
            "Develop a consistent act of worship routine",
            "Deepen your spiritual connection to Allah"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌿", label: "Traditional Approach" },
            { icon: "⏱️", label: "30–60 Minutes" }
        ]
    },
    {
        id: 24,
        name: "Ustadha Hana Karimi",
        title: "Arabic for Children Specialist",
        authority: "Certified TESOL instructor · Developed Arabic kids curriculum",
        location: "Amman, Jordan",
        bio: "Makes Arabic fun and engaging for children aged 5–16. Uses games, stories, and interactive techniques to build foundational language skills.",
        topics: ["Arabic", "Quran", "Memorization"],
        languages: ["Arabic", "English"],
        avatar: "🧕",
        sessionsCompleted: 620,
        studentsHelped: 390,
        yearsExperience: 7,
        beginner: true,
        achievements: [
            "Give your child a love for Arabic and Quran",
            "Build foundational reading and writing skills",
            "Make Islamic education fun at home"
        ],
        sessionFormat: [
            { icon: "👶", label: "Children Specialist" },
            { icon: "🎮", label: "Interactive & Fun" },
            { icon: "⏱️", label: "20–30 Minutes" }
        ]
    },
    {
        id: 25,
        name: "Ustadh Sulayman Okonkwo",
        title: "Islamic Ethics & Akhlaq Teacher",
        authority: "Graduate of Darul Mustafa, Yemen · Specializes in spiritual purification",
        location: "Lagos, Nigeria",
        bio: "Teaches Islamic character development and purification of the soul through classical Sufi texts and practical daily habits.",
        topics: ["Spirituality", "Aqeedah", "Seerah"],
        languages: ["English", "Hausa", "Arabic"],
        avatar: "🧔",
        sessionsCompleted: 175,
        studentsHelped: 115,
        yearsExperience: 10,
        beginner: true,
        achievements: [
            "Develop noble character traits based on the Sunnah",
            "Overcome spiritual diseases like arrogance and envy",
            "Build daily habits of dhikr and reflection"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 26,
        name: "Dr. Sara Al-Jibouri",
        title: "Islamic Bioethics Consultant",
        authority: "MD + Islamic Studies · Advises on medical fiqh questions",
        location: "Toronto, Canada",
        bio: "Physician and Islamic scholar who helps Muslims navigate complex medical decisions — from end-of-life care to IVF — through the lens of Islamic ethics.",
        topics: ["Fiqh", "Islamic Ethics", "Women in Islam"],
        languages: ["English", "Arabic"],
        avatar: "👩‍⚕️",
        sessionsCompleted: 130,
        studentsHelped: 90,
        yearsExperience: 8,
        achievements: [
            "Get Islamic clarity on complex medical decisions",
            "Understand permissibility of medical procedures in Islam",
            "Navigate end-of-life and reproductive ethics Islamically"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🏥", label: "Case-Based Guidance" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 27,
        name: "Ustadh Nasir Al-Yemeni",
        title: "Hanafi Fiqh & Worship Instructor",
        authority: "Trained at Dar al-Mustafa · Specializes in Hanafi school",
        location: "Sana'a, Yemen",
        bio: "Teaches Hanafi jurisprudence from classical texts with modern application. Particularly skilled in the fiqh of Salah, Zakah, and fasting.",
        topics: ["Fiqh", "Arabic", "Aqeedah"],
        languages: ["Arabic", "English"],
        avatar: "👳",
        sessionsCompleted: 265,
        studentsHelped: 165,
        yearsExperience: 14,
        beginner: true,
        achievements: [
            "Master your Salah according to the Hanafi school",
            "Understand Zakah calculations and Ramadan rulings",
            "Build a solid foundation in Hanafi worship"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌱", label: "Beginner Friendly" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 28,
        name: "Ustadha Rania Aziz",
        title: "Spiritual Wellbeing & Dua Coach",
        authority: "Trained in Sufi tradition · Focus on heart-based Islamic practice",
        location: "Beirut, Lebanon",
        bio: "Guides Muslims in deepening their personal relationship with Allah through authentic Dua, dhikr, and spiritual disciplines rooted in classical tradition.",
        topics: ["Spirituality", "Dua", "Aqeedah"],
        languages: ["Arabic", "English", "French"],
        avatar: "🧕",
        sessionsCompleted: 200,
        studentsHelped: 140,
        yearsExperience: 9,
        beginner: true,
        achievements: [
            "Feel heard and answered in your Duas",
            "Develop a living dhikr practice",
            "Restore hope and connection through spiritual discipline"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "🌿", label: "Gentle & Compassionate" },
            { icon: "⏱️", label: "30–45 Minutes" }
        ]
    },
    {
        id: 29,
        name: "Sheikh Ismail Abdallah",
        title: "Quranic Sciences & Usul al-Tafsir",
        authority: "Specialist in Usul al-Tafsir from University of Khartoum",
        location: "Khartoum, Sudan",
        bio: "Teaches the classical principles of Quranic interpretation, including the sciences of abrogation, context of revelation, and linguistic miracles of the Quran.",
        topics: ["Tafsir", "Quran", "Arabic"],
        languages: ["Arabic", "English"],
        avatar: "👳",
        sessionsCompleted: 145,
        studentsHelped: 95,
        yearsExperience: 15,
        achievements: [
            "Understand the principles behind Quranic interpretation",
            "Engage critically with Tafsir literature",
            "Discover the linguistic miracles of the Quran"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📚", label: "Classical Methodology" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    },
    {
        id: 30,
        name: "Ustadh Faris Al-Shami",
        title: "Arabic Conversation & Media Arabic",
        authority: "Former Al-Jazeera Arabic journalist · 10 years in media",
        location: "Doha, Qatar",
        bio: "Ex-journalist who now teaches Arabic as used in media, news, and professional contexts. Ideal for professionals wanting to use Arabic in their careers.",
        topics: ["Arabic", "Conversational Arabic", "Classical Arabic"],
        languages: ["Arabic", "English"],
        avatar: "🧔",
        sessionsCompleted: 250,
        studentsHelped: 160,
        yearsExperience: 10,
        beginner: false,
        achievements: [
            "Read and understand Arabic news fluently",
            "Write professional Arabic emails and reports",
            "Speak with confidence in formal Arabic settings"
        ],
        sessionFormat: [
            { icon: "👤", label: "1:1 Private Session" },
            { icon: "📺", label: "Media-Based Learning" },
            { icon: "⏱️", label: "45–60 Minutes" }
        ]
    }
];

// ============================================
// TRUST DATA
// ============================================
const REVIEWS_POOL = [
    { name: "Aisha M.", text: "Completely transformed my recitation in just 4 sessions. I can finally read with confidence.", stars: 5 },
    { name: "Yousef K.", text: "The most patient and knowledgeable teacher I've found. Worth every minute.", stars: 5 },
    { name: "Sara H.", text: "Finally someone who explains things clearly without making me feel behind. Life-changing.", stars: 5 },
    { name: "Omar R.", text: "I tried 3 other teachers before this one. Night and day difference. Highly recommend.", stars: 5 },
    { name: "Fatima N.", text: "My Arabic went from zero to reading Quran in 8 weeks. I couldn't believe it.", stars: 5 },
    { name: "Ibrahim J.", text: "Incredibly structured lessons. I always know what we're working toward.", stars: 5 },
    { name: "Layla A.", text: "She answered every question without judgment. So refreshing for someone new to Islamic studies.", stars: 5 },
    { name: "Hassan B.", text: "The Seerah sessions felt like being transported back in time. Deeply moving.", stars: 5 },
    { name: "Mariam T.", text: "My kids look forward to every session. That alone tells you everything.", stars: 5 },
    { name: "Bilal S.", text: "Strict but encouraging. Exactly what I needed to push through the hard parts of Hifz.", stars: 5 },
    { name: "Zainab Q.", text: "I went from doubting my faith to feeling grounded and certain. Alhamdulillah.", stars: 5 },
    { name: "Amira C.", text: "Practical, modern, and deeply rooted in classical scholarship. Rare combination.", stars: 5 },
    { name: "Khalid D.", text: "Best investment I've made in my Islamic education. Genuinely life-changing.", stars: 5 },
    { name: "Nadia P.", text: "Her warmth and depth of knowledge make every session both educational and healing.", stars: 5 },
    { name: "Tariq L.", text: "Explained 10 years of confusion in two sessions. Wish I'd found this teacher sooner.", stars: 5 },
    { name: "Ruqayyah F.", text: "Never felt rushed or judged. The safest space I've had to ask real questions about Islam.", stars: 5 }
];

function getMentorTrust(mentor) {
    const id = mentor.id;
    const ratingPool = [4.9, 5.0, 4.8, 4.9, 4.7, 5.0, 4.8, 4.9, 4.6, 4.8];
    const rating = ratingPool[id % ratingPool.length];
    const reviewCount = Math.max(12, Math.floor(mentor.studentsHelped * 0.6));
    const slotsPool = [2, 3, 4, 1, 5, 3, 2, 4, 1, 3];
    const slotsLeft = slotsPool[id % slotsPool.length];
    const bookedPool = [8, 14, 7, 11, 9, 13, 6, 10, 12, 8];
    const bookedThisWeek = bookedPool[id % bookedPool.length];
    const nextPool = ["Tomorrow", "Wednesday", "Thursday", "Monday", "Friday"];
    const nextAvailable = nextPool[id % nextPool.length];
    const review1 = REVIEWS_POOL[id % REVIEWS_POOL.length];
    const review2 = REVIEWS_POOL[(id + 7) % REVIEWS_POOL.length];

    const badges = ["✓ Verified"];
    const auth = mentor.authority.toLowerCase();
    if (auth.includes("phd") || auth.includes("certified") || auth.includes("graduate") ||
        auth.includes("hafiz") || auth.includes("ijazah") || auth.includes("author")) {
        badges.push("🎓 Certified");
    }
    const nativeLanguages = ["Arabic", "Urdu", "French", "Turkish", "Malay", "Hausa", "Wolof"];
    const firstLang = mentor.languages[0];
    if (nativeLanguages.includes(firstLang) && firstLang !== "English") {
        badges.push(`🗣️ Native ${firstLang}`);
    }

    return { rating, reviewCount, slotsLeft, bookedThisWeek, nextAvailable, reviews: [review1, review2], badges };
}

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half) stars += '½';
    return stars;
}

function getMentorAvatar(mentor) {
    const femaleEmojis = ['🧕', '👩‍🎓', '👩‍⚕️'];
    const isFemale = femaleEmojis.includes(mentor.avatar);
    const maleMap  = { 1:32, 3:44, 5:22, 6:61, 8:34, 10:55, 12:74, 14:18, 15:45, 17:38, 19:50, 21:68, 23:71, 25:20, 27:60, 29:77, 30:40 };
    const femaleMap = { 2:44, 4:32, 7:26, 9:63, 11:17, 13:29, 16:65, 18:47, 20:53, 22:36, 24:22, 26:68, 28:39 };
    if (isFemale) {
        const n = femaleMap[mentor.id] || ((mentor.id * 7) % 49 + 1);
        return `https://randomuser.me/api/portraits/women/${n}.jpg`;
    }
    const n = maleMap[mentor.id] || ((mentor.id * 11) % 79 + 1);
    return `https://randomuser.me/api/portraits/men/${n}.jpg`;
}

// ============================================
// STATE
// ============================================
const state = {
    currentView: 'home',
    activeFilter: 'all',
    searchQuery: '',
    onboardingDone: false
};

// ============================================
// APP
// ============================================
const app = {

    async init() {
        const { data: { session } } = await supabase.auth.getSession();
        currentUser = session?.user || null;
        this.updateNav();

        supabase.auth.onAuthStateChange((_event, session) => {
            currentUser = session?.user || null;
            this.updateNav();
        });

        if (state.onboardingDone) {
            this.renderHome();
        } else {
            this.renderOnboarding();
        }
    },

    goHome() {
        state.currentView = 'home';
        state.activeFilter = 'all';
        state.searchQuery = '';
        selectedMentor = null;
        this.renderHome();
    },

    completeOnboarding(filter, label) {
        state.onboardingDone = true;
        state.activeFilter = filter;
        state.searchQuery = '';
        state.currentView = 'home';
        this.renderHome();
    },

    skipOnboarding() {
        state.onboardingDone = true;
        state.currentView = 'home';
        this.renderHome();
    },

    renderOnboarding() {
        const goals = [
            { emoji: "📖", label: "Read the Quran", filter: "Quran" },
            { emoji: "🔤", label: "Learn Arabic", filter: "Arabic" },
            { emoji: "📿", label: "Quran Memorization", filter: "Memorization" },
            { emoji: "🕌", label: "Understand Fiqh", filter: "Fiqh" },
            { emoji: "💫", label: "Spirituality & Dhikr", filter: "Spirituality" },
            { emoji: "👩", label: "Women's Studies", filter: "women" },
            { emoji: "🧒", label: "For My Child", filter: "Arabic" },
            { emoji: "🌱", label: "I'm a New Muslim", filter: "Aqeedah" },
            { emoji: "📚", label: "Seerah & History", filter: "Seerah" },
            { emoji: "💼", label: "Islamic Finance", filter: "Islamic Finance" }
        ];

        document.getElementById('app').innerHTML = `
            <div class="onboarding-container">
                <div class="onboarding-header">
                    <p class="onboarding-step">Step 1 of 1</p>
                    <h1 class="onboarding-title">What do you want to learn?</h1>
                    <p class="onboarding-sub">We'll match you with the right mentor for your goal.</p>
                </div>

                <div class="onboarding-goals">
                    ${goals.map(g => `
                        <button class="goal-card" onclick="app.completeOnboarding('${g.filter}', '${g.label}')">
                            <span class="goal-emoji">${g.emoji}</span>
                            <span class="goal-label">${g.label}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="onboarding-skip">
                    <button class="skip-link" onclick="app.skipOnboarding()">Skip — browse all mentors →</button>
                </div>
            </div>
        `;
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
        const trust = getMentorTrust(mentor);
        return `
            <div class="mentor-card">
                <div class="mentor-card-top">
                    <img class="mentor-avatar-img" src="${getMentorAvatar(mentor)}" alt="${mentor.name}" loading="lazy" />
                    <span class="mentor-avail-badge">
                        <span class="mentor-avail-dot"></span> Available
                    </span>
                </div>
                <h3 class="mentor-name">${mentor.name}</h3>
                <p class="mentor-title-small">${mentor.title}</p>

                <div class="card-rating-row">
                    <span class="card-stars">${renderStars(trust.rating)}</span>
                    <span class="card-rating-num">${trust.rating}</span>
                    <span class="card-review-count">(${trust.reviewCount} reviews)</span>
                </div>

                <div class="card-trust-badges">
                    ${trust.badges.map(b => `<span class="trust-badge">${b}</span>`).join('')}
                </div>

                <div class="mentor-card-stats">
                    <span class="mentor-stat">📚 ${mentor.sessionsCompleted} sessions</span>
                    <span class="mentor-stat-divider">·</span>
                    <span class="mentor-stat">⭐ ${mentor.yearsExperience}+ yrs</span>
                </div>

                <div class="card-urgency">
                    🔥 ${trust.slotsLeft} slots left this week
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
        const trust = getMentorTrust(mentor);
        document.getElementById('app').innerHTML = `
            <div class="profile-container">

                <button class="back-btn" onclick="app.goHome()">← Back to Mentors</button>

                <div class="profile-card">

                    <div class="profile-header-section">
                        <img class="profile-avatar-img" src="${getMentorAvatar(mentor)}" alt="${mentor.name}" loading="lazy" />
                        <div class="profile-header-info">
                            <h1 class="profile-name">${mentor.name}</h1>
                            <p class="profile-title">${mentor.title}</p>
                            <p class="profile-authority">${mentor.authority}</p>

                            <div class="profile-rating-row">
                                <span class="profile-stars">${renderStars(trust.rating)}</span>
                                <span class="profile-rating-num">${trust.rating}</span>
                                <span class="profile-review-count">${trust.reviewCount} reviews</span>
                            </div>

                            <div class="profile-trust-badges">
                                ${trust.badges.map(b => `<span class="trust-badge trust-badge-lg">${b}</span>`).join('')}
                            </div>

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

                    <div class="profile-urgency-bar">
                        <span class="urgency-fire">🔥</span>
                        <span><strong>Only ${trust.slotsLeft} slots left</strong> this week</span>
                        <span class="urgency-divider">·</span>
                        <span>Next available: <strong>${trust.nextAvailable}</strong></span>
                        <span class="urgency-divider">·</span>
                        <span>Booked <strong>${trust.bookedThisWeek}×</strong> this week</span>
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
                        <div class="stat-divider"></div>
                        <div class="stat-item">
                            <span class="stat-number">${trust.rating}</span>
                            <span class="stat-label">Rating</span>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h3>About</h3>
                        <p>${mentor.bio}</p>
                    </div>

                    <div class="profile-section">
                        <h3>What You'll Walk Away With</h3>
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

                    <div class="profile-section">
                        <h3>What Students Say</h3>
                        <div class="reviews-list">
                            ${trust.reviews.map(r => `
                                <div class="review-card">
                                    <div class="review-header">
                                        <span class="review-avatar">${r.name.charAt(0)}</span>
                                        <div class="review-meta">
                                            <span class="review-name">${r.name}</span>
                                            <span class="review-stars">${'★'.repeat(r.stars)}</span>
                                        </div>
                                    </div>
                                    <p class="review-text">"${r.text}"</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                </div>

                <div class="booking-card" id="booking-card">
                    <div class="booking-urgency-notice">
                        ⏳ Only <strong>${trust.slotsLeft} spots</strong> available — next opening is <strong>${trust.nextAvailable}</strong>
                    </div>
                    <div class="booking-card-header">
                        <h2>Request a Session</h2>
                        <p class="booking-card-sub">with ${mentor.name}</p>
                    </div>

                    ${!currentUser ? `
                    <div class="booking-auth-gate">
                        <p class="booking-auth-gate-text">Sign in to request a session with ${mentor.name}.</p>
                        <button class="btn btn-primary btn-large" onclick="app.renderAuthPage('login', 'learner')">Sign In to Book</button>
                        <p class="booking-auth-gate-sub">No account? <a href="#" onclick="app.renderAuthPage('signup', 'learner'); return false;">Sign up free</a></p>
                    </div>
                    ` : `
                    <form id="booking-form" onsubmit="handleBookingSubmit(event)">

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
                    `}

                </div>

            </div>
        `;
    },

    // ==========================================
    // AUTH & DASHBOARD
    // ==========================================
    updateNav() {
        const navAuth = document.getElementById('nav-auth');
        if (!navAuth) return;
        if (currentUser) {
            const meta = currentUser.user_metadata || {};
            const name = meta.full_name || meta.name || currentUser.email;
            const role = meta.role || 'learner';
            const isMentor = role === 'mentor';
            navAuth.innerHTML = `
                <span class="nav-user-name">👤 ${name}</span>
                ${isMentor
                    ? `<a href="#" class="nav-link nav-link-highlight" onclick="app.renderDashboard(); return false;">Dashboard</a>`
                    : `<a href="#" class="nav-link nav-link-highlight" onclick="app.renderMySessionsPage(); return false;">My Sessions</a>`
                }
                <a href="#" class="nav-link" onclick="app.handleLogout(); return false;">Logout</a>
            `;
        } else {
            navAuth.innerHTML = `
                <a href="#" class="nav-link nav-link-highlight" onclick="app.renderAuthPage('login', 'mentor'); return false;">Login</a>
            `;
        }
    },

    renderAuthPage(view = 'login', role = 'mentor') {
        state.currentView = 'auth';
        const isLogin = view === 'login';
        const isMentor = role === 'mentor';

        document.getElementById('app').innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-logo">🌙</div>
                    <h1 class="auth-title">${isLogin ? 'Sign In' : 'Create Account'}</h1>
                    <p class="auth-sub">${isLogin ? 'Welcome back. Sign in to continue.' : 'Join Sohbah and start your journey.'}</p>

                    <div class="auth-toggle">
                        <button class="auth-tab ${isLogin ? 'auth-tab-active' : ''}"
                            onclick="app.renderAuthPage('login', '${role}')">Login</button>
                        <button class="auth-tab ${!isLogin ? 'auth-tab-active' : ''}"
                            onclick="app.renderAuthPage('signup', '${role}')">Sign Up</button>
                    </div>

                    ${!isLogin ? `
                    <div class="role-selector">
                        <button type="button" class="role-btn ${isMentor ? 'role-btn-active' : ''}"
                            onclick="app.renderAuthPage('signup', 'mentor')">🎓 I'm a Mentor</button>
                        <button type="button" class="role-btn ${!isMentor ? 'role-btn-active' : ''}"
                            onclick="app.renderAuthPage('signup', 'learner')">📖 I'm a Learner</button>
                    </div>
                    ` : ''}

                    <form id="auth-form" onsubmit="app.${isLogin ? 'handleLogin' : 'handleSignup'}(event, '${role}')">

                        ${!isLogin ? `
                        <div class="form-group">
                            <label class="form-label" for="auth-name">Full Name</label>
                            <input id="auth-name" class="form-input" type="text"
                                placeholder="${isMentor ? 'Your full name as it will appear on your profile' : 'Your full name'}"
                                required />
                        </div>
                        ` : ''}

                        <div class="form-group">
                            <label class="form-label" for="auth-email">Email</label>
                            <input id="auth-email" class="form-input" type="email" placeholder="you@example.com" required />
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="auth-password">Password</label>
                            <input id="auth-password" class="form-input" type="password"
                                placeholder="${isLogin ? 'Enter your password' : 'Minimum 6 characters'}"
                                required ${!isLogin ? 'minlength="6"' : ''} />
                        </div>

                        <div id="auth-error" class="auth-error" hidden></div>

                        <button id="auth-btn" class="btn btn-primary btn-large" type="submit">
                            ${isLogin ? 'Sign In' : (isMentor ? 'Create Mentor Account' : 'Create Learner Account')}
                        </button>
                    </form>

                    <button class="auth-back-link" onclick="app.goHome()">← Back to mentors</button>
                </div>
            </div>
        `;
    },

    async handleLogin(e, role) {
        e.preventDefault();
        const btn = document.getElementById('auth-btn');
        const errorEl = document.getElementById('auth-error');
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;

        btn.disabled = true;
        btn.textContent = 'Signing in...';
        errorEl.hidden = true;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            errorEl.textContent = error.message;
            errorEl.hidden = false;
            btn.disabled = false;
            btn.textContent = 'Sign In';
            return;
        }

        const userRole = data.user?.user_metadata?.role || 'learner';
        if (userRole === 'mentor') {
            this.renderDashboard();
        } else {
            state.onboardingDone = true;
            this.renderHome();
        }
    },

    async handleSignup(e, role) {
        e.preventDefault();
        if (this._signupInProgress) return;

        const btn = document.getElementById('auth-btn');
        const errorEl = document.getElementById('auth-error');
        const fullName = (document.getElementById('auth-name')?.value || '').trim();
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;
        const isMentor = role === 'mentor';

        if (!fullName) {
            errorEl.textContent = 'Please enter your full name.';
            errorEl.hidden = false;
            return;
        }

        this._signupInProgress = true;
        btn.disabled = true;
        btn.textContent = 'Creating account...';
        errorEl.hidden = true;

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: fullName, role } }
            });

            if (error) {
                errorEl.textContent = error.message;
                errorEl.hidden = false;
                btn.disabled = false;
                btn.textContent = isMentor ? 'Create Mentor Account' : 'Create Learner Account';
                return;
            }

            const user = data.user;
            if (user && isMentor) {
                await supabase.from('mentors').upsert({
                    id: user.id,
                    name: fullName,
                    email: user.email,
                    title: '',
                    bio: '',
                    avatar_url: '',
                    created_at: new Date().toISOString()
                });
            }

            if (isMentor) {
                this.renderDashboard();
            } else {
                state.onboardingDone = true;
                this.renderHome();
            }
        } catch (err) {
            console.error('Signup error:', err);
            errorEl.textContent = 'An unexpected error occurred. Please try again.';
            errorEl.hidden = false;
            btn.disabled = false;
            btn.textContent = isMentor ? 'Create Mentor Account' : 'Create Learner Account';
        } finally {
            this._signupInProgress = false;
        }
    },

    async handleLogout() {
        await supabase.auth.signOut();
        state.onboardingDone = false;
        this.renderOnboarding();
    },

    async renderDashboard() {
        if (!currentUser) {
            this.renderAuthPage('login', 'mentor');
            return;
        }

        state.currentView = 'dashboard';
        const meta = currentUser.user_metadata || {};
        const mentorName = meta.full_name || meta.name || currentUser.email;
        const mentorEmail = currentUser.email;

        document.getElementById('app').innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">Your Dashboard</h1>
                        <p class="dashboard-sub">Welcome back, <strong>${mentorName}</strong></p>
                    </div>
                </div>

                <div class="dashboard-mentor-card">
                    <div class="dashboard-mentor-initials">${mentorName.charAt(0).toUpperCase()}</div>
                    <div>
                        <p class="dashboard-mentor-name">${mentorName}</p>
                        <p class="dashboard-mentor-title">Mentor</p>
                        <p class="dashboard-mentor-location">✉️ ${mentorEmail}</p>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h2 class="dashboard-section-title">📥 Booking Requests</h2>
                    <div id="dashboard-bookings">
                        <div class="dashboard-loading">Loading your bookings...</div>
                    </div>
                </div>
            </div>
        `;

        const { data: bookings, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('mentor_uuid', currentUser.id)
            .order('created_at', { ascending: false });

        const bookingsEl = document.getElementById('dashboard-bookings');

        if (error) {
            bookingsEl.innerHTML = `<div class="dashboard-empty"><p class="dashboard-empty-text">Could not load bookings: ${error.message}</p></div>`;
            return;
        }

        if (!bookings || bookings.length === 0) {
            bookingsEl.innerHTML = `
                <div class="dashboard-empty">
                    <p class="dashboard-empty-icon">📭</p>
                    <p class="dashboard-empty-title">No bookings yet</p>
                    <p class="dashboard-empty-text">When learners book a session with you, their requests will appear here.</p>
                </div>
            `;
            return;
        }

        bookingsEl.innerHTML = `
            <div class="bookings-table-wrap">
                <table class="bookings-table">
                    <thead>
                        <tr>
                            <th>Learner</th>
                            <th>Topic / Goal</th>
                            <th>Preferred Time</th>
                            <th>Received</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bookings.map(b => {
                            const date = b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
                            const status = b.status || 'pending';
                            const isPending = status === 'pending';
                            return `
                            <tr>
                                <td class="booking-learner">${b.learner_name || '—'}</td>
                                <td class="booking-topic">${b.topic || '—'}</td>
                                <td class="booking-time">${b.preferred_time || '—'}</td>
                                <td class="booking-time">${date}</td>
                                <td><span class="booking-status booking-status-${status.toLowerCase()}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
                                <td class="booking-actions">
                                    ${isPending ? `
                                    <button class="action-btn action-btn-accept" onclick="app.updateBookingStatus('${b.id}', 'accepted')">Accept</button>
                                    <button class="action-btn action-btn-reject" onclick="app.updateBookingStatus('${b.id}', 'rejected')">Reject</button>
                                    ` : `<span class="action-resolved">—</span>`}
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <p class="bookings-count">${bookings.length} request${bookings.length !== 1 ? 's' : ''} total</p>
        `;
    },

    async updateBookingStatus(bookingId, newStatus) {
        const { error } = await supabase
            .from('bookings')
            .update({ status: newStatus })
            .eq('id', bookingId);

        if (error) {
            alert('Could not update status: ' + error.message);
            return;
        }
        this.renderDashboard();
    },

    async renderMySessionsPage() {
        if (!currentUser) {
            this.renderAuthPage('login', 'learner');
            return;
        }

        state.currentView = 'my-sessions';
        const meta = currentUser.user_metadata || {};
        const learnerName = meta.full_name || meta.name || currentUser.email;

        document.getElementById('app').innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">My Sessions</h1>
                        <p class="dashboard-sub">Track your mentorship requests, <strong>${learnerName}</strong></p>
                    </div>
                </div>

                <div class="dashboard-section">
                    <div id="sessions-list"><div class="dashboard-loading">Loading your sessions...</div></div>
                </div>
            </div>
        `;
        this.updateNav();

        const { data: bookings, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('learner_id', currentUser.id)
            .order('created_at', { ascending: false });

        const sessionsEl = document.getElementById('sessions-list');

        if (error) {
            sessionsEl.innerHTML = `<div class="dashboard-empty"><p class="dashboard-empty-text">Could not load sessions: ${error.message}</p></div>`;
            return;
        }

        if (!bookings || bookings.length === 0) {
            sessionsEl.innerHTML = `
                <div class="dashboard-empty">
                    <p class="dashboard-empty-icon">📭</p>
                    <p class="dashboard-empty-title">No sessions yet</p>
                    <p class="dashboard-empty-text">Browse mentors and send a session request to get started.</p>
                    <button class="btn btn-primary" onclick="app.goHome()">Browse Mentors</button>
                </div>
            `;
            return;
        }

        sessionsEl.innerHTML = `
            <div class="sessions-grid">
                ${bookings.map(b => {
                    const date = b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
                    const status = b.status || 'pending';
                    return `
                    <div class="session-card">
                        <div class="session-card-top">
                            <div class="session-mentor-info">
                                <p class="session-mentor-name">${b.mentor_name || 'Mentor'}</p>
                                <p class="session-topic">${b.topic || '—'}</p>
                            </div>
                            <span class="booking-status booking-status-${status.toLowerCase()}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                        </div>
                        <div class="session-card-meta">
                            <span class="session-meta-item">🕐 ${b.preferred_time || '—'}</span>
                            <span class="session-meta-item">📅 ${date}</span>
                        </div>
                        ${status === 'accepted' ? `<div class="session-accepted-notice">✓ Your session has been accepted! Your mentor will reach out to confirm the time.</div>` : ''}
                        ${status === 'rejected' ? `<div class="session-rejected-notice">This request wasn't accepted. Feel free to book another mentor.</div>` : ''}
                    </div>`;
                }).join('')}
            </div>
            <p class="bookings-count">${bookings.length} session${bookings.length !== 1 ? 's' : ''} total</p>
        `;
    },

};

// ============================================
// BOOKING
// ============================================
async function handleBookingSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const errorEl = document.getElementById('error');
    const success = document.getElementById('success');
    const form = document.getElementById('booking-form');

    btn.disabled = true;
    btn.textContent = "Sending...";
    errorEl.hidden = true;

    // Require auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        errorEl.textContent = "Please sign in to send a booking request.";
        errorEl.hidden = false;
        btn.disabled = false;
        btn.textContent = "Send Session Request";
        return;
    }

    // Look up the mentor's real UUID from the mentors table
    let mentorUuid = null;
    if (selectedMentor?.name) {
        const { data: dbMentor } = await supabase
            .from('mentors')
            .select('id')
            .eq('name', selectedMentor.name)
            .maybeSingle();
        mentorUuid = dbMentor?.id || null;
    }

    const bookingData = {
        topic: document.getElementById('topic').value,
        preferred_time: document.getElementById('time').value,
        mentor_id: selectedMentor?.id || null,
        mentor_uuid: mentorUuid,
        learner_id: user.id,
        status: 'pending'
    };

    const { error: err } = await supabase.from("bookings").insert([bookingData]);

    if (err) {
        errorEl.hidden = false;
        errorEl.textContent = "Something went wrong: " + err.message;
        btn.disabled = false;
        btn.textContent = "Send Session Request";
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
