"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  Home,
  Check,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  Star,
  Coffee,
  Wifi,
  Monitor,
  MapPin,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Room images mapping
const roomImages = {
  "Conference Room A": "/pic1.jpg",
  "Meeting Room B": "/pic2.jpg",
  "Board Room": "/pic3.webp",
};

// Facility icons mapping
const facilityIcons = {
  Projector: <Monitor className="h-4 w-4" />,
  Whiteboard: <MapPin className="h-4 w-4" />,
  "Video Conference": <Users className="h-4 w-4" />,
  "TV Screen": <Monitor className="h-4 w-4" />,
  WiFi: <Wifi className="h-4 w-4" />,
  Catering: <Coffee className="h-4 w-4" />,
};

export default function AvailableRoomsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    activityType: "",
    title: "",
    date: "",
    participants: "",
    startTime: "",
    duration: "",
    hasOutsideParticipants: false,
    hasCatering: false,
    requesterName: "",
    serviceDivision: "",
    contactNumber: "",
  });

  // Access dark mode from localStorage or context if needed
  const darkMode =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  // Mock data for available rooms with enhanced details
  const availableRooms = [
    {
      id: 1,
      name: "Conference Room A",
      capacity: 20,
      facilities: ["Projector", "Whiteboard", "Video Conference", "WiFi"],
      status: "Available",
      nextAvailable: "Now",
      location: "3rd Floor, East Wing",
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      name: "Meeting Room B",
      capacity: 20,
      facilities: ["Projector", "Whiteboard", "Video Conference", "WiFi"],
      status: "Available",
      nextAvailable: "Now",
      location: "3rd Floor, East Wing",
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 3,
      name: "Board Room",
      capacity: 12,
      facilities: ["Projector", "Video Conference", "Catering", "WiFi"],
      status: "Available",
      nextAvailable: "2:00 PM",
      location: "4th Floor, Executive Suite",
      rating: 4.9,
      reviews: 32,
    },
  ];

  // Filter rooms based on active filter
  const filteredRooms =
    activeFilter === "all"
      ? availableRooms
      : activeFilter === "available"
      ? availableRooms.filter((room) => room.status === "Available")
      : availableRooms.filter((room) => favorites.includes(room.id));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name) => {
    setBookingForm((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Form Data:", { room: selectedRoom, ...bookingForm });
    setIsModalOpen(false);
    // Show success notification
    setNotification({
      type: "success",
      message: `${selectedRoom.name} booked successfully!`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const toggleFavorite = (roomId) => {
    if (favorites.includes(roomId)) {
      setFavorites(favorites.filter((id) => id !== roomId));
    } else {
      setFavorites([...favorites, roomId]);
    }
  };

  // Generate time slots for booking
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      const time = `${hour}:00`;
      const isAvailable = Math.random() > 0.3;
      slots.push({ time, isAvailable });
      slots.push({ time: `${hour}:30`, isAvailable: Math.random() > 0.3 });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <>
      {/* Header with search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1
            className={cn(
              "text-2xl font-bold",
              darkMode ? "text-white" : "text-gray-900"
            )}
          >
            Welcome, John!
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

      {/* Filters - You could add these if needed */}
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="all" onClick={() => setActiveFilter("all")}>
              All Rooms
            </TabsTrigger>
            <TabsTrigger
              value="available"
              onClick={() => setActiveFilter("available")}
            >
              Available
            </TabsTrigger>
            {/* <TabsTrigger
              value="favorites"
              onClick={() => setActiveFilter("favorites")}
            >
              Favorites
            </TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card
            key={room.id}
            className={cn(
              "overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1",
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            )}
          >
            {/* Room image */}
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute top-0 right-0 m-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 text-yellow-500 hover:text-yellow-600 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(room.id);
                  }}
                >
                  <Star
                    className="h-5 w-5"
                    fill={favorites.includes(room.id) ? "currentColor" : "none"}
                  />
                </Button>
              </div>
              <Image
                src={roomImages[room.name] || "/api/placeholder/600/400"}
                alt={room.name}
                className="object-cover transition-all duration-200 hover:scale-110"
                fill
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h3 className="font-semibold text-white text-lg">
                  {room.name}
                </h3>
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
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }
                >
                  {room.status}
                </Badge>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <MapPin
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

              <div className="flex items-center gap-1 mb-3">
                <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                <span
                  className={cn(
                    "text-sm",
                    darkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  {room.rating} ({room.reviews} reviews)
                </span>
              </div>

              {room.status !== "Available" && (
                <div
                  className={cn(
                    "text-sm mb-3",
                    darkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  <span className="font-medium">Next Available:</span>{" "}
                  {room.nextAvailable}
                </div>
              )}

              <Button
                className={cn(
                  "w-full mt-2 transition-all hover:scale-105",
                  room.status === "Available"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                )}
                disabled={room.status !== "Available"}
                onClick={() => handleBookNow(room)}
              >
                {room.status === "Available" ? "Book Now" : "Check Later"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notification toast */}
      {notification && (
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
      )}

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className={cn(
            "max-w-4xl",
            darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white"
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Book {selectedRoom?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Room preview panel */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      selectedRoom
                        ? roomImages[selectedRoom.name] ||
                          "/api/placeholder/300/200"
                        : "/api/placeholder/300/200"
                    }
                    alt={selectedRoom?.name || "Room"}
                    className="object-cover"
                    fill
                  />
                </div>
              </div>

              {selectedRoom && (
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
                            darkMode
                              ? "border-gray-700 bg-gray-700"
                              : "border-gray-200"
                          )}
                        >
                          {facilityIcons[facility] || null}
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="font-medium mb-2">
                      Available time slots:
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.slice(0, 9).map((slot, index) => (
                        <Badge
                          key={index}
                          variant={slot.isAvailable ? "outline" : "secondary"}
                          className={cn(
                            "text-center cursor-pointer",
                            slot.isAvailable
                              ? darkMode
                                ? "hover:bg-blue-900/30 hover:border-blue-700"
                                : "hover:bg-blue-50 hover:border-blue-200"
                              : darkMode
                              ? "opacity-50 bg-gray-700"
                              : "opacity-50"
                          )}
                          onClick={() => {
                            if (slot.isAvailable) {
                              setBookingForm((prev) => ({
                                ...prev,
                                startTime: slot.time,
                              }));
                            }
                          }}
                        >
                          {slot.time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Booking form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activityType">Type of Activity</Label>
                    <Input
                      id="activityType"
                      name="activityType"
                      value={bookingForm.activityType}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      placeholder="Meeting, Conference, Training..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={bookingForm.title}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      placeholder="Project Review Meeting..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date of Activity</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="participants">Number of Participants</Label>
                    <Input
                      id="participants"
                      name="participants"
                      type="number"
                      value={bookingForm.participants}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={bookingForm.startTime}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
                      step="0.5"
                      value={bookingForm.duration}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requesterName">Name of Requester</Label>
                    <Input
                      id="requesterName"
                      name="requesterName"
                      value={bookingForm.requesterName}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceDivision">
                      Service/Division/Unit
                    </Label>
                    <Input
                      id="serviceDivision"
                      name="serviceDivision"
                      value={bookingForm.serviceDivision}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      value={bookingForm.contactNumber}
                      onChange={handleInputChange}
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="outsideParticipants"
                      checked={bookingForm.hasOutsideParticipants}
                      onCheckedChange={() =>
                        handleCheckboxChange("hasOutsideParticipants")
                      }
                    />
                    <Label htmlFor="outsideParticipants">
                      With Outside Participants
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="catering"
                      checked={bookingForm.hasCatering}
                      onCheckedChange={() =>
                        handleCheckboxChange("hasCatering")
                      }
                    />
                    <Label htmlFor="catering">With Catering Services</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      darkMode ? "border-gray-600 hover:bg-gray-700" : ""
                    }
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit Booking
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
