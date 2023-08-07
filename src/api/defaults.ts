import { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants";
import { HttpMethod } from "../common/enums/http-method.enum";

export const defaults: AxiosRequestConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    ["x-requested-with"]: "XMLHttpRequest",
    ["content-type"]: "application/json",
  },
  method: HttpMethod.Get,
} as const;
