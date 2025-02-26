"use client";
import React from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Home, Check, X } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 fixed">
      <h2 className="text-xl font-bold mb-4 text-center">Room Reservation</h2>
      <nav className="space-y-2">
        <Link href="./" className="block p-2 hover:bg-gray-700 rounded text-center">Available Rooms</Link>
        <Link href="./reservation" className="block p-2 hover:bg-gray-700 rounded text-center">Recent Reservations</Link>
      </nav>
    </aside>
  );
}

export default function DashboardLayout() {
  // Mock data for available rooms
  const availableRooms = [
    { 
      id: 1, 
      name: "Conference Room A",
      capacity: 20,
      facilities: ["Projector", "Whiteboard", "Video Conference"],
      status: "Available",
      nextAvailable: "Now"
    },
    { 
      id: 2, 
      name: "Meeting Room B",
      capacity: 8,
      facilities: ["TV Screen", "Whiteboard"],
      status: "Available",
      nextAvailable: "Now"
    },
    { 
      id: 3, 
      name: "Board Room",
      capacity: 12,
      facilities: ["Projector", "Video Conference"],
      status: "Occupied",
      nextAvailable: "2:00 PM"
    },
  ];

  // Mock data for recent reservations
  const mockReservations = [
    { id: 1, room: "Conference Room A", date: "2025-02-24", time: "09:00 AM", status: "Confirmed" },
    { id: 2, room: "Meeting Room B", date: "2025-02-25", time: "02:00 PM", status: "Pending" },
    { id: 3, room: "Board Room", date: "2025-02-26", time: "11:00 AM", status: "Confirmed" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Recent Reservations Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Room</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Time</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReservations.map((reservation) => (
                      <tr key={reservation.id} className="border-b">
                        <td className="p-2">{reservation.room}</td>
                        <td className="p-2">{reservation.date}</td>
                        <td className="p-2">{reservation.time}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            reservation.status === "Confirmed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {reservation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}