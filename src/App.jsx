import "./css/App.css";
import MangaCard from "./components/mangadisplay";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Favorites from "./pages/FavoriteMangas";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <div>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
  </div>
  );
}

export default App;
