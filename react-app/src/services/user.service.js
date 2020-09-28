import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/";

export const addUser = async (data) => {
  return await axios.post(API_URL + "addUser", data);
};

export const getAllExternalUsers = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

export const login = async (data) => {
  return await axios.post(API_URL + "login", data).then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

export const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
