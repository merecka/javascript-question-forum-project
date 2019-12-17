const BASE_URL = "http://localhost:3000"
const LOGIN_URL = `${BASE_URL}/login`
const USERS_URL = `${BASE_URL}/users`
const PRIMARY_COMMENTS_URL = `${BASE_URL}/primary_comments`
const SECONDARY_COMMENTS_URL = `${BASE_URL}/secondary_comments`
const main_div = document.getElementById("main")
let current_user
let users_obj = {}


function createLogInForm() {
	const login_form_div = document.getElementById("login")
	const login_form = document.createElement('form') // Create New Form Element
	login_form.setAttribute("action", "") // Setting Action Attribute on Form
	login_form.setAttribute("method", "post") // Setting Method Attribute on Form
	login_form_div.appendChild(login_form)

	const heading = document.createElement('h2') // Heading of Form
	heading.innerHTML = "Login Form"
	login_form.appendChild(heading)

	const line = document.createElement('hr') // Giving Horizontal Row After Heading
	login_form.appendChild(line)

	const linebreak = document.createElement('br')
	login_form.appendChild(linebreak)

	const namelabel = document.createElement('label') // Create Label for Name Field
	namelabel.innerHTML = "Your Name : " // Set Field Labels
	login_form.appendChild(namelabel)

	const name_element = document.createElement('input') // Create Input Field for Name
	name_element.setAttribute("type", "text")
	name_element.setAttribute("name", "name")
	login_form.appendChild(name_element)

	login_form.appendChild(linebreak)

	const password_label = document.createElement('label') // Create Label for Password Field
	password_label.innerHTML = "Your Password : "
	login_form.appendChild(password_label)

	const password_element = document.createElement('input') // Create Input Field for Password
	password_element.setAttribute("type", "text")
	password_element.setAttribute("name", "password")
	login_form.appendChild(password_element)

	const submitelement = document.createElement('input'); // Append Submit Button
	submitelement.setAttribute("type", "submit");
	submitelement.setAttribute("name", "submit");
	submitelement.setAttribute("value", "Login");
	login_form.appendChild(submitelement);

	login_form.addEventListener("submit", function(event) {
		event.preventDefault()
		let form_data = new FormData(login_form)
		let jsonObject = {}
		for (const [key, value] of form_data.entries()) {
			jsonObject[key] = value
		}

		fetch(LOGIN_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonObject)
			})
		.then(function(response) {
			return response.json()
		})
		.then(function(user) {
			current_user = user
    		login_form_div.parentNode.removeChild(login_form_div)
			renderQuestionsPage()
		})
		.catch(function(error) {
	    	alert("There was an error logging in!  Please try again.");
	    	console.log(error.message)
	 	 })
	})
}

function renderQuestionsPage() {  // Renders the index page with all of the Primary & Secondary questions/comments
	fetch(USERS_URL) // Fetch User data from API
		.then(function(response) {
		  return response.json();
		})
		.then(function(users) {
			createUsersObj(users) // Saves the Users to variable outside of fetch
		})
		.catch(function(error) {
		    alert("There was an error fetching the Users!");
		    console.log(error)
		}) 

	fetch(PRIMARY_COMMENTS_URL)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(primary_comments) {
	  	createPrimaryComments(primary_comments)
	  	fetchSecondaryComments()
	  })
	  .catch(function(error) {
	    alert("There was an error fetching the Primary Comments!");
	    console.log(error)
	  })  
}


function createUsersObj(users) { // Saves User data from Fetch into variable
	users_obj = users
}


function createPrimaryComments(primary_comments) {  // Renders Primary Comments to the index page
	createNewQuestionButton()
	const primary_comments_main = document.createElement('div')
	primary_comments_main.id = "questions-list"
	main_div.append(primary_comments_main)	
	primary_comments["data"].forEach((primary_comment) => {
		const primary_comment_div = document.createElement('div')
		primary_comment_div.className = "prim-comment"
		primary_comment_div.id = `prim-comment-${primary_comment["attributes"]["id"]}`
		primary_comment_div.setAttribute("data-id", primary_comment["attributes"]["id"])
		let comment_para = document.createElement('p')
		comment_para.innerText = primary_comment["attributes"]["comment"]
		primary_comment_div.append(comment_para)
		primary_comments_main.append(primary_comment_div)
		const name_element = document.createElement('h3')
		users_obj["data"].forEach((user) => {
			if (user.attributes.id === primary_comment["attributes"]["user_id"]) {
				name_element.innerText = user.attributes.name // Sets User name to Primary comments they've created
			}
		})
		primary_comment_div.append(name_element)
		primary_comment_id = primary_comment["attributes"]["id"]
		const reply_button = document.createElement('button') // Add reply button to Primary Comments
		reply_button.id = "prime-comment-reply-button"
		reply_button.setAttribute("data-id", primary_comment["attributes"]["id"])
		reply_button.innerText = "Reply"
		reply_button.addEventListener("click", function() {
			secondaryCommentForm(`${this.dataset.id}`, primary_comment_div)
		})
		primary_comment_div.append(reply_button)
	})
}


