class SecondaryComment {
	constructor(secondarycommentJSON) {
		this.id = secondarycommentJSON.id
		this.primary_comment_id = secondarycommentJSON.primary_comment_id
		this.user_id = secondarycommentJSON.user_id
		this.comment = secondarycommentJSON.comment
		this.created_at = secondarycommentJSON.created_at
		this.updated_at = secondarycommentJSON.updated_at
	}
}