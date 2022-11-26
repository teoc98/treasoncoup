if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches &&
  !localStorage.getItem("theme")
) {
  localStorage.setItem("theme", "dark");
}

// Get the theme toggle input
const currentTheme = localStorage.getItem("theme"); // If the current local storage item can be found

// Get the current theme from local storage
if (currentTheme) {
  // Set the body data-theme attribute to match the local storage item
  // document.documentElement.setAttribute("data-theme", currentTheme);
  document.querySelector('html').style.filter = 'invert(100%)';
}

// Function that will switch the theme based on the if the theme toggle is checked or not
function switchTheme() {
  if (localStorage.getItem("theme") === "dark") {
    // document.documentElement.setAttribute("data-theme", "light");
    document.querySelector('html').style.filter = '';
    // Set the user's theme preference to dark
    localStorage.setItem("theme", "light");
  } else {
    // document.documentElement.setAttribute("data-theme", "dark");
    document.querySelector('html').style.filter = 'invert(100%)';
    // Set the user's theme preference to light
    localStorage.setItem("theme", "dark");
  }
}
