"use server";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export const fetchReservations = async () => {
    try {
      const res = await axios(`${BASE_URL}admin/index.php`, {
        method: "GET",
        params: {
          operation: "getAllReservations",
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