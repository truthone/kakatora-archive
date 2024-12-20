import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchCafeArticles = ({ filmoId } = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const articleResponse = await axios.get(`/api/fetchCafeArticles?filmoId=${filmoId}`);
      const articles = articleResponse.data;

      const mappedArticles = articles.map((article) => ({
        id: article.id,
        fk: article.fk,
        date: article.date,
        title: article.title,
        link: article.link,
        imageUrl: article.imageUrl,
        note: article.note,
        era: article.era,
      }));

      setArticles(mappedArticles);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filmoId) {
      fetchData();
    }
  }, [filmoId]);

  return { articles, loading, error };
};

export default useFetchCafeArticles;
