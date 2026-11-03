import axios from "axios";

//  Set Base URL for Backend
const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Change if backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

//  Send the login token with every request, including direct axios calls in components
const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

//  Send the user back to login when the token is missing or expired
const handleUnauthorized = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    window.location.assign("/login");
  }
  return Promise.reject(error);
};

[axios, API].forEach((client) => {
  client.interceptors.request.use(attachToken);
  client.interceptors.response.use((response) => response, handleUnauthorized);
});

//  Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/", userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

//  Login User
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

//  Get Current User (Protected Route)
export const getCurrentUser = async (token) => {
  try {
    const response = await API.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch User Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


//  Add Expense
export const addExpense = async (expenseData) => {
  try {
    const response = await API.post("/expenses/add", expenseData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Failed to add expense" };
  }
};

// Get Expenses
export const getExpenses = async () => {
  try {
    const response = await API.get("/expenses/");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Failed to fetch expenses" };
  }
};

//delete Expense
export const deleteExpense = async (id) => {
  try {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
//edit

export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Failed to update expense" };
  }
};


export default API;




