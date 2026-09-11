import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid } from "react-icons/fi";
import { FiX } from "react-icons/fi";

export default function GenreFilter({ selectedGenre, setSelectedGenre, isDarkMode, contentType, isOpen, onToggle, onClose }) {
  const [activeTab, setActiveTab] = useState("movie");
  const [genres, setGenres] = useState([]);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (contentType === "tv" || contentType === "movie") {
      setActiveTab(contentType);
    }
  }, [contentType]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/genre/${activeTab}/list?api_key=${apiKey}`);
        const data = await response.json();
        
        if (response.ok && data.genres) {
          setGenres(data.genres);
          setError(null);
        } else {
          setError(data.status_message || "Invalid API Key or Request");
        }
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        setError("Network error");
      }
    };

    if (isOpen) {
      fetchGenres();
    }
  }, [activeTab, isOpen]);

  const handleSelectGenre = (genre) => {
    if (typeof setSelectedGenre === "function") {
      setSelectedGenre(genre.id);
    }
    if (onClose) onClose();
    const path = activeTab === "tv" ? "/series" : "/movies";
    navigate(path, { state: { genreId: genre.id } });
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={onToggle}
        aria-label="Filter by Genres"
        className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
          isDarkMode ? "hover:bg-white/10 text-white" : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        <FiGrid className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-64 py-5 px-4 rounded-3xl bg-neutral-950/95 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Filter Genres</span>
            <button 
              onClick={onClose}
              aria-label="Close Genres"
              className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl mb-4">
            <button
              onClick={() => setActiveTab("movie")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === "movie" ? "bg-blue-400 text-white shadow-md" : "text-neutral-400 hover:text-white"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setActiveTab("tv")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === "tv" ? "bg-blue-400 text-white shadow-md" : "text-neutral-400 hover:text-white"
              }`}
            >
              Series
            </button>
          </div>

          <div className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase px-3 pb-2">
            {activeTab === "tv" ? "Series Genres" : "Movie Genres"}
          </div>

          {error ? (
            <div className="text-xs text-red-400 px-3 py-2">Failed: {error}</div>
          ) : genres.length === 0 ? (
            <div className="text-xs text-neutral-400 px-3 py-2">Loading genres...</div>
          ) : (
            genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleSelectGenre(genre)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  selectedGenre === genre.id 
                    ? "text-white font-bold bg-white/10" 
                    : "text-neutral-200 hover:text-white hover:bg-white/5"
                }`}
              >
                {genre.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}