package main

import (
	"log"

	"github.com/k1lgor/github-trends/internal/api"
	"github.com/k1lgor/github-trends/internal/config"
)

func main() {
	// Load configuration from config.yaml
	cfg := config.LoadConfig()

	// Setup and start the API server
	router := api.SetupRouter(cfg)

	// Start the server using the configured port
	log.Printf("Starting server on port %s", cfg.Server.Port)
	if err := router.Run(":" + cfg.Server.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
