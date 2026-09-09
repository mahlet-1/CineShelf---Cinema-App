import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, title }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-10">
      {title && (
        <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-cinema-text mb-4">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} sectionTitle={title} />
        ))}
      </div>
    </section>
  );
}
