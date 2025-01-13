import CustomTable from "components/custom/CustomTable";
import { useEffect, useState } from "react";
import { formatDate } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Pagination, Alert } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import TableHeader from "../TableHeader";
import { FiEye } from "react-icons/fi";
import { findDepartement } from "utils/helpers";
import usePurchaseReq from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import capitalize from "components/ui/utils/capitalize";

const ProcurementReqList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [approvedData, setApprovedData] = useState([]);
  const { getPurchaseReqList } = usePurchaseReq();

  const columns = [
    {
      Header: "ID Request",
      accessor: "id",
      Cell: ({ row }) => row.original.id,
    },
    {
      Header: "Item Permintaan",
      accessor: "total_items",
      Cell: ({ row }) => row.original.total_items,
    },

    {
      Header: "Departemen",
      accessor: "department_id",
      Cell: ({ row }) => findDepartement(row.original.department_id),
    },
    {
      Header: "HOD",
      accessor: "hod",
      Cell: ({ row }) => row.original.hod || "-",
    },
    {
      Header: "Tanggal Permintaan",
      accessor: "request_date",
      Cell: ({ row }) => {
        return formatDate(row.original.request_date);
      },
    },
    {
      Header: "Tanggal Persetujuan",
      accessor: "approval_date",
      Cell: ({ row }) => {
        return formatDate(row.original.approval_date);
      },
    },
    {
      Header: "Dibeli Oleh",
      accessor: "buyer",
      Cell: ({ row }) => row.original.buyer || "-",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          {capitalize(row.original.status)}
        </span>
      ),
    },
    {
      accessor: "action",
      Cell: ({ row }) => {
        const { status } = row.original;

        return (
          <button>
            <FiEye />
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchPurchaseRequests = async () => {
      setIsLoading(true);
      try {
        const response = await getPurchaseReqList({ currentPage });
        const data = response.data;
        setTotal(data?.total);
        setPageSize(data?.per_page);
        const approvedItems = data?.data.filter(
          (item) => item.status === "approved"
        );
        setApprovedData(approvedItems);
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
      <TableHeader
        onClickAdd={() =>
          navigate("/master-data/barang-purchase/tambah-barang-purchase")
        }
        showBtnAdd={false}
      />
      <CustomTable data={approvedData} columns={columns} />
      <div className="flex justify-end mt-2">
        <Pagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          displayTotal
        />
      </div>
      {/* <ConfirmationCustom
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDelete(id)}
        title="Delete Confirmation"
        text="Anda yakin akan menghapus data ini?"
        confirmText="Hapus"
        isLoading={isLoading}
      /> */}
    </div>
  );
};

export default ProcurementReqList;
