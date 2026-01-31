import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://url-shortener-production-b69f.up.railway.app/api';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${API_BASE}/urls`);
      setUrls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!originalUrl.trim()) {
      setError('Please enter a URL.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/shorten`, { originalUrl });
      // If this URL already existed, avoid duplicates
      setUrls((prev) => {
        const filtered = prev.filter((u) => u.id !== res.data.id);
        return [res.data, ...filtered];
      });
      setOriginalUrl('');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to shorten URL.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>URL Shortener</h1>
      <p>Paste a long URL to generate a short link.</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="url"
          placeholder="https://example.com/very/long/url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ width: '70%', padding: 8 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginLeft: 8, padding: '8px 16px', cursor: 'pointer' }}
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th align="left" style={{ padding: 8 }}>Short URL</th>
            <th align="left" style={{ padding: 8 }}>Original URL</th>
            <th align="right" style={{ padding: 8 }}>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>
                <a href={u.shortUrl} target="_blank" rel="noreferrer">
                  {u.shortUrl}
                </a>
              </td>
              <td style={{ padding: 8, maxWidth: 450, wordBreak: 'break-all' }}>
                {u.originalUrl}
              </td>
              <td style={{ padding: 8 }} align="right">
                {u.clicks}
              </td>
            </tr>
          ))}
          {urls.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: 8, textAlign: 'center' }}>
                No URLs shortened yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
