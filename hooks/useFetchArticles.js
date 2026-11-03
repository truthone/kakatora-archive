import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchArticles = ({ filmoId } = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setArticles([]);
    setError(null);
    if (!filmoId) {
      setLoading(false);
      return () => controller.abort();
    }
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/fetchArticles', {
          params: { filmoId }, signal, timeout: 15000,
        });
        if (signal.aborted) return;
        const items = response.data.map((article) => ({
          ...article,
          imgUrl: article.imgUrl || article.imageUrl || '',
        }));
        // External previews must not delay displaying the sheet data.
        setArticles(items);
        setLoading(false);
        await Promise.all(items.map(async (article, index) => {
          if (article.imgUrl || !article.link) return;
          try {
            const { data } = await axios.get('/api/og-parser', {
              params: { url: article.link }, signal, timeout: 8000,
            });
            if (signal.aborted) return;
            setArticles((current) => current.map((item, itemIndex) =>
              itemIndex === index ? {
                ...item,
                imgUrl: item.imgUrl || data.image || '',
                title: item.title || data.title,
                description: item.description || data.description,
              } : item
            ));
          } catch {
            // Keep the original article when its preview is unavailable.
          }
        }));
      } catch (err) {
        if (!signal.aborted) setError(err);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [filmoId]);

  return { articles, loading, error };
};

export default useFetchArticles;
