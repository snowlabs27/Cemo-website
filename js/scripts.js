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

	const pageLoadedAt = Date.now();

	contactForm.addEventListener("submit", async function (event) {
		event.preventDefault();

		const COOLDOWN_MS = 60000;
		const MIN_FILL_MS = 3000;
		const submitButton = document.getElementById("submitButton");
		const errorBox = document.getElementById("submitErrorMessage");
		const showError = function (text) {
			errorBox.querySelector(".text-danger").textContent = text;
			errorBox.classList.remove("d-none");
		};

		// Honeypot filled: silently drop the submission
		if (contactForm.elements.botcheck.checked) {
			return;
		}
		if (Date.now() - pageLoadedAt < MIN_FILL_MS) {
			showError("Please take a moment to complete the form.");
			return;
		}
		const lastSent = Number(localStorage.getItem("contactLastSent") || 0);
		if (Date.now() - lastSent < COOLDOWN_MS) {
			showError("Please wait a minute before sending another enquiry.");
			return;
		}

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
			localStorage.setItem("contactLastSent", String(Date.now()));
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