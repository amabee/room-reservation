"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Bell, LayoutDashboard, ClipboardCheck, CalendarRange, Menu, Clock, Calendar, Users, Check, X, Info, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from 'next/image';

const Approval = () => {
  const [reservations, setReservations] = useState([
    { id: 1, roomName: "Meeting Room A", requester: "John Doe", email: "john@example.com", purpose: "Team Sprint Planning", date: "2025-02-24", time: "10:00", duration: "1 hour", attendees: 6, status: "pending", requestedAt: "2025-02-20" },
    { id: 2, roomName: "Conference Room B", requester: "Sarah Smith", email: "sarah@example.com", purpose: "Client Meeting", date: "2025-02-24", time: "14:00", duration: "2 hours", attendees: 8, status: "pending", requestedAt: "2025-02-19" }
  ]);

  const handleApproval = (id, action) => {
    setReservations(reservations.map(res => res.id === id ? { ...res, status: action } : res));

    toast(`${action === 'approved' ? 'Approved' : 'Declined'} successfully`, {
      description: "User will be notified via email.",
      style: {
        background: action === 'approved' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '12px',
      },
    });
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  
  const pendingCount = reservations.filter(r => r.status === 'pending').length;

  // Room images mapping (dummy data for example)
  const roomImages = {
    "Meeting Room A": "/pic1.jpg",
    "Conference Room B": "/pic2.jpg",
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>
        
        <Toaster position="bottom-right" />

        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.filter(res => res.status === 'pending').map(reservation => (
              <Card key={reservation.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 border-0 shadow-lg">
                {/* Room image or header area */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="font-semibold text-white text-lg">
                      {reservation.roomName}
                    </h3>
                  </div>
                  <Image
                    src={roomImages[reservation.roomName] || "/api/placeholder/600/400"}
                    alt={reservation.roomName}
                    className="object-cover transition-all duration-200 hover:scale-110"
                    fill
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {reservation.attendees} people
                      </span>
                    </div>
                    <Badge className="rounded-full px-3 py-1 bg-amber-100 text-amber-700 border-0">
                      Pending
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {new Date(reservation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {reservation.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {reservation.duration}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm mb-2 text-gray-700">Purpose:</div>
                    <p className="text-sm text-gray-600">{reservation.purpose}</p>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm mb-2 text-gray-700">Requester:</div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{reservation.requester}</p>
                        <p className="text-xs text-gray-500">{reservation.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <Button 
                      onClick={() => handleApproval(reservation.id, 'rejected')} 
                      variant="outline" 
                      className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      size="sm"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                    <Button 
                      onClick={() => handleApproval(reservation.id, 'approved')} 
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      size="sm"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 pb-4">
              <CardTitle className="text-white">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">Room</TableHead>
                    <TableHead className="font-semibold">Requester</TableHead>
                    <TableHead className="font-semibold">Purpose</TableHead>
                    <TableHead className="font-semibold">Date & Time</TableHead>
                    <TableHead className="font-semibold">Attendees</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.filter(res => res.status === 'pending').map(reservation => (
                    <TableRow key={reservation.id} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">{reservation.roomName}</TableCell>
                      <TableCell>
                        <div>
                          <p>{reservation.requester}</p>
                          <p className="text-xs text-gray-500">{reservation.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{reservation.purpose}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span>{reservation.date} {reservation.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {reservation.attendees} people
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          onClick={() => handleApproval(reservation.id, 'approved')} 
                          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                          size="sm"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleApproval(reservation.id, 'rejected')} 
                          variant="outline" 
                          className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        {reservations.filter(res => res.status === 'pending').length === 0 && (
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-12 flex flex-col items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Check className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">All Caught Up!</h3>
              <p className="text-gray-500 text-center max-w-md">
                You've handled all pending room reservations. New requests will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Approval;