import { useState, useEffect } from "react";
import { useMovies } from "../Hooks/useMovies";
import { FaPlay, FaInfoCircle, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieRow from "../Components/movie/MovieRow";

export default function Home() {
  const { data: trendingMovies, loading: trendingLoading } = useMovies("/trending/movie/day");
  const { data: popularMovies, loading: popularLoading } = useMovies("/movie/popular");
  const { data: popularSeries, loading: seriesLoading } = useMovies("/tv/popular");
  const { data: topRatedMovies, loading: topRatedLoading } = useMovies("/movie/top_rated");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!trendingMovies || trendingMovies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(trendingMovies.length, 5));
    }, 5000);
    return () => clearInterval(timer);
  }, [trendingMovies]);

  const loading = trendingLoading || popularLoading || seriesLoading || topRatedLoading;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200 animate-pulse">
          Loading CineShelf...
        </p>
      </div>
    );
  }

  const heroMovies = trendingMovies?.slice(0, 5) || [];
  const currentHero = heroMovies[currentIndex] || trendingMovies?.[0];

  return (
    <div className="space-y-12 pb-12">
      {currentHero && (
        <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xl border border-slate-200 dark:border-white/10 group transition-colors duration-300">
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? heroMovies.length - 1 : prev - 1))}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md cursor-pointer"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % heroMovies.length)}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md cursor-pointer"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute inset-0 z-0">
            {heroMovies.map((movie, index) => (
              <div 
                key={movie.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img 
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} 
                  alt={movie.title || movie.name}
                  className="w-full h-full object-cover scale-105"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-40/60 dark:from-neutral-900 dark:via-neutral-900/80 to-transparent z-20"></div>
          </div>

          <div className="relative z-30 p-8 md:p-14 max-w-2xl flex flex-col items-start justify-end min-h-[440px]">
            <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-neutral-400 mb-3">
              TRENDING THIS WEEK
            </span>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-relaxed mb-3 text-slate-900 dark:text-white uppercase">
              {currentHero.title || currentHero.name}
            </h1>

            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600 dark:text-neutral-300 mb-4">
              <div className="flex items-center space-x-1 text-yellow-600">
                <FaStar className="w-3 h-3" />
                <span>{currentHero.vote_average ? currentHero.vote_average.toFixed(1) : "N/A"}</span>
              </div>
              <span>•</span>
              <span>{currentHero.release_date ? currentHero.release_date.split("-")[0] : (currentHero.first_air_date ? currentHero.first_air_date.split("-")[0] : "N/A")}</span>
              <span>•</span>
              <span>Movie</span>
            </div>

            <p className="text-slate-600 dark:text-neutral-300 text-xs md:text-sm line-clamp-3 mb-8 leading-relaxed">
              {currentHero.overview}
            </p>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg cursor-pointer">
                <FaPlay className="w-3.5 h-3.5 fill-current" />
                <span>Play</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-900 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white font-semibold backdrop-blur-md border border-slate-300 dark:border-white/20 transition-all cursor-pointer">
                <FaInfoCircle className="w-3.5 h-3.5" />
                <span>See more</span>
              </button>
            </div>

            <div className="absolute bottom-6 right-8 flex space-x-2 z-20">
              {heroMovies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === index ? "w-6 bg-slate-900 dark:bg-white" : "w-1.5 bg-slate-400 dark:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <MovieRow movies={trendingMovies?.slice(0, 10)} title="TOP 10 Today" />
      <MovieRow movies={popularMovies} title="Popular Movies" />
      <MovieRow movies={popularSeries} title="Popular TV Series" />
      <MovieRow movies={topRatedMovies} title="Top Rated Movies" />
    </div>
  );
}