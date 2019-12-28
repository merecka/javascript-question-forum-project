class PrimaryComments {
	constructor(users) {
		this.users = users
		this.primarycommentsUrl = "http://localhost:3000/primary_comments"
		this.primary_comments = []
		this.secondary_comments = []
		this.adapter = new PrimaryCommentsAdapter()
		this.sec_com_adapter = new SecondaryCommentsAdapter()
		this.BindingAndEventListeners()
		this.createNewQuestionButton()
		this.fetchAndLoadPrimaryComments()
	}

	BindingAndEventListeners() {
		this.primaryquestionsContainer = document.getElementById('primary-questions')
		this.newQuestionBody = document.getElementById('new-question-body')
		this.newQuestionFormDiv = document.getElementById('new-question-form-div')
		this.welcomeMessageContainer = document.getElementById('welcome-message')
	}

	// Adds a 'Ask a New Question' button to the DOM
	createNewQuestionButton() {
		this.newQuestionFormDiv.innerHTML = ""
		const new_prime_comment_button = document.createElement('button')
		new_prime_comment_button.id = "new-question-button"
		new_prime_comment_button.className = "btn btn-primary"
		new_prime_comment_button.innerText = "Ask a New Question"
		const linebreak = document.createElement('br')
		new_prime_comment_button.appendChild(linebreak)
		this.newQuestionFormDiv.append(new_prime_comment_button)
		new_prime_comment_button.addEventListener("click", this.adapter.renderNewQuestionForm.bind(this.adapter))
	}

	// Fetches the Primary Comments from the API
	fetchAndLoadPrimaryComments() {
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
		let question_counter = 1
		this.primary_comments.forEach((primary_comment) => {
			const primary_comment_div = document.createElement('div') // Creates div for each Primary Comment
			primary_comment_div.className = "prim-comment"
			primary_comment_div.id = `prim-comment-${primary_comment.id}`
			primary_comment_div.setAttribute("data-id", primary_comment.id)
			primary_comment_div.setAttribute("data-user-id", primary_comment.user_id)

			// Appends the Question Number to the Primary Comment
			const question_number = document.createElement('h3')
			question_number.innerHTML = `Question #${primary_comment.id}`
			primary_comment_div.append(question_number)
			question_counter++

			// Appends the User's name to the Primary Comment
			const name_element = document.createElement('h4')
			let prime_comment_user = this.users.find((user) => {
			    return user["attributes"].id === primary_comment.user_id
			})
			name_element.innerHTML = `Posted by:  ${prime_comment_user["attributes"].name}`
			primary_comment_div.append(name_element) // Append name to the div

			// Appends Posted date to the Primary Comment
			let created_date = new Date(`${primary_comment.created_at}`)
			const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let formatted_date = months[created_date.getMonth()] + " " + created_date.getDate() + ", " + created_date.getFullYear() + " at " + created_date.getHours() + ":" + created_date.getMinutes()
			let posted_date = document.createElement('p')
			posted_date.innerHTML = `Posted on:  ${formatted_date}`
			primary_comment_div.append(posted_date)

			// Appends the Comment to the Primary Comment
			let comment_para = document.createElement('p')
			comment_para.innerText = `Q: ${primary_comment.comment}`
			primary_comment_div.append(comment_para) // Append comment to the div

			this.renderReplyButton(primary_comment, primary_comment_div)
			this.primaryquestionsContainer.append(primary_comment_div)
		})
		new SecondaryComments(this.users)
	}

	// Creates and appends a Reply button to each individual Primary Comment
	renderReplyButton(primary_comment, primary_comment_div) {
		const reply_button = document.createElement('button') // Add reply button to Primary Comments
		reply_button.id = "prime-comment-reply-button"
		reply_button.setAttribute("data-id", primary_comment.id)
		reply_button.innerText = "Reply"
		reply_button.className = "btn btn-primary"
		primary_comment_div.append(reply_button)
		reply_button.addEventListener("click", () =>  {
			this.sec_com_adapter.secondaryCommentForm(primary_comment.id, primary_comment_div, reply_button)
		})
		
	}
}

	