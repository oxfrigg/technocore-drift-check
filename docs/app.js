const monitor = {
  checks: 2,
  stale: 2,
  sources: 3,
};

document.getElementById("active-checks").textContent = monitor.checks;
document.getElementById("stale-count").textContent = monitor.stale;
document.getElementById("source-count").textContent = monitor.sources;


const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("frigg-theme") || "light";

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  themeLabel.textContent =
    theme === "dark" ? "LIGHT" : "DARK";

  themeIcon.textContent =
    theme === "dark" ? "☀" : "◐";

  localStorage.setItem("frigg-theme", theme);
}

setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current =
    document.documentElement.dataset.theme || "light";

  setTheme(current === "light" ? "dark" : "light");
});