import Layout from "../../components/layout/Layout.jsx";
import SearchAndActionBtn from "../../components/SearchAndActionBtn.jsx";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle.jsx";
import FilterMenu from "../../components/FilterMenu.jsx";
import { useRef, useState } from "react";
import ExportModal from "../../components/modal/ExportModal.jsx";
import TablePurchaseRequest from "../../components/PurchaseManagement/TablePurchaseRequest.jsx";

const PurchaseRequestPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const filterButtonRef = useRef(null);

  return (
    <Layout>
      <PageTitle title={"Permintaan Pembelian"} />

      <SearchAndActionBtn
        showBtnExport={true}
        showBtnFilter={true}
        showBtnImport={true}
        showAddBtn={true}
        buttonTitle={"Buat Permintaan Pembelian"}
        buttonClassName={"bg-indigo-900 text-white"}
        onClickAddBtn={() => {
          navigate("/purchase-management/add-purchase-request");
        }}
        onClickFilter={() => setIsFilterOpen(true)}
        filterButtonRef={filterButtonRef}
        onClickExport={() => setOpenExport(true)}
      />
      


      <TablePurchaseRequest />
      <FilterMenu
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        // onApply={handleFilterApply}
        anchorEl={filterButtonRef.current}
        filterOptions={[
          {
            title: "Kategori",
            options: [
              { label: "Material", value: "material" },
              { label: "Non Material", value: "nonMaterial" },
            ],
          },
        ]}
      />
      <ExportModal isOpen={openExport} onClose={() => setOpenExport(false)} />
    </Layout>
  );
};

export default PurchaseRequestPage;
