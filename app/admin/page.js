"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, PieChart, Users, Calendar, LayoutDashboard, ClipboardCheck, CalendarRange, Menu } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import Image from 'next/image';

const Dashboard = () => {
  const stats = {
    totalRooms: 5,
    totalReservations: 24,
    pendingApprovals: 3,
    totalUsers: 150
  };

  const chartData = [
    { name: "Mon", total: 5 },
    { name: "Tue", total: 8 },
    { name: "Wed", total: 12 },
    { name: "Thu", total: 7 },
    { name: "Fri", total: 15 },
    { name: "Sat", total: 3 },
    { name: "Sun", total: 4 },
  ];

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: true
    },
    {
      title: "Approvals",
      href: "/admin/approval",
      icon: <ClipboardCheck className="h-5 w-5" />,
      active: false
    },
    {
      title: "Reservations",
      href: "/admin/reservation",
      icon: <CalendarRange className="h-5 w-5" />,
      active: false
    }
  ];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-full flex flex-col border-r bg-muted/40">
          <div className="flex h-14 items-center px-4 border-b">
           <Image src="/psalogoo.png" alt="Logo" width={32} height={32} className="mr-2" />
            <h2 className={cn("text-xl font-semibold", !sidebarOpen && "hidden")}>Booking System</h2>
          </div>
          <nav className="flex-1 overflow-auto py-2 mt-4 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-colors",
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon}
                {sidebarOpen && item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto ml-16 md:ml-0">
        <button
          className="fixed top-4 left-4 z-50 md:relative md:top-0 md:left-0 p-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(stats).map(([key, value], index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                {[PieChart, Calendar, Bell, Users][index] && React.createElement([PieChart, Calendar, Bell, Users][index], { className: "h-4 w-4 text-muted-foreground" })}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Weekly Overview Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip />
                  <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New Reservation Request
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Room {i} • 2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
