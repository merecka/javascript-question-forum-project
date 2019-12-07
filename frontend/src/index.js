const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const PRIMARY_COMMENTS_URL = `${BASE_URL}/primary_comments`
const SECONDARY_COMMENTS_URL = `${BASE_URL}/secondary_comments`
let users_obj = {}

function createUsersObj(users) { // Saves User data from Fetch into variable
	users_obj = users
}


function createPrimaryComments(primary_comments) {
	const primary_comments_main = document.getElementById("questions")
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
			if (user.attributes.id === primary_comment["attributes"]["user_id"])
				name_element.innerText = user.attributes.name // Sets User name to Primary comments they've created
		})
		primary_comment_div.append(name_element)
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


function createNewCommentButton() {
	let new_prim_comment_button = document.createElement('button')
	new_prim_comment_button.innerText = "Ask a New Question"
}

function newQuestionForm() {
	const question_form_div = document.getElementById("new_question")
	const question_form = document.createElement('form') // Create New Form Element
	question_form.setAttribute("action", "") // Setting Action Attribute on Form
	question_form.setAttribute("method", "post") // Setting Method Attribute on Form
	question_form_div.appendChild(question_form)

	const heading = document.createElement('h2') // Heading of Form
	heading.innerHTML = "New Question Form"
	question_form.appendChild(heading)

	const line = document.createElement('hr') // Giving Horizontal Row After Heading
	question_form.appendChild(line)

	const linebreak = document.createElement('br')
	question_form.appendChild(linebreak)

	const namelabel = document.createElement('label') // Create Label for Name Field
	namelabel.innerHTML = "Your Name : " // Set Field Labels
	question_form.appendChild(namelabel)

	const inputelement = document.createElement('input') // Create Input Field for Name
	inputelement.setAttribute("type", "text")
	inputelement.setAttribute("name", "dname")
	question_form.appendChild(inputelement)

	question_form.appendChild(linebreak)

	const email_label = document.createElement('label') // Create Label for E-mail Field
	email_label.innerHTML = "Your Email : "
	question_form.appendChild(email_label)

	const email_element = document.createElement('input'); // Create Input Field for E-mail
	email_element.setAttribute("type", "text");
	email_element.setAttribute("name", "demail");
	question_form.appendChild(email_element);

	const email_break = document.createElement('br');
	question_form.appendChild(email_break);

	const messagelabel = document.createElement('label'); // Append Textarea
	messagelabel.innerHTML = "Your Comment : ";
	question_form.appendChild(messagelabel);

	const textarea_element = document.createElement('textarea');
	textarea_element.setAttribute("name", "dmessage");
	question_form.appendChild(textarea_element);

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
		console.log(formData)

		// fetch(PRIMARY_COMMENTS_URL, {
		// 	method: "POST",
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({trainer_id: trainer.id})
		// 	})
		// .then(function(response) {
		// 	return response.json()
		// })
		// .then(function(pokemon) {
		// 	createPokemon(pokemon, ul)
		// })
	})
}	


document.addEventListener('DOMContentLoaded', function() {
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
	  })
	  .catch(function(error) {
	    alert("There was an error fetching the Primary Comments!");
	    console.log(error)
	  }) 

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

	  newQuestionForm()
})


