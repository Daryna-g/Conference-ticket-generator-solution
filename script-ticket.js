window.addEventListener("DOMContentLoaded", () => {
	const nameSpan = document.querySelector("span#name");
	const emailSpan = document.querySelector("span#email");
	const fullNameSpan = document.querySelector("span#fullName");
	// const lastNameSpan = document.querySelector("span#lastName")
	const githubSpan = document.querySelector("span#github");
	const avatarImg = document.querySelector("img#avatar");

	const fullName = sessionStorage.getItem("userFullName");
	// const lastName = sessionStorage.getItem("userLastName")
	const email = sessionStorage.getItem("userEmail");
	const github = sessionStorage.getItem("userGithub");
	const image = sessionStorage.getItem("userImage");

	if (!fullName || !email || !image) {
		alert("No data found.")
		return
	}

	nameSpan.textContent = `${fullName}`;
	emailSpan.textContent = email;
	fullNameSpan.textContent = fullName;
	// lastNameSpan.textContent = lastName
	githubSpan.textContent = github;
	avatarImg.src = image;
})

