import ApiService from "./ApiService";

export async function getTipeBarang() {
  return ApiService.fetchData({
    url: `goods-category`,
    method: "get",
  });
}

export async function postTipeBarang(data) {
  return ApiService.fetchData({
    url: `goods-category`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: data.name,
      goods_type: data.goods_type,
    },
  });
}

export async function deleteTipeBarang(id) {
  return ApiService.fetchData({
    url: `goods-category/${id}`,
    method: "delete",
  });
}
