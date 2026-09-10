import { Link } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaStar } from "react-icons/fa";
import { useWatchlist } from "../../Context/WatchlistContext";
import RatingBadge from "../ui/RatingBadge";

export default function MovieCard({ movie, index, sectionTitle }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie);

  const toggleWatchlist = (e) => {
    e.preventDefault(); 
    if (saved) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
  };

  const detailPath = movie.title ? `/movie/${movie.id}` : `/series/${movie.id}`;
  const delay = Math.min(index ?? 0, 10) * 60; // ms, capped stagger

  return (
    <Link
      to={detailPath}
      className="group flex flex-col bg-transparent rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800 rounded-2xl shadow-md">
        {sectionTitle === "TOP 10 Today" && index !== undefined && (
          <div className="absolute top-2.5 left-2.5 z-20 bg-blue-100 text-blue-800 font-black text-[10px] px-2 py-0.5 rounded-md shadow-lg tracking-wider">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
        )}

        <img 
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"} 
          alt={movie.title || movie.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <button
          onClick={toggleWatchlist}
          aria-label="Save to Watchlist"
          className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all cursor-pointer z-10 border border-white/20"
        >
          {saved ? (
            <FaBookmark className="w-4 h-4 text-blue-400" />
          ) : (
            <FaRegBookmark className="w-4 h-4 text-white hover:text-blue-400" />
          )}
        </button>
      </div>

      <div className="flex flex-col flex-grow py-3 px-1">
  <div className="flex items-start justify-between gap-2">
    <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
      {movie.title || movie.name}
    </h3>
    <RatingBadge 
      voteAverage={movie.vote_average} 
      className="relative bottom-auto left-auto flex-shrink-0 scale-90 origin-top-right" 
    />
  </div>
  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
    {movie.release_date ? movie.release_date.split("-")[0] : (movie.first_air_date ? movie.first_air_date.split("-")[0] : "N/A")}
  </p>
</div>
    </Link>
  );
}