import ApiService from "./ApiService";

export async function getVendorList() {
  return ApiService.fetchData({
    url: `vendors`,
    method: "get",
  });
}
