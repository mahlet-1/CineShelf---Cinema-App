import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import WatchList from "./pages/WatchList";
import NotFound from "./pages/NotFound";
import Toast from "./Components/ui/Toast";
import { NotificationProvider } from "./Context/NotificationContext";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";
import { WatchlistProvider } from "./Context/WatchlistContext";

function AppShell() {
  const { isDarkMode } = useTheme();

  return (
    <BrowserRouter>
      <Toast />
      <div
        className={`w-screen min-h-screen flex flex-col selection:bg-blue-400 selection:text-black transition-colors duration-300 ${
          isDarkMode ? "bg-cinema-bg text-cinema-text" : "bg-slate-50 text-slate-800"
        }`}
      >
        <Navbar />
        <main className="flex-1 px-6 md:px-16 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Browse />} />
            <Route path="/series" element={<Browse />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/series/:id" element={<MovieDetail />} />
            <Route path="/saved" element={<Watchlist />} />
            <Route path="/profile" element={<h1 className="text-2xl font-bold">Profile</h1>} />
            <Route path="*" element={<NotFound />} />
          
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <WatchlistProvider>
          <AppShell />
        </WatchlistProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}