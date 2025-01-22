import {
  getVendorsListApi,
  getVendorsDetailsApi,
  postVendorsApi,
  putVendorsApi,
  putVerficationStatus,
  deleteVendorsApi,
} from "services/VendorServices";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setDataDetailVendor,
} from "../../../store/vendorManagement/vendorSlice";

function useVendor() {
  const dispatch = useDispatch();
  const { dataVendor, dataDetailVendor } = useSelector((state) => state.vendor);

  const getVendors = async () => {
    try {
      // First, make a request to get total number of items
      const initialResponse = await getVendorsListApi({ page: 1 });
      const totalPages = initialResponse.data.last_page;

      // Fetch all pages
      const promises = Array.from({ length: totalPages }, (_, i) =>
        getVendorsListApi({ page: i + 1 })
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

      dispatch(setData(sortedData));

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

  const getVendorDetail = async (id) => {
    try {
      const response = await getVendorsDetailsApi(id);
      if (response.data) {
        dispatch(setDataDetailVendor(response.data));
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

  const createVendor = async (vendorData) => {
    try {
      const response = await postVendorsApi(vendorData);
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

  const updateVendor = async (id, data) => {
    try {
      const response = await putVendorsApi(id, data);
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

  const setStatusVendor = async (id, data) => {
    try {
      const response = await putVerficationStatus(id, data);
      console.log(response);
      if (response.data.success == true) {
        console.log(response);
        return {
          status: "success",
          message: response.message,
        };
      } else {
        console.log(response);
        return {
          status: "error",
          message: response.message,
        };
      }
    } catch (err) {
      console.log("catch error", err);
      return {
        status: "error",
        message: err.message,
      };
    }
  };

  const removeVendor = async (vendorId) => {
    try {
      const response = await deleteVendorsApi(vendorId);
      console.log(response);
      if (response.status === 204) {
        return {
          status: "success",
          message: response.data.message || "Successfully deleted vendor",
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message: response.data.message || "Failed to delete vendor",
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

  return {
    dataVendor,
    dataDetailVendor,
    getVendors,
    getVendorDetail,
    createVendor,
    updateVendor,
    setStatusVendor,
    removeVendor,
  };
}

export default useVendor;
