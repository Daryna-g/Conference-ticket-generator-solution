const dropArea = document.querySelector("#dropArea")
const inputFile = document.querySelector("#myFile")
const imageView = document.querySelector("#image-view")
const button = document.querySelector("button")

const form = document.querySelector("form");

const errorContainer = document.querySelector('.error');
// const errorIcon = document.querySelector('.error-icon');
const icon = errorContainer.querySelector('.error-icon');
const errorImg = document.getElementById('img-error');
const errorEmail = document.getElementById('email-error');
const errorForm = document.getElementById('form-error');
const errorMessage = document.querySelector('.error-message');

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
	errorImg.textContent = '';
	const file = inputFile.files[0]
	if (!file) return

	const imgLink = URL.createObjectURL(file)
	imageView.style.backgroundImage = `url(${imgLink})`
}

function isValidEmail(email) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
}

form.addEventListener("submit", (e) => {
	e.preventDefault()

	const fullName = document.querySelector("#fullName").value.trim()
	const email = document.querySelector("#email").value.trim()
	const file = inputFile.files[0]
	const github = document.querySelector("#github").value

	if (!fullName || !email || !file) {
		// errorMessage.style.display = "block";
		showError(errorForm, "Please fill in all fields", errorContainer);
		return
	} else {
		hideError(errorForm, errorContainer);
	}

	const allowedTypes = ['image/jpeg', 'image/png']
	if (!allowedTypes.includes(file.type)) {
		showError(errorImg, "Only JPG and PNG are allowed", errorContainer);
		return
	} else {
		hideError(errorImg, errorContainer);
	}

	const maxFileSize = 500 * 1024
	if (file.size > maxFileSize) {
		showError(errorImg, "Image is too big. Max 500kb.", errorContainer);
		return
	} else {
		console.log('remove error');
		hideError(errorImg, errorContainer);
	}

	if (!isValidEmail(email)) {

		showError(errorEmail, "This is an invalid email address.", errorContainer);
		console.log('This is an invalid email address.');
		return
	} else {
		hideError(errorEmail, errorContainer);
	}


	function showError(warning, message, container) {
		console.log(container);

		warning.textContent = message;
		container.classList.add('show-error');
	}

	function hideError(warning, container) {

		container.classList.remove('show-error');
		warning.textContent = '';
	}

	const reader = new FileReader()
	reader.onload = function (event) {
		const base64Image = event.target.result

		// Opslaan in sessionStorage
		// sessionStorage.setItem("userFirstName", firstName)
		sessionStorage.setItem("userFullName", fullName)
		sessionStorage.setItem("userEmail", email)
		sessionStorage.setItem("userGithub", github)
		sessionStorage.setItem("userImage", base64Image)

		// Doorsturen
		window.location.href = 'ticket.html'
	}

	reader.readAsDataURL(file)
});

// warning.style.display = "block";
	// const icon = errorContainer.querySelector('.error-icon');
	// container.style.display = "flex";
	// icon.style.display = "inline-block";
	// warning.classList.add('show-icon');

	// const icon = errorContainer.querySelector('.error-icon');
	// warning.style.display = "none";

	// container.style.display = "none";
	// icon.style.display = "none";
