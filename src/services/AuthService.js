import ApiService from "./ApiService";

export async function loginApi(data) {
  return ApiService.fetchData({
    url: `login`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: data.email,
      password: data.password,
    },
  });
}
