import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setImmediate } from 'node:timers/promises';
import { Conversation } from '../dist/index.mjs';

const message = {
  id: 'message-1', text: 'for you', from_bot: true, sent_at: 123,
  lock: { purchase_id: 'offer-1', price_cents: 1400, checkout_url: null, unlocked: false },
};
const snapshot = (messages) => ({ messages, purchases: [], bot_id: 'bot', is_typing: false });

test('polling reports an existing unlock without reporting a new message', async (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  let data = snapshot([message]);
  const snapshots = [], newMessages = [];
  const { conversation } = await Conversation.create({ getConversation: async () => data },
    { conversation_id: 'c', pollingInterval: 10 },
    { onMessages: (messages) => snapshots.push(messages), onNewMessage: (m) => newMessages.push(m) });
  t.after(() => conversation.disconnect());
  const unlocked = { ...message, lock: { ...message.lock, unlocked: true } };
  data = snapshot([unlocked]);
  t.mock.timers.tick(10);
  await setImmediate();
  assert.deepEqual(snapshots, [[unlocked]]);
  assert.deepEqual(newMessages, []);

  const next = { ...message, id: 'message-2', sent_at: 456 };
  data = snapshot([unlocked, next]);
  t.mock.timers.tick(10);
  await setImmediate();
  assert.equal(newMessages.length, 1);
  assert.deepEqual(newMessages[0].lock, next.lock);
  assert.equal(newMessages[0].sent_at, 456);
});

test('slow polls do not overlap or deliver after disconnect', async (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  let calls = 0, finish;
  const snapshots = [];
  const client = { getConversation: async () => ++calls === 1 ? snapshot([message]) : new Promise((resolve) => { finish = resolve; }) };
  const { conversation } = await Conversation.create(client, { conversation_id: 'c', pollingInterval: 10 },
    { onMessages: (messages) => snapshots.push(messages) });
  t.after(() => conversation.disconnect());
  t.mock.timers.tick(30);
  await setImmediate();
  assert.equal(calls, 2);
  conversation.disconnect();
  finish(snapshot([{ ...message, lock: { ...message.lock, unlocked: true } }]));
  await setImmediate();
  assert.deepEqual(snapshots, []);
});
