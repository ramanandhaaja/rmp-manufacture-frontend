import ApiService from "./ApiService";

export async function getVendorList() {
  return ApiService.fetchData({
    url: `vendors`,
    method: "get",
  });
}

export async function putVerficationStatus({ id, data }) {
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
