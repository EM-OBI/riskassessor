export function validate() {
    const age = document.querySelector("#age");

    // Age input validation on input
    age.addEventListener("input", () => {
        if (age.validity.rangeUnderflow) {
            age.setCustomValidity("You must be at least 6 years old.");
        } else {
            age.setCustomValidity("");
        }
    });
}