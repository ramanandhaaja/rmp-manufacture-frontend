import {
  getPurchaseOrderApi,
  getPurchaseOrderItemQueuesApi,
  getListPurchaseOrderNumberApi,
  getPurchaseOrderDetailsApi,
  postPurchaseOrderApi,
  postAddItemToPoApi,
  postConfirmPoApi,
  patchItemToAnotherPoApi,
} from "services/ProcurementService";
import { useDispatch, useSelector } from "react-redux";

import {
  setDataPurchaseOrder,
  setDataPurchaseQueue,
  setDataListPoNumber,
  setDataDetailPurchaseOrder,
} from "../../../store/PurchaseOrder/purchaseOrderSlice";

function usePurchaseOrder() {
  const dispatch = useDispatch();
  const {
    dataPurchaseOrder,
    dataPurchaseQueue,
    dataListPoNumber,
    dataDetailPurchaseOrder,
  } = useSelector((state) => state.purchaseOrder);

  const getPoList = async (queryParams) => {
    try {
      const resp = await getPurchaseOrderApi(queryParams);
      if (resp.data) {
        dispatch(setDataPurchaseOrder(resp.data?.data));
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

  const getPoQueueList = async (params) => {
    try {
      const response = await getPurchaseOrderItemQueuesApi(params);
      if (response.data) {
        dispatch(setDataPurchaseQueue(response.data.data));
        return { status: "success", message: "" };
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

  const getPoDetail = async (id) => {
    try {
      const response = await getPurchaseOrderDetailsApi(id);
      if (response.data) {
        dispatch(setDataDetailPurchaseOrder(response.data));
        return { status: "success", message: "" };
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

  const getListExistingPo = async () => {
    try {
      const response = await getListPurchaseOrderNumberApi();
      if (response.data) {
        dispatch(setDataListPoNumber(response.data.data));
        return { status: "success", message: "" };
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

  const createPurchaseOrder = async (purchaseData) => {
    try {
      const response = await postPurchaseOrderApi(purchaseData);
      console.log(response);
      if (response.status === 201) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data.data,
        };
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

  const addToExistingPo = async (purchaseData) => {
    try {
      const response = await postAddItemToPoApi(purchaseData);
      console.log(response);
      if (response.status === 201) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data.data,
        };
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

  const confirmPo = async (data) => {
    try {
      const response = await postConfirmPoApi(data);
      console.log(response);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data.data,
        };
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

  const movePurchaseOrder = async (data) => {
    try {
      const response = await patchItemToAnotherPoApi(data);
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

  return {
    getPoList,
    getPoQueueList,
    getListExistingPo,
    getPoDetail,
    createPurchaseOrder,
    confirmPo,
    addToExistingPo,
    movePurchaseOrder,
    dataPurchaseQueue,
    dataPurchaseOrder,
    dataListPoNumber,
    dataDetailPurchaseOrder,
  };
}

export default usePurchaseOrder;
