import "../css/MangaDisplay.css";

function MangaCard({ manga }) {
  const mangaTitle = manga.title.romaji;
  const imgUrl = manga.coverImage.large
  const releaseDate = manga.startDate.year

  function favoriteClick() {
    alert("Working!");
  }

  return (
    <div className="manga-card">
      <div className="manga-cover">
        <img src={imgUrl} alt={mangaTitle} />
        <div className="overlay">
          <button className="favorite" onClick={favoriteClick}>
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
