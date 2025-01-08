import ApiService from "./ApiService";

export async function getPurchaseOrderApi(params) {
  return ApiService.fetchData({
    url: `purchase-order`,
    method: "get",
    params,
  });
}

export async function getCategoryTotalItemsReqApi(params) {
  return ApiService.fetchData({
    url: `purchase-order/category`,
    method: "get",
    params,
  });
}

export async function getPurchaseOrderItemQueuesApi() {
  return ApiService.fetchData({
    url: `purchase-order/item-queues`,
    method: "get",
  });
}

export async function getListPurchaseOrderNumberApi() {
  return ApiService.fetchData({
    url: `purchase-order/list-po`,
    method: "get",
  });
}

export async function postPurchaseOrderApi(data) {
  return ApiService.fetchData({
    url: `purchase-order/create-po`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
    withCredentials: true,
  });
}

export async function postAddItemToPoApi(data) {
  return ApiService.fetchData({
    url: `purchase-order/add-item-to-po`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
    withCredentials: true,
  });
}

export async function patchItemToAnotherPoApi(data) {
  return ApiService.fetchData({
    url: `purchase-order/move-item-to-another-po`,
    method: "patch",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
