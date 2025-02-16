function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);

  // Update theme icon
  const themeIcon = document.querySelector(".theme-icon");
  themeIcon.textContent = newTheme === "dark" ? "🌙" : "🌞";

  // Save preference
  localStorage.setItem("theme", newTheme);
}

// Initialize date elements with current date
function initializeDateFields() {
  const now = new Date();
  const yearInput = document.getElementById("year");
  const monthSelect = document.getElementById("month");

  // Set current year
  yearInput.value = now.getFullYear();

  // Set current month (adding 1 because getMonth() returns 0-11)
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
  monthSelect.value = currentMonth;
}

// Fetch and display repositories
async function fetchRepositories() {
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const repositoriesDiv = document.getElementById("repositories");

  // Clear any previous content
  repositoriesDiv.innerHTML = "";

  // Validate year input
  if (year < 2008 || year > 2100) {
    repositoriesDiv.innerHTML =
      '<p class="error-message">Please enter a valid year (GitHub was created in 2008).</p>';
    return;
  }

  try {
    const response = await fetch(
      `/api/repositories?year=${year}&month=${month}`
    );
    const data = await response.json();

    if (data.error) {
      repositoriesDiv.innerHTML = `<p class="error-message">Error: ${data.error}</p>`;
      return;
    }

    // Display the list of repositories
    data.forEach((repo) => {
      const repoElement = document.createElement("div");
      repoElement.classList.add("repository");

      repoElement.innerHTML = `
                <h3><a href="https://github.com/${
                  repo.full_name
                }" target="_blank">${repo.full_name}</a></h3>
                <p>${repo.description || "No description available"}</p>
                <p><strong>Stars:</strong> ${repo.stars || "N/A"}</p>
                <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
            `;
      repositoriesDiv.appendChild(repoElement);
    });
  } catch (error) {
    repositoriesDiv.innerHTML =
      '<p class="error-message">Error fetching repositories. Please try again later.</p>';
    console.error("Fetch error:", error);
  }
}

function initializeTheme() {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.querySelector(".theme-icon").textContent =
    savedTheme === "dark" ? "🌙" : "🌞";
}
// Initialize everything when the page loads
function initialize() {
  // Initialize theme
  initializeTheme();
  // Set current date fields
  initializeDateFields();

  // Add click event listener
  document
    .getElementById("fetch-btn")
    .addEventListener("click", fetchRepositories);

  // Fetch repositories immediately
  fetchRepositories();
}

// Start everything when the page is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
