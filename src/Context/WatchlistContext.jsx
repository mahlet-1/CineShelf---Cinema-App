import { createContext, useContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useNotification } from "./NotificationContext";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useLocalStorage("cinema_watchlist", []);
  const { addNotification } = useNotification();

  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
      addNotification(`Added "${movie.title || movie.name}" to watchlist`);
    }
  };

  const removeFromWatchlist = (id) => {
    const movie = watchlist.find((item) => item.id === id);
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
    if (movie) {
      addNotification(`Removed "${movie.title || movie.name}" from watchlist`);
    }
  };

  const isInWatchlist = (id) => {
    return watchlist.some((item) => item.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};