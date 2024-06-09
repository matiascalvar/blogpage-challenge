import axios from "axios";

export const updateComment = async (commentId: number, body: string) => {
  try {
    const res = await axios.patch<{
      body: string;
      email: string;
      id: number;
      name: string;
      postId: number;
    }>(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`,
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
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`,
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
