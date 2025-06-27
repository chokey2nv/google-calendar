# Stage 1: Build the React app
FROM node:20-alpine AS build-react
WORKDIR /web

# Copy package files and install dependencies
COPY ./web/package*.json ./web/yarn.lock ./
# RUN yarn install --frozen-lockfile
RUN yarn install --frozen-lockfile

# Copy the rest of the React app and build
COPY ./web .

RUN yarn build

# Stage 2: Build the Go backend
FROM golang:1.23.6-alpine AS build-go
WORKDIR /backend

# Install make and other build tools
RUN apk add --no-cache make

# Copy Go module files and download dependencies
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download

# Copy the rest of the Go backend and build
COPY ./backend .
RUN make install && go build -o main .

# Stage 3: Create the final lightweight image
FROM alpine:latest
WORKDIR /app

# Copy the built React app from the first stage
COPY --from=build-react /web/dist ./dist

# Copy the compiled Go binary from the second stage
COPY --from=build-go /backend/main ./main

# Set environment variables
ENV BUILD_DIR=./dist
ENV PORT=8080

# Expose the port the server will run on
EXPOSE 8080

# Run the Go backend
CMD ["./main"]