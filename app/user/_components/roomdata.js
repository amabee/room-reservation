// File: utils/roomData.js
import {
  Monitor,
  Users,
  Check,
  X,
  Star,
  Coffee,
  Wifi,
  MapPin,
} from "lucide-react";

export const facilityIcons = {
  Projector: <Monitor className="h-4 w-4" />,
  Whiteboard: <MapPin className="h-4 w-4" />,
  "Video Conference": <Users className="h-4 w-4" />,
  "TV Screen": <Monitor className="h-4 w-4" />,
  WiFi: <Wifi className="h-4 w-4" />,
  Catering: <Coffee className="h-4 w-4" />,
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 18; hour++) {
    const time = `${hour}:00`;
    const isAvailable = Math.random() > 0.3;
    slots.push({ time, isAvailable });
    slots.push({ time: `${hour}:30`, isAvailable: Math.random() > 0.3 });
  }
  return slots;
};

export const getAvailableRooms = () => [
  {
    id: 1,
    name: "Conference Room A",
    capacity: 20,
    facilities: ["Projector", "Whiteboard", "Video Conference", "WiFi"],
    status: "Available",
    nextAvailable: "Now",
    location: "3rd Floor, East Wing",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: "Meeting Room B",
    capacity: 20,
    facilities: ["Projector", "Whiteboard", "Video Conference", "WiFi"],
    status: "Available",
    nextAvailable: "Now",
    location: "3rd Floor, East Wing",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 3,
    name: "Board Room",
    capacity: 12,
    facilities: ["Projector", "Video Conference", "Catering", "WiFi"],
    status: "Available",
    nextAvailable: "2:00 PM",
    location: "4th Floor, Executive Suite",
    rating: 4.9,
    reviews: 32,
  },
];
