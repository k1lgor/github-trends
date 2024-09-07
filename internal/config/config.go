package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	GitHubAPIKey string
	Server       struct {
		Port string
	}
}

func LoadConfig() *Config {
	viper.SetConfigName("config") // Name of the config file (without extension)
	viper.SetConfigType("yaml")   // Config file type
	viper.AddConfigPath(".")      // Look for the config file in the root directory

	// Set default values (optional)
	viper.SetDefault("server.port", "9090")

	// Read the config file
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}

	// Map the config file values to the Config struct
	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		log.Fatalf("Unable to decode config into struct: %v", err)
	}

	return &config
}
