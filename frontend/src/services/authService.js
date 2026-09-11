import axios from "axios";

const API_URL = "http://localhost:5000";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email }
  );

  return response.data;
};

// Verify reset code
export const verifyResetCode = async (email, otp) => {
  const response = await axios.post(
    `${API_URL}/verify-reset-code`,
    {
      email,
      otp,
    }
  );

  return response.data;
};

// Reset password
export const resetPassword = async (
  email,
  password
) => {
  const response = await axios.put(
    `${API_URL}/reset-password`,
    {
      email,
      password,
    }
  );

  return response.data;
};