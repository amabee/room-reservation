"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Users,
  Coffee,
  Wifi,
  Monitor,
  Plus,
  BookOpen,
  Bluetooth,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { AnimatePresence } from "framer-motion";
import { PageHeader } from "../_components/RoomPageHeader";
import { NotificationToast } from "../_components/RoomNotification";
import { RoomCard } from "../_components/RoomCards";
import { AddRoomModal } from "../_components/AddRoomModal";
import { fetchRooms } from "@/lib/rooms";
import { EmptyResults } from "../_components/EmptyResults";

const roomImages = {
  "Conference Room A": "/pic1.jpg",
  "Meeting Room B": "/pic2.jpg",
  "Board Room": "/pic3.webp",
  "Conference Room": "/pic1.jpg",
};

// Facility icons mapping
const facilityIcons = {
  Projector: <Monitor className="h-4 w-4" />,
  Whiteboard: <BookOpen className="h-4 w-4" />,
  "Video Conference": <Users className="h-4 w-4" />,
  "TV Screen": <Monitor className="h-4 w-4" />,
  WiFi: <Wifi className="h-4 w-4" />,
  Catering: <Coffee className="h-4 w-4" />,
  Microphone: <Users className="h-4 w-4" />,
  "Air Conditioning": <Wifi className="h-4 w-4" />,
  "Bluetooth Speakers": <Bluetooth className="h-4 w-4" />,
};

// Main component
export default function RoomsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [rooms, setRooms] = useState([]);

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

  const getAllRooms = async () => {
    const { success, data, message } = await fetchRooms();

    if (!success) {
      console.log(data);
      return alert(message);
    }

    setRooms(data);
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const darkMode =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  // Filter rooms based on search query and active filter
  const filteredRooms = rooms
    .filter((room) => {
      if (searchQuery) {
        return (
          room.room_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter((room) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "available") return room.isAvailable === 1;
      if (activeFilter === "favorites")
        return favorites.includes(room.room_name);
      return true;
    });

  const handleNewRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomForm((prev) => ({ ...prev, [name]: value }));
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
    setBookingForm((prev) => ({ ...prev, [name]: !prev[name] }));
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
      room_name: newRoomForm.name,
      capacity: parseInt(newRoomForm.capacity),
      location: newRoomForm.location,
      facilities: newRoomForm.facilities.join(", "),
      isAvailable: 1,
      addedBy: 1, // You might want to set this dynamically
    };

    // You'll need to add API call to save the new room here
    // After successful API call:
    setRooms([...rooms, newRoom]);
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
      message: `${newRoom.room_name} added successfully!`,
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

  return (
    <>
      <PageHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Tabs for filtering */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveFilter}>
        <TabsList className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            All Rooms
          </TabsTrigger>
          <TabsTrigger
            value="available"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Available
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Room Cards */}
      <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="flex justify-between items-center p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsAddRoomModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Room
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.room_name}
              room={{
                id: room.room_name,
                name: room.room_name,
                capacity: room.capacity,
                facilities: room.facilities ? room.facilities.split(", ") : [],
                status: room.isAvailable === 1 ? "Available" : "Unavailable",
                nextAvailable: "Now",
                location: room.location,
              }}
              darkMode={darkMode}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handleBookNow={handleBookNow}
              roomImages={roomImages}
              facilityIcons={facilityIcons}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <EmptyResults setIsAddRoomModalOpen={setIsAddRoomModalOpen} />
        )}

        <CardFooter className="border-t border-gray-200 dark:border-gray-700 p-4">
          <Pagination className="mx-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  isActive
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className="hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {notification && <NotificationToast notification={notification} />}
      </AnimatePresence>

      {/* Add New Room Modal */}
      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        setIsOpen={setIsAddRoomModalOpen}
        newRoomForm={newRoomForm}
        handleNewRoomInputChange={handleNewRoomInputChange}
        handleFacilityChange={handleFacilityChange}
        handleAddRoom={handleAddRoom}
        darkMode={darkMode}
        facilityIcons={facilityIcons}
      />
    </>
  );
}
