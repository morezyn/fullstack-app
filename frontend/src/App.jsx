import { useState, useEffect } from 'react';
import DataDisplay from './components/DataDisplay';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '');

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((res) => res.json())
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 24 }}>
      <h1>Full-Stack App</h1>

      <section>
        <h2>Health Check</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {health && (
          <pre>{JSON.stringify(health, null, 2)}</pre>
        )}
      </section>

      <DataDisplay apiUrl={API_URL} />
    </div>
  );
}

export default App;
