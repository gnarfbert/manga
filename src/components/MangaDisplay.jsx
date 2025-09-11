import "../css/MangaDisplay.css";
import { useMangaContext } from "../contexts/MangaContext";

function MangaCard({ manga }) {
  const mangaTitle = manga.title.romaji;
  const imgUrl = manga.coverImage.large;
  const releaseDate = manga.startDate.year;

  const {isFavorite, addToFavorite, removeFromFavorite} = useMangaContext();
  const favorite = isFavorite(manga.id);

  function favoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorite(manga.id);
    else addToFavorite(manga);
  }

  return (
    <div className="manga-card">
      <div className="manga-cover">
        <img src={imgUrl} alt={mangaTitle} />
        <div className="overlay">
          <button
            className={`favorite ${favorite ? "active" : ""}`}
            onClick={favoriteClick}
          >
            ☆
          </button>
        </div>
      </div>
      <div className="manga-info">
        <h3>{mangaTitle}</h3>
        <p>{releaseDate}</p>
      </div>
    </div>
  );
}

export default MangaCard;
