import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs px-10 py-10 mt-auto shrink-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
        <div className="space-y-2">
          <h2 className="text-lg font-black tracking-wider text-blue-600 dark:text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.2)] dark:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
            CineShelf
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Pull your next favorite film right off the shelves.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest text-slate-800 dark:text-white uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors font-medium">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/series" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors font-medium">
                Series
              </Link>
            </li>
            <li>
              <Link to="/saved" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors font-medium">
                Watchlist
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 dark:border-white/5 text-center md:text-left text-[11px] text-slate-400 dark:text-slate-500">
        <p>&copy; {currentYear} CineShelf. All rights reserved.</p>
      </div>
    </footer>
  );
}