function createNewQuestionButton() {
	const new_prime_comment_div = document.createElement('div')
	new_prime_comment_div.id = "new-primary-comment-div"
	main_div.append(new_prime_comment_div)
	let user_greeting = document.createElement('h3')
	user_greeting.innerText = `Hi ${current_user.name}, welcome to the forum!`
	new_prime_comment_div.append(user_greeting)
	const new_prime_comment_button = document.createElement('button')
	new_prime_comment_button.id = "new-question-button"
	new_prime_comment_button.innerText = "Ask a New Question"
	new_prime_comment_div.append(new_prime_comment_button)
	new_prime_comment_button.addEventListener("click", function() {
	newPrimaryQuestionForm(new_prime_comment_div)
	})
}

function fetchSecondaryComments() { // Added function to synchronize the loading due to lag with asynchronous loading of Primary & Secondary comments
	fetch(SECONDARY_COMMENTS_URL)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(secondary_comments) {
	  	createSecondaryComments(secondary_comments)
	  })
	  .catch(function(error) {
	    alert("There was an error fetching the Secondary Comments!");
	    console.log(error)
	  })
}

function createSecondaryComments(secondary_comments) {
	const primary_comment_divs = document.querySelectorAll(".prim-comment")
	secondary_comments["data"].forEach((secondary_comment) => {
		const secondary_comment_div = document.createElement('div')
		secondary_comment_div.className = "sec-comment"
		secondary_comment_div.id = `sec-comment-${secondary_comment["attributes"]["id"]}`
		secondary_comment_div.setAttribute("data-id", secondary_comment["attributes"]["id"])
		const comment_para = document.createElement('p')
		comment_para.innerText = secondary_comment["attributes"].comment
		secondary_comment_div.append(comment_para)
		const name_element = document.createElement('h5')
		users_obj["data"].forEach((user) => {
			if (user.attributes.id === secondary_comment["attributes"]["user_id"])
				name_element.innerText = user.attributes.name // Sets User name to Secondary comments they've created
		})
		secondary_comment_div.append(name_element)
		primary_comment_divs.forEach((prime_comment) => {
			if (prime_comment.dataset.id === secondary_comment["attributes"].primary_comment_id.toString()) {
				prime_comment.append(secondary_comment_div) // Appends Secondary comments to Primary comment div
			}
		})	
	})
}

function secondaryCommentForm(primary_comment_id, primary_comment_div) {
	const sec_comment_form_div = document.createElement('div')
	sec_comment_form_div.id = "new-sec-comment"
	primary_comment_div.appendChild(sec_comment_form_div)
	const question_form = document.createElement('form') // Create New Form Element
	question_form.setAttribute("action", "") // Setting Action Attribute on Form
	question_form.setAttribute("method", "post") // Setting Method Attribute on Form
	sec_comment_form_div.appendChild(question_form)

	const heading = document.createElement('h2') // Heading of Form
	heading.innerHTML = "New Reply"
	question_form.appendChild(heading)

	const line = document.createElement('hr') // Giving Horizontal Row After Heading
	question_form.appendChild(line)

	const linebreak = document.createElement('br')
	question_form.appendChild(linebreak)

	const messagelabel = document.createElement('label'); // Append Textarea
	messagelabel.innerHTML = "Your Reply : ";
	question_form.appendChild(messagelabel);

	const textarea_element = document.createElement('textarea');
	textarea_element.setAttribute("name", "comment");
	question_form.appendChild(textarea_element);

	const current_user_id = document.createElement('input') // Appends the current User's ID to the form
	current_user_id.setAttribute("type", "hidden")
	current_user_id.setAttribute("name", "user_id")
	current_user_id.setAttribute("value", current_user.id)
	question_form.appendChild(current_user_id)

	const prime_comment_id = document.createElement('input') // Appends the current Primary Comment's ID to the form
	prime_comment_id.setAttribute("type", "hidden")
	prime_comment_id.setAttribute("name", "primary_comment_id")
	prime_comment_id.setAttribute("value", primary_comment_id)
	question_form.appendChild(prime_comment_id)

	const messagebreak = document.createElement('br');
	question_form.appendChild(messagebreak);

	const submitelement = document.createElement('input'); // Append Submit Button
	submitelement.setAttribute("type", "submit");
	submitelement.setAttribute("name", "dsubmit");
	submitelement.setAttribute("value", "Submit Reply");
	question_form.appendChild(submitelement);

	question_form.addEventListener("submit", function(event) {
		event.preventDefault()
		let form_data = new FormData(question_form)
		let jsonObject = {}
		for (const [key, value] of form_data.entries()) {
			jsonObject[key] = value
		}

		fetch(SECONDARY_COMMENTS_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonObject)
			})
		.then(function(response) {
			return response.json()
		})
		.then(function(comment) {
			resetDOM()
			renderQuestionsPage()
			// window.location.pathname = "/Users/alexmerecka/Software-Programming/FlatIron-Labs/javascript-project-question-forum/frontend/index.html"
		})
	})

}


function newPrimaryQuestionForm(new_prim_comment_div) {
	const new_question_form_div = document.createElement('div')
	new_question_form_div.id = "new_question"
	new_prim_comment_div.appendChild(new_question_form_div)
	const question_form = document.createElement('form') // Create New Form Element
	question_form.setAttribute("action", "") // Setting Action Attribute on Form
	question_form.setAttribute("method", "post") // Setting Method Attribute on Form
	new_question_form_div.appendChild(question_form)

	const heading = document.createElement('h2') // Heading of Form
	heading.innerHTML = "New Question Form"
	question_form.appendChild(heading)

	const line = document.createElement('hr') // Giving Horizontal Row After Heading
	question_form.appendChild(line)

	const linebreak = document.createElement('br')
	question_form.appendChild(linebreak)

	const messagelabel = document.createElement('label'); // Append Textarea
	messagelabel.innerHTML = "Your Question : ";
	question_form.appendChild(messagelabel);

	const textarea_element = document.createElement('textarea');
	textarea_element.setAttribute("name", "comment");
	question_form.appendChild(textarea_element);

	const current_user_id = document.createElement('input') // Appends the current User's ID to the form
	current_user_id.setAttribute("type", "hidden")
	current_user_id.setAttribute("name", "user_id")
	current_user_id.setAttribute("value", current_user.id)
	question_form.appendChild(current_user_id)

	const messagebreak = document.createElement('br');
	question_form.appendChild(messagebreak);

	const submitelement = document.createElement('input'); // Append Submit Button
	submitelement.setAttribute("type", "submit");
	submitelement.setAttribute("name", "dsubmit");
	submitelement.setAttribute("value", "Submit Question");
	question_form.appendChild(submitelement);

	question_form.addEventListener("submit", function(event) {
		event.preventDefault()
		let form_data = new FormData(question_form)
		let jsonObject = {}
		for (const [key, value] of form_data.entries()) {
			jsonObject[key] = value
		}

		fetch(PRIMARY_COMMENTS_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonObject)
			})
		.then(function(response) {
			return response.json()
		})
		.then(function(comment) {
			resetDOM()
			renderQuestionsPage()
			// window.location.pathname = "/Users/alexmerecka/Software-Programming/FlatIron-Labs/javascript-project-question-forum/frontend/index.html"
		})
	})
}

function resetDOM() {
	const primary_comments_main = document.querySelector("#questions-list")
	const new_primary_comment_div = document.querySelector("#new-primary-comment-div")
	const sec_comment_form_div = document.querySelector("#new-sec-comment")
	const primary_comment_divs = document.querySelectorAll(".prim-comment")
	if (new_primary_comment_div) {
		new_primary_comment_div.parentNode.removeChild(new_primary_comment_div)
	}
	if (sec_comment_form_div) {
		sec_comment_form_div.parentNode.removeChild(sec_comment_form_div)
	}
	primary_comments_main.parentNode.removeChild(primary_comments_main)
	primary_comment_divs.forEach((primary_comment_div) => {
			primary_comment_div.parentNode.removeChild(primary_comment_div)
	})
}


document.addEventListener('DOMContentLoaded', function() {
	const app = new App(container)
	createLogInForm()
})


