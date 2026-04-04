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
