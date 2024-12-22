package main

import (
	"encoding/json"
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	"github.com/tom-takeru/web-socket-demo/backend/stores"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			origin := r.Header.Get("Origin")
			// NOTE: This project is for local development only.
			return origin == "http://localhost:3000"
		},
	}
	messageStore = stores.NewMessageStore()
	clients      = make(map[*websocket.Conn]bool)
	clientsMu    sync.Mutex
)

func handleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upgrade to WebSocket"})
		return
	}
	defer conn.Close()

	clientsMu.Lock()
	clients[conn] = true
	clientsMu.Unlock()

	// Send existing messages to the new connection
	for _, msg := range messageStore.MarshalMessages() {
		conn.WriteMessage(websocket.TextMessage, msg)
	}

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			break
		}

		var msgData map[string]string
		if err := json.Unmarshal(message, &msgData); err != nil {
			break
		}

		timestamp := time.Now().Format(time.RFC3339)
		msgData["timestamp"] = timestamp

		messageStore.AddMessage(msgData)

		modifiedMessage, err := json.Marshal(msgData)
		if err != nil {
			break
		}

		clientsMu.Lock()
		for client := range clients {
			if err := client.WriteMessage(websocket.TextMessage, modifiedMessage); err != nil {
				client.Close()
				delete(clients, client)
			}
		}
		clientsMu.Unlock()
	}

	clientsMu.Lock()
	delete(clients, conn)
	clientsMu.Unlock()
}

func main() {
	r := gin.Default()
	r.GET("/ws", handleWebSocket)
	r.Run("localhost:8080")
}
