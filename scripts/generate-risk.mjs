export class RiskAssessment {
    constructor({ age, diet, brushing, flossing, pastDecay, fluoridatedWater, fluorideToothpaste }) {
        this.age = parseInt(age, 10);
        this.diet = diet;
        this.brushing = brushing;
        this.flossing = flossing;
        this.pastDecay = pastDecay;
        this.fluoridatedWater = fluoridatedWater;
        this.fluorideToothpaste = fluorideToothpaste;
    }

    calculateRiskLevel() {
        const score =
          (this.age < 6 || this.age > 65 ? 1 : 0) +
          (this.diet === "high" ? 2 : this.diet === "moderate" ? 1 : 0) +
          (this.brushing === "less" ? 2 : this.brushing === "once" ? 1 : 0) +
          (this.flossing === "less" ? 2 : this.flossing === "once" ? 1 : 0) +
          (this.pastDecay === "yes" ? 2 : 0) +
          (this.fluoridatedWater === "no" ? 1 : 0) +
          (this.fluorideToothpaste === "no" ? 1 : 0);
    
        return score <= 3 ? "Low" : score <= 6 ? "Moderate" : "High";
      }
}