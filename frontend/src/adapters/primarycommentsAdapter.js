class PrimaryCommentsAdapter {
	constructor(value) {
		this.primarycommentsUrl = "http://localhost:3000/primary_comments"
		this.BindingAndEventListeners()
	}

	BindingAndEventListeners() {
		this.newQuestionFormDiv = document.getElementById('new-question-form-div')
	}

	getPrimaryComments() {
		return fetch(this.primarycommentsUrl).then(res => res.json())
	}

	createPrimaryComment(jsonObject) {
		const primary_comment = {
			user_id: jsonObject.user_id,
			comment: jsonObject.comment
		}
		return fetch(this.primarycommentsUrl, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(primary_comment)
			})
		.then(response => {
			return response.json()
		})
		.then(() => {
			new Users()
		})
	}

	renderNewQuestionForm() {
		const new_prime_comment_button = document.getElementById('new-question-button')
		new_prime_comment_button.parentNode.removeChild(new_prime_comment_button)  // Removes 'Ask a New Question' button after it is clicked

		const question_form = document.createElement('form') // Create New Form Element
		question_form.id = "new-question-form"
		question_form.setAttribute("action", "") // Setting Action Attribute on Form
		question_form.setAttribute("method", "post") // Setting Method Attribute on Form
		const form_group_div = document.createElement('div')
		form_group_div.setAttribute("class", "form-group")
		form_group_div.appendChild(question_form)		
		this.newQuestionFormDiv.appendChild(form_group_div)

		const heading = document.createElement('h2') // Heading of Form
		heading.innerHTML = "New Question Form"
		question_form.appendChild(heading)

		const line = document.createElement('hr') // Giving Horizontal Row After Heading
		question_form.appendChild(line)

		const linebreak = document.createElement('br')
		question_form.appendChild(linebreak)

		const messagelabel = document.createElement('label'); // Append Textarea
		messagelabel.innerHTML = "Your Question : ";
		question_form.appendChild(messagelabel);

		const textarea_element = document.createElement('textarea');
		textarea_element.setAttribute("name", "comment");
		textarea_element.setAttribute("class", "form-control")
		question_form.appendChild(textarea_element);

		const current_user_id = document.createElement('input') // Appends the current User's ID to the form
		current_user_id.setAttribute("type", "hidden")
		current_user_id.setAttribute("name", "user_id")
		current_user_id.setAttribute("value", User.the_current_user.id)
		question_form.appendChild(current_user_id)

		const messagebreak = document.createElement('br');
		question_form.appendChild(messagebreak);

		const submitelement = document.createElement('input'); // Append Submit Button
		submitelement.setAttribute("type", "submit");
		submitelement.setAttribute("name", "dsubmit");
		submitelement.setAttribute("value", "Submit Question");
		submitelement.className = "btn btn-primary"
		question_form.appendChild(submitelement);

		const cancel_form_button = document.createElement('input')
		cancel_form_button.setAttribute("type", "button");
		cancel_form_button.setAttribute("value", "Cancel")
		cancel_form_button.id = "cancel-primary-form-button"
		cancel_form_button.className = "btn btn-primary"
		question_form.appendChild(cancel_form_button)
		cancel_form_button.addEventListener("click", (event) => {
			question_form.parentNode.removeChild(question_form)
			new Users()
		})
		
		
		question_form.addEventListener("submit", (event) => {
			event.preventDefault()
			let form_data = new FormData(question_form)
			let jsonObject = {}
			for (const [key, value] of form_data.entries()) {
				jsonObject[key] = value
			}
			this.createPrimaryComment(jsonObject)
		})
	}
}