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
			new SecondaryComments()
		})
	}
}