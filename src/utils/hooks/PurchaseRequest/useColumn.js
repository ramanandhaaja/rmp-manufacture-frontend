import { useCallback } from "react";
import { formatDate } from "utils/helpers";
import TableListDropdown from "components/template/TableListDropdown";
import { useNavigate } from "react-router-dom";

const useColumns = (setIsOpen, setId) => {
  const navigate = useNavigate();

  const columnsDepartment = useCallback(
    () => [
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
                onClick: () =>
                  navigate(`/purchase/request/detail/${row.original.id}`),
              },
              {
                label: "Edit",
                // onClick: () =>
                //   navigate(`/vendor-management/edit-vendor/${row.original.id}`),
              },
              {
                label: "Delete",
                onClick: () => {
                  setIsOpen(true);
                  console.log(row.original.id);
                  setId(row.original.id);
                },
              },
            ]}
          />
        ),
      },
    ],
    [navigate, setIsOpen, setId]
  );

  const columnsPpic = useCallback(
    () => [
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
        Header: "Departemen",
        accessor: "department_id",
        Cell: ({ row }) => row.original.department_id,
      },
      {
        Header: "HOD",
        accessor: "hod",
        Cell: ({ row }) => row.original.hod,
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
        Cell: ({ row }) => row.original.buyer,
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
                onClick: () =>
                  navigate(`/purchase/request/detail/${row.original.id}`),
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
    ],
    [navigate, setIsOpen, setId]
  );

  const columnsItemPurchase = useCallback(
    () => [
      {
        Header: "Kode",
        accessor: "id",
        Cell: ({ row }) => row.original.goods_id,
      },
      {
        Header: "Barang",
        accessor: "goods",
        Cell: ({ row }) => row.original.goods_name,
      },
      {
        Header: "Kategori Barang",
        accessor: "goods_category",
        Cell: ({ row }) => row.original.goods_category,
      },
      {
        Header: "UOM",
        accessor: "measurement",
        Cell: ({ row }) => row.original.measurement.label,
      },

      {
        accessor: "action",
        Cell: ({ row }) => (
          <TableListDropdown
            dropdownItemList={[
              {
                label: "Lihat Detail",
                // onClick: () => navigate(`/vendor-management/detail-vendor/${row.original.id}`),
              },
              {
                label: "Edit",
                // onClick: () => navigate(`/vendor-management/edit-vendor/${row.original.id}`),
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
    ],
    [navigate, setIsOpen, setId]
  );

  return { columnsDepartment, columnsPpic, columnsItemPurchase };
};

export default useColumns;
