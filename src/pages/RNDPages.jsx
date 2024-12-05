import PermintaanRnD from "../components/R&D/PermintaanR&D.jsx";
import SearchAndActionBtn from "../components/SearchAndActionBtn.jsx";
import Tabs from "../components/Tabs.jsx";
import Layout from "../components/layout/Layout.jsx";
import { useState } from "react";
import PageTitle from "../components/PageTitle.jsx";

const tabData = [
  { name: "permintaan", label: "List Permintaan" },
  { name: "pembelian", label: "Pembelian" },
];

const RNDPages = () => {
  const [activeTab, setActiveTab] = useState("permintaan");

  return (
    <Layout>
      <PageTitle title={"Permintaan Pengembangan Produk "} />

      <Tabs
        tabData={tabData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <SearchAndActionBtn />
      <PermintaanRnD />
    </Layout>
  );
};

export default RNDPages;
