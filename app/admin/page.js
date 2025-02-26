"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  PieChart,
  Users,
  Calendar,
  ClipboardCheck,
  CalendarRange,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = ({ darkMode = false }) => {
  // Use state to store randomly generated values
  const [statTrends, setStatTrends] = useState([]);

  // Generate random trends only on the client side after initial render
  useEffect(() => {
    const trends = Object.keys(stats).map(() => ({
      value: Math.floor(Math.random() * 20) + 1,
      isIncrease: Math.random() > 0.5,
    }));
    setStatTrends(trends);
  }, []);

  const stats = {
    "Total Rooms": 5,
    Reservations: 24,
    "Pending Approvals": 3,
    "Active Users": 150,
  };

  const chartData = [
    { name: "Mon", reservations: 5, usage: 30 },
    { name: "Tue", reservations: 8, usage: 45 },
    { name: "Wed", reservations: 12, usage: 55 },
    { name: "Thu", reservations: 7, usage: 40 },
    { name: "Fri", reservations: 15, usage: 75 },
    { name: "Sat", reservations: 3, usage: 25 },
    { name: "Sun", reservations: 4, usage: 20 },
  ];

  const roomUsageData = [
    { name: "Room A", usage: 85 },
    { name: "Room B", usage: 65 },
    { name: "Room C", usage: 92 },
    { name: "Room D", usage: 45 },
    { name: "Room E", usage: 78 },
  ];

  const recentActivity = [
    {
      type: "New Reservation",
      room: "Conference Room A",
      time: "2 hours ago",
      user: "John Smith",
    },
    {
      type: "Approved Request",
      room: "Meeting Room B",
      time: "4 hours ago",
      user: "Jane Doe",
    },
    {
      type: "Canceled Booking",
      room: "Executive Suite",
      time: "Yesterday",
      user: "Mike Johnson",
    },
  ];

  return (
    <div className="w-f
    ull">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>
          <Button size="sm" className="gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(stats).map(([key, value], index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{key}</CardTitle>
              {[PieChart, Calendar, Bell, Users][index] &&
                React.createElement([PieChart, Calendar, Bell, Users][index], {
                  className: "h-5 w-5 text-blue-600",
                })}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{value}</div>
              {statTrends.length > 0 ? (
                <p
                  className={cn(
                    "text-xs",
                    statTrends[index].isIncrease
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {statTrends[index].value}%{" "}
                  {statTrends[index].isIncrease ? "increase" : "decrease"} since
                  last month
                </p>
              ) : (
                <p className="text-xs text-gray-500">Calculating trend...</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
        {/* Weekly Overview Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>
              Reservation count and room usage percentage
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorReservations"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#666666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#666666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="reservations"
                  stroke="#4f46e5"
                  fillOpacity={1}
                  fill="url(#colorReservations)"
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorUsage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div
                    className={cn(
                      "mt-1 h-8 w-8 rounded-full flex items-center justify-center",
                      i === 0
                        ? "bg-blue-100 text-blue-600"
                        : i === 1
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    )}
                  >
                    {i === 0 ? (
                      <Calendar className="h-4 w-4" />
                    ) : i === 1 ? (
                      <ClipboardCheck className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.type}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">{activity.room}</span> •{" "}
                      <span className="text-muted-foreground">
                        {activity.user}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
