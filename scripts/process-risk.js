import { validate } from "./validation.mjs";
import { initializeHeaderFooter } from "../utilities/headerfooter.mjs";
import { RiskAssessment } from "./generate-risk.mjs";
import { setStoredRisk, setFluorideLevel, setSugarLevel, setAge } from "../utilities/localStorage.mjs";

initializeHeaderFooter();

validate();

// Create modal and its children
const modal = document.createElement("dialog");
modal.classList.add("modal");

const modalContent = document.createElement("div");

//close modal button
const closeModalButton = document.createElement("button");
closeModalButton.textContent = "Close";
closeModalButton.classList.add("modal-close");

//get recommendations button
const getRecBtn = document.createElement("button");
getRecBtn.textContent = "Get Recommendations";
getRecBtn.addEventListener("click", () => {
  window.location.href = "recommendations.html";
});


//Enable the modal to be close by clicking anywhere on the screen
modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();

    if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    ) {
        modal.close();
    }
});

// Append children
modal.appendChild(modalContent);
modal.appendChild(closeModalButton);
modal.appendChild(getRecBtn);

closeModalButton.addEventListener("click", () => {
  modal.close();
});

// Get DOM element for main page
const riskPage = document.querySelector(".main-risk");

//Extract form data
document.getElementById("risk-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = {
    age: form.age.value,
    diet: form.diet.value,
    brushing: form.brushing.value,
    flossing: form.flossing.value,
    pastDecay: form.pastDecay.value,
    fluoridatedWater: form.fluoridatedWater.value,
    fluorideToothpaste: form.fluorideToothpaste.value,
  };

  const assessment = new RiskAssessment(formData);
  const risk = assessment.calculateRiskLevel();
  
  // Function to calculate sugar level based on diet
  function calculateSugarLevel(diet) {
    if (diet === "high") return "high";
    if (diet === "moderate") return "moderate";
    return "low";
    }
  
  // Function to calculate fluoride level based on form data
  function calculateFluorideLevel(fluoridatedWater, fluorideToothpaste) {
    let fluoride = 0;
    if (fluoridatedWater === "yes") fluoride += 1;
    if (fluorideToothpaste === "yes") fluoride += 1;
    return fluoride;
    }
  
  setSugarLevel(calculateSugarLevel(formData.diet))  
  setFluorideLevel(calculateFluorideLevel(formData.fluoridatedWater, formData.fluorideToothpaste))
  const age = parseInt(formData.age, 10)
  setAge(age)
  setStoredRisk(risk);

  modalContent.textContent = `Your risk level is: ${risk}`;

  if (!riskPage.contains(modal)) {
    riskPage.appendChild(modal);
  }
  modal.showModal();
});