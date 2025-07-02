import { sendMessage, createConversation } from '../src/client';
import { createClient } from '../src/client/client';

async function sendMessageExample() {
  try {
    const client = createClient(
      {

      }
    ).get;
    // First create a conversation
    const conversation = await createConversation({
      body: {
        bot_id: 'your-bot-id-here',
        user_id: 'your-user-id-here' // optional
      }
    });

    console.log('Created conversation:', conversation.data);

    if (!conversation.data) {
      throw "creating conversation failed"
    }

    // Send a message to the conversation
    const messageResponse = await sendMessage({
      body: {
        message: {
          from_bot: false,
          text: "Hello there"
        }
      },
      path: {
        id: conversation.data.conversation.id
      }
    });

    console.log('Message sent successfully:', messageResponse.data);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
sendMessageExample();
