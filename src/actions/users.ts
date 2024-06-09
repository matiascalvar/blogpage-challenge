import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  } catch (err) {
    throw err;
  }
};
