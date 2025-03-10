"use client";
import React, { useEffect, useState } from "react";
import { Header } from "./_components/Header";
import { Filters } from "./_components/Filters";
import { RoomCard } from "./_components/RoomCard";
import { Notification } from "./_components/Notification";
import { BookingModal } from "./_components/BookingModal";

import {
  facilityIcons,
  generateTimeSlots,
  getAvailableRooms,
} from "./_components/roomdata";
import { fetchRooms } from "@/lib/user/rooms";

export default function AvailableRoomsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);
  const [rooms, setRooms] = useState([]);

  const [bookingForm, setBookingForm] = useState({
    activityType: "",
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    participants: "",
    duration: "",
    hasOutsideParticipants: false,
    hasCatering: false,
    requesterName: "",
    serviceDivision: "",
    contactNumber: "",
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

  const timeSlots = generateTimeSlots();
  const roomImages = {};
  const filteredRooms =
    activeFilter === "all"
      ? rooms
      : activeFilter === "available"
      ? rooms.filter((room) => room.isAvailable === 1)
      : rooms.filter((room) => favorites.includes(room.room_id));

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

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;

    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");

    return new Date(year, month - 1, day, hours, minutes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDateTime = combineDateTime(
      bookingForm.startDate,
      bookingForm.startTime
    );
    const endDateTime = combineDateTime(
      bookingForm.endDate,
      bookingForm.endTime
    );

    console.log("Booking Form Data:", {
      room: selectedRoom,
      ...bookingForm,
      startDateTime,
      endDateTime,
    });

    setIsModalOpen(false);
    setNotification({
      type: "success",
      message: `${selectedRoom.room_name} booked successfully!`,
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
      <Header />
      <Filters setActiveFilter={setActiveFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.room_id}
            room={{
              ...room,
              id: room.room_id,
              name: room.room_name,
              status:
                room.isAvailable === 1
                  ? "Available"
                  : room.isAvailable === 2
                  ? "In Use"
                  : room.isAvailable === 3
                  ? "Unavailable"
                  : "",
              facilities: room.facilities.split(", "),
            }}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            handleBookNow={handleBookNow}
            facilityIcons={facilityIcons}
            roomImages={roomImages}
          />
        ))}
      </div>

      <Notification notification={notification} />

      {selectedRoom && (
        <BookingModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedRoom={selectedRoom}
          facilityIcons={facilityIcons}
          timeSlots={timeSlots}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmit={handleSubmit}
          roomImages={roomImages}
        />
      )}
    </>
  );
}
