import Layout from "../../components/layout/Layout.jsx";
import TableVendor from "../../components/VendorManagement/TableVendor.jsx";
import SearchAndActionBtn from "../../components/SearchAndActionBtn.jsx";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle.jsx";
import FilterMenu from "../../components/FilterMenu.jsx";
import { useRef, useState } from "react";
import ExportModal from "../../components/modal/ExportModal.jsx";

const VendorListPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const filterButtonRef = useRef(null);

  return (
    <Layout>
      <PageTitle title={"Vendor"} />

      <SearchAndActionBtn
        showAddBtn={true}
        buttonTitle={"Tambah Vendor"}
        buttonClassName={"bg-indigo-900 text-white"}
        onClickAddBtn={() => {
          navigate("/vendor-management/add-vendor");
        }}
        onClickFilter={() => setIsFilterOpen(true)}
        filterButtonRef={filterButtonRef}
        onClickExport={() => setOpenExport(true)}
      />

      <TableVendor />
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

export default VendorListPage;
