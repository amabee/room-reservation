"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  Settings,
  ChevronRight,
  LogOut,
  BookOpen,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/admin", title: "Dashboard", icon: Home },
  { href: "/admin/room", title: "Rooms", icon: Home
    
   },
  // { href: "/admin/approval", title: "Approvals", icon: CheckCheck },
  { href: "/admin/reservation", title: "Reservations", icon: BookOpen },
  { href: "/admin/usermanagement", title: "User Management", icon: Users },
  { href: "/admin/settings", title: "Settings", icon: Settings },
];

export function AppSidebar({ sidebarOpen, setSidebarOpen, darkMode }) {
  return (
    <motion.div
      initial={{ width: sidebarOpen ? 240 : 80 }}
      animate={{ width: sidebarOpen ? 240 : 80 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed left-0 top-0 h-screen z-40 flex flex-col",
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <motion.div
          initial={{ opacity: sidebarOpen ? 1 : 0 }}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {sidebarOpen && (
            <img src="/logo1.png" alt="Logo" className="w-64 h-auto" />
          )}
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <ChevronRight
            className={cn(
              "h-6 w-6 transition-transform",
              !sidebarOpen && "rotate-180"
            )}
          />
        </Button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors",
                    darkMode
                      ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <motion.span
                    initial={{
                      opacity: sidebarOpen ? 1 : 0,
                      display: sidebarOpen ? "inline-block" : "none",
                    }}
                    animate={{
                      opacity: sidebarOpen ? 1 : 0,
                      display: sidebarOpen ? "inline-block" : "none",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      <div className="p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-full justify-start rounded-lg px-3 py-2",
                  darkMode
                    ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                )}
              >
                <LogOut className="h-5 w-5" />
                <motion.span
                  initial={{
                    opacity: sidebarOpen ? 1 : 0,
                    display: sidebarOpen ? "inline-block" : "none",
                  }}
                  animate={{
                    opacity: sidebarOpen ? 1 : 0,
                    display: sidebarOpen ? "inline-block" : "none",
                  }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  Logout
                </motion.span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
