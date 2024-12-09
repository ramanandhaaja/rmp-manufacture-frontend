import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/PageTitle";
import SearchAndActionBtn from "../../components/SearchAndActionBtn";
import TableTipeBarang from "../../components/VendorManagement/TableTipeBarang";

const TipeBarangPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <PageTitle title={"Tipe Barang"} />
      <SearchAndActionBtn
        showAddBtn={true}
        showBtnImport={false}
        showBtnExport={false}
        showBtnFilter={false}
        buttonTitle={"Tambah Barang"}
        buttonClassName={"bg-indigo-900 text-white"}
        onClickAddBtn={() => {
          navigate("/vendor-management/add-tipe-barang");
        }}
      />
      <TableTipeBarang />
    </Layout>
  );
};

export default TipeBarangPage;
