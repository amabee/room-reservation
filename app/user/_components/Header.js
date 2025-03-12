"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Header({ darkMode, name }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div>
        <h1
          className={cn(
            "text-2xl font-bold",
            darkMode ? "text-white" : "text-gray-900"
          )}
        >
          Welcome, User!
        </h1>
        <p
          className={cn(
            "text-sm mt-1",
            darkMode ? "text-gray-400" : "text-gray-500"
          )}
        >
          Find and book your perfect meeting space
        </p>
      </div>

      <div className="mt-4 md:mt-0 w-full md:w-auto flex gap-2">
        <div
          className={cn(
            "relative rounded-md shadow-sm",
            darkMode ? "bg-gray-800" : "bg-white"
          )}
        >
          <Input
            type="text"
            placeholder="Search rooms..."
            className={cn(
              "pr-10 w-full md:w-64",
              darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"
            )}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "h-5 w-5",
                darkMode ? "text-gray-400" : "text-gray-500"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
