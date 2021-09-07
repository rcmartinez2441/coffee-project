"use strict"

//Refactored 09/05/21
function renderCoffee(currentCoffee) {
	let coffeeSubContainer = document.createElement('div');
	coffeeSubContainer.setAttribute('class', 'buttonColor col p-0 btn btn-outline-info');

	let perCoffeeSubRow = document.createElement('div');
	perCoffeeSubRow.setAttribute('class', 'row row-cols-1 mb-1' );

	// Stuff for coffee name
	let coffeeName = document.createElement('div');
	coffeeName.setAttribute('class', 'col p-0 text-center justify-content-center');
	coffeeName.style.fontSize = '1.5em';
	coffeeName.innerHTML = currentCoffee.name;

	// Stuff for coffee roast
	let coffeeRoast = document.createElement('div');
	coffeeRoast.setAttribute('class', 'col pl-1 pr-0 text-muted d-inline-flex justify-content-center');
	coffeeRoast.innerHTML = currentCoffee.roast;

	coffeeSubContainer.appendChild(perCoffeeSubRow)
	perCoffeeSubRow.appendChild(coffeeName);
	perCoffeeSubRow.appendChild(coffeeRoast);

	return coffeeSubContainer;
}

function renderCoffees(coffeeArray) {
	let coffeeContainer = document.getElementById('coffee-container');
	coffeeContainer.innerHTML = '';
	for (let i = coffeeArray.length - 1; i >= 0; i--) {
		coffeeContainer.appendChild(renderCoffee(coffeeArray[i]));
	}

	return coffeeContainer;
}


function updateCoffees(e) {
	e.preventDefault(); // don't submit the form, we just want to update the data
	var selectedRoast = roastSelection.value;
	var filteredCoffees = [];
	coffees.forEach(function (coffee) {
		if (coffee.roast === selectedRoast) {
			filteredCoffees.push(coffee);
		}
	});
	//Doesnt know what is on the current coffee container
	console.log(filteredCoffees);
	renderCoffees(filteredCoffees);
}

function coffeeSearchBar() {
	let formContainer = document.getElementById(`form-container`);

	let newNode = document.createElement('input');
	newNode.setAttribute('type', 'text');
	newNode.setAttribute('id', 'searchCoffee');
	newNode.setAttribute('class', 'col-12 m-1 my-1 mx-1 p-1')

	//For label
	let newNodeLabel = document.createElement('label')
	newNodeLabel.setAttribute('for', 'searchCoffee');
	newNodeLabel.setAttribute('class', 'pt-1 pl-1 ')
	newNodeLabel.innerHTML = `Coffee Name`

	formContainer.insertBefore(newNode, submitButton);
	formContainer.insertBefore(newNodeLabel, newNode);
}

//Refactored to allow real time filtering of coffee name on input and roast selection on "change"
function filterCoffee() {
	let input = searchCoffee.value.toUpperCase();
	let i, coffeeName, arrayContainer, filterCoffees;
	filterCoffees = [];
	arrayContainer = document.getElementById('coffee-container');

	for (i = 0; i < coffees.length; i++) {
		coffeeName = coffees[i].name;
		if (coffeeName.toUpperCase().indexOf(input) > -1 && (roastSelection.value == coffees[i].roast || roastSelection.value == "-")) {
			filterCoffees.push(coffees[i]);
		}
		if (filterCoffees.length === 0){
			filterCoffees.push({
				name: "No Coffees Found",
				roast: ""
			})
		}
		console.log(filterCoffees);
	}
	renderCoffees(filterCoffees);
}

