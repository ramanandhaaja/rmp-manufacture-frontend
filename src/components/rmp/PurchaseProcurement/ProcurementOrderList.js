import CustomTable from "components/custom/CustomTable";
import { useEffect, useState } from "react";
import { formatDate, getCapitalizeType } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Pagination, Alert } from "components/ui";
import CreatePOModal from "components/custom/ModalCreatePo";
import TableHeader from "../TableHeader";
import { findDepartement } from "utils/helpers";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import capitalize from "components/ui/utils/capitalize";
import TableListDropdown from "components/template/TableListDropdown";

const ProcurementOrderList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const { getPoList, dataPurchaseOrder } = usePurchaseOrder();

  const columns = [
    {
      Header: "ID PO",
      accessor: "id",
      Cell: ({ row }) => row.original.id,
    },
    {
      Header: "Nama PO",
      accessor: "po_name",
      Cell: ({ row }) => row.original.po_name,
    },

    {
      Header: "Departemen",
      accessor: "department_id",
      Cell: ({ row }) => findDepartement(row.original.department_id),
    },
    {
      Header: "Kategori",
      accessor: "category",
      Cell: ({ row }) => row.original.category.name || "-",
    },
    {
      Header: "Tipe",
      accessor: "po_type",
      Cell: ({ row }) => {
        return getCapitalizeType(row.original.po_type);
      },
    },
    {
      Header: "Tanggal Request PO",
      accessor: "po_date",
      Cell: ({ row }) => {
        return formatDate(row.original.po_date);
      },
    },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          Belum Diproses
        </span>
      ),
    },
    {
      accessor: "action",
      Cell: ({ row }) => (
        <TableListDropdown
          dropdownItemList={[
            {
              label: "Proses PO",
              onClick: () =>
                navigate(`/purchase/pengadaan/detail/${row.original.id}`),
            },
            {
              label: "Hapus PO",
              //   onClick: () =>
              //     navigate(`/vendor-management/edit-vendor/${row.original.id}`),
            },
            // {
            //   label: "Lihat Detail",
            //   onClick: () =>
            //     navigate(`/purchase/pengadaan/detail/${row.original.id}`),
            // },
          ]}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchPurchaseRequests = async () => {
      setIsLoading(true);
      try {
        const response = await getPoList({ currentPage });
        const data = response.data;
        setTotal(data?.total);
        setPageSize(data?.per_page);
      } catch (error) {
        console.error("Error fetching purchase requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchaseRequests();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSave = (values) => {
    console.log("Form values:", values);
    setIsModalOpen(false);
  };

  //   const handleDelete = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await deleteGoods(id);
  //       const data = response.data;
  //       setTotal(data?.total);
  //       setPageSize(data?.per_page);
  //       if (response.status === "success") {
  //         console.log("success");
  //         navigate("/master-data/barang-purchase");
  //       } else {
  //         <Alert
  //           message="Failed to delete goods"
  //           type="danger"
  //           showIcon
  //           className="mb-4"
  //         />;
  //         console.log(response.status);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //         setIsOpen(false);
  //       }, 1000);
  //     }
  //   };

  return (
    <div>
      <TableHeader onClickAdd={() => setIsOpen(true)} addBtnTitle={"Buat PO"} />
      <CustomTable data={dataPurchaseOrder} columns={columns} />
      <div className="flex justify-end mt-2">
        <Pagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          displayTotal
        />
      </div>

      <CreatePOModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        isLoading={false}
      />
    </div>
  );
};

export default ProcurementOrderList;
