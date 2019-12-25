class PrimaryComments {
	constructor(users) {
		this.users = users
		this.primarycommentsUrl = "http://localhost:3000/primary_comments"
		this.primary_comments = []
		this.secondary_comments = []
		this.adapter = new PrimaryCommentsAdapter()
		this.BindingAndEventListeners()
		this.createNewQuestionButton()
		this.fetchAndLoadPrimaryComments()
	}

	BindingAndEventListeners() {
		this.primaryquestionsContainer = document.getElementById('primary-questions')
		this.newQuestionBody = document.getElementById('new-question-body')
		this.newQuestionFormDiv = document.getElementById('new-question-form-div')
		this.newQuestionForm = addEventListener('submit', this.renderNewQuestionForm.bind(this)) // Binds this to the PrimaryComments class instance and not the event
		this.welcomeMessageContainer = document.getElementById('welcome-message')
	}

	createNewQuestionButton() {
		this.newQuestionFormDiv.innerHTML = ""
		const new_prime_comment_button = document.createElement('button')
		new_prime_comment_button.id = "new-question-button"
		new_prime_comment_button.innerText = "Ask a New Question"
		this.newQuestionFormDiv.append(new_prime_comment_button)
		new_prime_comment_button.addEventListener("click", this.renderNewQuestionForm.bind(this))
	}

	fetchAndLoadPrimaryComments() { // Fetches Primary Comments from the API
		this.adapter.getPrimaryComments()
		.then(prime_comments => {
			// Add's fetched Primary Comments to primary_comments array
			prime_comments["data"].forEach(comment => this.primary_comments.push(new PrimaryComment(comment["attributes"]))) 
		})
		.then(() => { 
			this.renderPrimaryQuestions()
		})
	}

	// Renders the fetched Primary Comments to the DOM
	renderPrimaryQuestions() { 
		this.primaryquestionsContainer.innerHTML = ""
		this.primary_comments.forEach((primary_comment) => {
			// debugger
			const primary_comment_div = document.createElement('div') // Creates div for each Primary Comment
			primary_comment_div.className = "prim-comment"
			primary_comment_div.id = `prim-comment-${primary_comment.id}`
			primary_comment_div.setAttribute("data-id", primary_comment.id)
			primary_comment_div.setAttribute("data-user-id", primary_comment.user_id)

			const name_element = document.createElement('h3')
			let prime_comment_user = this.users.find((user) => {
			    return user["attributes"].id === primary_comment.user_id
			})
			name_element.innerHTML = prime_comment_user["attributes"].name
			primary_comment_div.append(name_element) // Append name to the div

			let comment_para = document.createElement('p')
			comment_para.innerText = primary_comment.comment
			primary_comment_div.append(comment_para) // Append comment to the div
			this.primaryquestionsContainer.append(primary_comment_div)
		})
		new SecondaryComments(this.users)
	}

	renderNewQuestionForm() {
		this.new_prime_comment_button = document.getElementById('new-question-button')
		const question_form = document.createElement('form') // Create New Form Element
		question_form.id = "new-question-form"
		question_form.setAttribute("action", "") // Setting Action Attribute on Form
		question_form.setAttribute("method", "post") // Setting Method Attribute on Form
		this.newQuestionFormDiv.appendChild(question_form)

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
		question_form.appendChild(submitelement);

		question_form.addEventListener("submit", (event) => {
			event.preventDefault()
			let form_data = new FormData(question_form)
			let jsonObject = {}
			for (const [key, value] of form_data.entries()) {
				jsonObject[key] = value
			}
			this.adapter.createPrimaryComment(jsonObject)			
			// this.new_prime_comment_button.parentNode.removeChild(this.new_prime_comment_button) // Removes 'Ask a New Question' button after it is clicked
		})
	}
}

	