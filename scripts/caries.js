import { initializeHeaderFooter } from "../utilities/headerfooter.mjs";
import { fetchCariesData } from "./cariesData.mjs";
import { getCoordinates } from "./getLocation.mjs";
import { generateCariesTable } from "./cariesTable.mjs";

initializeHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {

    // Extract form data
    document.getElementById("check-prevalence").addEventListener("submit", function (e) {
        e.preventDefault();
    
        const form = e.target;
        const formData = {
            country: form.country.value
        };

        const displayTable = document.getElementById("display-table");
        if (displayTable) {
            displayTable.textContent = "";
            handleCariesData(formData.country);
        } else {
            console.error("The element #display-table does not exist.");
        }
    });

    // Get caries data for current location
    document.getElementById("current-location").addEventListener("click", async () => {
        const displayTable = document.getElementById("display-table");
        if (displayTable) {
            displayTable.textContent = "";
            const country = await handleGetCountry();
            if (country) {
                handleCariesData(country);
            }
        } else {
            console.error("The element #display-table does not exist.");
        }
    });
});

async function handleCariesData(country) {
    try {
        const data = await fetchCariesData(country);
        const displayTable = document.getElementById("display-table");
        if (displayTable) {
            displayTable.appendChild(generateCariesTable(data, country));
        } else {
            console.error("The element #display-table does not exist.");
        }
    } catch (error) {
        console.error(error);
    }
}

export async function handleGetCountry() {
    try {
        const { latitude, longitude } = await getCoordinates();

        const apiKey = "2b1775f52de146679ceee7deaeee3294";
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&pretty=1`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const country = data.results[0].components["ISO_3166-1_alpha-3"];
            return country;
        } else {
            console.error("No geolocation results found");
        }
    } catch (error) {
        console.error("Geolocation error:", error.message);
    }
}