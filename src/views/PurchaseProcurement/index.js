import ProcurementReqList from "components/rmp/PurchaseProcurement/ProcurementReqList";
import ProcurementOrderList from "components/rmp/PurchaseProcurement/ProcurementOrderList";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoodsType } from "store/goodsTypeSlice";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [activeTab, setActiveTab] = useState("purchase-request");
  const dispatch = useDispatch();
  //   const { goodsType } = useSelector((state) => state.goodsType);

  const navigate = useNavigate();

  const handleTabChange = (value) => {
    // dispatch(setGoodsType(value));
    setActiveTab(value);
  };

  //   useEffect(() => {
  //     dispatch(setGoodsType("material"));
  //   }, []);

  return (
    <div className="px-2 py-4 ">
      <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
        <div className="border-b border-gray-500 mb-4">
          <h1 className="text-2xl flex justify-between font-semibold text-indigo-900 mb-4">
            Pengadaan
            {activeTab === "purchase-request" && (
              <Button
                variant="solid"
                className="text-sm"
                onClick={() => navigate("/purchase/request/antrian-barang")}
              >
                Proses Antrian Barang
              </Button>
            )}
          </h1>
          <Tabs.TabList>
            <Tabs.TabNav value="purchase-request" className="">
              List Purchase Request
            </Tabs.TabNav>
            <Tabs.TabNav value="purchase-order">
              List Purchase Order
            </Tabs.TabNav>
          </Tabs.TabList>
        </div>
        <Tabs.TabContent value="purchase-request">
          <ProcurementReqList />
        </Tabs.TabContent>
        <Tabs.TabContent value="purchase-order">
          <ProcurementOrderList />
        </Tabs.TabContent>
      </Tabs>
    </div>
  );
};

export default Page;
