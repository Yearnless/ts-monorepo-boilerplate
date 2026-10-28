import { Hono } from 'hono';
import { fetchRetry } from 'fetch-retry-jitter';
import { envAssert } from 'env-assert-typed';
import { formatUser } from '@monorepo/shared';

const env = envAssert({
  PORT: { type: 'number', default: 3000 },
  API_BASE_URL: { type: 'string', required: true },
  API_TIMEOUT_MS: { type: 'number', default: 5000 },
  RETRY_ATTEMPTS: { type: 'number', default: 3 },
});

const app = new Hono();

app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id');
  
  // Example: fetch user from external API with resilient fetch
  try {
    const response = await fetchRetry(`${env.API_BASE_URL}/users/${c.req.param('id')}`, {
      retries: 3,
      timeoutMs: 5000,
      circuitBreaker: {
        failureThreshold: 5,
        resetTimeoutMs: 30000,
      },
    });

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Failed to fetch user' }, 502);
  }
});

app.get('/health', (c) => c.json({ status: 'ok' }));

export default {
  port: 3000,
  fetch: app.fetch,
};
