import axios from "./axios";

/* =========================
   CREATE ORDER
========================= */
export const createOrder = async (order, token) => {
  try {
    const { data } = await axios.post("/orders", order, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err.response?.data || err.message);

    throw {
      message:
        err.response?.data?.message ||
        "Failed to create order",
    };
  }
};

/* =========================
   INIT PAYSTACK PAYMENT
========================= */
export const initPayment = async (payload, token) => {
  try {
    const { data } = await axios.post(
      "/orders/paystack/init",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;

  } catch (err) {
    console.error("INIT PAYMENT ERROR:", err.response?.data || err.message);

    throw {
      message:
        err.response?.data?.message ||
        "Payment initialization failed",
    };
  }
};

/* =========================
   VERIFY PAYMENT
========================= */
export const verifyPayment = async (reference, token) => {
  try {
    const { data } = await axios.get(
      `/orders/paystack/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;

  } catch (err) {
    console.error("VERIFY ERROR:", err.response?.data || err.message);

    throw {
      message:
        err.response?.data?.message ||
        "Payment verification failed",
    };
  }
};