import axios from "axios";

const API = axios.create({
  baseURL:
    `${
      import.meta.env.VITE_API_URL
    }/admin`,
});

/* =========================
   USERS
========================= */

export const fetchUsers = async (token) => {
  const { data } = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/* =========================
   ORDERS
========================= */

export const fetchOrders = async (token) => {
  const { data } = await API.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const markOrderDelivered = async (
  id,
  token
) => {
  const { data } = await API.put(
    `/orders/${id}/deliver`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

/* =========================
   PRODUCTS
========================= */

export const fetchProducts = async (token) => {
  const { data } = await API.get("/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createProduct = async (
  productData,
  token
) => {
  const { data } = await API.post(
    "/products",
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const updateProduct = async (
  id,
  productData,
  token
) => {
  const { data } = await API.put(
    `/products/${id}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteProduct = async (
  id,
  token
) => {
  const { data } = await API.delete(
    `/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

/* =========================
   DASHBOARD
========================= */

export const fetchDashboardStats =
  async (token) => {
    const { data } = await API.get(
      "/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };