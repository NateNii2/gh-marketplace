import api from "./axios";



export const fetchProducts = async (params = {}) => {
  const { data } = await api.get("/product", {
    params,
  });
  return data;
};


export const fetchProductById = async (id) => {
  const { data } = await api.get(`/product/${id}`);
  return data;
};
