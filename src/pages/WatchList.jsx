import { Link } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { useWatchlist } from "../Context/WatchlistContext";
import MovieCard from "../Components/movie/MovieCard";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <FaRegBookmark className="w-10 h-10 text-slate-300 dark:text-neutral-700" />
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Your watchlist is empty</h1>
        <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-sm">
          Save Movies and Shows here.
        </p>
        <Link
          to="/"
          className="mt-2 px-6 py-2.5 rounded-xl bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold transition-all cursor-pointer"
        >
          Browse titles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <h1 className="text-2xl font-black tracking-wide text-slate-900 dark:text-white">
        My Watchlist
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchlist.map((movie, index) => (
          <MovieCard
            key={`${movie.title ? "movie" : "tv"}-${movie.id}`}
            movie={movie}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}