import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../Hooks/useDebounce";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function SearchInput({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
  if (!debouncedQuery.trim()) {
    setSuggestions([]);
    return;
  }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();
        
        if (data && data.results) {
          const filtered = data.results
            .filter((item) => item.media_type === "movie" || item.media_type === "tv")
            .slice(0, 5);
          setSuggestions(filtered);
        }
      } catch (err) {
        console.error("Live search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      if (onClose) onClose();
    }
  };


  const handleSelectMovie = (item) => {
    navigate(`/search?q=${encodeURIComponent(item.title || item.name)}`);
    if (onClose) onClose();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
        <FiSearch className="absolute left-3 w-4 h-4 text-slate-400 dark:text-neutral-500 pointer-events-none" />
        <input
          type="text"
          autoFocus
          placeholder="Search movies,series..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSuggestions([]);
            }}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer"
          >
            <IoClose className="w-4 h-4" />
          </button>
        )}
      </form>

      {searchQuery.trim() && (
        <div className="absolute top-12 left-0 right-0 max-h-96 overflow-y-auto rounded-2xl bg-neutral-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 p-2 divide-y divide-white/5">
          <div
            onClick={handleSearchSubmit}
            className="px-3 py-2.5 text-xs font-bold text-neutral-400 hover:text-white cursor-pointer transition-colors"
          >
            See all results for "{searchQuery}"
          </div>

          {loading && (
            <div className="py-4 text-center text-xs text-neutral-500">Searching...</div>
          )}

          {!loading && suggestions.length === 0 && (
            <div className="py-4 text-center text-xs text-neutral-500">No results found</div>
          )}

          {!loading && suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectMovie(item)}
              className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group"
            >
              <div className="w-10 h-14 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-white/5">
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-600">
                    N/A
                  </div>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                  {item.title || item.name}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  {item.media_type === "tv" ? "TV Show" : "Movie"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}