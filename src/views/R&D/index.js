import Tabs from "components/ui/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListDevelopment from "components/rmp/R&D/ListDeveopment";
import ListRequestRnd from "components/rmp/R&D/ListRequestRnd";
import { clearDataRndRequest } from "store/Rnd/rndSlice";

const Page = () => {
  const [activeTab, setActiveTab] = useState("list-request");
  const dispatch = useDispatch();
  const { rndRequestId } = useSelector((state) => state.rnd);
  const handleTabChange = (value) => {
    // dispatch(setGoodsType(value));
    setActiveTab(value);
  };
  console.log(rndRequestId);
  useEffect(() => {
    dispatch(clearDataRndRequest());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg">
      <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
        <div className="border-b border-gray-500 mb-4">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Permintaan Pengembangan Produk
          </h1>
          <Tabs.TabList>
            <Tabs.TabNav value="list-request" className="text-base">
              List Permintaan
            </Tabs.TabNav>
            <Tabs.TabNav value="list-development" className="text-base">
              Pengembangan
            </Tabs.TabNav>
          </Tabs.TabList>
        </div>
        <Tabs.TabContent value="list-request">
          <ListRequestRnd />
        </Tabs.TabContent>
        <Tabs.TabContent value="list-development">
          <ListDevelopment />
        </Tabs.TabContent>
      </Tabs>
    </div>
  );
};
export default Page;
