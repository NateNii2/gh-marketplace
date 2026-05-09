import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

export const fetchUsers = async (token) => {
  const { data } = await API.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchOrders = async (token) => {
  const { data } = await API.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchProducts = async (token) => {
  console.log("ADMIN TOKEN SENT:", token);

  const { data } = await API.get("/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const markOrderDelivered = async (id, token) => {
  const { data } = await API.put(
    `/orders/${id}/deliver`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};


export const updateProduct = async (id, productData, token) => {
  const { data } = await API.put(`/products/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteProduct = async (id, token) => {
  const { data } = await API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
export const createProduct = async (productData, token) => {
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
// DASHBOARD
export const fetchDashboardStats = async (token) => {
  const { data } = await API.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// USERS CRUD
export const fetchUser = async (id, token) => {
  const { data } = await API.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateUser = async (id, payload, token) => {
  const { data } = await API.put(`/users/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteUser = async (id, token) => {
  const { data } = await API.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// ORDERS CRUD
export const updateOrder = async (id, payload, token) => {
  const { data } = await API.put(`/orders/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteOrder = async (id, token) => {
  const { data } = await API.delete(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

