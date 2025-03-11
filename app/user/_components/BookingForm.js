// File: components/RoomBooking/BookingModal/BookingForm.jsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function BookingForm({
  bookingForm,
  handleInputChange,
  handleCheckboxChange,
  handleSubmit,
  setIsModalOpen,
  darkMode,
  isCreating,
}) {
  return (
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
            <Label htmlFor="startDate">Activity Start Date/Time</Label>
            <div className="flex space-x-2">
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={bookingForm.startDate}
                onChange={handleInputChange}
                className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                required
              />
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Activity End Date/Time</Label>
            <div className="flex space-x-2">
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={bookingForm.endDate}
                onChange={handleInputChange}
                className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                required
              />
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={bookingForm.endTime || ""}
                onChange={handleInputChange}
                className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                required
              />
            </div>
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

          {/* <div className="space-y-2">
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
          </div> */}

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
            <Label htmlFor="serviceDivision">Service/Division/Unit</Label>
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
              onCheckedChange={() => handleCheckboxChange("hasCatering")}
            />
            <Label htmlFor="catering">With Catering Services</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            className={darkMode ? "border-gray-600 hover:bg-gray-700" : ""}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isCreating}
          >
            {isCreating ? "Submitting..." : " Submit Booking"}
          </Button>
        </div>
      </form>
    </div>
  );
}
