import {
  getGoodsCategoryApi,
  postGoodsCategoryApi,
  deleteGoodsCategoryApi,
  putGoodsCategoryApi,
} from "services/GoodsCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setDataDetailGoodsCategory,
} from "../../store/goodsCategorySlice";

function useGoodsCategory() {
  const dispatch = useDispatch();
  const { dataGoodsCategory, detailGoodsCategory } = useSelector(
    (state) => state.goodsCategory
  );

  const getGoodsCategory = async (queryParams) => {
    try {
      const response = await getGoodsCategoryApi(queryParams);
      if (response.data) {
        dispatch(setData(response.data));

        return {
          status: "success",
          message: "",
          data: response?.data,
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

  const createGoodsCategory = async (data) => {
    try {
      const response = await postGoodsCategoryApi(data);
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

  const updateGoodsCategory = async ({ id, data }) => {
    try {
      const response = await putGoodsCategoryApi({ id, data });
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

  const deleteGoodsCategory = async (id) => {
    try {
      const response = await deleteGoodsCategoryApi(id);
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
    getGoodsCategory,
    dataGoodsCategory,
    detailGoodsCategory,
    createGoodsCategory,
    updateGoodsCategory,
    deleteGoodsCategory,
  };
}

export default useGoodsCategory;
