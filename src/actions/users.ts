import { API_URL } from "@/libs/utils";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getUser = async (userId: number) => {
  try {
    const res = await axios.get(`${API_URL}/users/${userId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
