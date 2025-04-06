function setStoredRisk(riskLevel) {
    localStorage.setItem("cariesRiskLevel", riskLevel);
  }
  
function getStoredRisk() {
    return localStorage.getItem("cariesRiskLevel");
}

function setFluorideLevel(level) {
    localStorage.setItem('fluorideLevel', level);
}

function getFluorideLevel() {
    return localStorage.getItem('fluorideLevel');
}

function setSugarLevel(level) {
    localStorage.setItem('sugarLevel', level);
}

function getSugarLevel() {
    return localStorage.getItem('sugarLevel');
}
function setAge (age) {
    localStorage.setItem('age', age);
}

function getAge() {
    return localStorage.getItem('age');
}

export {setStoredRisk, getStoredRisk, setFluorideLevel, getFluorideLevel, setSugarLevel, getSugarLevel, setAge, getAge}