/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(GAMES_JSON) {

    // loop over each item in the data
         for (let i = 0; i < GAMES_JSON.length; i++) {
        // create a new div element, which will become the game card
            const newDiv = document.createElement("div");
                newDiv.style.display = 'inline-block';
                newDiv.style.justifyContent = "center";
        // add the class game-card to the list
            newDiv.classList.add("game-card");
        // set the inner HTML using a template literal to display some info 
        // about each game
        // GAMES_JSON.forEach(myFunction)
                newDiv.innerHTML = 
                `<img class="game-img" src="${GAMES_JSON[i].img}">\n
                Name: ${GAMES_JSON[i].name}\nGoal: ${GAMES_JSON[i].goal}`
                gamesContainer.appendChild(newDiv)
                // document.body.insertBefore(newDiv, gamesContainer)
            };
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const reducer = (acc, game) => acc + game.backers;
const total = GAMES_JSON.reduce(reducer, 0);

console.log({ total });
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `Total: ${total.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const reducer1 = (acc, game) => acc + game.pledged;
const totalPledged = GAMES_JSON.reduce(reducer1, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalPledged.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const reducer2 = (acc) => acc + 1;
// const reducer3 = ;
const totalGames = GAMES_JSON.reduce(reducer2, 0);
gamesCard.innerHTML = `${totalGames}`;
console.log({ totalGames });

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer)
    // use filter() to get a list of games that have not yet met their goal
    let y = GAMES_JSON.filter ((GAMES_JSON) => {
        return GAMES_JSON.pledged < GAMES_JSON.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(y)
}

// show only games that are fully funded


function filterFundedOnly() {
    deleteChildElements(gamesContainer)
    // use filter() to get a list of games that have met or exceeded their goal
    let x = GAMES_JSON.filter ((GAMES_JSON) => {
        return GAMES_JSON.pledged >= GAMES_JSON.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(x);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer)
    const all_games = GAMES_JSON.filter ((GAMES_JSON) => {
        return GAMES_JSON.pledged = GAMES_JSON.pledged});
    // add all games from the JSON data to the DOM
    addGamesToPage(all_games)
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
        const y = GAMES_JSON.filter ((GAMES_JSON) => {  //Returns Unfunded Games
        return GAMES_JSON.pledged < GAMES_JSON.goal;
    })
        const x = GAMES_JSON.filter ((GAMES_JSON) => { //Returns Funded Games
        return GAMES_JSON.pledged >= GAMES_JSON.goal;
    });
        const fundedGames = GAMES_JSON.filter ((GAMES_JSON) => {
        return GAMES_JSON.pledged >= GAMES_JSON.goal;
    });
    const reducer_unfunded = (acc) => acc + 1;  //# of Unfunded Games
    const num_unfunded = y.reduce(reducer_unfunded, 0);
    
    const reducer_fundedOnly = (acc) => acc + 1; //# of Funded Games
    const num_funded = x.reduce(reducer_fundedOnly, 0)

    const reducerDollarFunded = (acc, game) => acc + game.pledged;
    const DollarFunded = x.reduce(reducerDollarFunded, 0);
   ;
    console.log(`${num_unfunded} + ${num_funded} + ${DollarFunded}`)

// create a string that explains the number of unfunded games using the ternary operator

    const displayUnfunded =  `A total of ${totalGames} ${totalGames > 1 ? "games" : "game"} has raised $${totalPledged.toLocaleString('en-US')}. ${num_unfunded} more ${num_unfunded > 1 ? "games" : "game"} are underfunded and still need your help!`;

// create a new DOM element containing the template string and append it to the description container
    const displayText = document.createElement("div");
    displayText.innerHTML = displayUnfunded;
    descriptionContainer.appendChild(displayText);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
    let [first, second, ...rest] = sortedGames;
    const [first_Name, second_Name] = [first.name, second.name];


// create a new element to hold the name of the top pledge game, then append it to the correct element
    const topPledged = document.createElement("div");
    topPledged.innerHTML = first_Name;
    firstGameContainer.appendChild(topPledged);
// // do the same for the runner up item
    const runnerUp = document.createElement("div");
    runnerUp.innerHTML = second_Name;
    secondGameContainer.appendChild(runnerUp);