function showMessage() {
    alert("Thank you for contacting us. We will get back to you shortly.");
}


const header = document.getElementById("header");
const home = document.getElementById("home");

const observer = new IntersectionObserver(
    function(entries) {
        if (entries[0].isIntersecting) {
            header.classList.add("home-header");
        } else {
            header.classList.remove("home-header");
        }
    },
    {
        threshold: 0.5
    }
);

observer.observe(home);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // ==================== MOBILE MENU ====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('open');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (mainNav.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ==================== FORM HANDLING ====================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                matterType: document.getElementById('matterType').value.trim(),
                description: document.getElementById('description').value.trim()
            };

            // Basic validation
            if (!formData.fullName || !formData.email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Set loading state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');

                // Reset form
                contactForm.reset();

                // Restore button
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);

                // Log form data (replace with actual API call in production)
                console.log('Form submitted:', formData);
            }, 1500);
        });
    }

    // ==================== INPUT ANIMATIONS ====================
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});