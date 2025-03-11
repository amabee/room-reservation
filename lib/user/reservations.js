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

export const createReservation = async (
  room_id,
  activity_type,
  title,
  outsideParticipants,
  cateringServices,
  serviceDivisionUnit,
  contact_number,
  numOfParticipants,
  start_time,
  end_time,
  status
) => {
    const userID = await getUserId();
  const formData = new FormData();

  formData.append("operation", "createReservation");
  formData.append(
    "json",
    JSON.stringify({
      room_id: room_id,
      user_id: userID,
      activity_type: activity_type,
      title: title,
      outsideParticipants: outsideParticipants,
      cateringServices: cateringServices,
      serviceDivisionUnit: serviceDivisionUnit,
      contact_number: contact_number,
      numOfParticipants: numOfParticipants,
      start_time: start_time,
      end_time: end_time,
      status: status,
    })
  );
  try {
    const res = await axios(`${BASE_URL}user/index.php`, {
      method: "POST",
      data: formData,
      headers: {
        Authorization: SECRET_KEY,
      },
    });

    if (res.status !== 201) {
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

export const fetchReservations = async () => {
  try {
    const res = await axios(`${BASE_URL}user/index.php`, {
      method: "GET",
      params: {
        operation: "getMyReservations",
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

