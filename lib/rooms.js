"use server";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export const fetchRooms = async (user_id) => {
  try {
    const res = await axios(`${BASE_URL}admin/rooms.php`, {
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
