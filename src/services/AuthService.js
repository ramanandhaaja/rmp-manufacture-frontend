import ApiService from "./ApiService";

export async function apiSignIn(data) {
  return ApiService.fetchData({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export async function apiSignInCurrent(data) {
  return ApiService.fetchData({
    url: "login",
    method: "post",
    data,
  });
}

export async function apiGetMe() {
  return ApiService.fetchData({
    url: "/auth/me",
    method: "get",
  });
}

export async function apiSignUp(data) {
  return ApiService.fetchData({
    url: "/auth/register",
    method: "post",
    data,
  });
}

export async function apiSignOut(data) {
  return ApiService.fetchData({
    url: "/auth/logout",
    method: "post",
    data,
  });
}

export async function apiForgotPassword(data) {
  return ApiService.fetchData({
    url: "/auth/forgot-password",
    method: "post",
    data,
  });
}

export async function apiResetPassword(data) {
  return ApiService.fetchData({
    url: "/reset-password",
    method: "post",
    data,
  });
}
