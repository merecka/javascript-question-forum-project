class PrimaryComment {
	constructor(primarycommentJSON) {
		this.id = primarycommentJSON.id
		this.user_id = primarycommentJSON.user_id
		this.comment = primarycommentJSON.comment
		this.created_at = primarycommentJSON.created_at
		this.updated_at = primarycommentJSON.updated_at
	}
}