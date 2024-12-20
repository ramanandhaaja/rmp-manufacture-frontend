import CustomTable from "components/custom/CustomTable";
import usePurchaseRequest from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Alert } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import TableHeader from "../TableHeader";
import { formatDate } from "utils/helpers";
import TableListDropdown from "components/template/TableListDropdown";

const PurchaseRequestList = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const { dataPurchase, getPurchaseReqList, deletePurchaseRequest } =
    usePurchaseRequest();

  useEffect(() => {
    getPurchaseReqList();
  }, []);

  console.log(dataPurchase);

  const columnsDepartment = [
    {
      Header: "ID",
      accessor: "id",
      Cell: ({ row }) => row.original.id,
    },
    {
      Header: "Item Permintaan",
      accessor: "total_items",
      Cell: ({ row }) => row.original.total_items,
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
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          {row.original.status}
        </span>
      ),
    },
    {
      accessor: "action",
      Cell: ({ row }) => (
        <TableListDropdown
          dropdownItemList={[
            {
              label: "Lihat Detail",
              //   onClick: () =>
              //     navigate(`/vendor-management/detail-vendor/${row.original.id}`),
            },
            {
              label: "Edit",
              //   onClick: () =>
              //      navigate(`/vendor-management/edit-vendor/${row.original.id}`),
            },
            {
              label: "Delete",
              onClick: () => {
                setIsOpen(true);
                setId(row.original.id);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <TableHeader
        onClickAdd={() => navigate("/vendor-management/tambah-vendor")}
        addBtnTitle={"Tambah Vendor"}
      />
      <CustomTable data={dataPurchase} columns={columnsDepartment} />
      <div className="flex justify-end mt-2">
        <Pagination
        //   total={vendorListData?.length}
        //   currentPage={dataVendor?.currentPage}
        //   pageSize={dataVendor?.last_page}
        //   onChange={handlePageChange}
        //   displayTotal
        />
      </div>
      <ConfirmationCustom
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // onConfirm={() => handleDelete(id)}
        title="Delete Confirmation"
        text="Anda yakin akan menghapus data ini?"
        confirmText="Hapus"
        isLoading={isLoading}
      />
    </div>
  );
};

export default PurchaseRequestList;
