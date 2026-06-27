import { useState, useEffect } from 'react';

function DataDisplay({ apiUrl }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState('v1');

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/${version}/data`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [apiUrl, version]);

  return (
    <section>
      <h2>Data</h2>
      <div>
        <button onClick={() => setVersion('v1')} disabled={version === 'v1'}>
          v1 (Basic)
        </button>
        <button onClick={() => setVersion('')} disabled={version === ''}>
          v2 (Feature-Flagged)
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {!loading && !data && (
        <p style={{ color: 'orange' }}>
          Feature flag "new-data-endpoint" is disabled — v2 data not available.
        </p>
      )}
    </section>
  );
}

export default DataDisplay;
