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

export async function postRndTrialPackagingMaterialsApi(data) {
  return ApiService.fetchData({
    url: `rnd-trial-packaging-materials`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function getRndTrialPackagingMaterialsApi(params) {
  return ApiService.fetchData({
    url: `rnd-trial-packaging-materials`,
    method: "get",
    params,
  });
}

export async function getRndTrialPackagingMaterialsApiById(id) {
  return ApiService.fetchData({
    url: `rnd-trial-packaging-materials/${id}`,
    method: "get",
  });
}

export async function deleteRndTrialPackagingMaterialsApi(id) {
  return ApiService.fetchData({
    url: `rnd-trial-packaging-materials/${id}`,
    method: "delete",
  });
}
