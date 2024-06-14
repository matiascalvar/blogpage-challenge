import { API_URL } from "@/libs/utils";
import axios from "axios";

export const getAllPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getPost = async (postId: number) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${postId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getComments = async (postId: string) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
