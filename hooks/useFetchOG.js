import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchOG = (filmoId) => {
  const [ogData, setOgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Fetch data from fetchArticles API
        const articleResponse = await axios.get(`/api/fetchArticles?filmoId=${filmoId}`);
        const articles = articleResponse.data;

        // Step 2: Fetch Open Graph data for each article link
        const ogResponses = await Promise.all(
          articles.map(async (article) => {
            const ogResponse = await axios.get(`/api/og-parser?url=${encodeURIComponent(article.link)}`);
            return {
              ...article,
              og: ogResponse.data,
            };
          })
        );

        setOgData(ogResponses);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filmoId]);

  return { ogData, loading, error };
};

export default useFetchOG;
