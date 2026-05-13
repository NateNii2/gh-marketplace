import axios from "./axios";

export const changePassword = async (
  payload,
  token
) => {
  const { data } = await axios.put(
    "/auth/change-password",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteAccount = async (
  token
) => {
  const { data } = await axios.delete(
    "/auth/delete-account",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};