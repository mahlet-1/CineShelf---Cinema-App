import { Link, useLocation } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const linkStyle = (path) => 
    `transition-colors text-sm font-semibold ${
      isDarkMode 
        ? `text-white hover:text-blue-400 ${isActive(path) ? "border-b-2 border-blue-400 pb-1" : ""}`
        : `text-slate-700 hover:text-blue-600 ${isActive(path) ? "border-b-2 border-blue-600 pb-1" : ""}`
    }`;

  return (
    <header className={`w-full flex items-center justify-between px-10 py-6 backdrop-blur-xl border-b shrink-0 z-25 transition-colors duration-300 ${
      isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white/80 border-slate-200 text-slate-900"
    }`}>
      <span className={`text-lg font-black tracking-wider ${
        isDarkMode 
          ? "text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.75)]" 
          : "text-blue-500 drop-shadow-[0_0_5px_rgba(37,99,235,0.2)]"
      }`}>
        CineShelf
      </span>

      <nav className="flex items-center space-x-8">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/movies" className={linkStyle("/movies")}>Movies</Link>
        <Link to="/series" className={linkStyle("/series")}>Series</Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Link to="/saved" className={`flex items-center space-x-2 ${linkStyle("/saved")}`}>
          <FaBookmark className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
        </Link>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className={`p-2 rounded-full transition-all ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-slate-100"
          }`}
        >
          <span>
            {isDarkMode ? (
              <FiSun className="w-4 h-4 text-white" />
            ) : (
              <FiMoon className="w-4 h-4 text-blue-600" />
            )}
          </span>
        </button>
      </div>
    </header>
  );
}
