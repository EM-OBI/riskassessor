import { initializeHeaderFooter } from "../utilities/headerfooter.mjs";
import { setHygieneData, getHygieneData } from "../utilities/localStorage.mjs";

initializeHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  //Grab form with checkboxes from DOM and save them in an object
  const form = document.getElementById("hygiene-form");
  const checkboxes = {
    morning: document.getElementById("brushed-morning"),
    night: document.getElementById("brushed-night"),
    flossed: document.getElementById("flossed")
  };

  //get progress bar and streak count components
  const progressPercent = document.getElementById("progress-percent");
  const progressBar = document.getElementById("progress-bar");
  const streakCount = document.getElementById("streak-count");

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Load today’s data
  const saved = getHygieneData(today);
  if (saved) {
    checkboxes.morning.checked = saved.morning;
    checkboxes.night.checked = saved.night;
    checkboxes.flossed.checked = saved.flossed;
  }

  updateProgress();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      morning: checkboxes.morning.checked,
      night: checkboxes.night.checked,
      flossed: checkboxes.flossed.checked,
    };

    setHygieneData(today, data);

    updateProgress();
    updateStreak();
  });

  //function to update porgress bar 
  function updateProgress() {
    const values = [
      checkboxes.morning.checked,
      checkboxes.night.checked,
      checkboxes.flossed.checked
    ];
    const total = values.filter(Boolean).length;
    const percent = Math.round((total / 3) * 100);
    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
  }

  //function to update streak only if user has compled subsequent days 100%
  function updateStreak() {
    let streak = 0;
    let date = new Date();

    while (true) {
      const dateKey = date.toISOString().slice(0, 10);
      const entry = getHygieneData(dateKey);
      if (
        entry &&
        entry.morning &&
        entry.night &&
        entry.flossed
      ) {
        streak++;
        date.setDate(date.getDate() - 1); // go to previous day
      } else {
        break;
      }
    }

    streakCount.textContent = streak;
  }

  updateStreak();
});