import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBirthdayCake, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useMovies } from "../Hooks/useMovies";

export default function CelebrityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const { data: person, loading, error } = useMovies(`/person/${id}`);
  const { data: credits, loading: creditsLoading } = useMovies(`/person/${id}/combined_credits`);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500 dark:text-neutral-400 text-sm">
        Couldn't load this celebrity's profile. Please try again later.
      </div>
    );
  }

  const castCredits = credits?.cast?.sort((a, b) => b.popularity - a.popularity) || [];

  return (
    <div className="space-y-12 pb-12">
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xl border border-slate-200 dark:border-white/10 p-6 md:p-10 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {person.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              className="w-full md:w-64 aspect-[2/3] object-cover rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 shrink-0"
            />
          ) : (
            <div className="w-full md:w-64 aspect-[2/3] flex items-center justify-center bg-slate-100 dark:bg-neutral-800 rounded-2xl text-xs text-slate-400">
              No Photo
            </div>
          )}

          <div className="flex flex-col flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-2">
              {person.known_for_department || "Acting"}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              {person.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-neutral-300 mb-6">
              {person.birthday && (
                <div className="flex items-center space-x-1.5">
                  <FaBirthdayCake className="text-white" />
                  <span>Born {person.birthday}</span>
                </div>
              )}
              {person.place_of_birth && (
                <div className="flex items-center space-x-1.5">
                  <FaMapMarkerAlt className="text-white" />
                  <span>{person.place_of_birth}</span>
                </div>
              )}
            </div>

            {person.biography ? (
              <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 whitespace-pre-line">
                {person.biography}
              </p>
            ) : (
              <p className="text-slate-400 dark:text-neutral-500 text-sm italic mb-6">
                No biography available for {person.name}.
              </p>
            )}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white mb-6">
          Known For ({castCredits.length} Credits)
        </h2>

        {creditsLoading ? (
          <div className="text-slate-500 text-sm">Loading credits...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {castCredits.map((media, index) => {
              const title = media.title || media.name;
              const year = (media.release_date || media.first_air_date || "").split("-")[0] || "N/A";
              const detailPath = media.media_type === "tv" ? `/series/${media.id}` : `/movie/${media.id}`;
              const rating = media.vote_average ? media.vote_average.toFixed(1) : "N/A";
              const delay = Math.min(index, 10) * 50;

              return (
                <div
                  key={`${media.id}-${media.media_type || index}`}
                  onClick={() => navigate(detailPath)}
                  className="group flex flex-col bg-white dark:bg-neutral-900/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-lg cursor-pointer opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
                    {media.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-neutral-400 mt-1">
                        <span className="flex items-center space-x-1 text-yellow-500">
                          <FaStar className="w-2.5 h-2.5" />
                          <span>{rating}</span>
                        </span>
                        <span>•</span>
                        <span>{year}</span>
                      </div>
                    </div>
                    {media.character && (
                      <p className="text-[12px] text-slate-600 dark:text-neutral-300 truncate mt-2">
                        as {media.character}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}