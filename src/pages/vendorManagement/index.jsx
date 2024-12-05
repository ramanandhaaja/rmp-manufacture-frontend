import Layout from "../../components/layout/Layout.jsx";
import { useState } from "react";
import TableVendor from "../../components/VendorManagement/TableVendor.jsx";
import SearchAndActionBtn from "../../components/SearchAndActionBtn.jsx";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle.jsx";

const RNDPages = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <PageTitle title={"Vendor "} />

      <SearchAndActionBtn
        showAddBtn={true}
        buttonTitle={"Tambah Vendor"}
        buttonClassName={"bg-indigo-900 text-white"}
        onClickAddBtn={() => {
          navigate("/vendor-management/add-vendor");
        }}
      />
      <TableVendor />
    </Layout>
  );
};

export default RNDPages;
