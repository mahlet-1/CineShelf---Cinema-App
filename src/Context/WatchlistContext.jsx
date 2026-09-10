import { createContext, useContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useNotification } from "./NotificationContext";

const WatchlistContext = createContext();
const getKey = (item) => `${item.title ? "movie" : "tv"}-${item.id}`;

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useLocalStorage("cinema_watchlist", []);
  const { addNotification } = useNotification();

  const addToWatchlist = (movie) => {
    const key = getKey(movie);
    if (!watchlist.some((item) => getKey(item) === key)) {
      setWatchlist([...watchlist, movie]);
      addNotification(`Added "${movie.title || movie.name}" to watchlist`);
    }
  };
  const removeFromWatchlist = (movie) => {
    const key = getKey(movie);
    setWatchlist(watchlist.filter((item) => getKey(item) !== key));
    addNotification(`Removed "${movie.title || movie.name}" to watchlist`);
  };

  const isInWatchlist = (movie) => {
    const key = getKey(movie);
    return watchlist.some((item) => getKey(item) === key);
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