"use server";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export const fetchRooms = async (user_id) => {
  try {
    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "GET",
      params: {
        operation: "getAllRooms",
        json: JSON.stringify({}),
      },

      headers: {
        Authorization: SECRET_KEY,
      },
    });

    if (res.status !== 200) {
      return { success: false, data: [], message: "Status error" };
    }

    return { success: true, data: res.data.data, message: "" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching rooms";
    return { success: false, data: [], message: errorMessage };
  }
};

export const createRoom = async (roomData, file) => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }
    
    const data = {
      room_name: roomData.room_name,
      capacity: roomData.capacity,
      location: roomData.location,
      isAvailable: roomData.isAvailable,
      addedBy: roomData.addedBy,
      facilities: roomData.facilities || []
    };

    formData.append('json', JSON.stringify(data));
    
    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "POST",
      data: formData,
      params: {
        operation: "createRoom"
      },
      headers: {
        Authorization: SECRET_KEY,
        'Content-Type': 'multipart/form-data'
      }
    });

    if (res.status !== 201) {
      return { success: false, data: [], message: "Status error" };
    }

    return { success: true, data: res.data.data || [], message: res.data.message || "Room created successfully" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while creating the room";
    return { success: false, data: [], message: errorMessage };
  }
};

export const fetchFacilities = async() =>{
  try {
    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "GET",
      params: {
        operation: "getAllFacilities",
        json: JSON.stringify({}),
      },

      headers: {
        Authorization: SECRET_KEY,
      },
    });

    if (res.status !== 200) {
      return { success: false, data: [], message: "Status error" };
    }

    return { success: true, data: res.data.data, message: "" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching facilities";
    return { success: false, data: [], message: errorMessage };
  }
}
