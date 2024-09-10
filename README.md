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
- [Using Docker](#using-docker)
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
- Docker integration for easy setup and deployment.

## Technologies

- **Backend**: Go (Gin framework)
- **Frontend**: HTML, CSS, JavaScript
- **API**: GitHub REST API v3
- **Containerization**: Docker (multi-stage build)
- **Dependencies**: `github.com/gin-gonic/gin` for the web server.

## Installation

### Prerequisites

- [Go](https://golang.org/dl/) (1.20 or higher)
- [Docker](https://www.docker.com/)
- GitHub API Token (optional for higher rate limits)

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

## Using Docker

You can run the application in a Docker container using the provided Dockerfile. The Dockerfile is set up with a multi-stage build to create a lightweight and efficient Docker image.

### Build the Docker Image

1. Make sure you are in the root directory of the project.
2. Build the Docker image using the following command:

```bash
docker build -t github-trends .
```

This command uses the multi-stage Dockerfile to compile the Go application and create a small, production-ready Docker image.

### Run the Docker Container

Once the Docker image is built, you can run the application in a Docker container:

```bash
docker run -p 9090:9090 github-trends
```

This command maps port 9090 on your local machine to port 9090 in the Docker container. The application will be accessible at `http://localhost:9090`

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
│   │   └── config.go       # Configuration loader (using Viper)
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
├── Dockerfile              # Dockerfile with multi-stage build
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
