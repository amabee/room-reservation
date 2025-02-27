"use client";
import React, { useState } from 'react';
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, LayoutDashboard, ClipboardCheck, CalendarRange, Menu, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import Image from 'next/image';

const Reservation = () => {
  const [reservations, setReservations] = useState([
    { id: 1, roomName: "Meeting Room A", requester: "John Doe", email: "john@example.com", purpose: "Team Sprint Planning", date: "2025-02-24", time: "10:00", duration: "1 hour", attendees: 6, status: "pending", requestedAt: "2025-02-20" },
    { id: 2, roomName: "Conference Room B", requester: "Sarah Smith", email: "sarah@example.com", purpose: "Client Meeting", date: "2025-02-24", time: "14:00", duration: "2 hours", attendees: 8, status: "approved", requestedAt: "2025-02-19" },
    { id: 3, roomName: "Meeting Room C", requester: "Mike Johnson", email: "mike@example.com", purpose: "Training Session", date: "2025-02-25", time: "11:00", duration: "3 hours", attendees: 12, status: "approved", requestedAt: "2025-02-18" }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto ml-16 md:ml-0">
       

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Reservations</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search reservations..."
                className="pl-8 pr-4 py-2 border rounded-md"
              />
            </div>
            <Button>Filter</Button>
          </div>
        </div>

        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle>Reservation List</CardTitle>
            <CardDescription>Manage all room reservation requests</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Room</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map(reservation => (
                  <TableRow key={reservation.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{reservation.roomName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                          {reservation.requester.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{reservation.requester}</div>
                          <div className="text-sm text-gray-500">{reservation.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{reservation.purpose}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <CalendarRange className="h-4 w-4 text-gray-500" />
                        <span>{new Date(reservation.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                        <span className="text-gray-500">•</span>
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{reservation.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>{reservation.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{reservation.attendees}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={cn(
                          "px-2.5 py-0.5 text-xs font-semibold",
                          reservation.status === 'approved' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : reservation.status === 'pending' 
                            ? 'bg-amber-100 text-amber-800 border-amber-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        )}
                      >
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                        {reservation.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50">Approve</Button>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reservation;