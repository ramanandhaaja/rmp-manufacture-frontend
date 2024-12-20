import ApiService from "services/ApiService";
import { PageConfig } from "./config";

export async function apiIndex(params) {
  return ApiService.fetchData({
    url: PageConfig.baseEnpoint,
    method: "get",
    params: params,
  });
}

export async function apiShow(id, params) {
  return ApiService.fetchData({
    url: PageConfig.baseEnpoint + "/" + id,
    method: "get",
    params: params,
  });
}

export async function apiStore(data) {
  return ApiService.fetchData({
    url: PageConfig.baseEnpoint,
    method: "post",
    data,
  });
}

export async function apiUpdate(id, data) {
  return ApiService.fetchData({
    url: PageConfig.baseEnpoint + "/" + id,
    method: "put",
    data,
  });
}

export async function apiDestroy(id, params) {
  return ApiService.fetchData({
    url: PageConfig.baseEnpoint + "/" + id,
    method: "delete",
    params,
  });
}
