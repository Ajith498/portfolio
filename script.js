// ========================================
// NAVIGATION BAR FUNCTIONALITY
// ========================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navLinks) {
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

// Smooth scrolling for anchor links (if any)
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

// ========================================
// SKILL BARS ANIMATION
// ========================================

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Run skill bar animation if on about page
if (document.querySelector('.skill-progress')) {
    animateSkillBars();
}

// ========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const formMessage = document.getElementById('formMessage');

    // Form validation
    const validateForm = () => {
        let isValid = true;

        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Get error message elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        // Clear previous errors
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';

        // Validate name
        if (name.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else if (name.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Validate subject
        if (subject.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            isValid = false;
        } else if (subject.value.trim().length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            isValid = false;
        }

        // Validate message
        if (message.value.trim() === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        return isValid;
    };

    // Form submission with Web3Forms
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Prepare form data
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            // Send to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (result.success) {
                // Success message
                formMessage.textContent = `Thank you, ${object.name}! Your message has been sent successfully. I will get back to you soon at ${object.email}.`;
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Hide message after 7 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 7000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error message
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly at sakthivelajith498@gmail.com';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';

            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateForm();
        });
    });
}

// ========================================
// DOWNLOAD RESUME FUNCTION
// ========================================

function downloadResume() {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = 'Ajith_python.pdf';  // PDF file in same folder
    link.download = 'Ajith_Sakthivel_Resume.pdf';  // Downloaded file name
    link.click();
}

// ========================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ========================================

// Create scroll to top button
const createScrollToTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// ========================================
// FADE IN ON SCROLL ANIMATION
// ========================================

const fadeInElements = document.querySelectorAll('.project-card, .education-card, .cert-card, .skill-category, .experience-item');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

// ========================================
// ACTIVE PAGE HIGHLIGHTING
// ========================================

// Highlight active page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinkElements = document.querySelectorAll('.nav-links a');

navLinkElements.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
    }
});

// ========================================
// PREVENT FORM RESUBMISSION ON REFRESH
// ========================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👋 Welcome to Ajith Sakthivel\'s Portfolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cInterested in collaborating? Feel free to reach out!', 'color: #64748b; font-size: 14px;');
console.log('%c📧 sakthivelajith498@gmail.com', 'color: #2563eb; font-size: 14px;');
