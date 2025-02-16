# Stage 1: Build the Go binary
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache git

# Copy go mod files first to leverage Docker cache
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the project files
COPY . .

# Build the application with production settings
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o github-trends cmd/github-trends/main.go

# Stage 2: Create a minimal production image
FROM alpine:latest

# Add necessary certificates and security updates
RUN apk --no-cache add ca-certificates && \
    apk --no-cache add tzdata && \
    update-ca-certificates

# Create a non-root user
RUN adduser -D -H -h /app appuser

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/github-trends .

# Copy web assets and config
COPY --from=builder /app/web ./web
COPY --from=builder /app/config.yaml .

# Set proper permissions
RUN chown -R appuser:appuser /app

# Use non-root user
USER appuser

# Set production environment
ENV GIN_MODE=release
ENV ENV=production

# Expose the application port
EXPOSE 9090

# Run the binary
CMD ["./github-trends"]
