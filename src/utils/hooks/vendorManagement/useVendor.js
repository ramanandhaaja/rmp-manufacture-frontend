import {
  getVendorsListApi,
  getVendorsDetailsApi,
  postVendorsApi,
  putVendorsApi,
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
      const response = await getVendorsListApi();
      if (response.data) {
        dispatch(setData(response.data));
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
      console.log(response);
      if (response.data.status === "success") {
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
    removeVendor,
  };
}

export default useVendor;
