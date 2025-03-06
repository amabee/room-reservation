"use server";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function extractUserIdFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.user?.id || null;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

export async function getUserId() {
  const cookieStore = cookies();
  const session_token = cookieStore.get("session_token")?.value;
  return session_token ? await extractUserIdFromToken(session_token) : null;
}

export const fetchRooms = async () => {
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
    const userId = await getUserId();

    if (!userId) {
      return {
        success: false,
        data: [],
        message: "User not authenticated",
      };
    }

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("operation", "createRoom");

    formData.append(
      "json",
      JSON.stringify({
        room_name: roomData.room_name,
        capacity: roomData.capacity,
        location: roomData.location,
        isAvailable: roomData.isAvailable,
        addedBy: userId,
        facilities: roomData.facilities || [],
      })
    );

    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "POST",
      data: formData,
      headers: {
        Authorization: SECRET_KEY,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status !== 201) {
      return { success: false, data: [], message: JSON.stringify(res.data) };
    }

    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "Room created successfully",
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while creating the room";
    return { success: false, data: [], message: errorMessage };
  }
};

export const updateRoom = async (roomData, file) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return {
        success: false,
        data: [],
        message: "User not authenticated",
      };
    }

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("operation", "updateRoom");

    formData.append(
      "json",
      JSON.stringify({
        id: roomData.id,
        room_name: roomData.room_name,
        capacity: roomData.capacity,
        location: roomData.location,
        isAvailable: roomData.isAvailable,
        addedBy: userId,
        facilities: roomData.facilities || [],
      })
    );

    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "POST",
      data: formData,
      headers: {
        Authorization: SECRET_KEY,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status !== 201) {
      return { success: false, data: [], message: JSON.stringify(res.data) };
    }

    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "Room created successfully",
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while creating the room";
    return { success: false, data: [], message: errorMessage };
  }
};

export const deleteRoom = async (room_id) => {
  const formData = new FormData();

  formData.append("operation", "deleteRoom");
  formData.append(
    "json",
    JSON.stringify({
      id: room_id,
    })
  );
  try {
    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "POST",
      data: formData,
      headers: {
        Authorization: SECRET_KEY,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status !== 200) {
      return { success: false, data: [], message: JSON.stringify(res.data) };
    }

    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "Room created successfully",
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while creating the room";
    return { success: false, data: [], message: errorMessage };
  }
};

export const fetchFacilities = async () => {
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
};
