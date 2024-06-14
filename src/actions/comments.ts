import axios from "axios";
import { Comment } from "@/types/interfaces";
import { API_URL } from "@/libs/utils";

export const createComment = async (
  postId: number,
  name: string,
  email: string,
  body: string
) => {
  try {
    const res = await axios.post<Comment>(
      `${API_URL}/comments/`,
      {
        postId,
        name,
        email,
        body,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateComment = async (commentId: number, body: string) => {
  try {
    const res = await axios.patch<Comment>(
      `${API_URL}/comments/${commentId}`,
      {
        body,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const res = await axios.delete(`${API_URL}/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
