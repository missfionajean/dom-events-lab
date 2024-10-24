/*------------------- Cached Elements -------------------*/

const buttons = document.querySelectorAll(".button");

const calculator = document.querySelector("#calculator");

const display = document.querySelector(".display");

/*---------------------- Variables ----------------------*/

let operand1 = null;
let operand2 = null;
let operator = null;
let product = null;

/*---------------------- Functions ----------------------*/

// logs content of clicked element to console (unseen by user)
const logInnerText = (event) => {
	console.log(event.target.innerText);
};

// adds the clicked number to the display (to be captured later)
const addToDisplay = (event) => {
	if (
		event.target.classList.contains("number") &&
		display.innerText.length < 17
	) {
		display.innerText += event.target.innerText;
	}
};

// clears the display without changing variables
const clearDisplay = () => {
	display.innerText = null;
};

// resets the calculator when the "C" button is pressed
const clearEquation = (event) => {
	if (event.target.id === "clear") {
		clearDisplay();
		operand1 = null;
		operand2 = null;
		operator = null;
		product = null;
	}
};

// stores the first operand in a variable and clears the screen
const establishOperation = (event) => {
	if (event.target.classList.contains("operator") && operator === null) {
		// needs to be converted to number type to do math with it
		operand1 = Number(display.innerText);
		operator = event.target.innerText;
        product = null
		clearDisplay();
	}
};

const executeOperation = (event) => {
	if (event.target.id === "equals" && product === null && operand1) {
		// needs to be converted to number type to do math with it
		operand2 = Number(display.innerText);
        // needed breaks to work, otherwise always did final case
		switch (operator) {
			case "/":
				product = operand1 / operand2;
                break;
			case "*":
				product = operand1 * operand2;
                break;
			case "-":
				product = operand1 - operand2;
                break;
			case "+":
				product = operand1 + operand2;
                break;
		}
		display.innerText = product;
        operand1 = product
        operand2 = null
        operator = null
	}
};

// under here will go a function to add further operands to a product and continue the equation

/*---------------------- Listeners ----------------------*/

/* ~MORE EFFICIENT VERSION BELOW~
// this requires a for loop because you're accessing a series of elements that belong to a class, rather than a single one (a single one CAN include its children, as below)
buttons.forEach((button) => {
	button.addEventListener("click", logInnerText);
});
*/

// this lets us add listeners to the whole thing, but you have you make sure you don't give functionality to html elements like <div class="row">, because then they can click between the buttons
calculator.addEventListener("click", addToDisplay);

// funtions for different calculations can be stored abov the #calculator listener, but all of the callbacks will need to be inside it

// listener for clear equation (might want to combine these later)
calculator.addEventListener("click", clearEquation);

// listener to log first half of equation
calculator.addEventListener("click", establishOperation);

// listener for second half of equation
calculator.addEventListener("click", executeOperation);
