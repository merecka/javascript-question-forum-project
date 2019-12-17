class PrimaryCommentsAdapter {
	constructor() {
		this.primarycommentsUrl = "http://localhost:3000/primary_comments"
	}

	getPrimaryComments() {
		return fetch(this.primarycommentsUrl).then(res => res.json())
	}
}