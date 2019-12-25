class Users {

	constructor(current_user) {
		this.users = []
		this.adapter = new UsersAdapter()
		this.BindingAndEventListeners()
		this.fetchAndLoadUsers()

	}

	BindingAndEventListeners() {
		this.welcomeMessageContainer = document.getElementById('welcome-message')
	}

	fetchAndLoadUsers() {
		this.adapter.getUsers()
		.then(users => {
			users["data"].forEach(user => this.users.push(user))
		})
		.then(() => {
			this.renderWelcomeMessage()
		})
	}

	renderWelcomeMessage() {
		this.welcomeMessageContainer.innerHTML = ""
		this.welcomeMessage = document.createElement('p')
		this.welcomeMessage.innerHTML = `Welcome to the forum, ${User.the_current_user.name}!`
		this.welcomeMessageContainer.append(this.welcomeMessage)
		new PrimaryComments(this.users)
	}
}