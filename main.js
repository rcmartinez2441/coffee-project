"use strict"

function renderCoffee(currentCoffee) {
    // Stuff for coffee name
    let coffeeSubContainer = document.createElement('div');

    let coffeeName = document.createElement('div');
    coffeeSubContainer.setAttribute('class', 'col-6 row pb-1');
    coffeeName.setAttribute('class', 'col-6 pr-1 d-flex flex-flow justify-content-end');
    coffeeName.style.fontSize = '21px';
    coffeeName.innerHTML = currentCoffee.name;

    // Stuff for coffee roast
    let coffeeRoast = document.createElement('div');
    coffeeRoast.setAttribute('class', 'col-6 p-0 text-muted d-flex align-items-end');
    coffeeRoast.innerHTML = currentCoffee.roast;

    coffeeSubContainer.appendChild(coffeeName);
    coffeeSubContainer.appendChild(coffeeRoast);

    return coffeeSubContainer;
}

function renderCoffees(coffeeArray) {
    let coffeeContainer = document.getElementById('coffee-container');
    coffeeContainer.innerHTML = '';
    for (let i = coffeeArray.length-1; i >= 0; i--) {
        coffeeContainer.appendChild( renderCoffee(coffeeArray[i]) );
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
    formContainer.insertBefore(newNode, submitButton);
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
    } renderCoffees(filterCoffees);
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

//This will call function when page loads
renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

// What is preventDefault doing with form submit button? - Google this


coffeeSearchBar();

let searchCoffee = document.querySelector('#searchCoffee');
searchCoffee.addEventListener('input',filterCoffee);
console.log(searchCoffee);


