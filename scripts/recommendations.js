import { initializeHeaderFooter } from "../utilities/headerfooter.mjs";
import { getRecommendations } from "./getRecommendations.mjs";
import { getStoredRisk } from "../utilities/localStorage.mjs";
import { fetchRecipes } from "./recipe.mjs";

initializeHeaderFooter();

const risk = getStoredRisk();
const recommendations = getRecommendations(risk);

document.querySelector("#risk-level").textContent = `Your current risk level is: ${risk}`;
const recipeDisplay = document.getElementById("display-recipe");

const list = document.querySelector("#recommendation-list");
recommendations.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  list.appendChild(li);
});

const triggerRecipeCall = document.getElementById("trigger-recipe");

triggerRecipeCall.addEventListener("click", async () => {
    const recipes = await fetchRecipes();
    displayRecipes(recipes);
})

function displayRecipes (recipes) {
    recipes.forEach(recipe => {
        const displaySection = document.createElement("section");
        displaySection.classList.add("display-section");

        const sectionHeading = document.createElement("h3");
        sectionHeading.classList.add("section-heading");
        sectionHeading.textContent = recipe.title

        const sectionContent = document.createElement("p");
        sectionContent.classList.add("sectionContent");

        const sectionImage = document.createElement("img");
        sectionImage.setAttribute("src", recipe.image);
        sectionImage.setAttribute("alt", recipe.title);
        sectionImage.setAttribute("loading", "lazy");
        sectionImage.classList.add("sectionImage");

        const nutritionDetails = document.createElement("ul");
        nutritionDetails.classList.add("nutrition-details");
        const calories = document.createElement("li");
        calories.textContent = `Calories - ${recipe.calories}`
        const carbs = document.createElement("li");
        carbs.textContent = `Carbs - ${recipe.carbs}`
        const calcium = document.createElement("li");
        calcium.textContent = `Calcium - ${recipe.calcium}`
        const sugar = document.createElement("li");
        sugar.textContent = `Sugar - ${recipe.sugar}`
        const fat = document.createElement("li");
        fat.textContent = `Fat - ${recipe.fat}`
        const protein = document.createElement("li");
        protein.textContent = `Protein - ${recipe.protein}`

        nutritionDetails.appendChild(calories);
        nutritionDetails.appendChild(carbs);
        nutritionDetails.appendChild(calcium);
        nutritionDetails.appendChild(sugar);
        nutritionDetails.appendChild(fat);
        nutritionDetails.appendChild(protein);

        sectionContent.appendChild(sectionImage);
        sectionContent.appendChild(nutritionDetails);

        displaySection.appendChild(sectionHeading);
        displaySection.appendChild(sectionContent);

        recipeDisplay.appendChild(displaySection);
    })
}