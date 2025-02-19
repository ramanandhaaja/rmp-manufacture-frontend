import {
  getPurchaseOrderApi,
  getPurchaseOrderItemQueuesApi,
  getListPurchaseOrderNumberApi,
  getPurchaseOrderDetailsApi,
  getPoVendorOfferDetailsApi,
  postPurchaseOrderApi,
  postAddItemToPoApi,
  postPoVendorApi,
  postVendorOfferApi,
  patchItemToAnotherPoApi,
  putVendorOfferApi,
  getProcurementLogsApi,
  getPoAdjustmentNoteApi,
  postPoVerificationApi,
  postReleasePoApi,
  postReplyAdjustmentNoteApi,
  postConfirmPaymentApi,
  getListPaymentApi,
} from "services/ProcurementService";
import { useDispatch, useSelector } from "react-redux";

import {
  setDataPurchaseOrder,
  setDataPurchaseQueue,
  setDataListPoNumber,
  setDataDetailPurchaseOrder,
  setDataOfferPoVendors,
  setDataPoNotesBod,
} from "../../../store/PurchaseOrder/purchaseOrderSlice";

function usePurchaseOrder() {
  const dispatch = useDispatch();
  const {
    dataPurchaseOrder,
    dataPurchaseQueue,
    dataListPoNumber,
    dataDetailPurchaseOrder,
    dataOfferPoVendors,
    dataPoNotesBod,
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

  const getProcurementLog = async (params) => {
    try {
      const response = await getProcurementLogsApi(params);
      if (response.data) {
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
  const getDetailVendorOffer = async (id) => {
    try {
      const response = await getPoVendorOfferDetailsApi(id);
      if (response.data) {
        dispatch(setDataOfferPoVendors(response.data.offer_details));
        return {
          status: "success",
          message: response.data.message,
          data: response.data.offer_details,
        };
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

  const getNotesBod = async (id) => {
    try {
      const response = await getPoAdjustmentNoteApi(id);
      if (response.data) {
        dispatch(setDataPoNotesBod(response.data.data));
        return {
          status: "success",
          message: response.data.message,
        };
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

  const getPaymentLists = async () => {
    try {
      const response = await getListPaymentApi();
      if (response.data) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const submitPoVerification = async (data) => {
    try {
      const response = await postPoVerificationApi(data);
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

  const releasePo = async (id, data) => {
    try {
      const response = await postReleasePoApi(id, data);
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

  const submitPayment = async (id, data) => {
    try {
      const response = await postConfirmPaymentApi(Number(id), data);
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

  const editVendorOffer = async (id, data) => {
    try {
      const response = await putVendorOfferApi(id, data);
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

  const replyAdjustmentNote = async (id, data) => {
    try {
      const response = await postReplyAdjustmentNoteApi(id, data);
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

  return {
    getPoList,
    getPoQueueList,
    getListExistingPo,
    getPoDetail,
    getDetailVendorOffer,
    createPurchaseOrder,
    confirmPoVendors,
    addToExistingPo,
    submitVendorOffer,
    movePurchaseOrder,
    dataPurchaseQueue,
    dataPurchaseOrder,
    dataListPoNumber,
    dataDetailPurchaseOrder,
    dataOfferPoVendors,
    editVendorOffer,
    getProcurementLog,
    submitPoVerification,
    releasePo,
    getNotesBod,
    dataPoNotesBod,
    replyAdjustmentNote,
    getPaymentLists,
    submitPayment,
  };
}

export default usePurchaseOrder;
