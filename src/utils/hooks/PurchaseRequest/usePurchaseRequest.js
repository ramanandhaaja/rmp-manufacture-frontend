import { getPurchaseReqApi } from "services/PurchaseRequset";
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
  const getPurchaseReqList = async () => {
    try {
      const resp = await getPurchaseReqApi();
      if (resp.data) {
        dispatch(setData(resp.data?.data));
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };
  return {
    getPurchaseReqList,
    setData,
    dataPurchase,
    dataDetailPurchase,
    setDataDetailPurchase,
    dataPurchaseHistory,
    setDataPurchaseHistory,
  };
}

export default usePurchaseReq;
