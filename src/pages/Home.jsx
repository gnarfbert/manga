import MangaCard from "../components/mangadisplay";
import { useState, useEffect } from "react";
import { getPopularManga } from "../services/api";
import { searchManga } from "../services/api";

import "../css/Home.css";

function Home() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [mangaList, setManga] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularManga = async () => {
      try {
        const popularManga = await getPopularManga();
        const flatMangaList = popularManga.flat()
        setManga(flatMangaList);
      } catch (err) {
        console.log(err);
        setError("Failed to load manga");
      } finally {
        setLoading(false);
      }
    };

    loadPopularManga();
  }, []);

  const handleSearch = async (search) => {
    search.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return
    setLoading(true)
    try {
      const searchResults = await searchManga(searchQuery);
      setManga(searchResults)
      setError(null)
    } catch (err) {
      setError('could not find manga')
    } 
    finally {
      setLoading(false)
    }



  };

  return (
    <div className="Home">
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for manga"
          className="search-input"
          mangaQuery={searchQuery}
          onChange={(lambda) => setSearchQuery(lambda.target.value)}
        />
        <button type="submit" className="search-submit">
          search
        </button>
      </form>
      

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="manga-grid">
          {(mangaList ?? []).map((manga) => (
            <MangaCard manga={manga} key={manga.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
