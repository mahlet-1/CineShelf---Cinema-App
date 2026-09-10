import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMovies } from "../Hooks/useMovies";
import MovieRow from "../Components/movie/MovieRow";

function GenreRow({ genre, contentType }) {
  const { data, loading } = useMovies(`/discover/${contentType}?with_genres=${genre.id}`);

  return (
    <div id={`genre-${genre.id}`}>
      <MovieRow movies={data} loading={loading} title={genre.name} />
    </div>
  );
}

export default function Browse() {
  const location = useLocation();
  const contentType = location.pathname.includes("/series") ? "tv" : "movie";

  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setGenres([]);
    setError(null);

    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/genre/${contentType}/list?api_key=${apiKey}`);
        const data = await response.json();

        if (response.ok && data.genres) {
          setGenres(data.genres);
        } else {
          setError(data.status_message || "Invalid API Key or Request");
        }
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        setError("Network error");
      }
    };

    fetchGenres();
  }, [contentType]);

  useEffect(() => {
    const genreId = location.state?.genreId;
    if (!genreId || genres.length === 0) return;

    const el = document.getElementById(`genre-${genreId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.state, genres]);

  return (
    <div className="space-y-12 pb-12">
      <h1 className="text-2xl font-black tracking-wide text-slate-900 dark:text-white">
        {contentType === "tv" ? "Series" : "Movies"}
      </h1>

      {error && (
        <div className="text-red-500 dark:text-red-400 text-sm">Failed to load genres: {error}</div>
      )}

      {genres.map((genre) => (
        <GenreRow key={genre.id} genre={genre} contentType={contentType} />
      ))}
    </div>
  );
}