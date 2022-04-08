//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

const drinkName = document.querySelector('h2')
const img = document.querySelector('img')
const instructions = document.querySelector('h3')
const input = document.querySelector('input')
const ingredients = document.querySelector('#ingredients')
const measurements = document.querySelector('#measurements')
const main = document.querySelector('main')

document.querySelector('button').addEventListener('click', getDrink)

function getDrink() {
    clear()
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;
    // if empty, randomize
    if (input.value === '') {url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'}
    fetch(url)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            const drink = data.drinks[0]
            const drinkKeys = Object.keys(drink)
            // update DOM 
            updateDOM(drink, drinkKeys)
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
}    
// searches object's keys for values & adds them to appropriate list
function fillList(keys, keyName, obj, dest) {
    keys.forEach(function(key) {
        if (key.startsWith(keyName)) { // *ingredient1, ingredient2, ingredient3....*
            if (obj[key] !== null) {
                dest.innerHTML += `<li>${obj[key]}</li>`
            }
        }
    })
}

function updateDOM(obj, keys) {
    drinkName.innerText = obj.strDrink
    img.src = obj.strDrinkThumb
    fillList(keys, 'strIngredient', obj, ingredients)
    fillList(keys, 'strMeasure',  obj, measurements)
    instructions.innerText = obj.strInstructions
}

function clear() {
    ingredients.innerHTML = ''
    measurements.innerHTML = ''
    main.classList.remove('hidden')
}
