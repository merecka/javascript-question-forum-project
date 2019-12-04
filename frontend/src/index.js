const BASE_URL = "http://localhost:3000"
const PRIMARY_COMMENTS_URL = `${BASE_URL}/primary_comments`
// const POKEMONS_URL = `${BASE_URL}/pokemons`

function createPrimaryComment(comment) {
	const primary_comments_main = document.getElementById("questions")
}

document.addEventListener('DOMContentLoaded', function() {   
   fetch(PRIMARY_COMMENTS_URL)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(primary_comments) {
	  	createTrainers(trainers)
	  })
	  .catch(function(error) {
	    alert("There was an error fetching the Primary Comments!");
	    console.log(error)
	  }) 

})


function createPrimaryComments(primary_comments) {
	console.log(primar_comments)
	const primary_comments_main = document.getElementById("questions")
	primary_comments.forEach((primary_comment) => {
		const primary_comment_div = document.createElement('div')
		primary_comment_div.className = "prim comment"
		primary_comment_div.setAttribute("data-id", primary_comment.id)
		let comment_para = document.createElement('p')
		comment_para.innerText = primary_comment.comment
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