class User {
	constructor(userJSON) {
		this.id = userJSON.id
		this.name = userJSON.name
		this.password = userJSON.password
	}

	set current_user(user) {
		this._current_user = user
	}

	get current_user() {
		return this._current_user
	}

	static the_current_user(user) { // Sets the user object passed in the argument as the global static User
		User.the_current_user = new User(user)
	}
}