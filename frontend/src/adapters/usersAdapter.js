class UsersAdapter {
	constructor() {
		this.usersUrl = "http://localhost:3000/users"
	}

	getUsers() {
		return fetch(this.usersUrl).then(res => res.json())
	}
}