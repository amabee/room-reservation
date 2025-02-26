"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./_components/AppSideBar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-200",
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      )}
    >
      <div className="flex min-h-screen">
        <div
          className={cn(
            "fixed md:relative transition-all duration-300 h-screen z-10",
            sidebarOpen ? "w-64" : "w-[5px]",
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}
        >
          <AppSidebar
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </div>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300",
            sidebarOpen ? "" : "md:ml-16"
          )}
        >
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
