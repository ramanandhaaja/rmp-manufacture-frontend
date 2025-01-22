import PurchaseRequestList from "components/rmp/PurchaseRequest/PurchaseRequestList";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoodsType } from "store/goodsTypeSlice";

const Page = () => {
  const [activeTab, setActiveTab] = useState("material");
  const dispatch = useDispatch();
  const { goodsType } = useSelector((state) => state.goodsType);

  const handleTabChange = (value) => {
    dispatch(setGoodsType(value));
    setActiveTab(value);
  };

  useEffect(() => {
    dispatch(setGoodsType("material"));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg">
      <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
        <div className="border-b border-gray-500 mb-4">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Permintaan Pembelian
          </h1>
          <Tabs.TabList>
            <Tabs.TabNav value="material" className="text-base">
              Material
            </Tabs.TabNav>
            <Tabs.TabNav value="non-material" className="text-base">
              Non Material
            </Tabs.TabNav>
          </Tabs.TabList>
        </div>
        <Tabs.TabContent value="material">
          <PurchaseRequestList />
        </Tabs.TabContent>
        <Tabs.TabContent value="non-material">
          <PurchaseRequestList />
        </Tabs.TabContent>
      </Tabs>
    </div>
  );
};

export default Page;
