import ItemQueuesList from "components/rmp/PurchaseProcurement/ItemQueuesList";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";

const ItemQueues = () => {
  const [activeTab, setActiveTab] = useState("material");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
        <div className="border-b border-gray-500 mb-4">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Antrian Barang
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
          <ItemQueuesList type="material" />
        </Tabs.TabContent>
        <Tabs.TabContent value="non-material">
          <ItemQueuesList type="non-material" />
        </Tabs.TabContent>
      </Tabs>
    </div>
  );
};

export default ItemQueues;
