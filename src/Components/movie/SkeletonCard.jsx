export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-transparent rounded-2xl overflow-hidden animate-pulse">
      <div className="relative aspect-[2/3] w-full bg-slate-200 dark:bg-neutral-900 rounded-2xl shadow-md" />
      <div className="flex flex-col flex-grow py-3 px-1 space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="h-4 bg-slate-200 dark:bg-neutral-800 rounded-md w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-neutral-800 rounded-md w-1/4" />
        </div>
        <div className="h-3 bg-slate-200 dark:bg-neutral-800 rounded-md w-1/3 mt-1" />
      </div>
    </div>
  );
}