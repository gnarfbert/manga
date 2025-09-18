import "../css/MangaDisplay.css";
import { useMangaContext } from "../contexts/MangaContext";
import { useState } from "react";
import { getComments, getTrailer } from "../services/api";

function MangaCard({ manga }) {
  const mangaTitle = manga.title.romaji;
  const imgUrl = manga.coverImage.large;
  const releaseDate = manga.startDate.year;
  const mangaID = manga.id
  const mangaDescription = manga.description

  const {isFavorite, addToFavorite, removeFromFavorite, setIsOpen, setMangaObject, setComment} = useMangaContext();
  const favorite = isFavorite(manga.id);



  function favoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorite(manga.id);
    else addToFavorite(manga);
  }

  async function extraInfoClick(e) {
    e.preventDefault();
    setIsOpen(true)
    const trailerInfo = await getTrailer(mangaID);
    setMangaObject({id: trailerInfo.id, title: mangaTitle, baseID: mangaID})
    const comment = await getComments(mangaID)
    setComment(comment);
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
          <button className="extra-info" onClick={extraInfoClick}>≡</button>
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
