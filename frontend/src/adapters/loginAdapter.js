class LoginAdapter {  // Fetches User login information from API 

	constructor() {
		this.loginURL = "http://localhost:3000/login"
		this.signupURL = "http://localhost:3000/users"
	}

	async submitLoginFormData(jsonObject) {
		debugger
			await fetch(this.loginURL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonObject)
			})
			.then(async function(response) {
				return await response.json()
				if (res.status < 200 || res.status > 299) {
		  		throw new Error() }
			})
			.then(function(user) {
				let current_user = new User(user)
				User.the_current_user(current_user) // Set's logged in user as the global static User
				const login_form_div = document.getElementById('login-form-div')
				login_form_div.parentNode.removeChild(login_form_div) // Removes Login form from DOM after User successfully log's in
				new Users()
			})
			.catch(function(error) {
		    	alert("There was an error logging in!");
		    	console.log(error.message)
		 	})
		}

	async submitSignupFormData(jsonObject) {
			await fetch(this.signupURL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonObject)
			})
			.then(async function(response) {
				return await response.json()
				if (res.status < 200 || res.status > 299) {
		  		throw new Error() }
			})
			.then(function(user) {
				let current_user = new User(user)
				User.the_current_user(current_user) // Set's logged in user as the global static User
				const signup_form_div = document.getElementById('signup-form-div')
				signup_form_div.parentNode.removeChild(signup_form_div) // Removes Signup form from DOM after User successfully log's in
				new Users()
			})
			.catch(function(error) {
		    	alert("There was an error logging in!");
		    	console.log(error.message)
		 	})
		}
}