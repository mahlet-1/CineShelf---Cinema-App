import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaStar } from "react-icons/fa";
import { useNotification } from "../Context/NotificationContext";
import { useWatchlist } from "../Context/WatchlistContext";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("search") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        if (data && data.results) {
          const filtered = data.results.filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          );
          setResults(filtered);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const toggleSave = (item, e) => {
    e.preventDefault();
    const title = item.title || item.name;
    
    if (isInWatchlist(item)) {
      removeFromWatchlist(item);
      addNotification(`Removed "${title}" from watchlist`);
    } else {
      addToWatchlist(item);
      addNotification(`Added "${title}" to watchlist`);
    }
  };
  
  return (
    <div className="px-6 md:px-16 py-8 flex flex-col min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <h1 className="text-2xl font-black mb-6 tracking-wide text-slate-900 dark:text-white">
        Search Results for "{query}"
      </h1>

      {loading && (
        <div className="text-slate-500 dark:text-neutral-400 py-20 text-center text-sm">Searching CineShelf...</div>
      )}

      {!loading && results.length === 0 && query && (
        <div className="text-slate-500 dark:text-neutral-400 py-20 text-center text-sm">
          No movies or TV shows found matching "{query}".
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((item, index) => {
            const title = item.title || item.name;
            const releaseDate = item.release_date || item.first_air_date;
            const year = releaseDate ? releaseDate.split("-")[0] : "N/A";
            const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
            const saved = isInWatchlist(item);
            const delay = Math.min(index, 10) * 60;
            const detailPath = item.media_type === "tv" ? `/series/${item.id}` : `/movie/${item.id}`;
            return (
            <div
            key={item.id}
            onClick={() => navigate(detailPath)}
            className="group flex flex-col bg-white dark:bg-neutral-900/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-lg opacity-0 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${delay}ms` }}
            >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
                  {item.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 dark:text-neutral-500">
                      No Image
                    </div>
                  )}

                  <button
                    onClick={(e) => toggleSave(item, e)}
                    aria-label="Save to Watchlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all cursor-pointer border border-white/10"
                  >
                    {saved ? (
                      <FaBookmark className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <FaRegBookmark className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {title}
                    </h2>
                    
                    <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-neutral-400 mb-2">
                      <span className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-400 font-semibold">
                        <FaStar className="w-3 h-3" />
                        <span>{rating}</span>
                      </span>
                      <span>•</span>
                      <span>{year}</span>
                    </div>
                  </div>

                  <span className="self-start text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/5">
                    {item.media_type === "tv" ? "TV Show" : "Movie"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}