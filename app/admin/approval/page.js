"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  Plus,
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
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
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
  const [newRoomForm, setNewRoomForm] = useState({
    name: "",
    capacity: "",
    location: "",
    facilities: [],
    status: "Available",
    nextAvailable: "Now",
  });

  // Access dark mode from localStorage or context if needed
  const darkMode =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  // Mock data for available rooms with enhanced details
  const [availableRooms, setAvailableRooms] = useState([
    {
      id: 1,
      name: "Conference Room A",
      capacity: 20,
      facilities: ["Projector", "Whiteboard", "Video Conference", "WiFi"],
      status: "Available",
      nextAvailable: "Now",
      location: "3rd Floor, East Wing",
    },
    {
      id: 2,
      name: "Meeting Room B",
      capacity: 20,
      facilities: ["Projector", "Whiteboard", "Video Conference", "WiFi"],
      status: "Available",
      nextAvailable: "Now",
      location: "3rd Floor, East Wing",
    },
    {
      id: 3,
      name: "Board Room",
      capacity: 12,
      facilities: ["Projector", "Video Conference", "Catering", "WiFi"],
      status: "Available",
      nextAvailable: "2:00 PM",
      location: "4th Floor, Executive Suite",
    },
  ]);

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

  const handleNewRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (facility) => {
    setNewRoomForm((prev) => {
      if (prev.facilities.includes(facility)) {
        return {
          ...prev,
          facilities: prev.facilities.filter((f) => f !== facility),
        };
      } else {
        return {
          ...prev,
          facilities: [...prev.facilities, facility],
        };
      }
    });
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

  const handleAddRoom = (e) => {
    e.preventDefault();
    const newRoom = {
      id: availableRooms.length + 1,
      ...newRoomForm,
      capacity: parseInt(newRoomForm.capacity),
    };
    
    setAvailableRooms([...availableRooms, newRoom]);
    setIsAddRoomModalOpen(false);
    setNewRoomForm({
      name: "",
      capacity: "",
      location: "",
      facilities: [],
      status: "Available",
      nextAvailable: "Now",
    });
    
    // Show success notification
    setNotification({
      type: "success",
      message: `${newRoom.name} added successfully!`,
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
        
        <h1 className="text-3xl font-bold">Pending Approvals</h1>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col gap-2">
          <div
            className={cn(
              "relative rounded-md shadow-sm",
              darkMode ? "bg-gray-800" : "bg-white"
            )}
          >
          </div>
        </div>
      </div>
      {/* Room Cards */}
        <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card
            key={room.id}
            className={cn(
              "overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1",
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            )}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute top-0 right-0 m-2 z-10"></div>
              <Image
                src={roomImages[room.name] || "/api/placeholder/600/400"}
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
                  <Users className={cn("h-4 w-4", darkMode ? "text-gray-400" : "text-gray-500")} />
                  <span className={cn("text-sm", darkMode ? "text-gray-300" : "text-gray-700")}>
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
                <MapPin className={cn("h-4 w-4", darkMode ? "text-gray-400" : "text-gray-500")} />
                <span className={cn("text-sm", darkMode ? "text-gray-300" : "text-gray-700")}>
                  {room.location}
                </span>
              </div>

              <div className="mb-3">
                <div className={cn("text-sm mb-2", darkMode ? "text-gray-300" : "text-gray-700")}>Facilities:</div>
                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((facility, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="outline"
                            className={cn(
                              "flex items-center gap-1 py-1",
                              darkMode ? "border-gray-700 bg-gray-700" : "border-gray-200 bg-gray-50"
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

              {room.status !== "Available" && (
                <div className={cn("text-sm mb-3", darkMode ? "text-gray-300" : "text-gray-700")}>
                  {room.nextAvailable}
                </div>
              )}

              <div className="flex justify-end">
              <Button variant="default" className="bg-red-500 text-white hover:bg-red-600">
  Decline
</Button>

<Button variant="default" className="bg-green-500 text-white hover:bg-green-600 ms-2">
  Accept
</Button>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CardFooter>
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
  </Card>


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

      {/* Add New Room Modal */}
      <Dialog open={isAddRoomModalOpen} onOpenChange={setIsAddRoomModalOpen}>
        <DialogContent
          className={cn(
            "max-w-2xl",
            darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white"
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-500" />
              Add New Room
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddRoom} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Room Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Conference Room C"
                  value={newRoomForm.name}
                  onChange={handleNewRoomInputChange}
                  required
                  className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="e.g. 12"
                  value={newRoomForm.capacity}
                  onChange={handleNewRoomInputChange}
                  required
                  className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. 2nd Floor, West Wing"
                  value={newRoomForm.location}
                  onChange={handleNewRoomInputChange}
                  required
                  className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Facilities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.keys(facilityIcons).map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox
                        id={`facility-${facility}`}
                        checked={newRoomForm.facilities.includes(facility)}
                        onCheckedChange={() => handleFacilityChange(facility)}
                      />
                      <Label
                        htmlFor={`facility-${facility}`}
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        {facilityIcons[facility]}
                        {facility}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div> 
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}