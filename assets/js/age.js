function calculateAgeFromBrazilianDate(dateText) {
  if (!dateText) return "";
  const [day, month, year] = dateText.split("/").map(Number);
  if (!day || !month || !year) return "";

  const today = new Date();
  let age = today.getFullYear() - year;
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age -= 1;
  }

  if (age < 0) return "";
  if (age === 1) return "1 ano";
  return `${age} anos`;
}

function initAges() {
  document.querySelectorAll("[data-birthdate]").forEach((element) => {
    const age = calculateAgeFromBrazilianDate(element.dataset.birthdate);
    element.textContent = age || "Data não informada";
  });
}

document.addEventListener("DOMContentLoaded", initAges);
