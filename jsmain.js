// PrintPro Main JavaScript

// Service Data
const services = [
    { id: 1, name: "JPG to PDF", icon: "fa-regular fa-file-pdf", color: "red-500", bg: "red-100", desc: "Convert images to PDF", url: "/pages/jpg-to-pdf.html" },
    { id: 2, name: "Passport Photo", icon: "fa-regular fa-id-card", color: "indigo-500", bg: "indigo-100", desc: "Make passport size photos", url: "/pages/passport-photo.html" },
    { id: 3, name: "Merge PDF", icon: "fa-solid fa-object-group", color: "green-500", bg: "green-100", desc: "Combine multiple PDFs", url: "/pages/merge-pdf.html" },
    { id: 4, name: "ID Card Print", icon: "fa-regular fa-credit-card", color: "purple-500", bg: "purple-100", desc: "Print professional ID cards", url: "/pages/id-card.html" },
    { id: 5, name: "PDF to JPG", icon: "fa-regular fa-image", color: "blue-500", bg: "blue-100", desc: "Extract images from PDF", url: "/pages/pdf-to-jpg.html" },
    { id: 6, name: "Compress PDF", icon: "fa-solid fa-compress", color: "yellow-600", bg: "yellow-100", desc: "Reduce PDF file size", url: "/pages/compress-pdf.html" },
    { id: 7, name: "Resume Builder", icon: "fa-regular fa-file-lines", color: "teal-500", bg: "teal-100", desc: "Create professional resume", url: "/pages/resume-builder.html" },
    { id: 8, name: "Photo Editor", icon: "fa-solid fa-crop", color: "pink-500", bg: "pink-100", desc: "Crop and resize photos", url: "/pages/photo-editor.html" }
];

// Load Services on Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    initSearch();
    initDarkMode();
    loadStats();
});

function loadServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer text-center border border-gray-100';
        card.onclick = () => window.location.href = service.url;
        
        card.innerHTML = `
            <div class="w-14 h-14 rounded-xl bg-${service.bg} text-${service.color} flex items-center justify-center mx-auto mb-3">
                <i class="${service.icon} text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-800 text-base mb-1">${service.name}</h3>
            <p class="text-xs text-gray-500">${service.desc}</p>
            <div class="mt-3 text-indigo-600 text-sm opacity-0 group-hover:opacity-100 transition">Try Now →</div>
        `;
        
        grid.appendChild(card);
    });
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
            const desc = card.querySelector('p')?.innerText.toLowerCase() || '';
            
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    // Check local storage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });
}

function loadStats() {
    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.innerText = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                stat.innerText = Math.floor(current).toLocaleString() + '+';
            }
        }, 30);
    });
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-5 right-5 z-[300] px-5 py-3 rounded-xl shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-fade-in`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});