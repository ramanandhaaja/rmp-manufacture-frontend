import ApiService from "./ApiService";

export async function getVendorsListApi(params) {
  return ApiService.fetchData({
    url: `vendors`,
    method: "get",
    params,
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
    data,
  });
}

export async function putVendorsApi(id, data) {
  return ApiService.fetchData({
    url: `vendors/${id}`,
    method: "put",
    data,
  });
}

export async function putVerficationStatus(id, data) {
  return ApiService.fetchData({
    url: `vendors/updateStatus/${id}`,
    method: "put",
    data,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
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