function formGenesis() {
	let formContainer = document.getElementById('form-holder-div-thinger-mabobber');

	let oldForm = document.getElementById('first-form')
	let formClone = oldForm.cloneNode(true);

	let coffeeHeader = document.createElement('h2');
	coffeeHeader.innerHTML = 'Add a Coffee';
	coffeeHeader.setAttribute('class', 'col-12 d-flex justify-content-center m-3');
	formContainer.appendChild(coffeeHeader)
	formContainer.appendChild(formClone);
	console.log(formClone);

	//To change Ids of second Form
	let labelCollection = document.getElementsByTagName('label');
	labelCollection[2].removeAttribute('for');
	labelCollection[2].setAttribute('for', 'roastAmended');
	labelCollection[3].removeAttribute('for');
	labelCollection[3].setAttribute('for', 'coffeeAmended');

	//To Change IDs of Second Select Element
	let selectCollection = document.getElementsByTagName('select');
	console.log(selectCollection);
	selectCollection[1].removeAttribute('id');
	selectCollection[1].setAttribute('id', 'roastAmended');


	let inputCollection = document.getElementsByTagName('input');

	//To Change 2nd Search Bar ID
	inputCollection[2].removeAttribute('id');
	inputCollection[2].setAttribute('id', 'coffeeAmended')

	//TO Change second Submit Button ID
	inputCollection[3].removeAttribute('id');
	inputCollection[3].setAttribute('id', 'submitAmended')

}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
	{id: 1, name: 'Light City', roast: 'Light'},
	{id: 2, name: 'Half City', roast: 'Light'},
	{id: 3, name: 'Cinnamon', roast: 'Light'},
	{id: 4, name: 'City', roast: 'Medium'},
	{id: 5, name: 'American', roast: 'Medium'},
	{id: 6, name: 'Breakfast', roast: 'Medium'},
	{id: 7, name: 'High', roast: 'Dark'},
	{id: 8, name: 'Continental', roast: 'Dark'},
	{id: 9, name: 'New Orleans', roast: 'Dark'},
	{id: 10, name: 'European', roast: 'Dark'},
	{id: 11, name: 'Espresso', roast: 'Dark'},
	{id: 12, name: 'Viennese', roast: 'Dark'},
	{id: 13, name: 'Italian', roast: 'Dark'},
	{id: 14, name: 'French', roast: 'Dark'},
];

//Function to Add New Coffee
function addNewCoffee (e) {
	e.preventDefault();
	//Gets value (Light, Medium, Dark) from second  dropdown list
	let roastType = document.querySelector('#roastAmended').value;
	console.log(roastType);
	//Gets name of Coffee from Second 'Coffee Name' input
	let coffeeName = document.querySelector('#coffeeAmended').value;
	console.log(coffeeName);

	//Creates an Object that will have the new coffee's ID #, Name and Roast like how the 'coffee's array is formatted
	let newCoffeeObject = {};
	newCoffeeObject.id = coffees[coffees.length-1].id + 1;
	newCoffeeObject.name = coffeeName;
	newCoffeeObject.roast = roastType;
	console.log(newCoffeeObject);

	//Adding Coffee Object to Coffees Array then Calls Render Coffee to update the list of Coffees being shown in Wbe browser (not perfect though)
	coffees.push(newCoffeeObject);
	renderCoffee(coffees);
	console.log(coffees);
}

// Global Variables and Function Calls
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

//This will call function when page loads
renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

//***************************************************
//Changing Button Color Based on Mouse Position X,Y
let box = document.getElementById('body');
box.addEventListener('mousemove', runEvent);

function runEvent(e) {
	let submit = document.getElementById('submit');
	submit.style.backgroundColor = "rgb(0," + e.offsetX + "," + e.offsetY + ")";
	let submitAmended = document.getElementById('submitAmended');
	submitAmended.style.backgroundColor = "rgb(" + e.offsetX + "," + e.offsetY + ",15)";
}
//***************************************************

// What is preventDefault doing with form submit button? - Google this
coffeeSearchBar();

//For filtering Coffee Selection List
let searchCoffee = document.querySelector('#searchCoffee');
searchCoffee.addEventListener('input', filterCoffee);
roastSelection.addEventListener("change", filterCoffee)

formGenesis();

//Event Listener to begin adding new Coffee
let addCoffeeSubmitButton = document.querySelector('#submitAmended');
addCoffeeSubmitButton.addEventListener('click', addNewCoffee);

