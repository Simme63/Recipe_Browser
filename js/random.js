"use strict"

const randombutton = document.getElementById("randombutton")
const randomrecipe = document.getElementById("randomrecipe")
const apiKey = "c9a21899071148ef9f7c5cda850e4bac"
const ingredientsSet = new Set()

async function fetchData() {
    let randomid = Math.floor(Math.random() * 700000) + 1;
    const apiEndpoint = `https://api.spoonacular.com/recipes/${randomid}/information?includeNutrition=false&apiKey=${apiKey}`
    const response = await fetch(apiEndpoint)
    const data = await response.json()
    console.log(data);

    let steps = data.analyzedInstructions[0]?.steps ?? [];

    let ingredients = new Set();
    let instructionHTMLObject = document.createElement("ul");
    for (const step of steps) {
        let stepHTMLObject = document.createElement("li");
        stepHTMLObject.textContent = step.step;
        instructionHTMLObject.appendChild(stepHTMLObject);

        step.ingredients.forEach(item => ingredients.add(item.name))
    }

    randomrecipe.innerHTML = `
   <div class="container">
    <h2>${data.title}</h2>
    <ul>${Array.from(ingredients).join("\n")}</ul>
    <ol>${instructionHTMLObject.innerHTML}</ol>
    <img src="${data.image}" alt="Image of the food" class="foodimage">
    </div>`
    // data.recipesteps.map(step => `<li>${step.step}</li>`).join('')
}

randombutton.addEventListener("click", (e) => {
    e.preventDefault()
    fetchData()
})