import { PrioriChat } from "../src";
import * as readline from "readline";
import { randomUUID } from "crypto";

const BOT_ID = "fb5d58b8-745f-4f68-b3a7-680821c4988d";
const USER_TOKEN = "test";

const client = new PrioriChat("demo-api-key", "http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let conversation: any = null;

async function startChat() {
  console.log("🚀 Priori Chat Interactive Demo");
  console.log("Type messages and press Enter.");

  const userInput = await new Promise<string>((resolve) => {
    rl.question("Enter user ID (or press Enter for random): ", (answer) => {
      resolve(answer.trim() || `user-${randomUUID()}`);
    });
  });

  console.log(`\n📞 Connecting as user: ${userInput} with bot: ${BOT_ID}...`);

  const { conversation: conv, initialData } = await client.conversation(
    { user_id: userInput, bot_id: BOT_ID },
    {
      onNewMessage: (message) => {
        if (message.from_bot) {
          process.stdout.write('\r\x1b[K');
          console.log(`🤖 ${message.text}`);
          rl.prompt();
        }
      },

      onError: (error) => {
        process.stdout.write('\r\x1b[K');
        console.log(`❌ Error: ${error.message}`);
        rl.prompt();
      }
    }
  );

  conversation = conv;

  console.log(`✅ Connected! Conversation ID: ${conversation.id}`);
  console.log(`📜 Loaded ${initialData.messages.length} previous messages\n`);

  initialData.messages.forEach((msg: any) => {
    if (msg.text.trim()) {
      const emoji = msg.from_bot ? "🤖" : "👤";
      console.log(`${emoji} ${msg.text}`);
    }
  });

  console.log("\n💬 Start typing messages:");
  rl.prompt();

  rl.on('line', async (input) => {
    const message = input.trim();

    if (message) {
      console.log(`👤 ${message}`);
      await conversation.sendMessage(message);
    }

    rl.prompt();
  });

  rl.on('SIGINT', () => {
    conversation?.disconnect();
    process.exit(0);
  });
}

startChat();
