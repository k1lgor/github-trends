document.getElementById("fetch-btn").addEventListener("click", function () {
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

  // Fetch repositories from the backend
  fetch(`/api/repositories?year=${year}&month=${month}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        repositoriesDiv.innerHTML = `<p class="error-message">Error: ${data.error}</p>`;
        return;
      }

      // Display the list of repositories
      data.forEach((repo) => {
        const repoElement = document.createElement("div");
        repoElement.classList.add("repository");

        // Create a clickable link for the repo full_name
        const repoLink = `<h3><a href="https://github.com/${repo.full_name}" target="_blank">${repo.full_name}</a></h3>`;

        // Display the repository information
        repoElement.innerHTML = `
                    ${repoLink}
                    <p>${repo.description || "No description available"}</p>
                    <p><strong>Stars:</strong> ${
                      repo.stargazers_count || "N/A"
                    }</p>
                    <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
                `;
        repositoriesDiv.appendChild(repoElement);
      });
    })
    .catch((error) => {
      repositoriesDiv.innerHTML =
        '<p class="error-message">Error fetching repositories. Please try again later.</p>';
    });
});
