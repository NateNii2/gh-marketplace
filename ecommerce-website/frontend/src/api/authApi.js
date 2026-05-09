import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* =========================
   REGISTER
========================= */

export const registerUser = async (payload) => {

  try {

    const { data } = await API.post(
      "/auth/register",
      payload
    );

    return data;

  } catch (err) {

    console.error(
      "REGISTER ERROR:",
      err.response?.data || err.message
    );

    /* THROW ORIGINAL ERROR */

    throw err;
  }
};

/* =========================
   LOGIN
========================= */

export const loginUser = async (credentials) => {

  try {

    const { data } = await API.post(
      "/auth/login",
      credentials
    );

    return data;

  } catch (err) {

    console.error(
      "LOGIN ERROR:",
      err.response?.data || err.message
    );

    /* THROW ORIGINAL AXIOS ERROR */

    throw err;
  }
};

/* =========================
   VERIFY OTP
========================= */

export const verifyOtp = async (payload) => {

  try {

    const { data } = await API.post(
      "/auth/verify-phone",
      payload
    );

    return data;

  } catch (err) {

    console.error(
      "OTP ERROR:",
      err.response?.data || err.message
    );

    throw err;
  }
};

/* =========================
   RESEND OTP
========================= */

export const resendOtp = async (phone) => {

  try {

    const { data } = await API.post(
      "/otp/send",
      { phone }
    );

    return data;

  } catch (err) {

    console.error(
      "RESEND OTP ERROR:",
      err.response?.data || err.message
    );

    throw err;
  }
};

/* =========================
   GET PROFILE
========================= */

export const getProfile = async (token) => {

  try {

    const { data } = await API.get(
      "/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (err) {

    console.error(
      "PROFILE ERROR:",
      err.response?.data || err.message
    );

    throw err;
  }
};