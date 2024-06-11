import axios from "axios";

export const getAllPosts = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getPost = async (postId: number) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getComments = async (postId: string) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
