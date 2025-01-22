import {
  getPurchaseOrderApi,
  getPurchaseOrderItemQueuesApi,
  getListPurchaseOrderNumberApi,
  getPurchaseOrderDetailsApi,
  postPurchaseOrderApi,
  postAddItemToPoApi,
  postPoVendorApi,
  postVendorOfferApi,
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
      // First, make a request to get total number of items
      const initialResponse = await getPurchaseOrderApi({ page: 1 });
      const totalPages = initialResponse.data.last_page;

      // Fetch all pages
      const promises = Array.from({ length: totalPages }, (_, i) =>
        getPurchaseOrderApi({ page: i + 1 })
      );

      const responses = await Promise.all(promises);

      // Combine all data
      const allData = responses.reduce((acc, response) => {
        return [...acc, ...response.data.data];
      }, []);

      // Sort by creation date (assuming there's a created_at field)
      const sortedData = allData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      // Handle pagination on the client side
      const totalItems = sortedData.length;
      const perPage = initialResponse.data.per_page;

      dispatch(setDataPurchaseOrder(sortedData));

      return {
        status: "success",
        message: "",
        data: {
          data: sortedData,
          total: totalItems,
          per_page: perPage,
        },
      };
    } catch (errors) {
      console.log(errors);
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

  const confirmPoVendors = async (data) => {
    try {
      const response = await postPoVendorApi(data);
      console.log(response);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
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

  const submitVendorOffer = async (data) => {
    try {
      const response = await postVendorOfferApi(data);
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
    confirmPoVendors,
    addToExistingPo,
    submitVendorOffer,
    movePurchaseOrder,
    dataPurchaseQueue,
    dataPurchaseOrder,
    dataListPoNumber,
    dataDetailPurchaseOrder,
  };
}

export default usePurchaseOrder;
