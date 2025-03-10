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

export const fetchUsers = async () => {
  try {
    const res = await axios(`${BASE_URL}admin/index.php`, {
      method: "GET",
      params: {
        operation: "getAllUsers",
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
      "An error occurred while fetching users";
    return { success: false, data: [], message: errorMessage };
  }
};

export const createUser = async (name, email, password, role) => {
  const formData = new FormData();

  formData.append("operation", "createUser");
  formData.append(
    "json",
    JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
    })
  );
  try {
    const res = await axios(`${BASE_URL}admin/index.php`, {
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
      "An error occurred while creating the user";
    return { success: false, data: [], message: errorMessage };
  }
};

export const updateUser = async (id, name, email, password, role) => {
  const formData = new FormData();

  formData.append("operation", "updateUser");

  if (password !== "" || password !== null) {
    formData.append(
      "json",
      JSON.stringify({
        id: id,
        name: name,
        email: email,
        password: password,
        role: role,
      })
    );
  } else {
    formData.append(
      "json",
      JSON.stringify({
        id: id,
        name: name,
        email: email,
        role: role,
      })
    );
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
      "An error occurred while updating the user";
    return { success: false, data: [], message: errorMessage };
  }
};

export const deleteUser = async (id) => {
  const formData = new FormData();

  formData.append("operation", "deleteUser");

  formData.append(
    "json",
    JSON.stringify({
      id: id,
    })
  );

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
      "An error occurred while deleting the user";
    return { success: false, data: [], message: errorMessage };
  }
};
