package fetcher

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

var GitHubAPIURL = "https://api.github.com/search/repositories"

type Repository struct {
	Name        string `json:"name"`
	FullName    string `json:"full_name"`
	Stars       int    `json:"stargazers_count"`
	Description string `json:"description"`
	Language    string `json:"language"`
}

type GitHubResponse struct {
	Items []Repository `json:"items"`
}

func FetchTopRepositories(apiKey, year, month string) ([]Repository, error) {
	startDate := fmt.Sprintf("%s-%s-01", year, month)
	layout := "2006-01-02"
	startTime, _ := time.Parse(layout, startDate)
	endTime := startTime.AddDate(0, 1, -1)

	query := fmt.Sprintf("created:%s..%s", startTime.Format(layout), endTime.Format(layout))

	req, err := http.NewRequest("GET", GitHubAPIURL, nil)
	if err != nil {
		return nil, err
	}

	// Set query parameters
	q := req.URL.Query()
	q.Add("q", query)
	q.Add("sort", "stars")
	q.Add("order", "desc")
	q.Add("per_page", "20")
	req.URL.RawQuery = q.Encode()

	// Set the GitHub API key if provided
	if apiKey != "" {
		req.Header.Set("Authorization", "token "+apiKey)
	}

	req.Header.Set("Accept", "application/vnd.github.v3+json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		log.Printf("GitHub API error: %s", string(body))
		return nil, fmt.Errorf("GitHub API returned status code: %d", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var ghResponse GitHubResponse
	if err := json.Unmarshal(body, &ghResponse); err != nil {
		return nil, err
	}

	return ghResponse.Items, nil
}
