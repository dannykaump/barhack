//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

const drinkName = document.querySelector('h2')
const img = document.querySelector('img')
const instructions = document.querySelector('h3')
const input = document.querySelector('input')
const button = document.querySelector('button')
// const ingredients = document.querySelector('#ingredients')
// const measurements = document.querySelector('#measurements')
const main = document.querySelector('main')
const h1 = document.querySelector('h1')

document.querySelector('button').addEventListener('click', getDrinks)

input.addEventListener('keyup', function onEvent(e) {
    if (e.code === 'Enter') {
        getDrinks()
    }
});

// function getDrink() {
//     clear()
//     let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;
//     // if empty, randomize
//     if (input.value === '') {url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'}
//     fetch(url)
//           .then(res => res.json()) // parse response as JSON
//           .then(data => {
//             const drink = data.drinks[0]
//             const drinkKeys = Object.keys(drink)
//             // update DOM 
//             updateDOM(drink, drinkKeys)
//             input.value = ''
//             console.log(data)
//           })
//           .catch(err => {
//               console.log(`error ${err}`)
//               input.placeholder = 'cocktail not found'
//           });
// }    
// searches object's keys for values & adds them to appropriate list

// function updateDOM(obj, keys) {
    //     drinkName.innerText = obj.strDrink
    //     img.src = obj.strDrinkThumb
//     fillList(keys, 'strIngredient', obj, ingredients)
//     fillList(keys, 'strMeasure',  obj, measurements)
//     instructions.innerText = obj.strInstructions
// }


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
        input.placeholder = 'cocktail not found'
    });
}    

function updateDOM(keys) {
    let ingredients = `<ul></ul>`
    let measurements = `<ul></ul>`
    keys.forEach(function(key) {
        const propKeys = Object.keys(key)
        fillList(propKeys, 'StrIngredient', propKeys[0], ingredients)
        fillList(propKeys, 'StrIngredient', propKeys[0], measurements)
        main.innerHTML += `<section><h2>${key.strDrink}</h2><img src=${key.strDrinkThumb}>${ingredients}${measurements}<h3>${key.strInstructions}</h3></section>`
    })
    
}   

    function fillList(keys, keyName, obj, dest) {
        keys.forEach(function(key) {
            console
            if (key.startsWith(keyName)) { // *ingredient1, ingredient2, ingredient3....*
                if (obj[key] !== null) {
                    dest += `<li>${obj[key]}</li>`
                }
            }
        })
    }
    
    function clear() {
        // ingredients.innerHTML = ''
        // measurements.innerHTML = ''
    main.classList.remove('hidden')
    h1.classList.add('side')
    input.style.marginTop = '18px'
    button.style.marginTop = '18px'
    main.innerHTML = ''
}