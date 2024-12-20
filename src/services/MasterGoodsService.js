import ApiService from "./ApiService";

export async function getGoodsListApi() {
  return ApiService.fetchData({
    url: `goods`,
    method: "get",
  });
}

export async function getGoodsPerIdApi(id) {
  return ApiService.fetchData({
    url: `goods/${id}`,
    method: "get",
  });
}

export async function postGoodsApi(data) {
  return ApiService.fetchData({
    url: `goods`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function putGoodsApi({ id, data }) {
  return ApiService.fetchData({
    url: `goods/${id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function deleteGoodsApi(id) {
  return ApiService.fetchData({
    url: `goods/${id}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
