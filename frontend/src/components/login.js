class Login {
	constructor() {
		this.BindingAndEventListeners()
		this.renderLoginForm()

	}

	BindingAndEventListeners() {
		this.login_form_div = document.getElementById('login-form-div')
	}

	renderLoginForm() { // You don't use the "function" keyword inside Classes
		const login_form = document.createElement('form') // Create New Form Element
		login_form.id = "login-form"
		login_form.setAttribute("action", "") // Setting Action Attribute on Form
		login_form.setAttribute("method", "post") // Setting Method Attribute on Form
		this.login_form_div.appendChild(login_form)
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

		login_form.addEventListener("submit", (event) => {
			event.preventDefault()
			let form_data = new FormData(login_form)
			let jsonObject = {}
			for (const [key, value] of form_data.entries()) {
				jsonObject[key] = value
			}
			new LoginAdapter(jsonObject) // Send form data to LoginAdapter for fetching to API
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