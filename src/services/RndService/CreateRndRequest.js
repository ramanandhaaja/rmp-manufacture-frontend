import ApiService from "../ApiService";

export async function getRndRequestListApi(params) {
  return ApiService.fetchData({
    url: `rnd-requests`,
    method: "get",
    params,
  });
}

export async function getRndRequestDetailsApi(id) {
  return ApiService.fetchData({
    url: `rnd-requests/${id}`,
    method: "get",
  });
}

export async function postRndRequestApi(data) {
  return ApiService.fetchData({
    url: `rnd-requests`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function putRndRequestApi(id, data) {
  return ApiService.fetchData({
    url: `rnd-requests/${id}`,
    method: "put",
    data,
  });
}

export async function deleteRndRequestApi(id) {
  return ApiService.fetchData({
    url: `rnd-requests/${id}`,
    method: "delete",
  });
}

export async function getRndCompetitorApi(params) {
  return ApiService.fetchData({
    url: `rnd-product-competitors`,
    method: "get",
    params,
  });
}

export async function getDetailRndCompetitorApi(id) {
  return ApiService.fetchData({
    url: `rnd-product-competitors/${id}`,
    method: "get",
  });
}

export async function postRndCompetitorApi(data) {
  return ApiService.fetchData({
    url: `rnd-product-competitors`,
    method: "post",
    data,
  });
}

export async function putRndCompetitorApi(id, data) {
  return ApiService.fetchData({
    url: `rnd-product-competitors/${id}`,
    method: "put",
    data,
  });
}

export async function deleteRndCompetitorApi(id) {
  return ApiService.fetchData({
    url: `rnd-product-competitors/${id}`,
    method: "delete",
  });
}

export async function getRndProductDetailsApi(params) {
  return ApiService.fetchData({
    url: `rnd-product-details`,
    method: "get",
    params,
  });
}

export async function getDetailRndProductDetailsApi(id) {
  return ApiService.fetchData({
    url: `rnd-product-details/${id}`,
    method: "get",
  });
}

export async function postRndDetailProductApi(data) {
  return ApiService.fetchData({
    url: `rnd-product-details`,
    method: "post",
    data,
  });
}

export async function putRndDetailProductApi(id, data) {
  return ApiService.fetchData({
    url: `rnd-product-details/${id}`,
    method: "put",
    data,
  });
}

export async function deleteRndDetailProductApi(id) {
  return ApiService.fetchData({
    url: `rnd-product-details/${id}`,
    method: "delete",
  });
}

export async function getRndProductSubstancesApi(params) {
  return ApiService.fetchData({
    url: `rnd-product-substances`,
    method: "get",
    params,
  });
}

export async function getDetailRndProductSubstancesApi(id) {
  return ApiService.fetchData({
    url: `rnd-product-substances/${id}`,
    method: "get",
  });
}

export async function postRndProductSubstancesApi(data) {
  return ApiService.fetchData({
    url: `rnd-product-substances`,
    method: "post",
    data,
  });
}

export async function putRndProductSubstancesApi(id, data) {
  return ApiService.fetchData({
    url: `rnd-product-substances/${id}`,
    method: "put",
    data,
  });
}

export async function deleteRndProductSubstancesApi(id) {
  return ApiService.fetchData({
    url: `rnd-product-substances/${id}`,
    method: "delete",
  });
}

export async function getDetailRndReferenceDocApi(id) {
  return ApiService.fetchData({
    url: `rnd-reference-documents/${id}`,
    method: "get",
  });
}

export async function postRndReferenceDocApi(data) {
  return ApiService.fetchData({
    url: `rnd-reference-documents`,
    method: "post",
    data,
    withCredentials: true,
  });
}
