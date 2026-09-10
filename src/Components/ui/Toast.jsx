import { useNotification } from "../../Context/NotificationContext";
import { IoClose } from "react-icons/io5";

export default function Toast() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col space-y-3 items-center">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-center space-x-3 px-5 py-3 rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-white/10 text-white text-sm font-semibold shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            aria-label="Dismiss notification"
            className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <IoClose className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}