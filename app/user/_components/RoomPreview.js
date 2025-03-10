"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function RoomPreview({
  selectedRoom,
  darkMode,
  facilityIcons,
  setBookingForm,
  roomImages = {},
}) {
  if (!selectedRoom) return null;

  return (
    <div className="md:col-span-1">
      <div className="rounded-md overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_ROOT_URL}uploads/${selectedRoom.room_image}`}
            alt={selectedRoom.name || "Room"}
            className="object-cover"
            fill
          />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <span>Capacity: {selectedRoom.capacity} people</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span>{selectedRoom.location}</span>
        </div>

        <div>
          <div className="font-medium mb-2">Facilities:</div>
          <div className="flex flex-wrap gap-2">
            {selectedRoom.facilities.map((facility, index) => (
              <Badge
                key={index}
                variant="outline"
                className={cn(
                  "flex items-center gap-1",
                  darkMode ? "border-gray-700 bg-gray-700" : "border-gray-200"
                )}
              >
                {facilityIcons[facility] || null}
                {facility}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
