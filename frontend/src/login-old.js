const BASE_URL = "http://localhost:3000"
const LOGIN_URL = `${BASE_URL}/login`


function loginForm() {
	const login_form_div = document.getElementById("login-form-div")
	const login_form = document.createElement('form') // Create New Form Element
	login_form.setAttribute("action", "") // Setting Action Attribute on Form
	login_form.setAttribute("method", "post") // Setting Method Attribute on Form
	login_form_div.appendChild(login_form)

	const heading = document.createElement('h2') // Heading of Form
	heading.innerHTML = "Login Form"
	login_form.appendChild(heading)

	const line = document.createElement('hr') // Giving Horizontal Row After Heading
	login_form.appendChild(line)

	const linebreak = document.createElement('br')
	login_form.appendChild(linebreak)

	const namelabel = document.createElement('label') // Create Label for Name Field
	namelabel.innerHTML = "Your Name : " // Set Field Labels
	login_form.appendChild(namelabel)

	const name_element = document.createElement('input') // Create Input Field for Name
	name_element.setAttribute("type", "text")
	name_element.setAttribute("name", "name")
	login_form.appendChild(name_element)

	login_form.appendChild(linebreak)

	const password_label = document.createElement('label') // Create Label for Password Field
	password_label.innerHTML = "Your Password : "
	login_form.appendChild(password_label)

	const password_element = document.createElement('input') // Create Input Field for Password
	password_element.setAttribute("type", "text")
	password_element.setAttribute("name", "password")
	login_form.appendChild(password_element)

	const submitelement = document.createElement('input'); // Append Submit Button
	submitelement.setAttribute("type", "submit");
	submitelement.setAttribute("name", "submit");
	submitelement.setAttribute("value", "Login");
	login_form.appendChild(submitelement);

	login_form.addEventListener("submit", function(event) {
		event.preventDefault()
		let form_data = new FormData(login_form)
		let jsonObject = {}
		for (const [key, value] of form_data.entries()) {
			jsonObject[key] = value
		}

		fetch(LOGIN_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonObject)
			})
		.then(function(response) {
			return response.json()
			if (res.status < 200 || res.status > 299) {
	  		throw new Error() }
		})
		.then(function(user) {
			let current_user = new User(user)
			User.the_current_user(current_user) // Set's logged in user as the global static User
			window.location.pathname = "/Users/alexmerecka/Software-Programming/FlatIron-Labs/javascript-project-question-forum/frontend/index.html"
		})
		.catch(function(error) {
	    	alert("There was an error logging in!");
	    	console.log(error.message)
	 	 })
	})
}

