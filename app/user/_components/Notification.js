"use client";
import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Notification({ notification }) {
  if (!notification) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 p-4 rounded-md shadow-lg max-w-sm transition-all animate-in slide-in-from-bottom-5 z-50",
        notification.type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      )}
    >
      <div className="flex items-center gap-2">
        {notification.type === "success" ? (
          <Check className="h-5 w-5" />
        ) : (
          <X className="h-5 w-5" />
        )}
        <p>{notification.message}</p>
      </div>
    </div>
  );
}
