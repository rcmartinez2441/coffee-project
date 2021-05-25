"use strict"

function renderCoffee(currentCoffee) {
    let coffeeSubContainer = document.createElement('div');
    coffeeSubContainer.setAttribute('class', 'col-6 p-0 border-bottom mb-1');
    //<div class="

    let perCoffeeSubRow = document.createElement('div');
    perCoffeeSubRow.setAttribute('class', 'row mb-1');

    // Stuff for coffee name
    let coffeeName = document.createElement('div');
    coffeeName.setAttribute('class', 'col-6 p-0 d-inline-flex text-nowrap justify-content-end');
    coffeeName.style.fontSize = '21px';
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
    newNode.setAttribute('class', 'col-12 m-1 my-1 mx-1 p-1')

    //For label
    let newNodeLabel = document.createElement('label')
    newNodeLabel.setAttribute('for','searchCoffee');
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


