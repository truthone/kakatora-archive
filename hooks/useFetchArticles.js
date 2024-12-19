import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchArticles = ({ filmoId }={}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
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

      setArticles(ogResponses);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    setLoading(true);
    setError(null);
    setArticles([]);
    fetchData( );
  }, [filmoId]);



  return { articles, loading, error };
};

export default useFetchArticles;
