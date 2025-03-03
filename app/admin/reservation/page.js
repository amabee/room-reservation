"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

const Reservation = () => {
  const [reservations, setReservations] = useState([
    { id: 1, roomName: "Meeting Room A", requester: "John Doe", email: "john@example.com", purpose: "Team Sprint Planning", date: "2025-02-24", time: "10:00", duration: "1 hour", attendees: 6, status: "pending", requestedAt: "2025-02-20" },
    { id: 2, roomName: "Conference Room B", requester: "Sarah Smith", email: "sarah@example.com", purpose: "Client Meeting", date: "2025-02-24", time: "14:00", duration: "2 hours", attendees: 8, status: "approved", requestedAt: "2025-02-19" },
    { id: 3, roomName: "Meeting Room C", requester: "Mike Johnson", email: "mike@example.com", purpose: "Training Session", date: "2025-02-25", time: "11:00", duration: "3 hours", attendees: 12, status: "approved", requestedAt: "2025-02-18" }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reservations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Reservation List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.roomName}</TableCell>
                  <TableCell>{reservation.requester}</TableCell>
                  <TableCell>{reservation.email}</TableCell>
                  <TableCell>{reservation.purpose}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>{reservation.duration}</TableCell>
                  <TableCell>{reservation.attendees}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        reservation.status === "approved"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-black"
                      }
                    >
                      {reservation.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservation;
