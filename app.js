/*------------------- Cached Elements -------------------*/

const buttons = document.querySelectorAll(".button");

const calculator = document.querySelector("#calculator");

const display = document.querySelector(".display");

/*---------------------- Variables ----------------------*/

let operand1 = null;
let operand2 = null;
let operator = null;
let product = null;
let cleared = true;
let showingProduct = false;

/*---------------------- Functions ----------------------*/

// logs content of clicked element to console (for testing only)
const logInnerText = (event) => {
	console.log(event.target.innerText);
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
		cleared = true;
		showingProduct = false;
	}
};

// adds the clicked number to the display (to be captured later)
const addToDisplay = (event) => {
	// remember the target has to be specified first if bubbling!
	if (event.target.classList.contains("number")) {
		if (cleared) {
			cleared = false;
		}
		if (display.innerText.length < 17 && showingProduct === false) {
			// appends clicked number to displayed number
			display.innerText += event.target.innerText;
		}
	}
};

// stores the first operand in a variable and clears the screen
const establishOperation = (event) => {
	if (event.target.classList.contains("operator")) {
		if (cleared === false && operator === null) {
			// needs to be number type to do math with it
			operand1 = Number(display.innerText);
			operator = event.target.innerText;
			product = null;
			showingProduct = false;
			clearDisplay();
		}
	}
};

const executeOperation = (event) => {
	// this needs to go first, since you're using event bubbling
	if (event.target.id === "equals") {
		// needs to be converted to number type to do math with it
		operand2 = Number(display.innerText);
		// returns error if dividing by zero
		if (operator === "/" && operand2 === 0) {
			display.innerText = "Error: Div By Zero";
			// else if prevents next block from executing if errored
		} else if (product === null && operand1) {
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
			showingProduct = true;
			operand2 = null;
			operator = null;
		}
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
