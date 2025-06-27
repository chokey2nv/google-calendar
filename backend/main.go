package main

import (
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour, // Cache preflight requests for 12 hours
	}))

	buildDir := getEnv("BUILD_DIR", "../web/build")
	log.Println("BUILD_DIR:", buildDir)

	// Serve static files
	router.NoRoute(func(c *gin.Context) {
		path := filepath.Join(buildDir, c.Request.URL.Path)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			c.File(filepath.Join(buildDir, "index.html"))
		} else {
			c.File(path)
		}
	})

	// Start the server
	port := getEnv("PORT", "8080")
	log.Println("PORT:", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

// getEnv retrieves an environment variable or returns a default value if it doesn't exist
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
