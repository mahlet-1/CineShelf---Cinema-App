import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

export default function MovieRow({ movies, title, loading }) {
  const scrollRef = useRef(null);

  if (!loading && (!movies || movies.length === 0)) return null;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative group/section mb-10">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-cinema-text">
            {title}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white transition-colors cursor-pointer"
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white transition-colors cursor-pointer"
            >
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-5 pb-4 pt-1 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loading || !movies || movies.length === 0 ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="min-w-[180px] w-[180px] flex-shrink-0">
              <SkeletonCard />
            </div>
          ))
        ) : (
          movies.map((movie, index) => (
            <div key={movie.id} className="min-w-[180px] w-[180px] flex-shrink-0">
              <MovieCard movie={movie} index={index} sectionTitle={title} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}