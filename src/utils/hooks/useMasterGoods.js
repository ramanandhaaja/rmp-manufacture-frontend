import {
  getGoodsListApi,
  getGoodsPerIdApi,
  postGoodsApi,
  putGoodsApi,
  deleteGoodsApi,
} from "../../services/MasterGoodsService";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setDataDetailGoods,
} from "../../store/masterGoodsPurchaseSlice";

function useMasterGoods() {
  const dispatch = useDispatch();
  const { dataMasterGoods, detailGoods } = useSelector(
    (state) => state.masterGoods
  );

  const getGoods = async () => {
    try {
      const response = await getGoodsListApi();
      if (response.data) {
        dispatch(setData(response.data?.data.data));

        return {
          status: "success",
          message: "",
          data: response?.data?.data,
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message: "",
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

  const getGoodsDetail = async (id) => {
    try {
      const response = await getGoodsPerIdApi(id);
      if (response.data) {
        dispatch(setDataDetailGoods(response.data));

        return {
          status: "success",
          message: "",
          data: response?.data.data,
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message: "",
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

  const createGoods = async (data) => {
    try {
      const response = await postGoodsApi(data);
      if (response.data.status === "success") {
        return {
          status: "success",
          message: response.data.message,
        };
      } else {
        console.log(response.data.status);
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

  const updateGoods = async ({ id, data }) => {
    try {
      const response = await putGoodsApi({ id, data });
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

  const deleteGoods = async (id) => {
    try {
      const response = await deleteGoodsApi(id);
      if (response.data.status === "success") {
        return {
          status: "success",
          message: response.data.message || "Successfully delete goods",
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message: response.data.message || "Failed to delete goods",
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

  return {
    dataMasterGoods,
    detailGoods,
    getGoods,
    getGoodsDetail,
    createGoods,
    updateGoods,
    deleteGoods,
  };
}

export default useMasterGoods;
