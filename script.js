const dropArea = document.querySelector("#dropArea")
const inputFile = document.querySelector("#myFile")
const imageView = document.querySelector("#image-view")
const button = document.querySelector("button")

const form = document.querySelector("form");

const errorImg = document.querySelector('#error-img');
const errorEmail = document.querySelector('#error-email');
const errorMessage = document.querySelector(".error");

inputFile.addEventListener("change", uploadImage)

function uploadImage() {
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

		alert("Please fill in all fields")
		return
	}

	const allowedTypes = ['image/jpeg', 'image/png']
	if (!allowedTypes.includes(file.type)) {
		errorImg.textContent = 'Only JPG and PNG are allowed.'

		// alert('')
		return
	}

	const maxFileSize = 500 * 1024
	if (file.size > maxFileSize) {
		errorImg.textContent = 'Image is too big. Max 500kb.'
		// alert()
		return
	}

	if (!isValidEmail(email)) {
		errorEmail.textContent = "This is an invalid email address.";
		errorMessage.style.display = "block";
		// alert();
		return
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