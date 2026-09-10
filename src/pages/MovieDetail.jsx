import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaPlay, FaStar, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useMovies } from "../Hooks/useMovies";
import { useWatchlist } from "../Context/WatchlistContext";
import { useNotification } from "../Context/NotificationContext";
import MovieRow from "../Components/movie/MovieRow";
import TrailerModal from "../Components/movie/TrailerModal";

export default function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();
  const contentType = location.pathname.startsWith("/series") ? "tv" : "movie";
  const { addNotification } = useNotification();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [isSaved, setIsSaved] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data, loading, error } = useMovies(`/${contentType}/${id}`);
  const { data: credits, loading: creditsLoading } = useMovies(`/${contentType}/${id}/credits`);
  const { data: videos } = useMovies(`/${contentType}/${id}/videos`);
  const { data: similar, loading: similarLoading } = useMovies(`/${contentType}/${id}/recommendations`);


  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200 animate-pulse">
          Loading details...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500 dark:text-neutral-400 text-sm">
        Couldn't load this title. Please try again later.
      </div>
    );
  }

   const trailer = videos?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const saved = isInWatchlist(data);

  const toggleWatchlist = () => {
  if (saved) {
    removeFromWatchlist(data);
  } else {
    addToWatchlist(data);
  }
};

  const title = data.title || data.name;
  const year = data.release_date
    ? data.release_date.split("-")[0]
    : data.first_air_date
    ? data.first_air_date.split("-")[0]
    : "N/A";
  const runtime = data.runtime
    ? `${data.runtime} min`
    : data.episode_run_time?.[0]
    ? `${data.episode_run_time[0]} min/ep`
    : null;

  return (
    <div className="space-y-12 pb-12">
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xl border border-slate-200 dark:border-white/10 animate-fade-in-up">
        <div className="absolute inset-0 z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path || data.poster_path}`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 dark:from-neutral-900 dark:via-neutral-900/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-neutral-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row gap-8 items-start">
          {data.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={title}
              className="hidden md:block w-48 rounded-2xl shadow-2xl border border-white/10 shrink-0"
            />
          )}

          <div className="flex flex-col max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-slate-900 dark:text-white">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 dark:text-neutral-300 mb-4">
              <div className="flex items-center space-x-1 text-yellow-600">
                <FaStar className="w-3 h-3" />
                <span>{data.vote_average ? data.vote_average.toFixed(1) : "N/A"}</span>
              </div>
              <span>•</span>
              <span>{year}</span>
              {runtime && (
                <>
                  <span>•</span>
                  <span>{runtime}</span>
                </>
              )}
            </div>

            {data.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-neutral-300 border border-slate-300 dark:border-white/10"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-8">
              {data.overview}
            </p>

            <div className="flex items-center space-x-3">
              {trailer && (
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg cursor-pointer"
                >
                  <FaPlay className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Trailer</span>
                </button>
              )}

              <button
                onClick={toggleWatchlist}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-900 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white font-semibold backdrop-blur-md border border-slate-300 dark:border-white/20 transition-all cursor-pointer"
              >
                {saved ? (
                  <FaBookmark className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <FaRegBookmark className="w-3.5 h-3.5" />
                )}
                <span>{saved ? "In Watchlist" : "Add to Watchlist"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {(creditsLoading || credits?.cast?.length > 0) && (
        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-cinema-text mb-4">
            Cast
          </h2>
          <div className="flex overflow-x-auto space-x-5 pb-4 no-scrollbar" style={{ scrollbarWidth: "none" }}>
            {creditsLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="min-w-[120px] w-[120px] flex-shrink-0 animate-pulse">
                    <div className="aspect-[2/3] w-full bg-slate-200 dark:bg-neutral-900 rounded-2xl" />
                    <div className="h-3 bg-slate-200 dark:bg-neutral-800 rounded-md w-3/4 mt-2" />
                  </div>
                ))
                : credits.cast.slice(0, 15).map((member, index) => {
                    const delay = Math.min(index, 10) * 60;
                    return (
                    <div
                    key={member.id}
                    className="min-w-[120px] w-[120px] flex-shrink-0 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${delay}ms` }}
                    >
                        <div className="aspect-[2/3] w-full overflow-hidden rounded-2xl bg-gray-800 shadow-md mb-2">
                        <img
                        src={
                        member.profile_path
                        ? `https://image.tmdb.org/t/p/w300${member.profile_path}`
                        : "https://via.placeholder.com/300x450?text=No+Photo"
                    }
                    alt={member.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {member.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 truncate">
                            {member.character}
                            </p>
                            </div>
                            );
                            })}
                            </div>
        </section>
      )}

      <MovieRow movies={similar} loading={similarLoading} title="You Might Like" />

      {isTrailerOpen && (
        <TrailerModal videoKey={trailer?.key} onClose={() => setIsTrailerOpen(false)} />
      )}
    </div>
  );
}