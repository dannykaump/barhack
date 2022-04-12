//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

const drinkName = document.querySelector('h2')
const img = document.querySelector('img')
const instructions = document.querySelector('h3')
const input = document.querySelector('input')
const button = document.querySelector('button')
const main = document.querySelector('main')
const h1 = document.querySelector('h1')

document.querySelector('button').addEventListener('click', getDrinks)

input.addEventListener('keyup', function onEvent(e) {
    if (e.code === 'Enter') {
        getDrinks()
    }
});

function getDrinks() {
    clear()
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;
    // if empty, randomize
    if (input.value === '') {url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'}
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        // const drinkKeys = Object.keys(data.drinks)
        // update DOM 
        updateDOM(data.drinks)
        input.value = ''
    })
    .catch(err => {
        console.log(`error ${err}`)
        input.value = ''
        input.placeholder = 'cocktail not found'
    });
}    

function updateDOM(drinks) {
    drinks.forEach(function(drink) {
        let propKeys = Object.keys(drink)
        const ingredients = fillList(propKeys, 'strIngredient', drink)
        const measurements = fillList(propKeys, 'strMeasure', drink)
        console.log(ingredients)
        console.log(measurements)
        main.innerHTML += `<section><hr><h2>${drink.strDrink}</h2><img src=${drink.strDrinkThumb}><section class="two-grid"><ul class="bold">${ingredients.join('')}</ul><ul class="bullets">${measurements.join('')}</ul></section><hr><h3>${drink.strInstructions}</h3></section><hr>`
    })    
}   

function fillList(keys, keyName, obj) {
    let arr = []
    keys.forEach(function(key) {
        console.log(obj + keyName + keys)
        if (key.startsWith(keyName)) { // *ingredient1, ingredient2, ingredient3....*
            if (obj[key] !== null) { 
                arr.push(`<li>${obj[key]}</li>`)
                console.log(arr)
            }
        }
    })
    return arr
}

function clear() {
    input.placeholder = 'Enter Cocktail'
    main.classList.remove('hidden')
    h1.classList.add('side')
    input.style.marginTop = '18px'
    button.style.marginTop = '18px'
    main.innerHTML = ''
}