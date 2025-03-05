import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
export const NotificationToast = ({ notification }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={cn(
      "fixed bottom-4 right-4 p-4 rounded-lg shadow-2xl max-w-sm z-50",
      notification.type === "success"
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white"
    )}
  >
    <div className="flex items-center gap-3">
      <div className="bg-white/20 p-2 rounded-full">
        {notification.type === "success" ? (
          <Check className="h-5 w-5" />
        ) : (
          <X className="h-5 w-5" />
        )}
      </div>
      <p className="font-medium">{notification.message}</p>
    </div>
  </motion.div>
);
