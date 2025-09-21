// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Show/clear error helper
    function setError(input, message) {
        const errorElement = document.getElementById(input.id + '-error');
        input.classList.toggle('error', !!message);
        errorElement.textContent = message || '';
    }

    // Validate individual field
    function validateField(input) {
        const value = input.value.trim();
        const fieldName = input.id;
        
        if (!value) {
            setError(input, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            return false;
        }
        
        if (fieldName === 'email' && !emailRegex.test(value)) {
            setError(input, 'Please enter a valid email address');
            return false;
        }
        
        if (fieldName === 'fullname' && value.length < 2) {
            setError(input, 'Full name must be at least 2 characters');
            return false;
        }
        
        if (fieldName === 'subject' && value.length < 3) {
            setError(input, 'Subject must be at least 3 characters');
            return false;
        }
        
        if (fieldName === 'message' && value.length < 1) {
            setError(input, 'Message must be at least 1 character');
            return false;
        }
        
        setError(input, '');
        return true;
    }

    // Add validation to all inputs
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                setError(input, '');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea');
        const isValid = Array.from(inputs).every(input => validateField(input));

        if (isValid) {
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
                submitBtn.value = 'Submit';
                submitBtn.disabled = false;
                inputs.forEach(input => setError(input, ''));
            }, 1500);
        } else {
            form.querySelector('.error')?.focus();
        }
    });
});
