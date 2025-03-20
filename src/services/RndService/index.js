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

export async function getRndRawMaterialsListApi(params) {
  return ApiService.fetchData({
    url: `rnd-raw-materials`,
    method: "get",
    params,
  });
}

export async function getRndRawMaterialsApi(params) {
  return ApiService.fetchData({
    url: `raw-materials`,
    method: "get",
    params,
  });
}

export async function postRndRawMaterialsApi(data) {
  return ApiService.fetchData({
    url: `rnd-raw-materials`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function postTrialFormulaApi(data) {
  return ApiService.fetchData({
    url: `rnd-trial-formulations`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function getRndTrialFormulationsApi(params) {
  return ApiService.fetchData({
    url: `rnd-trial-formulations`,
    method: "get",
    params,
  });
}

export async function getDetailTrialFormulationsApi(id) {
  return ApiService.fetchData({
    url: `rnd-trial-formulations/${id}`,
    method: "get",
  });
}

export async function deleteRndTrialFormulationsApi(id) {
  return ApiService.fetchData({
    url: `rnd-trial-formulations/${id}`,
    method: "delete",
  });
}

export async function postTrialFormulationReportsApi(data) {
  return ApiService.fetchData({
    url: `trial-formulation-reports`,
    method: "post",
    data,
    withCredentials: true,
  });
}

export async function getDetailTrialFormulationReportApi(id) {
  return ApiService.fetchData({
    url: `trial-formulation-reports/${id}`,
    method: "get",
  });
}

export async function getTrialAnalysisMethodsApi() {
  return ApiService.fetchData({
    url: `trial-analysis-methods`,
    method: "get",
  });
}

export async function getDetailTrialAnalysisMethodApi(id) {
  return ApiService.fetchData({
    url: `trial-analysis-methods/${id}`,
    method: "get",
  });
}

export async function postTrialAnalysisMethodApi(data) {
  return ApiService.fetchData({
    url: `trial-analysis-methods`,
    method: "post",
    data,
    withCredentials: true,
  });
}
