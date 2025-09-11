import { createContext, useState, useContext, useEffect } from "react";

const MangaContext = createContext();

export const useMangaContext = () => useContext(MangaContext);

export const MangaProvider = ({ children }) => {
  const [favoriteManga, setFavorite] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) setFavorite(JSON.parse(storedFavorites));
  }, []);

  const addToFavorite = (manga) => {
    setFavorite((prev) => [...prev, manga]);
  };

  const removeFromFavorite = (mangaID) => {
    setFavorite((prev) => prev.filter((manga) => manga.id !== mangaID));
  };

  const isFavorite = (mangaID) => {
    return favoriteManga.some((manga) => manga.id === mangaID);
  };

  const values = {
    favoriteManga,
    addToFavorite,
    removeFromFavorite,
    isFavorite,
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteManga));
  }, [favoriteManga]);

  return (
    <MangaContext.Provider value={values}>{children}</MangaContext.Provider>
  );
};
