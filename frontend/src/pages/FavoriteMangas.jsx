import "../css/FavoriteMangas.css";
import { useMangaContext } from "../contexts/MangaContext";
import MangaCard from "../components/MangaDisplay";
function Favorites() {
  const { favoriteManga } = useMangaContext();

  if (favoriteManga) {
    return (
      <div className="favorites">
        <div className="manga-grid">
          {(favoriteManga ?? []).map((manga) => (
            <MangaCard manga={manga} key={manga.id} />
          ))}
        </div>
      </div>
    );
  }

  return <div></div>;
}

export default Favorites;
