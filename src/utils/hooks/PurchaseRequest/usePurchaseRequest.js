import {
  getPurchaseReqApi,
  postPurchaseReqApi,
  putPurchaseReqApi,
  deletePurchaseReqApi,
  getDetailPurchaseReqApi,
  putPurchaseReqFollowUpApi,
  putPurchaseReqUpdateStatusApi,
  getPurchaseReqHistoryApi,
} from "services/PurchaseRequset";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataPurchaseHistory,
  setData,
  setDataDetailPurchase,
} from "../../../store/PurchaseRequest/purchaseSlice";

function usePurchaseReq() {
  const dispatch = useDispatch();
  const { dataPurchase, dataDetailPurchase, dataPurchaseHistory } = useSelector(
    (state) => state.purchase
  );
  const getPurchaseReqList = async (queryParams) => {
    try {
      const resp = await getPurchaseReqApi(queryParams);
      if (resp.data) {
        dispatch(setData(resp.data?.data));
        return {
          status: "success",
          message: "",
          data: resp?.data,
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const getDetailPurchaseReq = async (id) => {
    try {
      const response = await getDetailPurchaseReqApi(id);
      if (response.data) {
        dispatch(setDataDetailPurchase(response.data));
        return { status: "success", message: "", data: response.data };
      } else {
        console.log(response);
        return { status: "failed", message: "" };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };
  const getPurchaseReqHistory = async (id, departmentId) => {
    try {
      const response = await getPurchaseReqHistoryApi(id, departmentId);
      if (response.data) {
        dispatch(setDataPurchaseHistory(response.data));
        return { status: "success", message: "", data: response.data };
      } else {
        console.log(response);
        return { status: "failed", message: "" };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const createPurchaseReq = async (purchaseData) => {
    try {
      const response = await postPurchaseReqApi(purchaseData);
      if (response.status === 201) {
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const updatePurchaseReq = async ({ id, data }) => {
    try {
      const response = await putPurchaseReqApi({ id, data });
      if (response.data.status === "success") {
        return {
          status: "success",
          message: response.data.message,
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message: response.data.message,
        };
      }
    } catch (errors) {
      console.log(errors);
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const deletePurchaseReq = async (id) => {
    try {
      const response = await deletePurchaseReqApi(id);
      if (response.data) {
        return { status: "success", message: response.data.message };
      } else {
        console.log(response);
        return { status: "failed", message: response.data.message };
      }
    } catch (errors) {
      console.log(errors);
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const updatePurchaseReqFollowUp = async ({ id, data }) => {
    try {
      const response = await putPurchaseReqFollowUpApi(id, data);
      if (response.data.status === "success") {
        return { status: "success", message: response.data.message };
      } else {
        console.log(response);
        return { status: "failed", message: response.data.message };
      }
    } catch (errors) {
      console.log(errors);
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const updatePurchaseReqStatus = async ({ id, data }) => {
    try {
      const response = await putPurchaseReqUpdateStatusApi(id, data);
      if (response.data.status === "success") {
        return { status: "success", message: response.data.message };
      } else {
        console.log(response);
        return { status: "failed", message: response.data.message };
      }
    } catch (errors) {
      console.log(errors);
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  return {
    getPurchaseReqList,
    createPurchaseReq,
    setData,
    dataPurchase,
    dataDetailPurchase,
    updatePurchaseReq,
    setDataDetailPurchase,
    dataPurchaseHistory,
    setDataPurchaseHistory,
    updatePurchaseReqFollowUp,
    deletePurchaseReq,
    updatePurchaseReqStatus,
    getDetailPurchaseReq,
    getPurchaseReqHistory,
  };
}

export default usePurchaseReq;
