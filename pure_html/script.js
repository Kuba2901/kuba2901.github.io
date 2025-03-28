// Form submission handler
const contactForm = document.querySelector('#contact form');
if (contactForm) {
	// Make sure the form has the correct action and method
	contactForm.setAttribute('action', 'https://formsubmit.co/kubanenczakdev@gmail.com');
	contactForm.setAttribute('method', 'POST');

	// Add hidden fields for FormSubmit configuration
	const formSubmitOptions = [
		{ name: '_subject', value: 'New Contact from Portfolio Website' },
		{ name: '_captcha', value: 'true' },
		{ name: '_template', value: 'table' },
		{ name: '_next', value: window.location.href } // Redirect back to the same page
	];

	formSubmitOptions.forEach(option => {
		const hiddenField = document.createElement('input');
		hiddenField.type = 'hidden';
		hiddenField.name = option.name;
		hiddenField.value = option.value;
		contactForm.appendChild(hiddenField);
	});

	// Add client-side validation and feedback
	contactForm.addEventListener('submit', function (e) {
		// Get form values for validation
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const message = document.getElementById('message').value;

		// Basic validation
		if (!name || !email || !message) {
			e.preventDefault();

			// Create alert for validation error
			const alert = document.createElement('div');
			alert.className = 'alert alert-danger mt-3';
			alert.setAttribute('role', 'alert');
			alert.innerHTML = 'Please fill all required fields.';

			// Insert alert before form
			contactForm.parentNode.insertBefore(alert, contactForm);

			// Remove the alert after 3 seconds
			setTimeout(() => {
				alert.remove();
			}, 3000);

			return;
		}

		// If validation passes, show a sending message
		const submitButton = contactForm.querySelector('button[type="submit"]');
		const originalText = submitButton.innerHTML;
		submitButton.innerHTML = 'Sending...';
		submitButton.disabled = true;

		// The form will be submitted normally to FormSubmit
		// No need to prevent default here unless you want to handle submission via AJAX
	});

	// Handle the redirect back from FormSubmit
	if (window.location.search.includes('success=true')) {
		// Create success message
		const alert = document.createElement('div');
		alert.className = 'alert alert-success mt-3';
		alert.setAttribute('role', 'alert');
		alert.innerHTML = 'Thank you! Your message has been received. I\'ll get back to you soon.';

		// Insert alert before form
		contactForm.parentNode.insertBefore(alert, contactForm);

		// Remove the alert after 5 seconds
		setTimeout(() => {
			alert.remove();
		}, 5000);

		// Clean up the URL
		window.history.replaceState({}, document.title, window.location.pathname);
	}
}


