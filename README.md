# WebSocket Demo

This repository contains a project that demonstrates a simple setup for a React frontend and a Go backend using WebSockets.

## Getting Started

### 0. Environment Requirements

Ensure you have the following installed on your machine before starting the project:

- **Go**: Version 1.23.3 or higher. Confirmed operation with version 1.23.3.
- **Node.js**: Version 22.12.0 or higher. Confirmed operation with version 22.12.0.

You can verify the installations by running the following commands:

```sh
go version
node -v
```

### 1. Clone the repository

```sh
git clone https://github.com/tom-takeru/web-socket-demo.git
cd web-socket-demo
```

### 2. Start the services

To start the frontend and backend services, run the following commands:

#### Backend

```sh
cd backend
go run main.go
```

#### Frontend

```sh
cd frontend
npm run dev
```

This will start the frontend on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:8080](http://localhost:8080).

### 3. Stop the services

To stop the services, use the appropriate commands for each service:

#### Backend

Press `Ctrl+C` in the terminal where the backend is running.

#### Frontend

Press `Ctrl+C` in the terminal where the frontend is running.

## Related Articles

- [Real-Time Web Application demo with WebSocket - Overview](https://dev.to/tom-takeru/real-time-web-application-demo-with-websockets-3fhb)
- [Real-Time Web Application demo with WebSocket - Frontend](https://dev.to/tom-takeru/real-time-web-application-demo-with-websocket-frontend-4kep)
- [Real-Time Web Application demo with WebSocket - Backend](https://dev.to/tom-takeru/real-time-web-application-demo-with-websocket-backend-1a1n)