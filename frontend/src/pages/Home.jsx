import MangaCard from "../components/mangadisplay";
import { useState, useEffect } from "react";
import { getPopularManga } from "../services/api";
import { searchManga } from "../services/api";
import { useMangaContext } from "../contexts/MangaContext";
import { userComments } from "../services/api";
import { getComments } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const {comment, setComment} = useMangaContext();
  const [userComment, setUserComment] = useState("");
  const { isOpen, setIsOpen, mangaObject } = useMangaContext();
  const [mangaList, setManga] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularManga = async () => {
      try {
        const popularManga = await getPopularManga();
        const flatMangaList = popularManga.flat();
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
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchManga(searchQuery);
      setManga(searchResults);
      setError(null);
    } catch (err) {
      setError("could not find manga");
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await userComments(mangaObject.baseID, userComment);
    const comment = await getComments(mangaObject.baseID)
    setComment(comment);
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
      {isOpen ? (
        <>
          <div className="backdrop" onClick={() => setIsOpen(false)}></div>
          <div className="dialog">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              x
            </button>
            <div className="sub-window">
              <div>
                <h2>Trailer</h2>
                <iframe
                  width="400"
                  height="200"
                  src={`https://www.youtube.com/embed/${mangaObject.id}`}
                  title={`${mangaObject.title}`}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
                <div className="submit-comment">
                  <form action="" className="search-form">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Leave a comment"
                      onChange={(e) =>  setUserComment(e.target.value)}
                    />
                    <button type="submit" className="search-submit" onClick={handleComment}>
                      submit
                    </button>
                  </form>
                </div>
              </div>
              <div className="comment-section">
                <h2>Comments:</h2>
                {`${comment}`}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Home;
