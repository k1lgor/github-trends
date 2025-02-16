const languageColors = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Ruby: "#701516",
  Go: "#00ADD8",
  TypeScript: "#2b7489",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  "C#": "#178600",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Scala: "#c22d40",
  "Jupyter Notebook": "#DA5B0B",
  Haskell: "#5e5086",
  Lua: "#000080",
  Elixir: "#6e4a7e",
  C: "#555555",
  Assembly: "#6E4C13",
  R: "#198CE7",
  PowerShell: "#012456",
  Perl: "#0298c3",
  Julia: "#a270ba",
  "Vim script": "#199f4b",
  MATLAB: "#e16737",
};

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

      const languageColor = repo.language
        ? languageColors[repo.language] || "#8b949e"
        : "#8b949e";

      repoElement.innerHTML = `
        <h3><a href="https://github.com/${repo.full_name}" target="_blank">${
        repo.full_name
      }</a></h3>
        <p>${repo.description || "No description available"}</p>
        <div class="repo-meta">
            <span class="stars">⭐ ${repo.stargazers_count || "N/A"}</span>
            ${
              repo.language
                ? `
                <span class="language">
                    <span class="language-color" style="background-color: ${languageColor}"></span>
                    ${repo.language}
                </span>
            `
                : ""
            }
        </div>
        <div class="repo-preview">
            <div class="preview-loading">Loading preview...</div>
        </div>
    `;

      // Add hover listener to load preview
      repoElement.addEventListener("mouseenter", async () => {
        const previewElement = repoElement.querySelector(".repo-preview");

        // Check if preview is already loaded
        if (previewElement.querySelector(".preview-loading")) {
          const details = await fetchRepoDetails(repo.full_name);
          if (details) {
            // Check if preview should display on left side
            const rect = repoElement.getBoundingClientRect();
            if (rect.right + 320 > window.innerWidth) {
              previewElement.classList.add("preview-left");
            }

            previewElement.innerHTML = `
                    <div class="preview-header">
                        <img class="preview-avatar" src="${
                          details.owner.avatar_url
                        }" alt="Owner avatar">
                        <span>${details.owner.login}</span>
                    </div>
                    <div class="preview-description">${
                      details.description || "No description available"
                    }</div>
                    <div class="preview-stats">
                        <span class="preview-stat">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path fill="currentColor" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                            </svg>
                            ${details.stargazers_count.toLocaleString()}
                        </span>
                        <span class="preview-stat">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path fill="currentColor" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                            </svg>
                            ${details.forks_count.toLocaleString()}
                        </span>
                        <span class="preview-stat">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path fill="currentColor" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
                            </svg>
                            ${details.watchers_count.toLocaleString()}
                        </span>
                    </div>
                `;
          }
        }
      });

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

// Add this function to fetch repository details
async function fetchRepoDetails(fullName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${fullName}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching repo details:", error);
    return null;
  }
}
