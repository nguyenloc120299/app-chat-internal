import { Login, ROLES, Register } from "types/global";
import requestService from "./request";
import { Quer_User } from "types/query";

export const register = async (form: Register) => {
  const res = await requestService.post("/auth/signup", {
    data: form,
  });
  return res.data;
};

export const login = async (form: Login) => {
  const res = await requestService.post("/auth/signin", {
    data: form,
  });
  return res.data;
};

export const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await requestService.post("/profile/refresh", {
    data: {
      refreshToken,
    },
  });
  return res.data;
};

export const getUsers = async (data: Quer_User) => {
  const { page, pageSize, roleName, search } = data;
  const res = await requestService.get(
    `/room/users?page=${page}&pageSize=${pageSize}&roleName=${roleName}&search=${search}`
  );
  return res.data;
};

export const logout = async () => {
  const res = await requestService.delete("/profile/logout");
  return res.data;
};
