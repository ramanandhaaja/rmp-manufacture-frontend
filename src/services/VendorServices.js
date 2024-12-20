import ApiService from "./ApiService";

export async function getVendorsListApi() {
  return ApiService.fetchData({
    url: `vendors`,
    method: "get",
  });
}

export async function getVendorsDetailsApi(id) {
  return ApiService.fetchData({
    url: `vendors/${id}`,
    method: "get",
  });
}

export async function postVendorsApi(data) {
  return ApiService.fetchData({
    url: `vendors`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}

export async function putVendorsApi(id, data) {
  return ApiService.fetchData({
    url: `vendors/${id}`,
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}

export async function deleteVendorsApi(id) {
  return ApiService.fetchData({
    url: `vendors/${id}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
