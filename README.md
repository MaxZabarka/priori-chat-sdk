# Priori Chat SDK

A TypeScript SDK for building real-time chat applications with the Priori Chat API.

## Installation

```bash
npm install priori-chat-sdk
```

## Quick Start

```typescript
import { PrioriChat } from 'priori-chat-sdk';

const client = new PrioriChat("your-api-key");

// Start a conversation
const { conversation, initialData } = await client.conversation(
  { user_id: "user-123", bot_id: "12345678-1234-1234-1234-123456789012" },
  {
    onNewMessage: (message) => {
      console.log(`${message.from_bot ? 'Bot' : 'User'}: ${message.text}`);
      if (message.attached_media) {
        console.log(`  📎 Image: ${message.attached_media.url}`);
      }
    }
  }
);

// Print initial message history
console.log(`Loaded ${initialData.messages.length} previous messages`);
initialData.messages.forEach(msg => {
  console.log(`${msg.from_bot ? 'Bot' : 'User'}: ${msg.text}`);
});

// Send a message
await conversation.sendMessage("Hello!");

// Clean up when done
conversation.disconnect();
```

## Core Concepts

### Conversation Identification

Conversations can be identified in two ways:

1. **By user and bot pair** - There can only be one conversation between a specific `user_id` and `bot_id`. If a conversation already exists, it will be retrieved; otherwise, a new one will be created.

```typescript
const options = {
  user_id: "user-123",
  bot_id: "12345678-1234-1234-1234-123456789012"
};
```

2. **By conversation ID** - If you already have a conversation ID, you can connect directly to it.

```typescript
const options = {
  conversation_id: "87654321-4321-4321-4321-210987654321"
};
```

### Creating Conversations

You can also create conversations explicitly before starting real-time messaging:

```typescript
const result = await client.createConversation({
  bot_id: "12345678-1234-1234-1234-123456789012",
  user_id: "user-123",
  create_user_if_not_exists: true
});

console.log(`Created conversation: ${result.conversation.id}`);
```

## Real-time Messaging

### Callbacks and Initial Data

When starting a conversation, you receive both the conversation instance and initial data containing the message history:

```typescript
const { conversation, initialData } = await client.conversation(options, {
  onInitialData: (data) => {
    console.log(`Loaded ${data.messages.length} previous messages`);
    // Display message history in your UI
    data.messages.forEach(msg => {
      console.log(`${msg.from_bot ? 'Bot' : 'User'}: ${msg.text}`);
    });
  },
  
  onNewMessage: (message) => {
    // Handle new messages in real-time
    console.log(`${message.from_bot ? 'Bot' : 'User'}: ${message.text}`);
    if (message.attached_media) {
      console.log(`  📎 Image: ${message.attached_media.url}`);
    }
  },
  
  onError: (error) => {
    console.error('Chat error:', error.message);
    // Show error message to user
  }
});

// The initialData contains the same message history that onInitialData receives
console.log(`Message history: ${initialData.messages.length} messages`);
```

### Sending Messages

```typescript
// Send text message
await conversation.sendMessage("How can you help me?");

// Send message with image
await conversation.sendMessage("Here's a screenshot of the issue", {
  url: "https://example.com/screenshot.png"
});
```

### Handling Media

Both users and bots can send and receive images:

```typescript
const { conversation } = await client.conversation(options, {
  onNewMessage: (message) => {
    console.log(`${message.from_bot ? 'Bot' : 'User'}: ${message.text}`);
    if (message.attached_media) {
      console.log(`  📎 Image: ${message.attached_media.url}`);
      // Display image in your UI
    }
  }
});

// User sends an image
// In a real app, you'd get this URL from file upload
const imageUrl = "https://example.com/user-uploaded-image.jpg"; // Your upload logic
await conversation.sendMessage("Check out this image!", { url: imageUrl });
```

## Complete Example

Here's a complete implementation demonstrating the SDK usage:

```typescript
import { PrioriChat, Conversation, Message } from 'priori-chat-sdk';

class ChatApplication {
  private conversation: Conversation | null = null;
  private messages: Message[] = [];

  async initialize() {
    const client = new PrioriChat("your-api-key");
    
    const { conversation, initialData } = await client.conversation(
      { user_id: "user-123", bot_id: "12345678-1234-1234-1234-123456789012" },
      {
        onInitialData: (data) => {
          this.messages = data.messages;
          this.renderMessages();
        },
        onNewMessage: (message) => {
          this.messages.push(message);
          this.renderMessage(message);
        },
        onError: (error) => {
          console.error('Chat error:', error);
          // Show error notification to user
        }
      }
    );

    this.conversation = conversation;
    console.log(`Connected to conversation: ${conversation.id}`);
  }

  async sendMessage(text: string) {
    if (!this.conversation) return;
    await this.conversation.sendMessage(text);
  }

  async sendImage(file: File) {
    if (!this.conversation) return;

    // Upload file and get URL (implement your upload logic)
    const imageUrl = await this.uploadFile(file);
    await this.conversation.sendMessage("Shared an image", { url: imageUrl });
  }

  private renderMessages() {
    this.messages.forEach(msg => this.renderMessage(msg));
  }

  private renderMessage(message: Message) {
    // Implement your UI rendering logic
    const sender = message.from_bot ? 'Bot' : 'User';
    console.log(`${sender}: ${message.text}`);
    
    if (message.attached_media) {
      console.log(`  📎 Image: ${message.attached_media.url}`);
      // Display image in your UI
    }
  }

  private async uploadFile(file: File): Promise<string> {
    // Implement your file upload logic
    // Return the URL of the uploaded file
    return "https://your-storage.com/uploaded-file.jpg";
  }

  disconnect() {
    this.conversation?.disconnect();
  }
}

// Usage
const chat = new ChatApplication();
await chat.initialize();

// Send messages
await chat.sendMessage("Hello!");

// Handle file uploads
// chat.sendImage(selectedFile);

// Clean up when done
chat.disconnect();
```

For a complete working example, see [`examples/interactive-chat.ts`](./examples/interactive-chat.ts).

## API Reference

For detailed API documentation, see the generated TypeDoc documentation.

### Key Classes and Types

- `PrioriChat` - Main SDK client
- `Conversation` - Real-time conversation instance
- `ConversationOptions` - Configuration for conversation identification
- `ConversationCallbacks` - Event handlers for real-time updates
- `Message` - Message structure with text and optional media
- `AttachedMedia` - Media attachment with URL

## TypeScript Support

This SDK is written in TypeScript and provides full type safety for all operations.