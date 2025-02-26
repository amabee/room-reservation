"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

// Mock data for reservations
const mockReservations = [
  {
    id: 1,
    room: "Conference Room A",
    date: "2025-02-24",
    time: "09:00 AM",
    duration: "1 hour",
    status: "Confirmed",
    attendees: 8,
  },
  {
    id: 2,
    room: "Meeting Room B",
    date: "2025-02-25",
    time: "02:00 PM",
    duration: "2 hours",
    status: "Pending",
    attendees: 4,
  },
  {
    id: 3,
    room: "Board Room",
    date: "2025-02-26",
    time: "11:00 AM",
    duration: "1.5 hours",
    status: "Confirmed",
    attendees: 12,
  },
  {
    id: 4,
    room: "Huddle Space",
    date: "2025-02-27",
    time: "10:30 AM",
    duration: "30 minutes",
    status: "Declined",
    attendees: 3,
  },
  {
    id: 5,
    room: "Conference Room B",
    date: "2025-02-28",
    time: "03:00 PM",
    duration: "1 hour",
    status: "Confirmed",
    attendees: 6,
  },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(mockReservations);
  const [notification, setNotification] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHoveredId, setIsHoveredId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "calendar"

  // Show notification function
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter reservations based on search query and status filter
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.date.includes(searchQuery);
    const matchesFilter =
      filterStatus === "All" || reservation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle reservation selection
  const handleSelectReservation = (reservation) => {
    setSelectedReservation(reservation);
  };

  // Handle reservation deletion
  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter((res) => res.id !== id));
    if (selectedReservation && selectedReservation.id === id) {
      setSelectedReservation(null);
    }
    showNotification("Reservation deleted successfully");
  };

  // Get upcoming reservation (first in the list)
  const upcomingReservation = reservations.find(
    (res) =>
      res.status === "Confirmed" &&
      new Date(`${res.date}T${res.time}`) > new Date()
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Reservations</p>
                <p className="text-3xl font-bold text-blue-600">
                  {reservations.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">
                  {reservations.filter((r) => r.status === "Confirmed").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {reservations.filter((r) => r.status === "Pending").length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Upcoming Reservation */}
      {upcomingReservation && (
        <Card className="bg-gradient-to-r from-indigo-100 to-purple-100 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Next Upcoming Reservation</span>
              <Clock className="h-5 w-5 text-indigo-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {upcomingReservation.room}
                </h3>
                <div className="flex items-center mt-1 text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {upcomingReservation.date} at {upcomingReservation.time}
                  </span>
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {upcomingReservation.duration} •{" "}
                  {upcomingReservation.attendees} attendees
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search rooms or dates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 appearance-none"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                viewMode === "list"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                viewMode === "calendar"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Calendar
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </button>
        </div>
      </div>

      {/* Reservations List */}
      {viewMode === "list" && (
        <Card className="hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <CardTitle>Reservations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left p-4 font-medium text-gray-500">
                      Room
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Date
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Time
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Duration
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Attendees
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-right p-4 font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedReservation?.id === reservation.id
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => handleSelectReservation(reservation)}
                        onMouseEnter={() => setIsHoveredId(reservation.id)}
                        onMouseLeave={() => setIsHoveredId(null)}
                      >
                        <td className="p-4 font-medium">{reservation.room}</td>
                        <td className="p-4">{reservation.date}</td>
                        <td className="p-4">{reservation.time}</td>
                        <td className="p-4">{reservation.duration}</td>
                        <td className="p-4">{reservation.attendees}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              reservation.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : reservation.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reservation.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              className={`text-blue-600 hover:text-blue-800 ${
                                isHoveredId === reservation.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              } transition-opacity`}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteReservation(reservation.id);
                              }}
                              className={`text-red-600 hover:text-red-800 ${
                                isHoveredId === reservation.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              } transition-opacity`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-gray-500">
                        No reservations found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar View (Simplified for this example) */}
      {viewMode === "calendar" && (
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-medium p-2 text-gray-600"
                >
                  {day}
                </div>
              ))}

              {Array.from({ length: 35 }).map((_, index) => {
                const day = index - 3; // Offset to start month on a Wednesday
                const hasReservation = filteredReservations.some((r) => {
                  const [year, month, date] = r.date.split("-");
                  return parseInt(date) === day;
                });

                return (
                  <div
                    key={index}
                    className={`
                      border rounded-lg p-2 h-24 ${
                        day < 1 || day > 28
                          ? "bg-gray-50 text-gray-400"
                          : "hover:bg-blue-50 hover:border-blue-200"
                      } 
                      ${
                        hasReservation
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-100"
                      }
                    `}
                  >
                    <div className="text-right font-medium">
                      {day > 0 && day <= 28 ? day : ""}
                    </div>
                    {hasReservation && (
                      <div className="mt-1">
                        {filteredReservations
                          .filter((r) => {
                            const [year, month, date] = r.date.split("-");
                            return parseInt(date) === day;
                          })
                          .map((r) => (
                            <div
                              key={r.id}
                              className="text-xs p-1 mt-1 bg-white rounded truncate border-l-4 border-blue-500"
                            >
                              {r.time} - {r.room}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reservation Details Panel */}
      {selectedReservation && (
        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-md transition-shadow">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex justify-between items-center">
              <span>Reservation Details</span>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {selectedReservation.room}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{selectedReservation.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {selectedReservation.time} ({selectedReservation.duration}
                      )
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedReservation.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : selectedReservation.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedReservation.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteReservation(selectedReservation.id)
                        }
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* New Reservation Modal (simplified) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Reservation</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option>Conference Room A</option>
                  <option>Meeting Room B</option>
                  <option>Board Room</option>
                  <option>Huddle Space</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Attendees
                </label>
                <input
                  type="number"
                  min="1"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    showNotification("New reservation added successfully");
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Create Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg max-w-sm flex items-center gap-2 animate-fade-in ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border-l-4 border-green-500"
              : "bg-red-100 text-red-800 border-l-4 border-red-500"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
}