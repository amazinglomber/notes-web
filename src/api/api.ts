import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const apiUrl = process.env.NODE_ENV === 'production'
  ? 'api.notes.niezurawski.com'
  : 'https://localhost:7002/api';

const api = axios.create({
  baseURL: apiUrl,
});

export const useApi = <DataType>({ ...config } : AxiosRequestConfig) => {
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await api(config);
      setData(response.data as DataType);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, fetchData };
};

export default api;
