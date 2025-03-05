import {
  getRndRequestListApi,
  getRndRequestDetailsApi,
  postRndRequestApi,
  putRndRequestApi,
  deleteRndRequestApi,
  getDetailRndProductDetailsApi,
  getRndProductDetailsApi,
  getRndProductSubstancesApi,
  postRndProductSubstancesApi,
  postRndCompetitorApi,
  deleteRndCompetitorApi,
  getRndCompetitorApi,
  postRndDetailProductApi,
  getDetailRndCompetitorApi,
  getDetailRndReferenceDocApi,
  deleteRndDetailProductApi,
  deleteRndProductSubstancesApi,
  postRndReferenceDocApi,
} from "services/RndService/CreateRndRequest";
import {
  setDataRndRequest,
  setDataDetailRndRequest,
  setIdRndRequest,
  setDataDetailProduct,
  resetDataDetailProduct,
  setDataRndDocReference,
} from "store/Rnd/rndSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";

function useCreateRndReq() {
  const dispatch = useDispatch();
  const {
    dataRndRequest,
    dataDetailRndRequest,
    dataDetailProduct,
    dataRndDocReference,
  } = useSelector((state) => state.rnd);
  const [dataKompetitor, setDataKompetitor] = useState([]);
  const [dataRndProductDetailsById, setDataRndProductDetailsById] = useState(
    []
  );
  const [dataRndProductSubstances, setDataRndProductSubstances] = useState([]);

  const getRndRequest = async () => {
    try {
      // First, make a request to get total number of items
      const initialResponse = await getRndRequestListApi({ page: 1 });
      const totalPages = initialResponse.data.last_page;

      // Fetch all pages
      const promises = Array.from({ length: totalPages }, (_, i) =>
        getRndRequestListApi({ page: i + 1 })
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

      dispatch(setDataRndRequest(sortedData));

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

  const getDetailRndRequest = async (id) => {
    try {
      const response = await getRndRequestDetailsApi(id);
      if (response.data) {
        dispatch(setDataDetailRndRequest(response.data));
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

  const createRndRequest = async (data) => {
    try {
      const response = await postRndRequestApi(data);
      if (response.status === 201) {
        dispatch(setIdRndRequest(response.data.id));
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "network error",
        message: error?.message || error.toString(),
      };
    }
  };

  const updateRndRequest = async (id, data) => {
    try {
      const response = await putRndRequestApi(id, data);
      if (response.status === 200) {
        return { status: "success", message: response.data.message };
      } else {
        console.log(response);
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

  const deleteRndRequest = async (id) => {
    try {
      const response = await deleteRndRequestApi(id);
      if (response.status === 204) {
        return {
          status: "success",
          message: response.data.message || "Successfully deleted rnd request",
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message: response.data.message || "Failed to delete rnd request",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const getCompetitorRndRequest = async (id) => {
    try {
      const response = await getRndCompetitorApi();
      if (response.data) {
        const dataKompetitor = response.data.data;
        const filteredCompetitors = dataKompetitor.filter(
          (item) => item.rnd_request_id === id
        );
        setDataKompetitor(filteredCompetitors);
        return { status: "success", message: "" };
      } else {
        console.error("Unexpected response format:", response);
        return { status: "failed", message: "Unexpected response format" };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const getRndCompetitorById = async (id) => {
    try {
      const response = await getDetailRndCompetitorApi(id);
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

  const addCompetitorRnd = async (data) => {
    try {
      const response = await postRndCompetitorApi(data);
      if (response.status === 201) {
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "network error",
        message: error?.message || error.toString(),
      };
    }
  };

  const deleteRndCompetitor = async (id) => {
    try {
      const response = await deleteRndCompetitorApi(id);
      console.log(response);
      if (response.status === 204) {
        return {
          status: "success",
          message:
            response.data.message || "Successfully deleted rnd competitor",
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message: response.data.message || "Failed to delete rnd competitor",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const getRndProductDetailsById = async (id) => {
    try {
      const response = await getDetailRndProductDetailsApi(id);
      if (response.data) {
        console.log(response.data);
        setDataRndProductDetailsById(response.data);
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

  const getRndProductDetails = async (params) => {
    try {
      const response = await getRndProductDetailsApi(params);
      if (response.data) {
        dispatch(setDataDetailProduct(response.data));
        return { status: "success", message: "", data: response.data };
      } else {
        dispatch(resetDataDetailProduct(null));
        console.log("No data in response:", response);
        return { status: "failed", message: "" };
      }
    } catch (error) {
      dispatch(resetDataDetailProduct(null));
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const getRndProductSubstances = async (params) => {
    try {
      const response = await getRndProductSubstancesApi(params);
      if (response.data) {
        setDataRndProductSubstances(response.data);
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

  const createRndDetailProduct = async (data) => {
    try {
      const response = await postRndDetailProductApi(data);
      if (response.status === 201) {
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "network error",
        message: error?.message || error.toString(),
      };
    }
  };

  const createRndProductSubstances = async (data) => {
    try {
      const response = await postRndProductSubstancesApi(data);
      console.log(response);
      if (response.status === 201) {
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "network error",
        message: error?.message || error.toString(),
      };
    }
  };

  const deleteRndProductSubstances = async (id) => {
    try {
      const response = await deleteRndProductSubstancesApi(id);
      if (response.status === 204) {
        return {
          status: "success",
          message:
            response.data.message ||
            "Successfully deleted rnd product substances",
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message:
            response.data.message || "Failed to delete rnd product substances",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const createRndDocReference = async (data) => {
    try {
      const response = await postRndReferenceDocApi(data);
      console.log(response);
      if (response.status === 201) {
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "network error",
        message: error?.message || error.toString(),
      };
    }
  };

  const getRndDocReference = async (id) => {
    try {
      const response = await getDetailRndReferenceDocApi(id);

      if (response.data) {
        dispatch(setDataRndDocReference(response.data));
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

  return {
    getRndRequest,
    getDetailRndRequest,
    createRndRequest,
    updateRndRequest,
    deleteRndRequest,
    getCompetitorRndRequest,
    addCompetitorRnd,
    dataRndRequest,
    dataDetailRndRequest,
    dataKompetitor,
    dataRndProductDetailsById,
    dataDetailProduct,
    dataRndProductSubstances,
    dataRndDocReference,
    deleteRndCompetitor,
    getRndCompetitorById,
    getRndProductDetailsById,
    getRndProductDetails,
    createRndDetailProduct,
    createRndProductSubstances,
    deleteRndProductSubstances,
    getRndProductSubstances,
    createRndDocReference,
    getRndDocReference,
  };
}
export default useCreateRndReq;
