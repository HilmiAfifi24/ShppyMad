import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Fungsi untuk mendaftarkan user
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    return null;
  }
};

// Fungsi untuk login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { headers: { "Accept": "application/json" } });

    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Terjadi error saat login");
  }
};

// Fungsi untuk logout
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    await axios.post(`${API_URL}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem("auth_token");
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
  }
};
