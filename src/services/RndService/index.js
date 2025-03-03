import ApiService from "services/ApiService";

export async function getRndProcessListApi() {
  return ApiService.fetchData({
    url: `rnd-process`,
    method: "get",
  });
}
