import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Celebrities() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelebrities = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        if (response.ok && data.results) {
          setPeople(data.results);
        } else {
          setError(data.status_message || "Failed to load celebrities");
        }
      } catch (err) {
        console.error("Error fetching celebrities:", err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  return (
    <div className="px-6 md:px-16 py-8 flex flex-col min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <h1 className="text-2xl font-black mb-6 tracking-wide text-slate-900 dark:text-white">
        Popular Celebrities
      </h1>

      {loading && (
        <div className="text-slate-500 dark:text-neutral-400 py-20 text-center text-sm">
          Loading Celebrities...
        </div>
      )}

      {error && (
        <div className="text-red-500 dark:text-red-400 py-20 text-center text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {people.map((person, index) => {
            const delay = Math.min(index, 10) * 60;
            return (
              <div
                key={person.id}
                onClick={() => navigate(`/person/${person.id}`)}
                className="group flex flex-col bg-white dark:bg-neutral-900/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-lg opacity-0 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 dark:text-neutral-500">
                      No Photo
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {person.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 truncate">
                      {person.known_for_department || "Acting"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}