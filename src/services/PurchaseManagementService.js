import ApiService from "./ApiService";

export async function getPurchaseReqApi() {
  return ApiService.fetchData({
    url: `purchase-requests`,
    method: "get",
  });
}
