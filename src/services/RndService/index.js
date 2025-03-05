import ApiService from "services/ApiService";

export async function getRndProcessListApi() {
  return ApiService.fetchData({
    url: `rnd-process`,
    method: "get",
  });
}

export async function getRndProcessConfirmationApi(params) {
  return ApiService.fetchData({
    url: `rnd-process-confirmations`,
    method: "get",
    params,
  });
}

export async function postRndProcessConfirmationApi(data) {
  return ApiService.fetchData({
    url: `rnd-process-confirmations`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function postRndProcessDocumentationsApi(data) {
  return ApiService.fetchData({
    url: `rnd-process-documentations`,
    method: "post",
    data,
    withCredentials: true,
  });
}
