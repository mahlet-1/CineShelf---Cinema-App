import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DashBoard() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const quickCategories = [
    { name: "Action" }, { name: "Sci-Fi" }, { name: "Romance" },
    { name: "Comedy" }, { name: "Animation" }, { name: "Horror" },
    { name: "Documentary" }, { name: "Adventure" }, { name: "Reality TV Shows" },
  ];

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden selection:bg-blue-400 selection:text-black transition-colors duration-300 ${
      isDarkMode ? "bg-cinema-bg text-cinema-text" : "bg-slate-50 text-slate-800"
    }`}>

      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="flex flex-1 overflow-hidden">

        <aside className={`w-64 border-r flex flex-col justify-between overflow-hidden shrink-0 transition-colors duration-300 ${
          isDarkMode ? "bg-black/40 border-white/10" : "bg-white border-slate-200"
        }`}>
          <div className="p-6 space-y-6 overflow-y-auto">
            <div className="space-y-1">
              <div className={`text-[10px] font-extrabold tracking-widest mb-4 px-3 ${
                isDarkMode ? "text-cinema-muted" : "text-slate-400"
              }`}>
                CATEGORIES
              </div>
              {quickCategories.map((category, index) => (
                <button 
                  key={index} 
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer font-medium text-left ${
                    isDarkMode 
                      ? "text-cinema-text hover:text-blue-400 hover:bg-blue-200/5" 
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Link 
            to="/profile" 
            className={`p-5 transition-all flex items-center space-x-3.5 border-t ${
              isDarkMode 
                ? `border-white/10 text-cinema-text hover:bg-blue-600/20 ${isActive("/profile") ? "bg-white/10" : ""}` 
                : `border-slate-200 text-slate-800 hover:bg-slate-100 ${isActive("/profile") ? "bg-slate-200" : ""}`
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 font-bold text-xs text-white">
              U
            </div>
            <div className="overflow-hidden">
              <div className="font-semibold text-sm">Username</div>
              <div className={`text-[10px] truncate ${isDarkMode ? "text-cinema-muted" : "text-slate-500"}`}>
                userexample@gmail.com
              </div>
            </div>
          </Link>
        </aside>

        <main className="flex-1 bg-transparent p-8 overflow-y-auto">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
