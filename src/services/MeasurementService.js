import ApiService from "./ApiService";

export async function getMeasurementUnitsApi() {
  return ApiService.fetchData({
    url: `measurement-units/`,
    method: "get",
  });
}
