class PrimaryComments {
	constructor() {
		this.primary_comments = []
		this.adapter = new PrimaryCommentsAdapter()
		this.BindingAndEventListeners()
		this.fetchAndLoadPrimaryComments()
	}

	BindingAndEventListeners() {
		this.primaryquestionsContainer = document.getElementById('primary-questions')
	}

	fetchAndLoadPrimaryComments() {
		this.adapter.getPrimaryComments()
		.then(prime_comments => {
			prime_comments["data"].forEach(comment => this.primary_comments.push(new PrimaryComment(comment["attributes"])))
		})
		.then(() => { 
			this.render()
		})
	}

	render() {
		this.primaryquestionsContainer.innerHTML = this.primary_comments.map(comment => `<p>${comment.comment}</p>`)
	}
}