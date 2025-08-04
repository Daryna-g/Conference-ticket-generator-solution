const dropArea = document.querySelector("#dropArea")
const inputFile = document.querySelector("#myFile")
const imageView = document.querySelector("#image-view")
const button = document.querySelector("button")

const form = document.querySelector("form");

// const errorImg = document.querySelector('#error-img');
// const errorEmail = document.querySelector('#error-email');
// const errorMessage = document.querySelector(".error");

const errorImg = document.getElementById('img-error');
const errorEmail = document.getElementById('email-error');
const errorForm = document.getElementById('form-error');
const errorMessage = document.getElementById('.error-message');

inputFile.addEventListener("change", uploadImage)

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

	// const firstName = document.querySelector("#firstName").value.trim()
	// const lastName = document.querySelector("#lastName").value.trim()
	const fullName = document.querySelector("#fullName").value.trim()
	const email = document.querySelector("#email").value.trim()
	const file = inputFile.files[0]
	const github = document.querySelector("#github").value

	if (!fullName || !email || !file) {
		// errorMessage.style.display = "block";
		showError(errorForm, "Please fill in all fields");
		// errorForm.textContent = "Please fill in all fields";
		alert("Please fill in all fields");
		return
	} else {
		hideError(errorForm);
	}

	const allowedTypes = ['image/jpeg', 'image/png']
	if (!allowedTypes.includes(file.type)) {
		// errorMessage.style.display = "block";
		// errorImg.textContent = 'Only JPG and PNG are allowed.'
		showError(errorImg, "Only JPG and PNG are allowed");

		// alert('')
		return
	} else {
		hideError(errorImg);
	}

	const maxFileSize = 500 * 1024
	if (file.size > maxFileSize) {
		// errorMessage.style.display = "block";
		// errorImg.textContent = 'Image is too big. Max 500kb.'
		showError(errorImg, "Image is too big. Max 500kb.");
		// alert()
		return
	} else {
		hideError(errorImg);
	}

	if (!isValidEmail(email)) {
		// errorEmail.textContent = "This is an invalid email address.";
		// errorMessage.style.display = "block";
		showError(errorEmail, "This is an invalid email address.");
		// alert();
		console.log('This is an invalid email address.');
		return
	} else {
		hideError(errorEmail);
	}

	function showError(warning, message) {
		warning.textContent = message;
		warning.style.display = "block";
	}

	function hideError(warning) {
		warning.style.display = "none";
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