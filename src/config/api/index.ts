import axios, { AxiosRequestConfig } from "axios";

export const callAPI = async ({ url, method, data = {}, headers = {} }: AxiosRequestConfig) => {
  const response = await axios({ url, method, data, headers }).catch(
    (err) => err.response
  );

  if (String(response?.status)[0] !== "2") {
    return {
      error: true,
      message: response.data?.message ?? "Internal server error",
      data: response.data,
    };
  }

  return {
    error: false,
    message: "Success",
    data: response.data,
  };
};
