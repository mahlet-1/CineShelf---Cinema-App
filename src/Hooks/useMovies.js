import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export function useMovies(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        const separator = endpoint.includes('?') ? '&' : '?';
        const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;

        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error('Failed to fetch data from TMDB');
        }

        const result = await response.json();
        setData(result.results || result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [endpoint]);

  return { data, loading, error };
}