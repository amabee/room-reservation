// File: components/RoomBooking/BookingModal/index.jsx
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoomPreview } from "./RoomPreview";
import { BookingForm } from "./BookingForm";

export function BookingModal({
  isModalOpen,
  setIsModalOpen,
  selectedRoom,
  darkMode,
  facilityIcons,
  bookingForm,
  setBookingForm,
  handleInputChange,
  handleCheckboxChange,
  handleSubmit,
  roomImages = {},
}) {
  return (
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
          <RoomPreview
            selectedRoom={selectedRoom}
            darkMode={darkMode}
            facilityIcons={facilityIcons}
            setBookingForm={setBookingForm}
            roomImages={roomImages}
          />

          <BookingForm
            bookingForm={bookingForm}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            setIsModalOpen={setIsModalOpen}
            darkMode={darkMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
