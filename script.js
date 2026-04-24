// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const darkModeToggle = document.getElementById('darkModeToggle');

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
        if (darkModeToggle) darkModeToggle.checked = true;
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', toggleTheme);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveNavLink();
});

// ========== NAVIGATION ==========
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        localStorage.setItem('userEmail', email);
        alert('Login successful!');
        window.location.href = 'profile.html';
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;
        
        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        
        localStorage.setItem('userEmail', email);
        alert('Account created successfully!');
        window.location.href = 'login.html';
    });
}

// ========== UTILITY FUNCTIONS ==========
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function generateRandomData(count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
}
// === Save Sidebar Scroll Position ===
const sidebar = document.querySelector(".sidebar");

if (sidebar) {
    // Restore saved scroll position on page load
    const savedPosition = localStorage.getItem("sidebar-scroll");
    if (savedPosition) {
        sidebar.scrollTop = parseInt(savedPosition);
    }

    // Save new scroll position whenever user scrolls
    sidebar.addEventListener("scroll", () => {
        localStorage.setItem("sidebar-scroll", sidebar.scrollTop);
    });
}

console.log('[v0] NeuroVytis Platform - Script initialized');

// ========== AI RISK PREDICTOR (Alzheimer Probability) ==========

const riskForm = document.getElementById("riskForm");

if (riskForm) {
    riskForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(riskForm);
        const payload = {};

        formData.forEach((value, key) => {
            payload[key] = value;
        });

        try {
            const response = await fetch("http://localhost:5000/predict-risk-ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!data.success) {
                alert("❌ Failed to generate prediction");
                return;
            }

            // SHOW RESULT CARD
            document.getElementById("riskResult").style.display = "block";

            // MAIN PERCENTAGE
            document.getElementById("riskPercentage").innerText =
                `${data.alzheimer_probability}%`;

            // RISK LEVEL
            document.getElementById("riskLevel").innerText =
                data.risk_level;

            // DESCRIPTION
            document.getElementById("riskDescription").innerText =
                `🧠 Based on clinical, lifestyle, and cognitive inputs, the AI model predicts a ${data.alzheimer_probability}% probability of developing Alzheimer’s disease.`;

            // MODEL INFO
            document.getElementById("modelInfo").innerText =
                `Model: ${data.model_used}`;

        } catch (error) {
            console.error("Prediction Error:", error);
            alert("⚠️ Server error while predicting risk");
        }
    });
}
