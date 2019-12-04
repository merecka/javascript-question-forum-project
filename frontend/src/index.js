const BASE_URL = "http://localhost:3000"
const PRIMARY_COMMENTS_URL = `${BASE_URL}/primary_comments`
const SECONDARY_COMMENTS_URL = `${BASE_URL}/secondary_comments`

function createPrimaryComments(primary_comments) {
	console.log(primary_comments)
	const primary_comments_main = document.getElementById("questions")
	primary_comments.forEach((primary_comment) => {
		const primary_comment_div = document.createElement('div')
		primary_comment_div.className = "prim-comment"
		primary_comment_div.id = primary_comment.id
		primary_comment_div.setAttribute("data-id", primary_comment.id)
		let comment_para = document.createElement('p')
		comment_para.innerText = primary_comment.comment
		primary_comment_div.append(comment_para)
		primary_comments_main.append(primary_comment_div)
		// let add_pokemon_button = document.createElement('button')
		// add_pokemon_button.setAttribute("data-trainer-id", trainer.id)
		// add_pokemon_button.innerText = "Add Pokemon"
		// let ul = generatePokemonList(trainer.pokemons)
		// trainer_div.append(trainer_para, add_pokemon_button, ul)
		// trainers_main.append(trainer_div)
		// add_pokemon_button.addEventListener("click", function() {
		// 	fetch(POKEMONS_URL, {
		// 		method: "POST",
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({trainer_id: trainer.id})
		// 		})
		// 	.then(function(response) {
		// 		return response.json()
		// 	})
		// 	.then(function(pokemon) {
		// 		createPokemon(pokemon, ul)
		// 	})
		// })
	})
}

function createSecondaryComments(secondary_comments) {
	const primary_comment_divs = document.querySelectorAll(".prim-comment")
	secondary_comments.forEach((secondary_comment) => {
		// const primary_comment_div = document.querySelector("div #`${secondary_comment.primary_comment.id}`")
		const secondary_comment_div = document.createElement('div')
		secondary_comment_div.className = "sec comment"
		secondary_comment_div.setAttribute("data-id", secondary_comment.id)
		let comment_para = document.createElement('p')
		comment_para.innerText = secondary_comment.comment
		secondary_comment_div.append(comment_para)
		primary_comment_divs.forEach((prime_comment) => {
			if (prime_comment.id === secondary_comment.primary_comment_id.toString()) {
				prime_comment.append(secondary_comment_div)
				console.log(prime_comment)
			}
		})
	})
}

document.addEventListener('DOMContentLoaded', function() {   
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
})


