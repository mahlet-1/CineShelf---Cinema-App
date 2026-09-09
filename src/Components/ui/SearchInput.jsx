import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function SearchInput({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
      <FiSearch className="absolute left-3 w-4 h-4 text-slate-400 dark:text-neutral-500 pointer-events-none" />
      <input
        type="text"
        autoFocus
        placeholder="Search movies,series..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          className="absolute right-3 text-slate-400 hover:text-slate-600 dark:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer"
        >
          <IoClose className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}