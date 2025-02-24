// Initialize toast container
function initializeToastContainer() {
    // Remove existing container if present
    const existingContainer = document.querySelector('.toast-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Create new container
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
    return toastContainer;
}

// Function to show toast message
function showToast(message, type = 'success') {
    console.log('Showing toast:', message, type); // Debug log

    const toastContainer = document.querySelector('.toast-container') || initializeToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-x-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Force a reflow to ensure animation plays
    toast.style.opacity = '0';
    toastContainer.appendChild(toast);
    toast.offsetHeight; // Force reflow
    toast.style.opacity = '1';

    // Remove toast after delay
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 500);
    }, 3000);
}

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded'); // Debug log
    
    // Initialize toast container
    initializeToastContainer();

    // Handle contact form
    const contactForm = document.querySelector('.php-email-form');
    if (contactForm) {
        console.log('Contact form found'); // Debug log
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted'); // Debug log
            
            const loadingElement = this.querySelector('.loading');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (loadingElement) loadingElement.classList.add('d-block');
            if (submitButton) submitButton.disabled = true;

            setTimeout(() => {
                if (loadingElement) loadingElement.classList.remove('d-block');
                if (submitButton) submitButton.disabled = false;
                
                showToast('Thank you! Your message has been sent successfully.');
                this.reset();
            }, 1500);
        });
    }

    // Handle complaint form
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
        console.log('Complaint form found'); // Debug log
        
        complaintForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Complaint form submitted'); // Debug log
            
            const submitButton = this.querySelector('.btn-submit');
            
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
            }

            setTimeout(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                }
                
                showToast('Your complaint has been submitted successfully. We will review it shortly.');
                this.reset();
            }, 1500);
        });
    }
}); 