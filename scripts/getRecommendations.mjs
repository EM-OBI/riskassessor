export function getRecommendations(riskLevel) {
    switch (riskLevel) {
      case "Low":
        return [
          "✅ Maintain your current oral hygiene routine.",
          "🦷 Keep regular dental check-ups every 6–12 months.",
          "🪥 Continue using fluoride toothpaste."
        ];
      case "Moderate":
        return [
          "🍭 Reduce sugar intake and snacking frequency.",
          "🪥 Brush twice daily and floss once daily.",
          "✅ Ensure your toothpaste contains fluoride.",
          "🦷 Visit the dentist every 6 months."
        ];
      case "High":
        return [
          "⚠️ Consult a dentist immediately for a personalized care plan.",
          "🧴 Use prescription-strength fluoride toothpaste.",
          "🚫 Limit sugar and acidic foods completely.",
          "🪥 Brush and floss after every meal.",
          "🧼 Consider fluoride mouth rinses."
        ];
      default:
        return ["No recommendations available. Please complete the risk assessment first."];
    }
  }