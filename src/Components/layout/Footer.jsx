import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-xl text-neutral-400 text-xs px-10 py-10 mt-auto shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
        <div className="space-y-2">
          <h2 className="text-lg font-black tracking-wider text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
            CineShelf
          </h2>
          <p className="text-neutral-400 text-xs">
            Pull your next favorite film right off the shelves.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest text-white uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:text-white transition-colors">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/series" className="hover:text-white transition-colors">
                Series
              </Link>
            </li>
            <li>
              <Link to="/saved" className="hover:text-white transition-colors">
                Watchlist
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 text-center md:text-left text-[11px] text-neutral-500">
        <p>&copy; {currentYear} CineShelf. All rights reserved.</p>
      </div>
    </footer>
  );
}