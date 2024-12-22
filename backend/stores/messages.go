package stores

import (
	"encoding/json"
	"sync"
)

type MessageStore struct {
	messages   []map[string]string
	messagesMu sync.Mutex
}

func NewMessageStore() *MessageStore {
	return &MessageStore{
		messages: make([]map[string]string, 0),
	}
}

func (store *MessageStore) AddMessage(msg map[string]string) {
	store.messagesMu.Lock()
	defer store.messagesMu.Unlock()
	store.messages = append(store.messages, msg)
}

func (store *MessageStore) GetMessages() []map[string]string {
	store.messagesMu.Lock()
	defer store.messagesMu.Unlock()
	copiedMessages := make([]map[string]string, len(store.messages))
	copy(copiedMessages, store.messages)
	return copiedMessages
}

func (store *MessageStore) MarshalMessages() [][]byte {
	store.messagesMu.Lock()
	defer store.messagesMu.Unlock()
	var marshaledMessages [][]byte
	for _, msg := range store.messages {
		marshaledMsg, _ := json.Marshal(msg)
		marshaledMessages = append(marshaledMessages, marshaledMsg)
	}
	return marshaledMessages
}
