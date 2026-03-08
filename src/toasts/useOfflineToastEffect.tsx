import { useEffect, useSyncExternalStore } from "react";
import { toast } from "sonner";

const subscribe = (callback: () => void) => {
  window.addEventListener("offline", callback);
  window.addEventListener("online", callback);
  return () => {
    window.removeEventListener("offline", callback);
    window.removeEventListener("online", callback);
  };
};

const getSnapshot = () => {
  return window.navigator.onLine;
};

const getServerSnapshot = () => {
  return true;
};

const offlineToastId = "offline-toast";

export function useOfflineToastEffect() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (isOnline) {
      toast.dismiss(offlineToastId);
    } else {
      toast.warning("The app is not connected to the internet", {
        id: offlineToastId,
        duration: Number.POSITIVE_INFINITY,
        dismissible: true,
      });
    }

    return () => {
      toast.dismiss(offlineToastId);
    };
  }, [isOnline]);
}
