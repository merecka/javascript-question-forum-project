class SecondaryComments {
	constructor(users) {
		this.users = users
		this.secondarycommentsUrl = "http://localhost:3000/secondary_comments"
		this.secondary_comments = []
		this.adapter = new SecondaryCommentsAdapter()
		this.BindingAndEventListeners()
		// this.createNewQuestionButton()
		this.fetchAndLoadSecondaryComments()
	}

	BindingAndEventListeners() {
		this.primaryquestionsContainer = document.getElementById('primary-questions')
		this.newQuestionBody = document.getElementById('new-question-body')
		this.newQuestionFormDiv = document.getElementById('new-question-form-div')
		// this.newQuestionForm = addEventListener('submit', this.renderNewQuestionForm.bind(this)) // Binds this to the PrimaryComments class instance and not the event
		this.welcomeMessageContainer = document.getElementById('welcome-message')
		this.primary_comment_divs = document.querySelectorAll(".prim-comment")
	}

	createNewQuestionButton() {
		const new_prime_comment_button = document.createElement('button')
		new_prime_comment_button.id = "new-question-button"
		new_prime_comment_button.innerText = "Ask a New Question"
		this.newQuestionFormDiv.append(new_prime_comment_button)
		new_prime_comment_button.addEventListener("click", this.renderNewQuestionForm.bind(this))
	}

	fetchAndLoadSecondaryComments() { // Fetches Secondary Comments from the API
		this.adapter.getSecondaryComments()
		.then(secondary_comments => {
			// debugger
			// Add's fetched Secondary Comments to secondary_comments array
			secondary_comments["data"].forEach(comment => this.secondary_comments.push(new SecondaryComment(comment["attributes"]))) 
		})
		.then(() => {
			this.renderSecondaryComments()
		})
	}

	// Renders the fetched Secondary Comments to the DOM
	renderSecondaryComments() { 
		// this.primaryquestionsContainer.innerHTML = ""
		this.secondary_comments.forEach((secondary_comment) => {
			const secondary_comment_div = document.createElement('div')
			secondary_comment_div.className = "sec-comment"
			secondary_comment_div.id = `sec-comment-${secondary_comment.id}`
			secondary_comment_div.setAttribute("data-id", secondary_comment.id)

			// Appends the User name to the Secondary Comment
			const name_element = document.createElement('h5')
			this.users.forEach((user) => {
			if (user.attributes.id === secondary_comment.user_id)
				name_element.innerText = user.attributes.name // Sets User name to Secondary comments they've created
			})
			secondary_comment_div.append(name_element)

			// Appends the Secondary Comments to the DOM
			const comment_para = document.createElement('p')
			comment_para.innerText = secondary_comment.comment
			secondary_comment_div.append(comment_para)	


			// Appends the Secondary Comments to the Primary Commments they are associated with.
			this.primary_comment_divs.forEach((prime_comment) => {
				if (prime_comment.dataset.id === secondary_comment.primary_comment_id.toString()) {
					prime_comment.append(secondary_comment_div) // Appends Secondary comments to Primary comment div
				}
			})	
		})
	}

	// renderNewQuestionForm() {
	// 	const new_prime_comment_button = document.getElementById('new-question-button')
	// 	new_prime_comment_button.parentNode.removeChild(new_prime_comment_button) // Removes 'Ask a New Question' button after it is clicked
	// 	const question_form = document.createElement('form') // Create New Form Element
	// 	question_form.id = "new-question-form"
	// 	question_form.setAttribute("action", "") // Setting Action Attribute on Form
	// 	question_form.setAttribute("method", "post") // Setting Method Attribute on Form
	// 	this.newQuestionFormDiv.appendChild(question_form)

	// 	const heading = document.createElement('h2') // Heading of Form
	// 	heading.innerHTML = "New Question Form"
	// 	question_form.appendChild(heading)

	// 	const line = document.createElement('hr') // Giving Horizontal Row After Heading
	// 	question_form.appendChild(line)

	// 	const linebreak = document.createElement('br')
	// 	question_form.appendChild(linebreak)

	// 	const messagelabel = document.createElement('label'); // Append Textarea
	// 	messagelabel.innerHTML = "Your Question : ";
	// 	question_form.appendChild(messagelabel);

	// 	const textarea_element = document.createElement('textarea');
	// 	textarea_element.setAttribute("name", "comment");
	// 	question_form.appendChild(textarea_element);

	// 	const current_user_id = document.createElement('input') // Appends the current User's ID to the form
	// 	current_user_id.setAttribute("type", "hidden")
	// 	current_user_id.setAttribute("name", "user_id")
	// 	current_user_id.setAttribute("value", User.the_current_user.id)
	// 	question_form.appendChild(current_user_id)

	// 	const messagebreak = document.createElement('br');
	// 	question_form.appendChild(messagebreak);

	// 	const submitelement = document.createElement('input'); // Append Submit Button
	// 	submitelement.setAttribute("type", "submit");
	// 	submitelement.setAttribute("name", "dsubmit");
	// 	submitelement.setAttribute("value", "Submit Question");
	// 	question_form.appendChild(submitelement);

	// 	question_form.addEventListener("submit", (event) => {
	// 		event.preventDefault()
	// 		let form_data = new FormData(question_form)
	// 		let jsonObject = {}
	// 		for (const [key, value] of form_data.entries()) {
	// 			jsonObject[key] = value
	// 		}
	// 		question_form.parentNode.removeChild(question_form) // Removes New Question form after it is clicked
	// 		this.adapter.createPrimaryComment(jsonObject)
	// 	})
	// }
}

	