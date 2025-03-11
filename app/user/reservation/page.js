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
  Users,
  FileText,
  Phone,
  Mail,
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchReservations } from "@/lib/user/reservations";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [notification, setNotification] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHoveredId, setIsHoveredId] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const fetchMyReservations = async () => {
    const { success, message, data } = await fetchReservations();

    if (!success) {
      return showNotification(message, "error");
    }

    setReservations(data);
  };

  useEffect(() => {
    fetchMyReservations();
    setCalendarDays(generateCalendarDays(currentMonth));
  }, []);

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentMonth));
  }, [currentMonth]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.start_time.includes(searchQuery) ||
      reservation.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ||
      reservation.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleSelectReservation = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter((res) => res.reservation_id !== id));
    if (selectedReservation && selectedReservation.reservation_id === id) {
      setSelectedReservation(null);
    }
    showNotification("Reservation deleted successfully");
  };

  const upcomingReservation = reservations.find(
    (res) =>
      res.status.toLowerCase() === "confirmed" &&
      new Date(res.start_time) > new Date()
  );

  const extractDate = (dateTimeString) => {
    return dateTimeString.split(" ")[0];
  };

  const extractTime = (dateTimeString) => {
    const fullTime = dateTimeString.split(" ")[1];
    const [hours, minutes] = fullTime.split(":");
    const hour12 = hours % 12 || 12;
    const ampm = hours < 12 ? "AM" : "PM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatStatusDisplay = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (date) => {
    if (!date) return null;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const isDateToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "confirmed") return "border-green-500 bg-white";
    if (statusLower === "pending") return "border-yellow-500 bg-white";
    return "border-red-500 bg-white";
  };

  const generateCalendarDays = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const firstDay = new Date(year, monthIndex, 1);

    const lastDay = new Date(year, monthIndex + 1, 0);

    const firstDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, monthIndex, day));
    }

    const remainingSlots = 42 - days.length;
    for (let i = 0; i < remainingSlots; i++) {
      days.push(null);
    }

    return days;
  };

  return (
    <div className="space-y-6">
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
              placeholder="Search rooms, dates or titles..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
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
                      Title
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Room
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Start
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      End
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Duration
                    </th>
                    <th className="text-left p-4 font-medium text-gray-500">
                      Participants
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
                        key={reservation.reservation_id}
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedReservation?.reservation_id ===
                          reservation.reservation_id
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => handleSelectReservation(reservation)}
                        onMouseEnter={() =>
                          setIsHoveredId(reservation.reservation_id)
                        }
                        onMouseLeave={() => setIsHoveredId(null)}
                      >
                        <td className="p-4 font-medium">{reservation.title}</td>
                        <td className="p-4">{reservation.room}</td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span>{extractDate(reservation.start_time)}</span>
                            <span className="text-gray-500 text-xs">
                              {extractTime(reservation.start_time)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span>{extractDate(reservation.end_time)}</span>
                            <span className="text-gray-500 text-xs">
                              {extractTime(reservation.end_time)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {calculateDuration(
                            reservation.start_time,
                            reservation.end_time
                          )}
                        </td>
                        <td className="p-4">{reservation.numOfParticipants}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              reservation.status.toLowerCase() === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : reservation.status.toLowerCase() === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {formatStatusDisplay(reservation.status)}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              className={`text-blue-600 hover:text-blue-800 ${
                                isHoveredId === reservation.reservation_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              } transition-opacity`}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteReservation(
                                  reservation.reservation_id
                                );
                              }}
                              className={`text-red-600 hover:text-red-800 ${
                                isHoveredId === reservation.reservation_id
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
                      <td colSpan="8" className="p-4 text-center text-gray-500">
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
            <CardTitle className="flex justify-between items-center">
              <span>Calendar View</span>
              <div className="flex items-center space-x-2">
                <button
                  className="p-1 rounded-lg hover:bg-blue-100"
                  onClick={() => {
                    const newDate = new Date(currentMonth);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentMonth(newDate);
                  }}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <span className="font-medium">
                  {new Date(currentMonth).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  className="p-1 rounded-lg hover:bg-blue-100"
                  onClick={() => {
                    const newDate = new Date(currentMonth);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentMonth(newDate);
                  }}
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </CardTitle>
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

              {calendarDays.map((date, index) => {
                const formattedDate = date ? formatDate(date) : null;
                const reservationsForDay = filteredReservations.filter(
                  (r) => date && extractDate(r.start_time) === formattedDate
                );
                const isCurrentMonth =
                  date && date.getMonth() === currentMonth.getMonth();
                const isToday = date && isDateToday(date);

                return (
                  <div
                    key={index}
                    className={`
                border rounded-lg p-2 h-24 overflow-auto ${
                  !date || !isCurrentMonth
                    ? "bg-gray-50 text-gray-400"
                    : isToday
                    ? "border-blue-400 bg-blue-50"
                    : "hover:bg-blue-50 hover:border-blue-200"
                } 
                ${
                  reservationsForDay.length > 0 && isCurrentMonth
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-100"
                }
              `}
                  >
                    <div
                      className={`text-right font-medium ${
                        isToday ? "text-blue-600" : ""
                      }`}
                    >
                      {date ? date.getDate() : ""}
                    </div>
                    {date &&
                      isCurrentMonth &&
                      reservationsForDay.length > 0 && (
                        <div className="mt-1">
                          {reservationsForDay.slice(0, 3).map((r) => (
                            <div
                              key={r.reservation_id}
                              className={`text-xs p-1 mt-1 rounded truncate border-l-4 ${getStatusColor(
                                r.status
                              )}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectReservation(r);
                              }}
                            >
                              {extractTime(r.start_time)} - {r.title}
                            </div>
                          ))}
                          {reservationsForDay.length > 3 && (
                            <div className="text-xs p-1 mt-1 text-center text-gray-500">
                              +{reservationsForDay.length - 3} more
                            </div>
                          )}
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
                  {selectedReservation.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{selectedReservation.room}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{selectedReservation.activity_type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{extractDate(selectedReservation.start_time)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {extractTime(selectedReservation.start_time)} -{" "}
                      {extractTime(selectedReservation.end_time)} (
                      {calculateDuration(
                        selectedReservation.start_time,
                        selectedReservation.end_time
                      )}
                      )
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {selectedReservation.numOfParticipants} participants
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600 mr-2">
                          {selectedReservation.name}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{selectedReservation.email}</span>
                      </div>
                      {selectedReservation.contact_number && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{selectedReservation.contact_number}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600 mr-2">
                          Division: {selectedReservation.serviceDivisionUnit}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedReservation.status.toLowerCase() ===
                          "confirmed"
                            ? "bg-green-100 text-green-800"
                            : selectedReservation.status.toLowerCase() ===
                              "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {formatStatusDisplay(selectedReservation.status)}
                      </span>
                    </div>

                    {(selectedReservation.outsideParticipants === 1 ||
                      selectedReservation.cateringServices === 1) && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-1">
                          Additional Services
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedReservation.outsideParticipants === 1 && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Outside Participants
                            </span>
                          )}
                          {selectedReservation.cateringServices === 1 && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Catering Services
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleDeleteReservation(
                            selectedReservation.reservation_id
                          )
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
                  Title
                </label>
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Meeting title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Type
                </label>
                <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option>Press Conference</option>
                  <option>Meeting</option>
                  <option>Workshop</option>
                  <option>Training</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option>Library</option>
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
                    End Time
                  </label>
                  <input
                    type="time"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Participants
                </label>
                <input
                  type="number"
                  min="1"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Division/Unit
                </label>
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your division or unit"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    id="outside-participants"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="outside-participants"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Outside Participants
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="catering-services"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="catering-services"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Catering Services
                  </label>
                </div>
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
