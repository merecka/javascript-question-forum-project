class Login {
	constructor() {
		this.BindingAndEventListeners()
		this.adapter = new LoginAdapter()
		this.renderLoginButton()
	}

	BindingAndEventListeners() {
		this.login_form_div = document.getElementById('login-form-div')
		this.signup_form_div = document.getElementById('signup-form-div')
		this.login_signup_button_div = document.getElementById('login-signup-button-div')
	}

	renderSignupForm() { // You don't use the "function" keyword inside Classes
		const form_group_div = document.createElement('div')
		form_group_div.setAttribute("class", "form-group")
		this.signup_form_div.appendChild(form_group_div)

		const signup_form = document.createElement('form') // Create New Form Element
		signup_form.id = "signup-form"
		signup_form.setAttribute("action", "") // Setting Action Attribute on Form
		signup_form.setAttribute("method", "post") // Setting Method Attribute on Form
		form_group_div.appendChild(signup_form)

		const heading = document.createElement('h2') // Heading of Form
		heading.innerHTML = "Signup Form"
		signup_form.appendChild(heading)

		const line = document.createElement('hr') // Giving Horizontal Row After Heading
		signup_form.appendChild(line)

		const linebreak = document.createElement('br')
		signup_form.appendChild(linebreak)

		const namelabel = document.createElement('label') // Create Label for Name Field
		namelabel.innerHTML = "Your Name : " // Set Field Labels
		signup_form.appendChild(namelabel)

		const name_element = document.createElement('input') // Create Input Field for Name
		name_element.setAttribute("type", "text")
		name_element.setAttribute("name", "name")
		name_element.setAttribute("class", "form-control")
		signup_form.appendChild(name_element)

		signup_form.appendChild(linebreak)

		const emaillabel = document.createElement('label') // Create Label for Email Field
		emaillabel.innerHTML = "Your Email : " // Set Field Labels
		signup_form.appendChild(emaillabel)

		const email_element = document.createElement('input') // Create Input Field for Email
		email_element.setAttribute("type", "text")
		email_element.setAttribute("name", "email")
		email_element.setAttribute("class", "form-control")
		signup_form.appendChild(email_element)

		signup_form.appendChild(linebreak)

		const password_label = document.createElement('label') // Create Label for Password Field
		password_label.innerHTML = "Your Password : "
		signup_form.appendChild(password_label)

		const password_element = document.createElement('input') // Create Input Field for Password
		password_element.setAttribute("type", "text")
		password_element.setAttribute("name", "password")
		password_element.setAttribute("class", "form-control")
		signup_form.appendChild(password_element)

		signup_form.appendChild(linebreak)

		const submitelement = document.createElement('input'); // Append Submit Button
		submitelement.setAttribute("type", "submit");
		submitelement.setAttribute("name", "submit");
		submitelement.setAttribute("value", "Signup");
		submitelement.className = "btn btn-primary"
		signup_form.appendChild(submitelement);

		signup_form.addEventListener("submit", (event) => {
			event.preventDefault()
			let form_data = new FormData(signup_form)
			let jsonObject = {}
			for (const [key, value] of form_data.entries()) {
				jsonObject[key] = value
			}
			this.adapter.submitSignupFormData(jsonObject) // Send form data to LoginAdapter for fetching to API
		})
	}

	renderLoginForm() { // You don't use the "function" keyword inside Classes
		const form_group_div = document.createElement('div')
		form_group_div.setAttribute("class", "form-group")
		this.login_form_div.appendChild(form_group_div)

		const login_form = document.createElement('form') // Create New Form Element
		login_form.id = "login-form"
		login_form.setAttribute("action", "") // Setting Action Attribute on Form
		login_form.setAttribute("method", "post") // Setting Method Attribute on Form
		form_group_div.appendChild(login_form)

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
		name_element.setAttribute("class", "form-control")
		login_form.appendChild(name_element)

		login_form.appendChild(linebreak)

		const password_label = document.createElement('label') // Create Label for Password Field
		password_label.innerHTML = "Your Password : "
		login_form.appendChild(password_label)

		const password_element = document.createElement('input') // Create Input Field for Password
		password_element.setAttribute("type", "text")
		password_element.setAttribute("name", "password")
		password_element.setAttribute("class", "form-control")
		login_form.appendChild(password_element)

		login_form.appendChild(linebreak)

		const submitelement = document.createElement('input'); // Append Submit Button
		submitelement.setAttribute("type", "submit");
		submitelement.setAttribute("name", "submit");
		submitelement.setAttribute("value", "Login");
		submitelement.className = "btn btn-primary"
		login_form.appendChild(submitelement);

		login_form.addEventListener("submit", (event) => {
			event.preventDefault()
			let form_data = new FormData(login_form)
			let jsonObject = {}
			for (const [key, value] of form_data.entries()) {
				jsonObject[key] = value
			}
			this.adapter.submitLoginFormData(jsonObject) // Send form data to LoginAdapter for fetching to API
		})
	}

	renderLoginButton() {
		const login_button = document.createElement('button') // Create New Form Element
		login_button.id = "login-button"
		login_button.setAttribute("data-id", "login-button")
		login_button.innerText = "Login"
		login_button.className = "btn btn-primary"
		this.login_signup_button_div.append(login_button)
		this.renderSignupButton(login_button)
		const signup_button = document.getElementById("signup-button")
		login_button.addEventListener("click", () =>  {
			login_button.parentNode.removeChild(login_button)
			signup_button.parentNode.removeChild(signup_button)
			this.renderLoginForm()
		})
	}

	renderSignupButton(login_button) {
		const signup_button = document.createElement('button') // Create New Form Element
		signup_button.id = "signup-button"
		signup_button.setAttribute("data-id", "signup-button")
		signup_button.innerText = "Signup"
		signup_button.className = "btn btn-primary"
		this.login_signup_button_div.append(signup_button)
		signup_button.addEventListener("click", () =>  {
			login_button.parentNode.removeChild(login_button)
			signup_button.parentNode.removeChild(signup_button)
			this.renderSignupForm()
		})
	}
}

	// This is another way to do it without using arrow functions.

	// 	login_form.addEventListener("submit", this.processFormData.bind(this))
	// }

	// processFormData(event) {
	// 	debugger
	// 	event.preventDefault()
	// 	let form_data = new FormData(login_form)
	// 	let jsonObject = {}
	// 	for (const [key, value] of form_data.entries()) {
	// 		jsonObject[key] = value
	// 	}
	// 	this.submitFormData(jsonObject)
	// }


	// 	login_form.addEventListener("submit", (event) => {
	// 		event.preventDefault()
	// 		let form_data = new FormData(login_form)
	// 		let jsonObject = {}
	// 		for (const [key, value] of form_data.entries()) {
	// 			jsonObject[key] = value
	// 		}
	// 		this.submitFormData(jsonObject)
	// 	})
	// }	