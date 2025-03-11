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

export const updateUserPassword = async (current_password, new_password) => {
  const userId = await getUserId();

  if (!userId) {
    return {
      success: false,
      data: [],
      message: "User not authenticated",
    };
  }

  const formData = new FormData();

  formData.append("operation", "updateUserPassword");
  formData.append(
    "json",
    JSON.stringify({
      user_id: userId,
      current_password: current_password,
      new_password: new_password,
    })
  );

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  try {
    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "POST",
      data: formData,
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
      "An error occurred while updating the password";
    return { success: false, data: [], message: errorMessage };
  }
};
