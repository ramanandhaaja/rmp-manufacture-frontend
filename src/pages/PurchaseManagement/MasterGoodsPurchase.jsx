import Layout from "../../components/layout/Layout";
import SearchAndActionBtn from "../../components/SearchAndActionBtn";
import { useNavigate } from "react-router-dom";
import MasterGoodsPurchaseTable from "../../components/PurchaseManagement/MasterGoodsTable";
import PageTitle from "../../components/PageTitle";

const MasterBarangPurchase = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <PageTitle title={"Master Barang Pembelian"} />
      <SearchAndActionBtn
        showBtnFilter={true}
        showAddBtn={true}
        buttonTitle={"Add Barang"}
        buttonClassName={"bg-indigo-900 text-white"}
        onClickAddBtn={() => {
          navigate("/purchase-management/add-master-data-goods");
        }}
        onClickFilter={() => setIsFilterOpen(true)}
        onClickExport={() => setOpenExport(true)}
      />

      <MasterGoodsPurchaseTable />
    </Layout>
  );
};

export default MasterBarangPurchase;
