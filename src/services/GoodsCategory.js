import ApiService from "./ApiService";

export async function getGoodsCategoryApi(params) {
  return ApiService.fetchData({
    url: `goods-category`,
    method: "get",
    params,
  });
}
export async function getGoodsCategoryByIdApi(id) {
  return ApiService.fetchData({
    url: `goods-category/${id}`,
    method: "get",
  });
}

export async function postGoodsCategoryApi(data) {
  return ApiService.fetchData({
    url: `goods-category`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function putGoodsCategoryApi({ data, id }) {
  return ApiService.fetchData({
    url: `goods-category/${id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function deleteGoodsCategoryApi(id) {
  return ApiService.fetchData({
    url: `goods-category/${id}`,
    method: "delete",
  });
}
