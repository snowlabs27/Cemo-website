/*!
* Start Bootstrap - Business Frontpage v5.0.9 (https://startbootstrap.com/template/business-frontpage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-frontpage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener("DOMContentLoaded", function () {
	const contactForm = document.getElementById("contactForm");

	if (!contactForm) {
		return;
	}

	contactForm.addEventListener("submit", async function (event) {
		event.preventDefault();

		const submitButton = document.getElementById("submitButton");
		const successMessage = document.getElementById("submitSuccessMessage");
		const errorMessage = document.getElementById("submitErrorMessage");
		submitButton.disabled = true;
		submitButton.textContent = "Sending...";
		successMessage.classList.add("d-none");
		errorMessage.classList.add("d-none");

		try {
			const response = await fetch(contactForm.action, {
				method: "POST",
				body: new FormData(contactForm),
				headers: {
					Accept: "application/json"
				}
			});
			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.message || "Unable to send enquiry.");
			}

			contactForm.reset();
			successMessage.classList.remove("d-none");
		} catch (error) {
			errorMessage.querySelector(".text-danger").textContent = "Error sending enquiry. Please try again or contact us directly.";
			errorMessage.classList.remove("d-none");
		} finally {
			submitButton.disabled = false;
			submitButton.textContent = "Send enquiry";
		}
	});
});