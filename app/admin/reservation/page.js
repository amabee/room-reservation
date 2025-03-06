"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Search, RefreshCw } from "lucide-react";
import { fetchReservations } from "@/lib/reservations";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] =
    useState(reservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const isValidDate = (dateString) => {
    return dateString && dateString !== "0000-00-00 00:00:00";
  };

  const getReservationsData = async () => {
    const { success, data, message } = await fetchReservations();
    if (!success) {
      console.log(data);
      return alert(message);
    }

    // Process the data to format dates and times
    const processedData = data.map((res) => {
      // Initialize default values
      let startDate = "Not specified";
      let startTime = "Not specified";
      let endDate = "Not specified";
      let endTime = "Not specified";
      let duration = "";

      // Process start_time if valid
      if (isValidDate(res.start_time)) {
        try {
          const startDateTime = new Date(res.start_time);
          startDate = startDateTime.toISOString().split("T")[0];
          startTime = startDateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Process end_time if valid
          if (isValidDate(res.end_time)) {
            const endDateTime = new Date(res.end_time);
            endDate = endDateTime.toISOString().split("T")[0];
            endTime = endDateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Calculate duration
            const durationMs = endDateTime - startDateTime;
            const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
            const durationMinutes = Math.floor(
              (durationMs % (1000 * 60 * 60)) / (1000 * 60)
            );
            duration = `${durationHours}h ${durationMinutes}m`;
          }
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }

      return {
        id: res.reservation_id,
        reservation_id: res.reservation_id,
        roomName: res.room_name,
        requester: res.name,
        email: res.email,
        purpose: "Not specified", 
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        duration: duration,
        attendees: "Not specified", 
        status: res.status,
        room_id: res.room_id,
        user_id: res.user_id,
        created_at: res.created_at,
        start_time: res.start_time,
        end_time: res.end_time
      };
    });

    setReservations(processedData);
  };

  useEffect(() => {
    getReservationsData();
  }, []);

  useEffect(() => {
    let result = reservations;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (res) =>
          res.roomName.toLowerCase().includes(term) ||
          res.requester.toLowerCase().includes(term) ||
          res.email.toLowerCase().includes(term) ||
          (res.purpose && res.purpose.toLowerCase().includes(term))
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((res) => res.status === statusFilter);
    }

    if (dateFilter !== "all") {
      result = result.filter((res) => res.startDate === dateFilter);
    }

    setFilteredReservations(result);
  }, [searchTerm, statusFilter, dateFilter, reservations]);

  const handleStatusChange = (id, newStatus) => {
    setIsLoading(true);

    setTimeout(() => {
      setReservations((prevReservations) =>
        prevReservations.map((res) =>
          res.id === id ? { ...res, status: newStatus } : res
        )
      );
      setIsLoading(false);
    }, 600);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
  };

  const uniqueDates = [...new Set(reservations.map((res) => res.startDate))].sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reservations</h1>
        <Button
          variant="outline"
          onClick={resetFilters}
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Reset Filters
        </Button>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter reservations by status, date or search terms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search rooms, requesters..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger id="date" className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  {uniqueDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reservation List</CardTitle>
          <CardDescription>
            Showing {filteredReservations.length} of {reservations.length}{" "}
            reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReservations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reservations match your filters. Try adjusting your search
              criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Name</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Start Date & Time</TableHead>
                    <TableHead>End Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.reservation_id}>
                      <TableCell className="font-medium">
                        {reservation.roomName}
                      </TableCell>
                      <TableCell>
                        {reservation.requester}
                        <div className="text-xs text-gray-500">
                          {reservation.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{reservation.startDate}</div>
                        <div className="text-xs text-gray-500">{reservation.startTime}</div>
                      </TableCell>
                      <TableCell>
                        <div>{reservation.endDate}</div>
                        <div className="text-xs text-gray-500">{reservation.endTime}</div>
                      </TableCell>
                      <TableCell>
                        {reservation.duration || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            reservation.status === "approved"
                              ? "bg-green-500 text-white"
                              : reservation.status === "rejected"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-black"
                          }
                        >
                          {reservation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {reservation.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-green-50 text-green-600 hover:bg-green-100"
                              onClick={() =>
                                handleStatusChange(reservation.id, "approved")
                              }
                              disabled={isLoading}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                              onClick={() =>
                                handleStatusChange(reservation.id, "rejected")
                              }
                              disabled={isLoading}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                        {reservation.status !== "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              alert(
                                `Details for ${reservation.roomName} reservation by ${reservation.requester}`
                              );
                            }}
                          >
                            View Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservation;