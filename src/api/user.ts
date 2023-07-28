import { Register } from "types/global";
import requestService from "./request";

export const register = async (form: Register) => {
  const res = await requestService.post("/auth/signup", {
    data: form,
  });
  return res.data;
};
