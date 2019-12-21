class PrimaryCommentsAdapter {
	constructor(value) {
		this.primarycommentsUrl = "http://localhost:3000/primary_comments"
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
			new PrimaryComments()
		})
	}
}