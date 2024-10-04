"use strict"

const mydishname = document.getElementById("dishname")
const mydishngredients = document.getElementById("dishingredients")
const mydishsteps = document.getElementById("dishsteps")
const owndishbutton = document.getElementById("owndishbutton")
const personalrecipe = document.getElementById("personalrecipe")
const myrecipeinfo = document.getElementById("recipe_form")
const mydishimage = document.getElementById("dishimage")
let saveddishes = []

myrecipeinfo.addEventListener("submit", (e) => {
    e.preventDefault();

    let dishname = mydishname.value;
    let dishingredients = mydishngredients.value;
    let dishsteps = mydishsteps.value;
    let dishimage = mydishimage.value // Proper string interpolation
    let dishinfo = {
        dishname: dishname,
        ingredients: dishingredients,
        steps: dishsteps,
        image: dishimage,
    }
    saveddishes.push(dishinfo)
    localStorage.setItem("saveddishes", JSON.stringify(saveddishes))

    updateUI()
});

saveddishes = JSON.parse(localStorage.getItem("saveddishes")) ?? [];
updateUI();

function updateUI() {
    personalrecipe.innerHTML = ""
    for (const element of saveddishes) {
        personalrecipe.innerHTML += `<div class="personaldishdiv"><h3>${element.dishname}</h3><p>Ingredients:<br>${element.ingredients}</p><p>${element.steps}</p><img src="${element.image}" alt=Picture of the dish id="personalrecipeimage"></div>`
    }
}
