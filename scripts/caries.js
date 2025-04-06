import { initializeHeaderFooter } from "../utilities/headerfooter.mjs";
import { fetchCariesData } from "./cariesData.mjs";

initializeHeaderFooter();

//Extract form data
document.getElementById("check-prevalence").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = {
      country: form.country.value
    };
    
    handleCariesData(formData.country);
  });


async function handleCariesData(country) {
    try {
        const data = await fetchCariesData(country);
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}