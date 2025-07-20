import { PrioriChat } from "../src";
import * as readline from "readline";
import { randomUUID } from "crypto";

const BOT_ID = "cb7f780e-63a8-444e-b93f-96494ed13aae";
const USER_TOKEN = "test";

const client = new PrioriChat("sk_mydevelo_b522b8dc264049c64e83a791867b54d6", "http://localhost:3000");

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
          console.log(`🤖 ${message.text}`);
          rl.prompt();
        }
      },
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
