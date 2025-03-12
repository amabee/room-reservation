"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function RoomCard({
  room,
  darkMode,
  favorites,
  toggleFavorite,
  handleBookNow,
  facilityIcons,
  roomImages = {},
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1",
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
      )}
    >
      {/* Room image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_ROOT_URL}uploads/${room.room_image}`}
          alt={room.name}
          className="object-cover transition-all duration-200 hover:scale-110"
          fill
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="font-semibold text-white text-lg">{room.name}</h3>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <Users
              className={cn(
                "h-4 w-4",
                darkMode ? "text-gray-400" : "text-gray-500"
              )}
            />
            <span
              className={cn(
                "text-sm",
                darkMode ? "text-gray-300" : "text-gray-700"
              )}
            >
              {room.capacity} people
            </span>
          </div>
          <Badge
            className={
              room.status === "Available"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 pointer-events-none"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 pointer-events-none"
            }
          >
            {room.status}
          </Badge>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin
            className={cn(
              "h-7 w-7",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}
          />
          <span
            className={cn(
              "text-sm",
              darkMode ? "text-gray-300" : "text-gray-700"
            )}
          >
            {room.location}
          </span>
        </div>

        <div className="mb-3">
          <div
            className={cn(
              "text-sm mb-2",
              darkMode ? "text-gray-300" : "text-gray-700"
            )}
          >
            Facilities:
          </div>
          <div className="flex flex-wrap gap-2">
            {room.facilities.map((facility, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className={cn(
                        "flex items-center gap-1 py-1",
                        darkMode
                          ? "border-gray-700 bg-gray-700"
                          : "border-gray-200 bg-gray-50"
                      )}
                    >
                      {facilityIcons[facility] || null}
                      <span className="text-xs">{facility}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{facility} available</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* {room.status !== "Available" && (
          <div
            className={cn(
              "text-sm mb-3",
              darkMode ? "text-gray-300" : "text-gray-700"
            )}
          >
            <span className="font-medium">Next Available:</span>{" "}
            {room.nextAvailable}
          </div>
        )} */}

        <Button
          className={cn(
            "w-full mt-2 transition-all hover:scale-105",
            "bg-blue-600 hover:bg-blue-700 text-white"
          )}
          disabled={room.has_pending_reservation === 1}
          onClick={() => handleBookNow(room)}
        >
          {/* {room.has_pending_reservation === 1
            ? "Pending Reservation"
            : room.status === "Available"
            ? "Book Now"
            : "Check Later"} */}

            {room.has_pending_reservation === 1 ? "Pending Reservation" : "Book Now"}
        </Button>
      </CardContent>
    </Card>
  );
}
