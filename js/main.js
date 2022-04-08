//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const drinkName = document.querySelector('h2')
const img = document.querySelector('img')
const instructions = document.querySelector('h3')
const input = document.querySelector('input')
const ingredients = document.querySelector('#ingredients')
const measurements = document.querySelector('#measurements')

document.querySelector('button').addEventListener('click', getDrink)

function getDrink() {
    clear()
    const drink = input.value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            img.src = data.drinks[0].strDrinkThumb
            drinkName.innerText = data.drinks[0].strDrink
            instructions.innerText = data.drinks[0].strInstructions
            console.log(data)
            const drinkKeys = Object.keys(data.drinks[0])
            fillList(drinkKeys, 'strIngredient', data.drinks[0], ingredients)
            fillList(drinkKeys, 'strMeasure',  data.drinks[0], measurements)
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
}    

function fillList(obj, keyName, element, dest) {
    obj.forEach(function(key) {
        if (key.startsWith(keyName)) {
            if (element[key] !== null) {
                dest.innerHTML += `<li>${element[key]}</li>`
            }
        }
    })
}

function clear() {
    ingredients.innerHTML = ''
    measurements.innerHTML = ''
}