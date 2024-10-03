import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3000";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post("/auth/login", { email, password });
    if (data.user) {
      toast.success("User logged in successfully");
    }
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (name, email, password) => {
  try {
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    if (data.user) {
      toast.success("User registered successfully");
    }
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginAdmin = async (email, password) => {
  const response = await axios.post("/auth/admin/login", {
    email,
    password,
  });
  return response.data;
};

