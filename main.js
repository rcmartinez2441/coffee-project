"use strict"

function renderCoffee(currentCoffee) {
	let coffeeSubContainer = document.createElement('div');
	coffeeSubContainer.setAttribute('class', ' col-6 p-0 btn btn-outline-info');

	let perCoffeeSubRow = document.createElement('div');
	perCoffeeSubRow.setAttribute('class', 'row mb-1');

	// Stuff for coffee name
	let coffeeName = document.createElement('div');
	coffeeName.setAttribute('class', 'col-6 p-0 d-inline-flex text-nowrap justify-content-end');
	coffeeName.style.fontSize = '1.5em';
	coffeeName.innerHTML = currentCoffee.name;

	// Stuff for coffee roast
	let coffeeRoast = document.createElement('div');
	coffeeRoast.setAttribute('class', 'col-6 pl-1 pr-0 text-muted d-inline-flex justify-content-start align-items-center');
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

function filterCoffee() {
	let input = searchCoffee.value.toUpperCase();
	let i, txtValue, arrayContainer, filterCoffees;
	filterCoffees = [];
	arrayContainer = document.getElementById('coffee-container');
	console.log(arrayContainer);

	for (i = 0; i < coffees.length; i++) {
		txtValue = coffees[i].name;
		if (txtValue.toUpperCase().indexOf(input) > -1) {
			filterCoffees.push(coffees[i]);
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
var coffees = [
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

var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

//This will call function when page loads
renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

//Changing Button Color Based on Mouse Position X,Y
let box = document.getElementById('body');
box.addEventListener('mousemove', runEvent);

function runEvent(e) {
	let submit = document.getElementById('submit');
	submit.style.backgroundColor = "rgb(100," + e.offsetX + "," + e.offsetY + ")";
	let submitAmended = document.getElementById('submitAmended');
	submitAmended.style.backgroundColor = "rgb(" + e.offsetX + "," + e.offsetY + ",50)";
}

// What is preventDefault doing with form submit button? - Google this
coffeeSearchBar();

let searchCoffee = document.querySelector('#searchCoffee');
searchCoffee.addEventListener('input', filterCoffee);
console.log(searchCoffee);

formGenesis();

