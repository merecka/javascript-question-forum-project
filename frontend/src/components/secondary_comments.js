class SecondaryComments {
	constructor(users) {
		this.users = users
		this.secondarycommentsUrl = "http://localhost:3000/secondary_comments"
		this.secondary_comments = []
		this.adapter = new SecondaryCommentsAdapter()
		this.BindingAndEventListeners()
		this.fetchAndLoadSecondaryComments()
	}

	BindingAndEventListeners() {
		this.primaryquestionsContainer = document.getElementById('primary-questions')
		this.newQuestionBody = document.getElementById('new-question-body')
		this.newQuestionFormDiv = document.getElementById('new-question-form-div')
		this.welcomeMessageContainer = document.getElementById('welcome-message')
		this.primary_comment_divs = document.querySelectorAll(".prim-comment")
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

}

	