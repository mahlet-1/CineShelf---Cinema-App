import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("light", isDarkMode);
  };

  const linkStyle = (path) => 
    `transition-colors text-white hover:text-blue-400 text-sm font-semibold ${
      isActive(path) ? "border-b-2 border-blue-400 pb-1" : ""
    }`;

  return (
    <header className="w-full flex items-center justify-between px-10 py-6 bg-black/40 backdrop-blur-xl border-b border-white/10 text-white shrink-0 z-25">
      <span className="text-lg font-black tracking-wider text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.75)]">
        CineShelf
      </span>

      <nav className="flex items-center space-x-8">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/movies" className={linkStyle("/movies")}>Movies</Link>
        <Link to="/series" className={linkStyle("/series")}>Series</Link>
      </nav>

      <div className="flex flex-row items-center space-x-6">
        <Link to="/saved" className={linkStyle("/saved")}>Watchlist</Link>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-blue-400/40 text-xs font-bold text-white transition-all border border-white/10 cursor-pointer flex items-center space-x-1.5"
        >
          <span>{isDarkMode ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}