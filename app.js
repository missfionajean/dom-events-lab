/*------------------- Cached Elements -------------------*/

const buttons = document.querySelectorAll(".button");

const calculator = document.querySelector("#calculator");

/*---------------------- Variables ----------------------*/

/*---------------------- Functions ----------------------*/

const logInnerText = (event) => {
	console.log(event.target.innerText);
};

/* ~more efficient version below~
// this requires a for loop because you're accessing a series of elements that belong to a class, rather than a single one (a single one CAN include its children, as below)
buttons.forEach((button) => {
	button.addEventListener("click", logInnerText);
});
*/

// this lets us add listeners to the whole thing, but you have you make sure you don't give functionality to html elements like <div class="row">, because then they can click between the buttons
calculator.addEventListener("click", logInnerText);
