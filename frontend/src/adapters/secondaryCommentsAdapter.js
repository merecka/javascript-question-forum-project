class SecondaryCommentsAdapter {
	constructor(value) {
		this.secondarycommentsUrl = "http://localhost:3000/secondary_comments"
	}

	getSecondaryComments() {
		return fetch(this.secondarycommentsUrl).then(res => res.json())
	}

	createSecondaryComment(jsonObject) {
		const secondary_comment = {
			user_id: jsonObject.user_id,
			primary_comment_id:  jsonObject.primary_comment_id,
			comment: jsonObject.comment
		}
		return fetch(this.secondarycommentsUrl, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(secondary_comment)
			})
		.then(response => {
			return response.json()
		})
		.then(() => {
			new Users()
		})
	}

	// Creates Reply Form for Primary Comments
	secondaryCommentForm(primary_comment_id, primary_comment_div, reply_button) {
		reply_button.parentNode.removeChild(reply_button) // Removes 'Reply' button after it is clicked and before Reply form is rendered
		const sec_comment_form_div = document.createElement('div')
		sec_comment_form_div.id = "new-sec-comment"
		primary_comment_div.appendChild(sec_comment_form_div)
		const question_form = document.createElement('form') // Create New Form Element
		question_form.setAttribute("action", "") // Setting Action Attribute on Form
		question_form.setAttribute("method", "post") // Setting Method Attribute on Form
		const form_group_div = document.createElement('div')
		form_group_div.setAttribute("class", "form-group")
		form_group_div.appendChild(question_form)		
		sec_comment_form_div.appendChild(form_group_div)

		const line = document.createElement('hr') // Giving Horizontal Row After Heading
		question_form.appendChild(line)

		const linebreak = document.createElement('br')
		question_form.appendChild(linebreak)

		const messagelabel = document.createElement('label'); // Append Textarea
		messagelabel.innerHTML = "Your Reply : ";
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

		const prime_comment_id = document.createElement('input') // Appends the current Primary Comment's ID to the form
		prime_comment_id.setAttribute("type", "hidden")
		prime_comment_id.setAttribute("name", "primary_comment_id")
		prime_comment_id.setAttribute("value", primary_comment_id)
		question_form.appendChild(prime_comment_id)

		const messagebreak = document.createElement('br');
		question_form.appendChild(messagebreak);

		const submitelement = document.createElement('input'); // Append Submit Button
		submitelement.setAttribute("type", "submit");
		submitelement.setAttribute("name", "dsubmit");
		submitelement.setAttribute("value", "Submit Reply");
		submitelement.className = "btn btn-primary"
		question_form.appendChild(submitelement);

		const cancel_form_button = document.createElement('input')
		cancel_form_button.setAttribute("type", "button");
		cancel_form_button.setAttribute("value", "Cancel")
		cancel_form_button.id = "cancel-secondary-form-button"
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
			this.createSecondaryComment(jsonObject) // Submits data to be fetched to API
		})
	}

}
