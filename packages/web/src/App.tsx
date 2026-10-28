import { formatUser } from '@monorepo/shared';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Monorepo Web App</h1>
      <p>Shared package demo: {formatUser({ id: '1', email: 'test@example.com', name: 'Test User' })}</p>
    </div>
  );
}

export default App;
