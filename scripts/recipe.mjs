import { getFluorideLevel, getSugarLevel, getAge } from "../utilities/localStorage.mjs";


export async function fetchRecipes() {
    const fluoride = getFluorideLevel();
    const sugar = getSugarLevel();
    const age = getAge();

    const apiKey = "b64935b50c114626b7d8e63e1473b53d"
    const url = new URL('https://api.spoonacular.com/recipes/findByNutrients');

    // Adjust minfluoride based on the fluoride level (0-2 scale)
    let minFluoride = 0;
    if (fluoride === "0") minFluoride = 2;
    if (fluoride === "1") minFluoride = 1.5;
    if (fluoride === "2") minFluoride = 1;

    // Adjust maxsugar based on the sugar level (high, moderate, low)
    let maxSugar = 0;
    if (sugar === "high") maxSugar = 1;
    if (sugar === "moderate") maxSugar = 5;
    if (sugar === "low") maxSugar = 10;

    //Adjust mincalcium based on age
    let minCalcium;
    if (age < 9) minCalcium = 350;
    if (age < 12) minCalcium = 500;
    if (age >= 12) minCalcium = 650;

    const params = {
        minFluoride: minFluoride,
        maxSugar: maxSugar,
        minCalcium: minCalcium,
        apiKey: apiKey,
        number: 5,
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data; //return recipe results
}