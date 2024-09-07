# GitHub Trends - Top 20 Repositories

This project is a simple web application that fetches the top 20 GitHub repositories for a specific month and year, using the GitHub API. Users can select the year and month to view the most popular repositories for that period.

The app is built using Go (Gin) for the backend, HTML, CSS, and JavaScript for the frontend, and provides a clean, modern UI with hover effects and smooth transitions.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Go Modules](#install-go-modules)
- [Running the App](#running-the-app)
  - [Start the Server](#start-the-server)
  - [Access the Web Interace](#access-the-web-interace)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches the top 20 repositories from GitHub for a specific month and year.
- Users can select the month and year from a simple form.
- Clean, modern UI with hover effects and smooth transitions.
- Data is fetched from the GitHub Search API.
- Repository details include name, description, star count, and programming language.
- Repository names link to the actual GitHub repository.

## Technologies

- *Backend*: Go (Gin framework)
- *Frontend*: HTML, CSS, JavaScript
- *API*: GitHub REST API v3
- *Database*: None (data fetched directly from GitHub API)
- *Dependencies*: `github.com/gin-gonic/gin` for the web server.

## Installation

### Prerequisites

- Go (1.23.1 current)
- GitHub API Token

### Clone the Repository

```bash
git clone https://github.com/k1lgor/github-trends.git
cd github-trends
```

### Install Go Modules

Run the following command to download the necessary dependencies:

```bash
go mod tidy
```

## Running the App

### Start the Server

To start the server, use the following command:

```bash
go run cmd/github-trends/main.go
```

By default, the app will run on `http://localhost:9090/`.

### Access the Web Interace

Open a browser and go to:

```bash
http://localhost:9090
```

## Project Structure

```bash
github-trends/
├── cmd/
│   └── github-trends/
│       └── main.go         # Entry point for the Go server
├── internal/
│   ├── api/
│   │   └── api.go          # API routes and Gin server setup
│   ├── config/
│   │   └── config.go             # Configuration loader (using Viper)
│   ├── fetcher/
│   │   └── fetcher.go      # Logic to fetch GitHub repositories
├── web/
│   ├── templates/
│   │   └── index.html      # Frontend HTML page
│   └── static/
│       ├── css/
│       │   └── style.css   # Styles for the frontend
│       ├── js/
│       │   └── script.js   # JavaScript logic for fetching and displaying repos
├── go.mod                  # Go module dependencies
├── go.sum                  # Go module checksum file
└── config.yaml             # Optional config file for GitHub API key
```

## Usage

1. Select Year and Month:

- Use the input fields to select the year and month for which you want to view the trending repositories.

2. Click the Fetch Button

- Click the Fetch Repositories button to retrieve the top 20 repositories for that month.

3. View Repository Details:

- The repositories will be listed with the following details:
  - Repository Name (clickable link to GitHub)
  - Description
  - Star Count
  - Programming Language

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. *Fork the repository.*
2. *Create a feature branch* (`git checkout -b feature-name`).
3. *Commit your changes* (`git commit -m 'Add new feature'`).
4. *Push to the branch* (`git push origin feature-name`).
5. *Open a pull request.*

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
