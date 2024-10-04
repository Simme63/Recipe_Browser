"use strict"

import { results } from "./dummy.js"

const apiKey = "c9a21899071148ef9f7c5cda850e4bac"
//sets all the constants and imports all the elements that get used from html
const searchRecipe = document.getElementById("searchRecipe")
const recipeName = document.getElementById("recipeName")
const instructions = document.getElementById("instructions")
const foodimage = document.querySelector(".foodimage")
const ingredients = document.getElementById("ingredients")
const ingredientsSet = new Set()


const urlParams = new URLSearchParams(window.location.search);
const Query = urlParams.get('query');


async function fetchData(query) {
    //gets data from the api and saves it to "data"
    const apiEndpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=9&addRecipeInformation=true&addRecipeInstructions=true&apiKey=${apiKey}`
    const response = await fetch(apiEndpoint)
    const data = await response.json()

    //saves variables with the different ingredients, steps, names and images, taken from "data"
    let recipeingredients = data.results[0].analyzedInstructions[0].steps
    let recipesteps = data.results[0].analyzedInstructions[0].steps;
    recipeName.innerText = data.results[0].title;
    foodimage.src = data.results[0].image

    //a loop to put out the steps in order to make it look nice
    instructions.innerHTML = recipesteps.map(step => `<li>${step.step}</li>`).join('');

    //adding all ingredients to a set to make sure there are no duplicate ingredients and lists them all
    ingredientsSet.clear()
    for (let i = 0; i < recipeingredients.length; i++) {
        let loop = recipeingredients[i].ingredients
        for (let j = 0; j < loop.length; j++) {
            ingredientsSet.add(loop[j].name)
        }
    }
    ingredients.innerHTML = "";
    for (const ing of ingredientsSet) {
        ingredients.innerHTML += `<li>${ing}</li>`;
    }

}

//eventlistener to make sure it calls whenever i search something 
searchRecipe.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        let query = searchRecipe.value
        if (!location.href.includes("index.html")) {
            // Redirect to the index page with a query parameter
            location.href = `index.html?query=${query}`;
        }
        fetchData(query)
    }
})

if (Query != null) {
    fetchData(Query)
}

