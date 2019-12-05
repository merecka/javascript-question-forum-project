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

	const linebreak = document.createElement('br')
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

}