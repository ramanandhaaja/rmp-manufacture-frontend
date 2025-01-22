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

  const getGoodsCategory = async () => {
    try {
      // First, make a request to get total number of items
      const initialResponse = await getGoodsCategoryApi({ page: 1 });
      const totalPages = initialResponse.data.last_page;

      // Fetch all pages
      const promises = Array.from({ length: totalPages }, (_, i) =>
        getGoodsCategoryApi({ page: i + 1 })
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
