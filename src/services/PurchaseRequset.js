import ApiService from "./ApiService";

export async function getPurchaseReqApi(params) {
  return ApiService.fetchData({
    url: `purchase-requests`,
    method: "get",
    params,
  });
}

export async function getDetailPurchaseReqApi(id) {
  return ApiService.fetchData({
    url: `purchase-requests/${id}`,
    method: "get",
  });
}

export async function getPurchaseReqHistoryApi(itemId, departmentId) {
  return ApiService.fetchData({
    url: `purchase-requests/history/${itemId}/${departmentId}`,
    method: "get",
  });
}

export async function postPurchaseReqApi(data) {
  return ApiService.fetchData({
    url: `purchase-requests/`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function putPurchaseReqApi(id, data) {
  return ApiService.fetchData({
    url: `purchase-requests/${id}`,
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}

export async function putPurchaseReqFollowUpApi(id, data) {
  return ApiService.fetchData({
    url: `purchase-requests/followUp/${id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function putPurchaseReqUpdateStatusApi(id, data) {
  return ApiService.fetchData({
    url: `purchase-requests/updateStatus/${id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function deletePurchaseReqApi(id) {
  return ApiService.fetchData({
    url: `purchase-requests/${id}`,
    method: "delete",
  });
}
