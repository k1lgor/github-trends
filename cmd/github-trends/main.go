package main

import (
	"github-trends/internal/api"
	"github-trends/internal/config"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set environment
	env := os.Getenv("ENV")
	if env == "" {
		env = "development"
	}

	// Set Gin mode based on environment
	if env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Load configuration from config.yaml
	cfg := config.LoadConfig()

	// Setup logging
	f, err := os.OpenFile("app.log", os.O_CREATE|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}
	defer f.Close()
	log.SetOutput(f)

	// Setup and start the API server
	router := api.SetupRouter(cfg)

	// Start the server using the configured port
	log.Printf("Starting server on port %s", cfg.Server.Port)
	if err := router.Run(":" + cfg.Server.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
