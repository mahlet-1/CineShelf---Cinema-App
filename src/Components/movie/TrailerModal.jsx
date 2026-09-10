import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function TrailerModal({ videoKey, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!videoKey) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}