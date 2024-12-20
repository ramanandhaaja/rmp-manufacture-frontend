import { combineReducers } from "redux";
import theme from "./theme/themeSlice";
import auth from "./auth";
import base from "./base";
import vendor from "./vendorManagement/vendorSlice";
import goodsCategory from "./goodsCategorySlice";
import masterGoods from "./masterGoodsPurchaseSlice";
import purchase from "./PurchaseRequest/purchaseSlice";

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    theme,
    auth,
    base,
    vendor,
    goodsCategory,
    masterGoods,
    purchase,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
