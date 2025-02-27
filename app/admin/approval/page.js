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
import { Bell, LayoutDashboard, ClipboardCheck, CalendarRange, Menu, Clock, Calendar, Users, Check, X, Info } from 'lucide-react';
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto ml-16 md:ml-0">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <Card className="mb-8 border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Pending Approvals</h1>
                    <p className="text-gray-500">Manage room reservation requests</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex">
                    <Button 
                      variant={viewMode === 'cards' ? "default" : "outline"} 
                      className={cn(
                        "rounded-r-none",
                        viewMode === 'cards' ? "bg-blue-600 hover:bg-blue-700" : ""
                      )}
                      onClick={() => setViewMode('cards')}
                    >
                      Cards
                    </Button>
                    <Button 
                      variant={viewMode === 'table' ? "default" : "outline"} 
                      className={cn(
                        "rounded-l-none",
                        viewMode === 'table' ? "bg-blue-600 hover:bg-blue-700" : ""
                      )}
                      onClick={() => setViewMode('table')}
                    >
                      Table
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="relative flex items-center gap-2 rounded-full h-10 w-10 p-0 border-blue-200">
                    <Bell className="w-4 h-4 text-blue-600" />
                    {pendingCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-xs">
                        {pendingCount}
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Toaster position="bottom-right" />

          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservations.filter(res => res.status === 'pending').map(reservation => (
                <Card key={reservation.id} className="overflow-hidden border-0 shadow-lg">
                  <CardHeader className="pb-0 pt-0 px-0">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                  </CardHeader>
                  
                  <CardContent className="px-6 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <CardTitle className="text-xl font-bold">{reservation.roomName}</CardTitle>
                        <CardDescription>
                          Requested on {new Date(reservation.requestedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </CardDescription>
                      </div>
                      <Badge className="rounded-full px-3 py-1 bg-amber-100 text-amber-700 border-0">
                        Pending
                      </Badge>
                    </div>
                    
                    {/* Reservation Details */}
                    <Card className="border border-gray-200 shadow-sm mb-4">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{reservation.requester}</p>
                              <p className="text-xs text-gray-500">{reservation.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{new Date(reservation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                              <p className="text-xs text-gray-500">{reservation.time}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{reservation.duration}</p>
                              <p className="text-xs text-gray-500">Duration</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{reservation.attendees} people</p>
                              <p className="text-xs text-gray-500">Attendees</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Purpose */}
                    <Card className="border border-gray-200 shadow-sm mb-4">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100 mt-0.5">
                            <Info className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold mb-1">Purpose</p>
                            <p className="text-sm text-gray-600">{reservation.purpose}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end gap-3 px-6 pb-6 pt-0">
                    <Button 
                      onClick={() => handleApproval(reservation.id, 'rejected')} 
                      variant="outline" 
                      className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                    <Button 
                      onClick={() => handleApproval(reservation.id, 'approved')} 
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </CardFooter>
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
    </div>
  );
};

export default Approval;