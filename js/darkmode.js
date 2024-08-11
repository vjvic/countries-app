/*Dark Mode*/

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".dark-mode-toggle");
  const body = document.body;

  const userPreference = localStorage.getItem("theme");
  if (userPreference) {
    body.classList.toggle("dark-mode", userPreference === "dark");
  }

  // Toggle dark mode on button click
  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save user's theme preference to localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
  });
});
