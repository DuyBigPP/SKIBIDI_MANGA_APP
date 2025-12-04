import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook để fetch data với Axios
 * @example
 * const { data, loading, error, refetch } = useFetch<Manga[]>('/api/manga');
 */
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: result } = await axios.get<T>(url);
      setData(result);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
