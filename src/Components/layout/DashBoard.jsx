import { Link, useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DashBoard() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const quickCategories = [
    {name: "Action"},
    {name: "Sci-Fi"},
    {name: "Romance"},
    {name: "Comedy"},
    {name: "Animation"},
    {name: "Horror"},
    {name: "Documentary"},
    {name: "Adventure"},
    {name: "Reality TV Shows"},
  ];

  return (
    <div className="w-screen h-screen bg-neutral-950 text-white flex flex-col overflow-hidden selection:bg-blue-400 selection:text-black">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-black/40 border-r border-white/10 flex flex-col justify-between overflow-hidden shrink-0">
          <div className="p-6 space-y-6 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-[10px] font-extrabold tracking-widest text-white mb-4 px-3">
                CATEGORIES
              </div>
              {quickCategories.map((category, index) => (
                <button 
                  key={index} 
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs text-white hover:text-blue-400 hover:bg-blue-200/5 transition-all cursor-pointer font-medium text-left"
                >
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Link 
            to="/profile" 
            className={`p-5 hover:bg-blue-600/20 transition-all text-white flex items-center space-x-3.5 border-t border-white/10 ${
              isActive("/profile") ? "bg-white/10": ""
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 font-bold text-xs text-white">
              U
            </div>
            <div className="overflow-hidden">
              <div className="font-semibold text-sm text-white">Username</div>
              <div className="text-[10px] text-neutral-400 truncate">userexample@gmail.com</div>
            </div>
          </Link>
        </aside>

        <main className="flex-1 bg-transparent p-8 overflow-y-auto text-white">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}