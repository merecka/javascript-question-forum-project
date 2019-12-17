class Users {
	constructor() {
		this.users = []
		this.adapter = new UsersAdapter()
		// this.bindEventListeners()
		this.fetchAndLoadUsers()
	}

	fetchAndLoadUsers() {
		this.adapter.getUsers()
		.then(users => {
			users["data"].forEach(user => this.users.push(user))
		})
		.then(() => { 
			this.render()
		})
	}

	render() {
			const notesContainer = document.getElementById('welcome-message')
			notesContainer.innerHTML = 'Put a welcome message here'
	}
}