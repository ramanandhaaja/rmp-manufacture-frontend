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

export async function getProcurementLogsApi(params) {
  return ApiService.fetchData({
    url: `procurement-logs`,
    method: "get",
    params,
  });
}

export async function getPurchaseOrderItemQueuesApi(params) {
  return ApiService.fetchData({
    url: `purchase-order/item-queues`,
    method: "get",
    params,
  });
}

export async function getPurchaseOrderDetailsApi(id) {
  return ApiService.fetchData({
    url: `purchase-order/${id}`,
    method: "get",
  });
}

export async function getPoVendorOfferDetailsApi(id) {
  return ApiService.fetchData({
    url: `purchase-order/fetch-vendor-offer-details/${id}`,
    method: "get",
  });
}

export async function getListPurchaseOrderNumberApi() {
  return ApiService.fetchData({
    url: `purchase-order/list-po`,
    method: "get",
  });
}

export async function getPoAdjustmentNoteApi(id) {
  return ApiService.fetchData({
    url: `purchase-order/adjusment-notes/${id}`,
    method: "get",
  });
}

export async function getListPaymentApi() {
  return ApiService.fetchData({
    url: `purchase-order/payments`,
    method: "get",
  });
}

export async function postReplyAdjustmentNoteApi(id, data) {
  return ApiService.fetchData({
    url: `purchase-order/reply-adjusment-note/${id}`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function postConfirmPaymentApi(id, data) {
  return ApiService.fetchData({
    url: `purchase-order/confirm-payment/${id}`,
    method: "post",
    data,
    withCredentials: true,
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

export async function postPoVendorApi(data) {
  return ApiService.fetchData({
    url: `purchase-order/manage-vendors-for-po`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
    withCredentials: true,
  });
}
export async function postVendorOfferApi(data) {
  return ApiService.fetchData({
    url: `purchase-order/submit-vendor-offers`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function postPoVerificationApi(data) {
  return ApiService.fetchData({
    url: `purchase-order/verification`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function postReleasePoApi(id, data) {
  return ApiService.fetchData({
    url: `purchase-order/release/${id}`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function putVendorOfferApi(id, data) {
  return ApiService.fetchData({
    url: `purchase-order/update-vendor-offers/${id}`,
    method: "put",
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
