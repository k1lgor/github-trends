package api

import (
	"time"

	"github.com/gin-gonic/gin"
)

type HealthResponse struct {
	Status    string `json:"status"`
	Timestamp int64  `json:"timestamp"`
	Version   string `json:"version"`
}

func HealthCheck(c *gin.Context) {
	c.JSON(200, HealthResponse{
		Status:    "UP",
		Timestamp: time.Now().Unix(),
		Version:   "1.0.0",
	})
}
