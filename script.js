// script.js
// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Form submission
// Initialize EmailJS
(function() {
    emailjs.init("-3gxayc7l3kmDMR6m"); // Ganti dengan Public Key Anda
})();

// Form submission dengan EmailJS
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const formMessage = document.getElementById('form-message');

const showMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
};

const setLoading = (isLoading) => {
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
};

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_email: 'benayayoyada34@gmail.com' // Ganti dengan email Anda
    };
    
    // Validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        showMessage('Harap lengkapi semua field!', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showMessage('Format email tidak valid!', 'error');
        return;
    }
    
    setLoading(true);
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_2j1ldg5', // Ganti dengan Service ID Anda
            'template_ljeirmd', // Ganti dengan Template ID Anda
            data
        );
        
        if (response.status === 200) {
            showMessage('Pesan berhasil dikirim! Saya akan membalas segera.', 'success');
            contactForm.reset();
        }
    } catch (error) {
        console.error('Error sending email:', error);
        showMessage('Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi via email langsung.', 'error');
    } finally {
        setLoading(false);
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Tambahkan juga link email yang bisa diklik
document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.querySelector('.contact-item:nth-child(1) p');
    if (emailElement) {
        const email = emailElement.textContent;
        emailElement.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    }
    
    const phoneElement = document.querySelector('.contact-item:nth-child(2) p');
    if (phoneElement) {
        const phone = phoneElement.textContent;
        phoneElement.innerHTML = `<a href="tel:${phone}">${phone}</a>`;
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
    // Animate elements on initial load
    const animateOnLoad = () => {
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    };
    
    animateOnLoad();
});
