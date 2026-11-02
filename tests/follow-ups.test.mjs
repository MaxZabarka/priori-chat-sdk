import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { PrioriChat } from '../dist/index.mjs';

test('test-copy and clock methods use the generated endpoints and surface conflicts', async (t) => {
  const requests = [];
  const response = { follow_up: { next_at: '2026-11-04T10:00:00Z', source: 'automatic', status: 'scheduled', unanswered: 1, max_unanswered: 4, timezone: 'UTC' }, test_clock: { now: '2026-11-02T16:00:00Z', revision: 1, source_conversation_id: 'original' } };
  const server = createServer(async (req, res) => {
    let text = ''; for await (const part of req) text += part;
    requests.push({ path: req.url, method: req.method, body: text ? JSON.parse(text) : undefined });
    res.setHeader('Content-Type', 'application/json');
    if (requests.length === 3) { res.statusCode = 409; res.end(JSON.stringify({ message: 'The conversation changed; reload it and try again' })); }
    else res.end(JSON.stringify(req.url.endsWith('/test-copy') ? { conversation_id: 'test-copy' } : response));
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  t.after(() => { server.closeAllConnections(); server.close(); });
  const client = new PrioriChat('test-key', `http://127.0.0.1:${server.address().port}`);
  assert.deepEqual(await client.createTestCopy({ id: 'original' }), { conversation_id: 'test-copy' });
  assert.deepEqual(await client.advanceTestClock({ id: 'test-copy', revision: 0, seconds: 7200 }), response);
  assert.deepEqual(requests[0], { path: '/api/conversations/original/test-copy', method: 'POST', body: undefined });
  assert.deepEqual(requests[1], { path: '/api/conversations/test-copy/test-clock', method: 'POST', body: { revision: 0, seconds: 7200 } });
  await assert.rejects(client.advanceTestClock({ id: 'test-copy', revision: 0 }), (e) => e.status === 409 && e.message.includes('conversation changed'));
});
