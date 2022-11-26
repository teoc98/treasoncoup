if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches &&
  !localStorage.getItem("theme")
) {
  localStorage.setItem("theme", "dark");
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  // document.querySelector('html').style.filter = (theme === "dark" ? 'invert(100%)' : '');
  toggle = document.querySelector("a[id=darkmodetoggle-link]");
  if (toggle) {
    toggle.innerText = "Join the " + (theme === "dark" ? 'light' : 'dark') + " side";
  }
  // Set the user's theme preference to theme
  localStorage.setItem("theme", theme);
}
function setDark()  { return setTheme("dark");  }
function setLight() { return setTheme("light"); }

// Get the theme toggle input
const currentTheme = localStorage.getItem("theme"); // If the current local storage item can be found

// Get the current theme from local storage
if (currentTheme === "dark") {
  // Set the body data-theme attribute to match the local storage item
  setDark();
}


// Function that will switch the theme based on the if the theme toggle is checked or not
function switchTheme() {
  if (localStorage.getItem("theme") === "dark") {
    setLight();
  } else {
    setDark();
  }
}
