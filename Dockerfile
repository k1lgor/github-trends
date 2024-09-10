# Stage 1: Build the Go binary
FROM golang:1.23-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the project files
COPY . .

# Build the Go application (specify the output binary)
RUN go build -o github-trends cmd/github-trends/main.go

# Stage 2: Create a small image to run the compiled binary
FROM alpine:latest

# Set the working directory in the new container
WORKDIR /app

# Copy the binary from the build stage
COPY --from=builder /app/github-trends /app/github-trends

# Expose the port that the application will run on
EXPOSE 9090

# Run the binary
CMD ["/app/github-trends"]
