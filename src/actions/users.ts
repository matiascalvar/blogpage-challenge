import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getUser = async (userId: number) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
