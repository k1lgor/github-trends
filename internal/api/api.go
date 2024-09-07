package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k1lgor/github-trends/internal/config"
	"github.com/k1lgor/github-trends/internal/fetcher"
)

func SetupRouter(cfg *config.Config) *gin.Engine {
	router := gin.Default()

	// Serve the frontend
	router.LoadHTMLGlob("web/templates/*.html")
	router.Static("/static", "./web/static")

	// API endpoint for fetching repositories
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	// API to fetch the top repositories for the selected month and year
	router.GET("/api/repositories", func(c *gin.Context) {
		year := c.Query("year")
		month := c.Query("month")

		if year == "" || month == "" {
			c.JSON(400, gin.H{"error": "Year and month are required"})
			return
		}

		// Fetch trending repositories
		repos, err := fetcher.FetchTopRepositories(cfg.GitHubAPIKey, year, month)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to fetch repositories"})
			return
		}

		c.JSON(200, repos)
	})

	return router
}
