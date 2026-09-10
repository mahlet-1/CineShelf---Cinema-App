import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-6xl font-black tracking-widest text-slate-900 dark:text-white">404</h1>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white">Page not found</h2>
      <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-sm">
        Oops! The page or title you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-2 px-6 py-2.5 rounded-xl bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold transition-all cursor-pointer"
      >
        Back to Home
      </Link>
    </div>
  );
}