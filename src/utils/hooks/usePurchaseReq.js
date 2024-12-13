import { getPurchaseReqApi } from "../../services/PurchaseManagementService";

function usePurchaseReq() {
  const getPurchaseReqList = async () => {
    try {
      const resp = await getPurchaseReqApi();
      if (resp.data) {
        return {
          status: "success",
          message: "",
          data: resp?.data.data,
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };
  return {
    getPurchaseReqList,
  };
}

export default usePurchaseReq;
