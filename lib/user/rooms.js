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
    const res = await axios(`${BASE_URL}user/index.php`, {
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
