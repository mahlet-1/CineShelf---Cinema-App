import { FaStar } from "react-icons/fa";

export default function RatingBadge({ voteAverage, className = "absolute bottom-3 left-3 z-10" }) {
  if (!voteAverage) return null;

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 text-neutral-300 text-xs font-semibold ${className}`}>
      <FaStar className="w-3 h-3 text-yellow-400" />
      <span>{voteAverage.toFixed(1)}</span>
    </div>
  );
}