import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, MapPin, Star, StarOff, Users } from "lucide-react";
import Image from "next/image";
import { FacilityBadge } from "./FacilityBadge";
import { cn } from "@/lib/utils";
export const RoomCard = ({
  room,
  darkMode,
  favorites,
  toggleFavorite,
  handleBookNow,
  roomImages,
  facilityIcons
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 border-0",
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden group">
        <Image
          src={roomImages[room.name] || "/api/placeholder/600/400"}
          alt={room.name}
          className="object-cover transition-all duration-500 group-hover:scale-110"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Badge
            className={
              room.status === "Available"
                ? "bg-green-500 text-white hover:bg-green-600 mb-2"
                : "bg-amber-500 text-white hover:bg-amber-600 mb-2"
            }
          >
            {room.status}
          </Badge>
          <h3 className="font-bold text-white text-xl">{room.name}</h3>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Users
              className={cn(
                "h-4 w-4",
                darkMode ? "text-blue-400" : "text-blue-600"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                darkMode ? "text-gray-300" : "text-gray-700"
              )}
            >
              {room.capacity} people
            </span>
          </div>

          {room.status !== "Available" && (
            <div className="flex items-center space-x-2">
              <Clock
                className={cn(
                  "h-4 w-4",
                  darkMode ? "text-amber-400" : "text-amber-600"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  darkMode ? "text-gray-300" : "text-gray-700"
                )}
              >
                {room.nextAvailable}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mb-4">
          <MapPin
            className={cn(
              "h-4 w-4 flex-shrink-0",
              darkMode ? "text-purple-400" : "text-purple-600"
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

        <div className="mb-4">
          <div
            className={cn(
              "text-xs uppercase tracking-wider font-semibold mb-2",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}
          >
            Facilities
          </div>
          <div className="flex flex-wrap gap-2">
            {room.facilities.map((facility, index) => (
              <FacilityBadge
                key={index}
                facility={facility}
                darkMode={darkMode}
                facilityIcons={facilityIcons}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="mr-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
            onClick={() => handleBookNow(room)}
          >
            Book Now
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
