import api from "./axios";

const authConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/* USERS */

export const fetchUsers = async (token) => {
  const { data } = await api.get(
    "/admin/users",
    authConfig(token)
  );

  return data;
};

/* ORDERS */

export const fetchOrders = async (token) => {
  const { data } = await api.get(
    "/admin/orders",
    authConfig(token)
  );

  return data;
};

export const markOrderDelivered = async (
  id,
  token
) => {
  const { data } = await api.put(
    `/admin/orders/${id}/deliver`,
    {},
    authConfig(token)
  );

  return data;
};

/* PRODUCTS */

export const fetchProducts = async (token) => {
  const { data } = await api.get(
    "/admin/products",
    authConfig(token)
  );

  return data;
};

export const createProduct = async (
  productData,
  token
) => {
  const { data } = await api.post(
    "/admin/products",
    productData,
    authConfig(token)
  );

  return data;
};

export const updateProduct = async (
  id,
  productData,
  token
) => {
  const { data } = await api.put(
    `/admin/products/${id}`,
    productData,
    authConfig(token)
  );

  return data;
};

export const deleteProduct = async (
  id,
  token
) => {
  const { data } = await api.delete(
    `/admin/products/${id}`,
    authConfig(token)
  );

  return data;
};

/* DASHBOARD */

export const fetchDashboardStats =
  async (token) => {
    const { data } = await api.get(
      "/admin/dashboard",
      authConfig(token)
    );

    return data;
  };