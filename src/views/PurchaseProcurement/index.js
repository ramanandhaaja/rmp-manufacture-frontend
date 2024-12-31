import ProcurementList from "components/rmp/PurchaseProcurement/ProcurementList";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoodsType } from "store/goodsTypeSlice";

const Page = () => {
  const [activeTab, setActiveTab] = useState("purchase-request");
  const dispatch = useDispatch();
  //   const { goodsType } = useSelector((state) => state.goodsType);

  const handleTabChange = (value) => {
    // dispatch(setGoodsType(value));
    setActiveTab(value);
  };

  //   useEffect(() => {
  //     dispatch(setGoodsType("material"));
  //   }, []);

  return (
    <div className="px-2 py-2 ">
      <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
        <div className="border-b border-gray-500 mb-4">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Pengadaan
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
          <ProcurementList />
        </Tabs.TabContent>
        <Tabs.TabContent value="purchase-order">
          {/* <ProcurementList /> */}
        </Tabs.TabContent>
      </Tabs>
    </div>
  );
};

export default Page;
