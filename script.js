// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get service selection using ID
            const serviceSelect = document.getElementById('service-select');
            const service = serviceSelect ? serviceSelect.value : '';
            
            // Validation - user must select a service
            if (!service) {
                alert('Please select a service.');
                return;
            }
            
            // Map service selections to Calendly URLs
            let calendlyUrl = '';
            switch(service) {
                case 'consultation':
                    calendlyUrl = 'https://calendly.com/capela625/30min';
                    break;
                case 'career-strategy':
                    calendlyUrl = 'https://calendly.com/capela625/career-strategy';
                    break;
                case 'technical-prep':
                    calendlyUrl = 'https://calendly.com/capela625/technical-prep';
                    break;
                case 'mock-interviews':
                    calendlyUrl = 'https://calendly.com/capela625/mock-interviews';
                    break;
                case 'comprehensive':
                    calendlyUrl = 'https://calendly.com/capela625/new-meeting';
                    break;
                default:
                    calendlyUrl = 'https://calendly.com/capela625/30min';
            }
            
            // Redirect immediately to Calendly
            window.open(calendlyUrl, '_blank');
            this.reset();
        });
        
        console.log('Contact form initialized successfully');
    } else {
        console.log('Contact form not found');
    }
}

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    
    // Also add direct button click handler as fallback
    const bookBtn = document.getElementById('book-session-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceSelect = document.getElementById('service-select');
            const service = serviceSelect ? serviceSelect.value : '';
            
            if (!service) {
                alert('Please select a service.');
                return;
            }
            
            let calendlyUrl = '';
            switch(service) {
                case 'consultation':
                    calendlyUrl = 'https://calendly.com/capela625/30min';
                    break;
                case 'career-strategy':
                    calendlyUrl = 'https://calendly.com/capela625/career-strategy';
                    break;
                case 'technical-prep':
                    calendlyUrl = 'https://calendly.com/capela625/technical-prep';
                    break;
                case 'mock-interviews':
                    calendlyUrl = 'https://calendly.com/capela625/mock-interviews';
                    break;
                case 'comprehensive':
                    calendlyUrl = 'https://calendly.com/capela625/new-meeting';
                    break;
                default:
                    calendlyUrl = 'https://calendly.com/capela625/30min';
            }
            
            window.open(calendlyUrl, '_blank');
        });
        console.log('Direct button handler added');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .timeline-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for success metrics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.metric-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                if (counter.textContent.includes('%')) {
                    animateCounter(counter, target, 2000);
                    setTimeout(() => counter.textContent = target + '%', 2000);
                } else if (counter.textContent.includes('k')) {
                    animateCounter(counter, target, 2000);
                    setTimeout(() => counter.textContent = '$' + target + 'k', 2000);
                } else if (counter.textContent.includes('+')) {
                    animateCounter(counter, target, 2000);
                    setTimeout(() => counter.textContent = target + '+', 2000);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        counterObserver.observe(heroCard);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});
