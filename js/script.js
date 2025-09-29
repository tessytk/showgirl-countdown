// === CONFIGURE YOUR COUNTDOWN HERE ===
const EVENT_NAME = "The Life of a Showgirl";   // if it already starts with "The", don't add another "The" in strings
const TARGET_MONTH = 10;  // 1-12
const TARGET_DAY   = 3;   // 1-31
const TARGET_HOUR  = 12, TARGET_MIN = 0, TARGET_SEC = 0;
// =====================================

window.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.querySelector("#date");
  const h1 = document.querySelector("h1");

  const now = new Date();
  let year = now.getFullYear();

  // Build this year's target date
  const thisYearTarget = new Date(
    year,
    TARGET_MONTH - 1,       // JS months are 0-11
    TARGET_DAY,
    TARGET_HOUR, TARGET_MIN, TARGET_SEC
  );

  // If we're already past the target moment this year, use next year
  if (now > thisYearTarget) year += 1;

  const target = new Date(
    year,
    TARGET_MONTH - 1,
    TARGET_DAY,
    TARGET_HOUR, TARGET_MIN, TARGET_SEC
  );

  const MS_IN_DAY = 1000 * 60 * 60 * 24;
  const timeUntil = target.getTime() - now.getTime();

  // Ceil to the next integer day; never negative
  const daysUntil = Math.max(0, Math.ceil(timeUntil / MS_IN_DAY));

  // Build the heading/title content
  if (!h1) return;

  if (daysUntil === 0) {
    h1.innerHTML = `<span id="date">Today is ${EVENT_NAME}!</span> Have the best day!`;
    document.title = `Today is ${EVENT_NAME}!`;
  } else if (daysUntil === 1) {
    h1.innerHTML = `${EVENT_NAME} is <span id="date">${daysUntil}</span> day away!`;
    document.title = `${daysUntil} Day Until ${EVENT_NAME}!`;
  } else {
    // Ensure the span exists
    if (!dateEl) {
      h1.innerHTML = `There are <span id="date">${daysUntil}</span> days until <span id="event-name">${EVENT_NAME}</span>`;
    } else {
      dateEl.textContent = String(daysUntil);
    }
    document.title = `${daysUntil} Days Until ${EVENT_NAME}!`;
  }

  // --- Hide days as "???" until clicked, and toggle back and forth ---
const freshDateEl = document.querySelector("#date");
if (freshDateEl && daysUntil > 0) {
  let showingReal = false;             // start hidden
  const realText = String(daysUntil);  // actual number of days
  const realTitle = document.title;

  // initial state = ???
  freshDateEl.textContent = "???";
  freshDateEl.classList.add("secret");
  document.title = `??? Days Until ${EVENT_NAME}`;

  
// helper: starburst effect
const triggerBurst = () => {
  freshDateEl.classList.add("burst");
  setTimeout(() => freshDateEl.classList.remove("burst"), 800);
};

const toggle = () => {
  if (showingReal) {
    // hide it
    freshDateEl.textContent = "???";
    freshDateEl.classList.add("secret");
    document.title = `??? Days Until ${EVENT_NAME}`;
    showingReal = false;

    // run burst when switching to ???
    triggerBurst();

  } else {
    // show the real number
    freshDateEl.textContent = realText;
    freshDateEl.classList.remove("secret");
    document.title = realTitle;
    showingReal = true;

    // run burst if the real number is 7
    if (realText === "7") {
      triggerBurst();
    }
  }
};

  freshDateEl.addEventListener("click", toggle);
  freshDateEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
    });
  }
});