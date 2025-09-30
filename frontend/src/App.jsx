import "./css/App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Favorites from "./pages/FavoriteMangas";
import { MangaProvider } from "./contexts/MangaContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <MangaProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
  </MangaProvider>
  );
}

export default App;
